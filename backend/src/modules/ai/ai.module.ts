import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';
import { LyricsAnalyzerService } from './lyrics-analyzer.service';
import { MusicGeneratorService } from './music-generator.service';
import { VoiceGeneratorService } from './voice-generator.service';
import { AudioMixerService } from './audio-mixer.service';

@Module({
  imports: [HttpModule],
  controllers: [AIController],
  providers: [
    AIService,
    LyricsAnalyzerService,
    MusicGeneratorService,
    VoiceGeneratorService,
    AudioMixerService,
  ],
  exports: [AIService],
})
export class AIModule {}
