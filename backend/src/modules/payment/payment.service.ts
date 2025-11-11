import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { Model, Types } from "mongoose";
import Stripe from "stripe";
import { Purchase, PurchaseStatus } from "./purchase.entity";
import { TracksService } from "../tracks/tracks.service";
import { TrackStatus } from "../tracks/track.entity";

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
    private tracksService: TracksService,
    private configService: ConfigService
  ) {
    this.stripe = new Stripe(this.configService.get<string>("STRIPE_SECRET_KEY"), {
      apiVersion: "2025-10-29.clover"
    });
  }

  async createCheckoutSession(userId: string, trackId: string) {
    const track = await this.tracksService.findOne(trackId);
    if (!track) {
      throw new NotFoundException("Track not found");
    }

    if (track.isSold) {
      throw new BadRequestException("Track already sold");
    }

    const purchase = new this.purchaseModel({
      userId: userId,
      trackId: new Types.ObjectId(trackId),
      amount: track.price,
      currency: "usd",
      status: PurchaseStatus.PENDING,
      stripePaymentIntentId: "temp"
    });
    await purchase.save();

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: track.title,
              description: `${track.artist} - ${track.genre}`,
              images: track.coverUrl ? [track.coverUrl] : []
            },
            unit_amount: Math.round(track.price * 100)
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${this.configService.get<string>("FRONTEND_URL")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get<string>("FRONTEND_URL")}/tracks/${trackId}`,
      metadata: {
        purchaseId: purchase._id.toString(),
        trackId: trackId,
        userId: userId
      }
    });

    await this.purchaseModel.findByIdAndUpdate(purchase._id, {
      stripePaymentIntentId: session.payment_intent as string
    });

    return {
      sessionId: session.id,
      url: session.url
    };
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>("STRIPE_WEBHOOK_SECRET");
    
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await this.fulfillPurchase(session);
    }

    return { received: true };
  }

  private async fulfillPurchase(session: Stripe.Checkout.Session) {
    const purchaseId = session.metadata.purchaseId;
    const trackId = session.metadata.trackId;
    const userId = session.metadata.userId;

    const licenseKey = this.generateLicenseKey();

    await this.purchaseModel.findByIdAndUpdate(purchaseId, {
      status: PurchaseStatus.COMPLETED,
      licenseKey
    });

    const track = await this.tracksService.findOne(trackId);
    if (track) {
      track.isSold = true;
      track.status = TrackStatus.SOLD;
      await track.save();
    }
  }

  private generateLicenseKey(): string {
    return `SHIROA-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`.toUpperCase();
  }

  async getUserPurchases(userId: string): Promise<Purchase[]> {
    return this.purchaseModel
      .find({ userId: userId, status: PurchaseStatus.COMPLETED })
      .populate("trackId")
      .exec();
  }

  async getPurchaseById(purchaseId: string): Promise<Purchase | null> {
    return this.purchaseModel.findById(purchaseId).populate("trackId").exec();
  }
}
