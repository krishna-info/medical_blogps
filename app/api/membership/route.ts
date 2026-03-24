import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay instance securely
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'mock_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock_secret',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tier } = body;

    let amount = 0;
    if (tier === 'basic') amount = 9900;    // ₹99.00
    if (tier === 'premium') amount = 29900; // ₹299.00

    if (amount === 0) {
      return NextResponse.json({ error: 'Invalid subscription tier selected' }, { status: 400 });
    }

    const options = {
      amount,
      currency: 'INR',
      receipt: `receipt_${Math.floor(Math.random() * 1000)}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate Razorpay order' }, { status: 500 });
  }
}
