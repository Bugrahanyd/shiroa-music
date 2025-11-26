import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VoiceGeneratorService {
  private voiceMap = {
    'male-young-energetic': 'pNInz6obpgDQGcFmaJgB',
    'male-mature-calm': 'VR6AewLTigWG4xSOukaG',
    'female-young-energetic': '21m00Tcm4TlvDq8ikWAM',
    'female-mature-calm': 'EXAVITQu4vr4xnSDxMaL',
    'female-young-emotional': 'ThT5KcBeYPX3keUQqHPh',
  };

  constructor(
    private config: ConfigService,
    private http: HttpService,
  ) {}

  async generate(text: string, persona: any, settings: any): Promise<string> {
    const mode = this.config.get('AI_VOICE_MODE', 'elevenlabs'); // elevenlabs | xtts

    if (mode === 'elevenlabs') {
      return this.generateWithElevenLabs(text, persona, settings);
    } else {
      return this.generateWithXTTS(text, persona);
    }
  }

  private async generateWithElevenLabs(
    text: string,
    persona: any,
    settings: any,
  ): Promise<string> {
    const apiKey = this.config.get('ELEVENLABS_API_KEY');
    const voiceId = this.selectVoice(persona);

    const response = await firstValueFrom(
      this.http.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: settings,
        },
        {
          headers: { 'xi-api-key': apiKey },
          responseType: 'arraybuffer',
        },
      ),
    );

    // Save to S3/R2 and return URL
    // TODO: Implement file upload
    return 'https://storage.shiroa.com/vocals/temp.mp3';
  }

  private async generateWithXTTS(text: string, persona: any): Promise<string> {
    const aiServiceUrl = this.config.get('AI_SERVICE_URL');

    const response = await firstValueFrom(
      this.http.post(`${aiServiceUrl}/voice/generate`, {
        text,
        persona,
      }),
    );

    return response.data.audio_url;
  }

  private selectVoice(persona: any): string {
    const key = `${persona.gender}-${persona.age_range}-${persona.tone}`;
    return this.voiceMap[key] || '21m00Tcm4TlvDq8ikWAM';
  }
}
