import { NextRequest, NextResponse } from 'next/server';

const DEMO_TRACKS = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const randomTrack = DEMO_TRACKS[Math.floor(Math.random() * DEMO_TRACKS.length)];
    
    return NextResponse.json({
      audioUrl: randomTrack,
      analysis: {
        genre: body.options?.genre || 'pop',
        mood: body.options?.mood || 'energetic',
        language: body.language || 'tr',
        persona: {
          vocal_style: 'smooth',
          tone: 'energetic',
          gender: 'female'
        }
      },
      metadata: {
        genre: body.options?.genre || 'pop',
        mood: body.options?.mood || 'energetic',
        language: body.language || 'tr'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Generation failed' },
      { status: 500 }
    );
  }
}
