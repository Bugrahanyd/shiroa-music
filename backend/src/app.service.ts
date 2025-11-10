import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "SHIROA API - Music Production & Licensing Platform";
  }
}
