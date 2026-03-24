import Link from 'next/link';

export default function InPostBanner() {
  return (
    <div className="my-10 bg-gray-50 border border-gray-200 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
      <div>
        <h4 className="font-bold text-gray-900 text-lg font-serif">Looking for specialized care?</h4>
        <p className="text-gray-600 text-sm mt-1">Schedule a virtual consultation with our clinic today.</p>
      </div>
      <Link href="#appointment" className="whitespace-nowrap px-6 py-3 bg-medical-teal text-white rounded-lg font-medium hover:bg-teal-700 transition shadow-sm">
        Book Now
      </Link>
    </div>
  );
}
