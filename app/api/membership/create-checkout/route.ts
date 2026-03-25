import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { tier, email } = await request.json();

    if (!tier || !email) {
      return NextResponse.json({ error: 'tier and email are required' }, { status: 400 });
    }

    const priceId =
      tier === 'premium'
        ? process.env.STRIPE_PRICE_PREMIUM
        : process.env.STRIPE_PRICE_BASIC;

    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier configuration detected' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      automatic_tax: { enabled: true },
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        tier,
        email,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/membership`,
      subscription_data: {
        metadata: { tier, email },
      },
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
