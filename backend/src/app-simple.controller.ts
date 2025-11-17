import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppSimpleController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("health")
  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "SHIROA Backend (Simple Mode)"
    };
  }

  @Get("test")
  getTest() {
    return {
      message: "Backend is working!",
      auth: "Not connected (simple mode)",
      database: "Not connected (simple mode)"
    };
  }
}