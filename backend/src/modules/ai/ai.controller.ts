import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AIService, GenerateSongDto } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('generate')
  async generateSong(@Body() dto: GenerateSongDto) {
    return this.aiService.generateSong(dto);
  }
}
