import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getTierFromStripePriceId } from '@/lib/membership';
import type Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || 'fallback');
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle subscription activated
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession;
    const email = session.metadata?.email || session.customer_email || '';
    const tier = session.metadata?.tier || 'basic';
    const customerId = typeof session.customer === 'string' ? session.customer : '';

    if (!email) {
      return NextResponse.json({ error: 'No email in session' }, { status: 400 });
    }

    console.log(`New Stripe member registered: ${email} | tier: ${tier} | customer: ${customerId}`);
  }

  // Handle subscription cancelled
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const email = subscription.metadata?.email || '';
    console.log(`Stripe subscription cancelled for: ${email}`);
  }

  // Handle subscription updated (upgrade/downgrade)
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
    const priceId = subscription.items.data[0]?.price.id || '';
    const tier = getTierFromStripePriceId(priceId);
    const email = subscription.metadata?.email || '';
    console.log(`Stripe subscription updated: ${email} → ${tier}`);
  }

  return NextResponse.json({ received: true });
}
