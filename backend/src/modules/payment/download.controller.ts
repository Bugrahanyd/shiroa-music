import { Controller, Get, Param, UseGuards, Request, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { UploadService } from "../upload/upload.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PurchaseStatus } from "./purchase.entity";

@Controller("download")
@UseGuards(JwtAuthGuard)
export class DownloadController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly uploadService: UploadService
  ) {}

  @Get("purchase/:purchaseId")
  async downloadPurchase(@Param("purchaseId") purchaseId: string, @Request() req) {
    const purchase = await this.paymentService.getPurchaseById(purchaseId);

    if (!purchase) {
      throw new NotFoundException("Purchase not found");
    }

    if (purchase.userId.toString() !== req.user.userId) {
      throw new ForbiddenException("You do not own this purchase");
    }

    if (purchase.status !== PurchaseStatus.COMPLETED) {
      throw new ForbiddenException("Purchase not completed");
    }

    const track = purchase.trackId as any;
    const downloadUrl = await this.uploadService.getSignedUrl(track.audioUrl, 3600);

    return {
      purchaseId: purchase._id,
      trackTitle: track.title,
      artist: track.artist,
      licenseKey: purchase.licenseKey,
      downloadUrl,
      expiresIn: 3600
    };
  }
}
