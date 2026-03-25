/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignJWT, jwtVerify } from 'jose';

export interface MemberSession {
  email: string;
  tier: 'free' | 'basic' | 'premium';
  expiresAt: number;
  stripeCustomerId: string;       // replaces razorpaySubscriptionId
  stripeSubscriptionId: string;   // tracks recurring subscription
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-for-development');

export async function signMemberJWT(payload: MemberSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(JWT_SECRET);
}

export async function verifyMemberJWT(token: string): Promise<MemberSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as MemberSession;
  } catch {
    return null;
  }
}

export function getTierFromStripePriceId(priceId: string): 'basic' | 'premium' | 'free' {
  if (priceId === process.env.STRIPE_PRICE_PREMIUM) return 'premium';
  if (priceId === process.env.STRIPE_PRICE_BASIC) return 'basic';
  return 'free';
}
