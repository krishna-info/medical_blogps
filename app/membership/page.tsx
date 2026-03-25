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

      {/* Plans grid */}
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

      {/* Trust badges */}
      <div className="mt-10 text-center text-sm text-gray-400 space-y-1">
        <p>Payments powered by Stripe · PCI-DSS Level 1 compliant</p>
        <p>Visa · Mastercard · Amex · Apple Pay · Google Pay · 135+ currencies</p>
        <p>Cancel anytime from your account settings · No hidden fees</p>
      </div>
    </main>
  );
}
