import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { LocalStorageService } from "./local-storage.service";

@Module({
  controllers: [UploadController],
  providers: [UploadService, LocalStorageService],
  exports: [UploadService, LocalStorageService]
})
export class UploadModule {}
