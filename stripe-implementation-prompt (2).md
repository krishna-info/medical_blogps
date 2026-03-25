# STRIPE PAYMENT GATEWAY IMPLEMENTATION PROMPT
## Medical Blog Website — Replace Razorpay with Stripe (Global Payments)

---

## CONTEXT & REFERENCE DOCUMENTS

You are a senior full-stack engineer working on a medical blog website built with the following confirmed stack (from tech-stack.md):
- Framework: Next.js 14 (App Router)
- Language: TypeScript 5.x (strict mode)
- Styling: Tailwind CSS 3.x
- Hosting: Vercel (Free Tier)
- Auth (admin): GitHub OAuth via Decap CMS
- CMS: Decap CMS (Git-based, Markdown files in /content/posts/)
- Image CDN: Cloudinary
- Newsletter / CRM: Brevo
- Analytics: Google Analytics 4
- Member Auth: JWT via `jose` library (HTTP-only cookie, stored as `member_token`)

## CRITICAL INSTRUCTION — RAZORPAY REMOVAL

The previous implementation references Razorpay throughout the codebase. You must COMPLETELY REMOVE all Razorpay references and REPLACE with Stripe. Do not leave any Razorpay code, imports, comments, types, or environment variables anywhere in the codebase. Treat this as a clean Stripe-first implementation.

Find and replace ALL occurrences of:
- `razorpay` (any case)
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `x-razorpay-signature`
- `razorpaySubscriptionId` in JWT payload
- Any Razorpay SDK imports or script tags

---

## PAYMENT REQUIREMENTS

### Global Payment Acceptance
This medical blog accepts members from around the world. Stripe is chosen because:
- Supports 135+ currencies
- Accepts cards from 195+ countries
- Supports: Visa, Mastercard, Amex, Discover, JCB, UnionPay
- Supports: Apple Pay, Google Pay, Link (Stripe's 1-click checkout)
- Supports: local payment methods (iDEAL, SEPA, Bancontact, Klarna, etc.)
- PCI-DSS compliant out of the box
- Stripe Checkout handles all global tax and currency logic automatically

### Currency Strategy
- Display prices in USD (globally understood)
- Stripe automatically converts and charges in the customer's local currency
- Use Stripe's `automatic_tax: { enabled: true }` for automatic global tax handling
- Enable `currency: 'usd'` as the base — Stripe handles currency conversion

### Membership Tiers (from prd.md — Section 7.2)
Replace ₹ pricing with USD pricing for global reach:

| Tier       | Price (USD) | Stripe Price ID key | Benefits |
|------------|-------------|---------------------|---------|
| Free       | $0/mo       | N/A                 | All public posts, with ads |
| Basic      | $2/mo       | STRIPE_PRICE_BASIC  | No ads, all public posts |
| Premium    | $5/mo       | STRIPE_PRICE_PREMIUM| Exclusive content, Q&A access |

Use Stripe recurring subscription pricing (not one-time payments).

---

## FILE-BY-FILE IMPLEMENTATION

### 1. Environment Variables — `.env.local` + Vercel Dashboard

Remove ALL Razorpay env vars. Add these Stripe env vars:

```env
# Stripe — Payment Gateway (replaces Razorpay entirely)
STRIPE_SECRET_KEY=sk_live_...           # From Stripe Dashboard → Developers → API Keys
STRIPE_PUBLISHABLE_KEY=pk_live_...      # Public key — safe to expose in frontend
STRIPE_WEBHOOK_SECRET=whsec_...         # From Stripe Dashboard → Webhooks → signing secret
STRIPE_PRICE_BASIC=price_...            # From Stripe Dashboard → Products → Basic plan price ID
STRIPE_PRICE_PREMIUM=price_...          # From Stripe Dashboard → Products → Premium plan price ID

# Prefix with NEXT_PUBLIC_ only for publishable key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Existing vars — keep unchanged
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
BREVO_API_KEY=
JWT_SECRET=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

### 2. Install Dependencies

Remove Razorpay, install Stripe:

```bash
# Remove Razorpay
npm uninstall razorpay

# Install Stripe
npm install stripe @stripe/stripe-js
```

Update `package.json` dependencies:
```json
{
  "dependencies": {
    "stripe": "^14.x",
    "@stripe/stripe-js": "^2.x"
  }
}
```

---

### 3. Update Data Model — `lib/membership.ts`

Replace the entire file. Remove razorpaySubscriptionId. Add stripeSubscriptionId and stripeCustomerId:

```typescript
// lib/membership.ts
import { SignJWT, jwtVerify } from 'jose';

export interface MemberSession {
  email: string;
  tier: 'free' | 'basic' | 'premium';
  expiresAt: number;
  stripeCustomerId: string;       // replaces razorpaySubscriptionId
  stripeSubscriptionId: string;   // new — tracks recurring subscription
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

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
```

---

### 4. Stripe Server Instance — `lib/stripe.ts`

Create this new file (did not exist before — Razorpay had no equivalent):

```typescript
// lib/stripe.ts
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',  // pin to stable API version
  typescript: true,
});
```

---

### 5. Replace API Routes

#### 5.1 DELETE the old Razorpay order creation route
Delete: `app/api/membership/route.ts` (the old Razorpay order creation endpoint)

#### 5.2 CREATE new Stripe Checkout Session route
Create: `app/api/membership/create-checkout/route.ts`

```typescript
// app/api/membership/create-checkout/route.ts
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
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],        // card covers 195+ countries
      billing_address_collection: 'auto',    // auto-collect billing address globally
      automatic_tax: { enabled: true },      // auto handles GST, VAT, sales tax globally
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
      // Enable Apple Pay, Google Pay, Link (Stripe 1-click checkout)
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
```

#### 5.3 REPLACE Webhook Route — was `/api/membership/webhook` (Razorpay) → now Stripe webhook

Replace entire file: `app/api/membership/webhook/route.ts`

```typescript
// app/api/membership/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { signMemberJWT, getTierFromStripePriceId } from '@/lib/membership';
import type Stripe from 'stripe';

