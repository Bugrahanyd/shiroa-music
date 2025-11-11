import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./modules/users/user.entity.postgres";
import * as bcrypt from "bcrypt";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("health")
  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "SHIROA Backend"
    };
  }

  @Get("create-admin-user")
  async createAdmin() {
    const hashedPassword = await bcrypt.hash("Admin123!", 10);
    const admin = await this.userRepo.save({
      email: "admin@shiroa.com",
      password: hashedPassword,
      name: "Admin",
      role: "admin" as any,
      creditBalance: 0
    });
    return { message: "Admin created", email: admin.email };
  }
}
