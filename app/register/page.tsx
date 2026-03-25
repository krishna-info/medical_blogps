import Link from 'next/link';

export const metadata = { title: 'Patient Registration | Medical Insights' };

export default function RegisterPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold font-serif text-gray-900">Create Patient Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Join our community for exclusive medical insights.</p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <input id="first-name" name="first-name" type="text" required className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-medical-blue focus:border-medical-blue sm:text-sm" placeholder="First Name" />
               </div>
               <div>
                  <input id="last-name" name="last-name" type="text" required className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-medical-blue focus:border-medical-blue sm:text-sm" placeholder="Last Name" />
               </div>
            </div>
            <div>
              <input id="email-address" name="email" type="email" required className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-medical-blue focus:border-medical-blue sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <input id="password" name="password" type="password" required className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-medical-blue focus:border-medical-blue sm:text-sm" placeholder="Create Password" />
            </div>
          </div>

          <div>
            <Link href="/dashboard" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-medical-teal hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-teal transition">
              Register Account
            </Link>
          </div>
          
          <div className="text-center text-sm">
            Already have an account? <Link href="/login" className="font-bold text-medical-blue hover:underline relative z-10">Sign in</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