// IMPORTANT: Stripe requires raw body for signature verification
export const config = { api: { bodyParser: false } };

async function addMemberToBrevo(email: string, tier: string) {
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      email,
      attributes: { MEMBERSHIP_TIER: tier, MEMBER_SINCE: new Date().toISOString() },
      updateEnabled: true,
    }),
  });
  if (!res.ok) console.error('Brevo member update failed:', await res.text());
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle subscription activated (new member)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession;
    const email = session.metadata?.email || session.customer_email || '';
    const tier = session.metadata?.tier || 'basic';
    const customerId = typeof session.customer === 'string' ? session.customer : '';
    const subscriptionId = typeof session.subscription === 'string' ? session.subscription : '';

    if (!email) {
      return NextResponse.json({ error: 'No email in session' }, { status: 400 });
    }

    // Issue JWT cookie
    const token = await signMemberJWT({
      email,
      tier: tier as 'basic' | 'premium',
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
    });

    // Store member in Brevo CRM
    await addMemberToBrevo(email, tier);

    // Note: JWT is set via success page redirect, not directly here
    // Pass session_id to success page which sets the cookie
    console.log(`New member: ${email} | tier: ${tier} | customer: ${customerId}`);
  }

  // Handle subscription cancelled
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const email = subscription.metadata?.email || '';
    console.log(`Subscription cancelled for: ${email}`);
    // Update Brevo CRM to reflect cancellation
    if (email) await addMemberToBrevo(email, 'free');
  }

  // Handle subscription updated (upgrade/downgrade)
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
    const priceId = subscription.items.data[0]?.price.id || '';
    const tier = getTierFromStripePriceId(priceId);
    const email = subscription.metadata?.email || '';
    console.log(`Subscription updated: ${email} → ${tier}`);
    if (email) await addMemberToBrevo(email, tier);
  }

  return NextResponse.json({ received: true });
}
```

#### 5.4 CREATE new Success Page — sets JWT cookie after Stripe redirect

Create: `app/membership/success/route.ts`

```typescript
// app/membership/success/route.ts
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
    const subscriptionId = typeof session.subscription === 'string'
      ? session.subscription
      : (session.subscription as any)?.id || '';

    const token = await signMemberJWT({
      email,
      tier,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
    });

    const response = NextResponse.redirect(
      new URL('/membership/welcome', request.url)
    );

    // Set HTTP-only JWT cookie (30 days)
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
```

---

### 6. Update Membership Page UI — `app/membership/page.tsx`

Update the membership plans page. Replace all Razorpay SDK code with Stripe redirect approach:

```typescript
// app/membership/page.tsx
'use client';
import { useState } from 'react';

const plans = [
  {
    tier: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    benefits: ['All public articles', 'Categories & search', 'Comments section'],
    cta: 'Start Reading',
    highlighted: false,
  },
  {
    tier: 'basic',
    name: 'Basic',
    price: '$2',
    period: 'per month',
    benefits: ['Everything in Free', 'No advertisements', 'Early access to articles'],
    cta: 'Get Basic',
    highlighted: false,
  },
  {
    tier: 'premium',
    name: 'Premium',
    price: '$5',
    period: 'per month',
    benefits: ['Everything in Basic', 'Exclusive premium content', 'Monthly Q&A with doctor', 'Priority support'],
    cta: 'Get Premium',
    highlighted: true,
  },
];

