import { Injectable } from '@nestjs/common';
import { LyricsAnalyzerService } from './lyrics-analyzer.service';
import { MusicGeneratorService } from './music-generator.service';
import { VoiceGeneratorService } from './voice-generator.service';
import { AudioMixerService } from './audio-mixer.service';

export interface GenerateSongDto {
  mode: 'lyrics' | 'prompt';
  lyrics?: string;
  prompt?: string;
  language?: 'tr' | 'en' | 'auto';
  options?: {
    genre?: string;
    mood?: string;
    tempo?: string;
    voiceGender?: 'male' | 'female' | 'neutral';
  };
}

@Injectable()
export class AIService {
  constructor(
    private lyricsAnalyzer: LyricsAnalyzerService,
    private musicGenerator: MusicGeneratorService,
    private voiceGenerator: VoiceGeneratorService,
    private audioMixer: AudioMixerService,
  ) {}

  async generateSong(dto: GenerateSongDto) {
    if (dto.mode === 'lyrics') {
      return this.generateFromLyrics(dto.lyrics, dto.language, dto.options);
    } else {
      return this.generateFromPrompt(dto.prompt, dto.options);
    }
  }

  private async generateFromLyrics(
    lyrics: string,
    language: string = 'auto',
    options?: any,
  ) {
    // 1. Lyrics analizi
    const analysis = await this.lyricsAnalyzer.analyze(lyrics, language);

    // 2. Müzik üret
    const musicPrompt = this.lyricsAnalyzer.generateMusicPrompt(analysis);
    const musicUrl = await this.musicGenerator.generate(musicPrompt);

    // 3. Vokal üret
    const voiceSettings = this.lyricsAnalyzer.suggestVoiceSettings(
      analysis.persona,
    );
    const vocalsUrl = await this.voiceGenerator.generate(
      lyrics,
      analysis.persona,
      voiceSettings,
    );

    // 4. Mix
    const finalUrl = await this.audioMixer.mix(musicUrl, vocalsUrl);

    return {
      audioUrl: finalUrl,
      analysis,
      metadata: {
        genre: analysis.genre,
        mood: analysis.mood,
        language: analysis.language,
      },
    };
  }

  private async generateFromPrompt(prompt: string, options?: any) {
    // Prompt mode: AI hem sözü hem müziği üretir
    const musicUrl = await this.musicGenerator.generate(prompt, options);

    return {
      audioUrl: musicUrl,
      metadata: {
        genre: options?.genre,
        mood: options?.mood,
      },
    };
  }
}
