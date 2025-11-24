import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { trackId, trackTitle, trackArtist, price } = await request.json();

    // Demo mode - simulate successful purchase
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/success?session_id=demo_${trackId}&track_id=${trackId}`;

    return NextResponse.json({
      url: successUrl
    });

  } catch (error) {
    console.error('Checkout creation failed:', error);
    return NextResponse.json(
      { message: 'Payment service unavailable' },
      { status: 500 }
    );
  }
}