import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { StudioController } from './studio.controller';
import { StudioService } from './studio.service';
import { AIProxyService } from './ai-proxy.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [StudioController],
  providers: [StudioService, AIProxyService],
  exports: [StudioService, AIProxyService],
})
export class StudioModule {}