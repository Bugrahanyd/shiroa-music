import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class LyricsAnalyzerService {
  private openai: OpenAI;

  constructor(private config: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.config.get('OPENAI_API_KEY'),
    });
  }

  async analyze(lyrics: string, language: string = 'auto') {
    const prompt = `
Analyze these song lyrics and provide detailed information:

LYRICS:
${lyrics}

Provide a JSON response with:
1. genre (main genre: pop, rock, rap, arabesk, türkü, electronic, etc.)
2. subgenre (specific subgenre)
3. mood (happy, sad, energetic, melancholic, romantic, angry, etc.)
4. tempo (slow, medium, fast, upbeat)
5. themes (array of themes: love, heartbreak, freedom, nostalgia, etc.)
6. language (detected language: tr, en, etc.)
7. persona (vocal characteristics):
   - vocal_style: smooth, raspy, powerful, soft, emotional
   - tone: energetic, calm, passionate, aggressive
   - gender: male, female, neutral
   - age_range: young, mature, elderly
   - accent: neutral, regional
8. music_description (detailed description for music generation)

IMPORTANT FOR TURKISH LYRICS:
- Detect Turkish genres: arabesk, türkü, pop, rap, rock
- Consider Turkish cultural context

Return ONLY valid JSON.
`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are a music expert specializing in Turkish and international music.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    return JSON.parse(response.choices[0].message.content);
  }

  generateMusicPrompt(analysis: any): string {
    const { genre, subgenre, mood, tempo } = analysis;
    let prompt = `${tempo} ${mood} ${genre}`;
    if (subgenre) prompt += ` with ${subgenre} elements`;
    if (analysis.language === 'tr' && genre === 'arabesk') {
      prompt += ', traditional Turkish arabesk style';
    }
    return prompt;
  }

  suggestVoiceSettings(persona: any) {
    return {
      stability: persona.tone === 'calm' ? 0.8 : 0.5,
      similarity_boost: 0.75,
      style: persona.vocal_style === 'emotional' ? 0.8 : 0.5,
    };
  }
}
