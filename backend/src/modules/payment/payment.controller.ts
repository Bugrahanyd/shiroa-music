import { Controller, Post, Get, Body, Param, UseGuards, Request, Headers, RawBodyRequest, Req } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreateCheckoutDto } from "./dto/create-checkout.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("create-checkout")
  @UseGuards(JwtAuthGuard)
  async createCheckout(@Request() req, @Body() createCheckoutDto: CreateCheckoutDto) {
    return this.paymentService.createCheckoutSession(req.user.userId, createCheckoutDto.trackId);
  }

  @Post("webhook")
  async handleWebhook(@Headers("stripe-signature") signature: string, @Req() req: RawBodyRequest<Request>) {
    return this.paymentService.handleWebhook(signature, req.rawBody);
  }

  @Get("purchases")
  @UseGuards(JwtAuthGuard)
  async getUserPurchases(@Request() req) {
    return this.paymentService.getUserPurchases(req.user.userId);
  }

  @Get("purchases/:id")
  @UseGuards(JwtAuthGuard)
  async getPurchase(@Param("id") id: string) {
    return this.paymentService.getPurchaseById(id);
  }
}
