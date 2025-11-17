import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudioService } from './studio.service';
import { AIProxyService } from './ai-proxy.service';

@Controller('studio')
@UseGuards(JwtAuthGuard)
export class StudioController {
  constructor(
    private readonly studioService: StudioService,
    private readonly aiProxyService: AIProxyService,
  ) {}

  @Get('health')
  async checkHealth() {
    return this.aiProxyService.checkAIHealth();
  }

  @Post('compose')
  async composeMusic(@Body() params: {
    genre: string;
    mood: string;
    duration: number;
    tempo?: number;
  }) {
    return this.studioService.composeMusic(params);
  }

  @Post('vocalize')
  async addVocals(@Body() params: {
    trackId: string;
    voiceType: string;
    lyrics?: string;
  }) {
    return this.studioService.addVocals(params);
  }

  @Post('mix')
  async mixTrack(@Body() params: {
    trackId: string;
    style: string;
  }) {
    return this.studioService.mixTrack(params);
  }
}