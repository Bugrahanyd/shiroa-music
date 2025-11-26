import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MusicGeneratorService {
  constructor(
    private config: ConfigService,
    private http: HttpService,
  ) {}

  async generate(prompt: string, options?: any): Promise<string> {
    const mode = this.config.get('AI_MUSIC_MODE', 'suno'); // suno | custom

    if (mode === 'suno') {
      return this.generateWithSuno(prompt, options);
    } else {
      return this.generateWithCustomModel(prompt, options);
    }
  }

  private async generateWithSuno(prompt: string, options?: any): Promise<string> {
    const apiKey = this.config.get('SUNO_API_KEY');
    
    const response = await firstValueFrom(
      this.http.post(
        'https://api.suno.ai/generate',
        {
          prompt,
          duration: options?.duration || 30,
          genre: options?.genre,
        },
        {
          headers: { Authorization: `Bearer ${apiKey}` },
        },
      ),
    );

    return response.data.audio_url;
  }

  private async generateWithCustomModel(prompt: string, options?: any): Promise<string> {
    const aiServiceUrl = this.config.get('AI_SERVICE_URL');
    
    const response = await firstValueFrom(
      this.http.post(`${aiServiceUrl}/music/generate`, {
        prompt,
        options,
      }),
    );

    return response.data.audio_url;
  }
}
