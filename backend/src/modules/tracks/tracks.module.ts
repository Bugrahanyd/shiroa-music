import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TracksController } from "./tracks.controller";
import { TracksService } from "./tracks.service";
import { Track, TrackSchema } from "./track.entity";
import { Download, DownloadSchema } from "./schemas/download.schema";
import { View, ViewSchema } from "./schemas/view.schema";
import { Purchase, PurchaseSchema } from "../payment/purchase.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Download.name, schema: DownloadSchema },
      { name: View.name, schema: ViewSchema },
      { name: Purchase.name, schema: PurchaseSchema }
    ])
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService]
})
export class TracksModule {}
