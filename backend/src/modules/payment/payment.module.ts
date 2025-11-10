import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentController } from "./payment.controller";
import { DownloadController } from "./download.controller";
import { PaymentService } from "./payment.service";
import { Purchase, PurchaseSchema } from "./purchase.entity";
import { TracksModule } from "../tracks/tracks.module";
import { UploadModule } from "../upload/upload.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Purchase.name, schema: PurchaseSchema }]),
    TracksModule,
    UploadModule
  ],
  controllers: [PaymentController, DownloadController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
