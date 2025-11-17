import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TracksModule } from "./modules/tracks/tracks.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { UploadModule } from "./modules/upload/upload.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { CommonModule } from "./common/common.module";
import { User } from "./modules/users/user.entity.postgres";
import { RefreshToken } from "./modules/auth/entities/refresh-token.entity";
import { Transaction } from "./modules/payment/entities/transaction.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get("DATABASE_URL"),
        entities: [User, RefreshToken, Transaction],
        synchronize: true,
        ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI")
      }),
      inject: [ConfigService]
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100
    }]),
    TypeOrmModule.forFeature([User, RefreshToken, Transaction]),
    AuthModule,
    UsersModule,
    TracksModule,
    UploadModule,
    PaymentModule,
    AnalyticsModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
