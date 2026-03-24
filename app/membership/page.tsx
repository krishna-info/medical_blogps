import Link from 'next/link';

export default function MembershipPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <h1 className="text-4xl font-bold font-serif text-medical-blue mb-4">Unlock Premium Metadata</h1>
      <p className="text-gray-600 mb-12">Choose a membership tier to access exclusive medical research and expert consulting frameworks.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Basic Tier</h2>
          <p className="text-3xl font-serif text-gray-900 mb-6">₹99 <span className="text-sm text-gray-500 font-sans">/ month</span></p>
          <ul className="text-left space-y-3 mb-8">
            <li>✓ Ad-free experience</li>
            <li>✓ Early access to public posts</li>
          </ul>
          <button className="w-full py-3 bg-medical-blue text-white font-bold rounded-lg hover:bg-blue-800 transition">Subscribe Now</button>
        </div>

        <div className="border-2 border-medical-teal rounded-2xl p-8 shadow-md relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-medical-teal text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Most Popular</div>
          <h2 className="text-2xl font-bold mb-2">Premium Tier</h2>
          <p className="text-3xl font-serif text-gray-900 mb-6">₹299 <span className="text-sm text-gray-500 font-sans">/ month</span></p>
          <ul className="text-left space-y-3 mb-8">
            <li>✓ Ad-free experience</li>
            <li>✓ Unlimited Premium Case Studies</li>
            <li>✓ Q&A Access with Specialists</li>
          </ul>
          <button className="w-full py-3 bg-medical-teal text-white font-bold rounded-lg hover:bg-teal-700 transition">Subscribe Now</button>
        </div>
      </div>
    </main>
  );
}
