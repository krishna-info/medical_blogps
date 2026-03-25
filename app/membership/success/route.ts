import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { signMemberJWT } from '@/lib/membership';

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.redirect(new URL('/membership', request.url));
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    });

    const email = session.metadata?.email || session.customer_email || '';
    const tier = (session.metadata?.tier || 'basic') as 'basic' | 'premium';
    const customerId = typeof session.customer === 'string' ? session.customer : '';
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscriptionId = typeof session.subscription === 'string' ? session.subscription : (session.subscription as any)?.id || '';

    // Automatically construct authorization token bypassing immediate database reads
    const token = await signMemberJWT({
      email,
      tier,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 Days
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
    });

    const response = NextResponse.redirect(new URL('/membership/welcome', request.url));

    // Plant token onto client origin
    response.cookies.set('member_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Stripe session retrieval error:', error);
    return NextResponse.redirect(new URL('/membership?error=true', request.url));
  }
}
