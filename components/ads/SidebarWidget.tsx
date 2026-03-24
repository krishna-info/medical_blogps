import Link from 'next/link';
import NewsletterForm from '../features/NewsletterForm';

export default function SidebarWidget() {
  return (
    <aside className="space-y-8 sticky top-6">
      {/* Clinic Promo */}
      <div className="bg-gradient-to-br from-medical-blue to-medical-teal p-6 rounded-2xl text-white shadow-md">
        <h3 className="text-xl font-bold font-serif mb-2">Book a Consultation</h3>
        <p className="text-blue-100 text-sm mb-4">Get expert medical advice from our specialists. Available for in-person and online consultations.</p>
        <Link href="#appointment" className="block w-full text-center py-2 bg-white text-medical-blue rounded-lg font-bold hover:bg-gray-100 transition shadow-sm">
          Book Appointment &rarr;
        </Link>
      </div>
      
      {/* Form Promo */}
      <NewsletterForm />
    </aside>
  );
}