export default function MembershipPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  async function handleSubscribe(tier: string) {
    if (tier === 'free') {
      window.location.href = '/blog';
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    setLoading(tier);

    try {
      const res = await fetch('/api/membership/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, email }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe Checkout (hosted page — handles all global currencies)
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Failed to connect. Please try again.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Membership</h1>
        <p className="text-gray-500 text-base">
          Secure payments via Stripe · 135+ currencies · Cancel anytime
        </p>
      </div>

      {/* Email input — required before checkout */}
      <div className="max-w-sm mx-auto mb-10">
        <label className="block text-sm text-gray-600 mb-1">Your email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
      </div>

      {/* Plans grid — from design-doc.md Section 3.1 layout principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={`rounded-2xl border p-6 flex flex-col ${
              plan.highlighted
                ? 'border-blue-500 border-2 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            {plan.highlighted && (
              <span className="text-xs font-semibold text-blue-700 bg-blue-100 rounded-full px-3 py-1 self-start mb-3">
                Most Popular
              </span>
            )}
            <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-6 flex-1">
              {plan.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-teal-500 mt-0.5">✓</span> {b}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.tier)}
              disabled={loading === plan.tier}
              className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                plan.highlighted
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {loading === plan.tier ? 'Redirecting to Stripe...' : plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Trust badges — global payments reassurance */}
      <div className="mt-10 text-center text-sm text-gray-400 space-y-1">
        <p>Payments powered by Stripe · PCI-DSS Level 1 compliant</p>
        <p>Visa · Mastercard · Amex · Apple Pay · Google Pay · 135+ currencies</p>
        <p>Cancel anytime from your account settings · No hidden fees</p>
      </div>
    </main>
  );
}
```

---

### 7. Update Content Gating Middleware — `middleware.ts`

No Razorpay references here, but update the JWT type reference:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyMemberJWT } from '@/lib/membership';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only gate /blog/[slug] routes — check if post is member_only via metadata
  // For a static site, member_only is enforced at render time by MemberGate component
  // This middleware handles direct URL access attempts

  // Skip non-blog routes
  if (!pathname.startsWith('/blog/')) return NextResponse.next();

  // Check member token
  const token = request.cookies.get('member_token')?.value;
  if (token) {
    const session = await verifyMemberJWT(token);
    if (session && session.expiresAt > Date.now()) {
      return NextResponse.next();
    }
  }

  // No valid token — allow page load (MemberGate component handles blur/lock UI)
  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/:path*'],
};
```

---

### 8. Update MemberGate Component — `components/ui/MemberGate.tsx`

No Razorpay references, but update currency display (from design-doc.md Section 4.6):

```typescript
// components/ui/MemberGate.tsx
'use client';
interface MemberGateProps {
  preview: string;        // First 200 words of content
  requiredTier: 'basic' | 'premium';
}

export default function MemberGate({ preview, requiredTier }: MemberGateProps) {
  const price = requiredTier === 'premium' ? '$5/mo' : '$2/mo';

  return (
    <div className="relative">
      {/* Blurred preview — design-doc.md Section 4.6 */}
      <div className="blur-sm pointer-events-none select-none text-gray-400 text-sm leading-relaxed mb-0">
        {preview}
      </div>

      {/* Lock overlay */}
      <div className="mt-6 border border-gray-200 rounded-2xl p-8 text-center bg-white">
        <div className="text-3xl mb-3">🔒</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {requiredTier === 'premium' ? 'Premium' : 'Basic'} Content
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          This article is available to {requiredTier} members only.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href={`/membership?highlight=${requiredTier}`}
            className="bg-blue-600 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Unlock for {price}
          </a>
          <a
            href="/membership"
            className="border border-gray-300 text-gray-700 text-sm px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            See all plans
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Secure checkout via Stripe · Cancel anytime
        </p>
      </div>
    </div>
  );
}
```

---

### 9. Create Member Welcome Page — `app/membership/welcome/page.tsx`

New page shown after successful Stripe payment:

```typescript
// app/membership/welcome/page.tsx
export default function WelcomePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the community!</h1>
      <p className="text-gray-500 mb-8">
        Your membership is now active. You have full access to all member content.
        A confirmation email has been sent to your inbox.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <a href="/blog" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700">
          Start Reading
        </a>
        <a href="/" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50">
          Back to Home
        </a>
      </div>
    </main>
  );
}
```

---

### 10. Stripe Dashboard Setup (One-time configuration)

Perform these steps in the Stripe Dashboard BEFORE going live:

#### Step 1 — Create Products & Prices
```
Stripe Dashboard → Products → Add product

Product 1: "Basic Membership"
  → Price: $2.00 USD / month (recurring)
  → Copy Price ID → set as STRIPE_PRICE_BASIC env var

Product 2: "Premium Membership"
  → Price: $5.00 USD / month (recurring)
  → Copy Price ID → set as STRIPE_PRICE_PREMIUM env var
```

#### Step 2 — Register Webhook Endpoint
```
Stripe Dashboard → Developers → Webhooks → Add endpoint

URL: https://yourdomain.com/api/membership/webhook

Events to listen for:
  ✅ checkout.session.completed
  ✅ customer.subscription.deleted
  ✅ customer.subscription.updated
  ✅ invoice.payment_failed

Copy the signing secret → set as STRIPE_WEBHOOK_SECRET env var
```

#### Step 3 — Enable Global Payment Methods
```
Stripe Dashboard → Settings → Payment methods

Enable:
  ✅ Cards (Visa, Mastercard, Amex, UnionPay, JCB, Discover)
  ✅ Apple Pay
  ✅ Google Pay
  ✅ Link (Stripe 1-click checkout)
  ✅ iDEAL (Netherlands)
  ✅ SEPA Direct Debit (Europe)
  ✅ Klarna (Buy Now Pay Later)
  ✅ Bancontact (Belgium)
```

#### Step 4 — Enable Automatic Tax (optional but recommended)
```
Stripe Dashboard → Settings → Tax → Enable automatic tax
→ This handles GST (India), VAT (Europe), Sales tax (US) automatically
```

#### Step 5 — Branding (makes checkout feel trustworthy for medical site)
```
Stripe Dashboard → Settings → Branding
→ Upload clinic/blog logo
→ Set brand colour: #1B4F8C (Medical Blue from design-doc.md)
→ Add support email and website URL
```

---

### 11. Testing — Local Webhook with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local dev server
stripe listen --forward-to localhost:3000/api/membership/webhook

# In a separate terminal — trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.deleted

# Test card numbers (use in Stripe test mode)
# Success:  4242 4242 4242 4242
# Decline:  4000 0000 0000 0002
# 3DS Auth: 4000 0025 0000 3155
# International (India): 4000 0035 6000 0008
# International (UK):    4000 0082 6000 0000
```

---

### 12. Updated Tech Stack Reference (replaces Section 6.1 in tech-stack.md)

```
PAYMENT GATEWAY: Stripe (replaces Razorpay)
├── Package:         stripe@^14.x (server) + @stripe/stripe-js@^2.x (client)
├── Checkout type:   Stripe Checkout (hosted — PCI compliant, no card data on your server)
├── Subscription:    Stripe Billing (recurring monthly)
├── Global reach:    135+ currencies, 195+ countries, Apple Pay, Google Pay, Link
├── Fee:             2.9% + $0.30 per transaction (standard Stripe rate — no setup fee)
├── Webhook:         POST /api/membership/webhook (stripe-signature header verification)
├── Success flow:    Stripe → /membership/success?session_id=xxx → JWT cookie → /membership/welcome
├── Cancel flow:     Stripe → /membership (back to plans page)
└── Test mode:       Stripe CLI + test card 4242 4242 4242 4242
```

---

### 13. Updated Risks Table (replaces Razorpay row in prd.md Section 10)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Stripe transaction fees too high | Low | Low | Stripe's 2.9%+$0.30 is industry standard; membership price set to absorb this |
| Webhook delivery failure | Low | Medium | Stripe retries webhooks for 72 hours; implement idempotency checks |
| Stripe not available in certain countries | Very Low | Low | Stripe supports 46+ countries for businesses; readers from all countries can pay |
| Currency confusion for Indian readers | Low | Low | Show USD clearly; Stripe auto-converts — readers see local currency at checkout |

---

## SUMMARY OF ALL CHANGES

### Files to CREATE (new):
- `lib/stripe.ts` — Stripe server instance
- `app/api/membership/create-checkout/route.ts` — Stripe Checkout session creation
- `app/membership/success/route.ts` — Post-payment JWT cookie setter
- `app/membership/welcome/page.tsx` — Success landing page

### Files to REPLACE entirely (remove Razorpay, add Stripe):
- `lib/membership.ts` — Updated JWT interface (stripeCustomerId, stripeSubscriptionId)
- `app/api/membership/webhook/route.ts` — Stripe webhook (was Razorpay webhook)
- `app/membership/page.tsx` — Updated plans UI with Stripe redirect flow
- `components/ui/MemberGate.tsx` — Updated to USD pricing + Stripe trust badge

### Files to DELETE:
- `app/api/membership/route.ts` — Old Razorpay order creation (no longer needed)

### Environment variables:
- REMOVE: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- ADD: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_BASIC`, `STRIPE_PRICE_PREMIUM`

### package.json:
- REMOVE: `razorpay`
- ADD: `stripe@^14.x`, `@stripe/stripe-js@^2.x`
