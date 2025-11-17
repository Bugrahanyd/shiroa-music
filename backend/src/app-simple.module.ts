import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppSimpleController } from "./app-simple.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppSimpleController],
  providers: [AppService]
})
export class AppSimpleModule {}