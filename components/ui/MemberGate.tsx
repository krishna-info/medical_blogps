'use client';
interface MemberGateProps {
  preview: string;        // First 200 words of content
  requiredTier: 'basic' | 'premium';
}

export default function MemberGate({ preview, requiredTier }: MemberGateProps) {
  const price = requiredTier === 'premium' ? '$5/mo' : '$2/mo';

  return (
    <div className="relative">
      {/* Blurred preview */}
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
