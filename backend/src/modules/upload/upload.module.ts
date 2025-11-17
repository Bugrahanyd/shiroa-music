import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { LocalStorageService } from "./local-storage.service";
import { CloudflareR2Service } from "./cloudflare-r2.service";

@Module({
  controllers: [UploadController],
  providers: [UploadService, LocalStorageService, CloudflareR2Service],
  exports: [UploadService, LocalStorageService, CloudflareR2Service]
})
export class UploadModule {}
