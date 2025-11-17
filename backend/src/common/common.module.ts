import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { LoggerService } from './logger.service';
import { RedisCacheModule } from './cache/cache.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    RedisCacheModule,
  ],
  controllers: [HealthController],
  providers: [LoggerService],
  exports: [LoggerService, RedisCacheModule],
})
export class CommonModule {
  static forRoot() {
    return {
      module: CommonModule,
      global: true,
    };
  }
}