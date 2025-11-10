import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export enum PurchaseStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded"
}

@Schema({ timestamps: true })
export class Purchase extends Document {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Track", required: true })
  trackId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: "usd" })
  currency: string;

  @Prop({ required: true })
  stripePaymentIntentId: string;

  @Prop({ type: String, enum: PurchaseStatus, default: PurchaseStatus.PENDING })
  status: PurchaseStatus;

  @Prop()
  downloadUrl?: string;

  @Prop()
  licenseKey?: string;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
