import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TracksModule } from "./modules/tracks/tracks.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { UploadModule } from "./modules/upload/upload.module";
import { PaymentModule } from "./modules/payment/payment.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI")
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    TracksModule,
    UploadModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
