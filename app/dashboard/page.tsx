export const metadata = { title: 'Patient Dashboard | Medical Insights' };

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl min-h-[70vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b pb-6">
         <div>
            <h1 className="text-3xl font-bold font-serif text-gray-900">Welcome Back, Patient</h1>
            <p className="text-gray-600 mt-1">Manage your appointments, saved articles, and community profile.</p>
         </div>
         <button className="mt-4 md:mt-0 px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition">Log Out</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-medical-light/30 p-6 rounded-2xl border border-medical-blue/20">
            <h3 className="text-xl font-bold text-medical-blue mb-4">Upcoming Appointments</h3>
            <p className="text-sm text-gray-600 mb-6">You have no scheduled appointments.</p>
            <button className="w-full py-2 bg-medical-blue text-white font-medium rounded hover:bg-blue-700 transition shadow">Book Consultation</button>
         </div>
         
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Saved Articles</h3>
            <p className="text-sm text-gray-500">You haven&apos;t bookmarked any medical insights yet.</p>
         </div>
      </div>
    </main>
  );
}
