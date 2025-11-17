import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
type MulterFile = any;
type File = MulterFile;

@Injectable()
export class LocalStorageService {
  private uploadDir: string;

  constructor(private configService: ConfigService) {
    this.uploadDir = path.join(process.cwd(), "uploads");
    this.ensureUploadDir();
  }

  private ensureUploadDir() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: File, folder: string): Promise<string> {
    const folderPath = path.join(this.uploadDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(folderPath, filename);
    
    fs.writeFileSync(filepath, file.buffer);
    
    return `${folder}/${filename}`;
  }

  async deleteFile(key: string): Promise<void> {
    const filepath = path.join(this.uploadDir, key);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }

  getPublicUrl(key: string): string {
    const baseUrl = this.configService.get<string>("FRONTEND_URL") || "http://localhost:3001";
    return `${baseUrl}/uploads/${key}`;
  }
}
