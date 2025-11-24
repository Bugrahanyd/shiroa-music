import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: '2024-11-20.acacia' });
};

export async function POST(request: NextRequest) {
  try {
    const { trackId, trackTitle, trackArtist, price } = await request.json();

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { message: 'Stripe not configured' },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: trackTitle,
              description: `Exclusive license by ${trackArtist}`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&track_id=${trackId}`,
      cancel_url: `${baseUrl}/tracks/${trackId}`,
      metadata: {
        trackId,
        trackTitle,
        trackArtist,
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Stripe checkout failed:', error);
    return NextResponse.json(
      { message: 'Payment service unavailable' },
      { status: 500 }
    );
  }
}