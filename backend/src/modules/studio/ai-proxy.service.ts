import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AIProxyService {
  private readonly aiServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.aiServiceUrl = this.configService.get('AI_SERVICE_URL') || 'http://localhost:8000';
  }

  async generateMusic(params: {
    genre: string;
    mood: string;
    duration: number;
    tempo?: number;
  }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.aiServiceUrl}/composer/generate`, params, { timeout: 10000 })
      );
      return response.data;
    } catch (error) {
      // Fallback response
      return {
        status: 'fallback',
        audio_url: `https://example.com/fallback/${params.genre}_${params.mood}.wav`,
        duration: params.duration,
        metadata: { ...params, fallback: true }
      };
    }
  }

  async addVocals(params: {
    audio_url: string;
    voice_type: string;
    lyrics?: string;
  }) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.aiServiceUrl}/vocalizer/process`, params)
    );
    return response.data;
  }

  async enhanceAudio(params: {
    audio_url: string;
    style: string;
  }) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.aiServiceUrl}/mixer/enhance`, params)
    );
    return response.data;
  }

  async checkAIHealth() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.aiServiceUrl}/health`, { timeout: 3000 })
      );
      return response.data;
    } catch (error) {
      return { 
        status: 'offline', 
        message: 'AI services unavailable - running in fallback mode',
        fallback: true 
      };
    }
  }
}