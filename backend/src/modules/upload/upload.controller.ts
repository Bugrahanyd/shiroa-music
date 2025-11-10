import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../users/user.entity";
import { File } from "multer";

@Controller("upload")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("audio")
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor("file"))
  async uploadAudio(@UploadedFile() file: File) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException("Only audio files are allowed");
    }

    const key = await this.uploadService.uploadFile(file, "audio");
    const url = this.uploadService.getPublicUrl(key);

    return {
      key,
      url,
      size: file.size,
      mimetype: file.mimetype
    };
  }

  @Post("cover")
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor("file"))
  async uploadCover(@UploadedFile() file: File) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException("Only image files are allowed");
    }

    const key = await this.uploadService.uploadFile(file, "covers");
    const url = this.uploadService.getPublicUrl(key);

    return {
      key,
      url,
      size: file.size,
      mimetype: file.mimetype
    };
  }
}
