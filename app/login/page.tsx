import Link from 'next/link';

export const metadata = { title: 'Patient Login | Medical Insights' };

export default function LoginPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold font-serif text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-medical-blue focus:border-medical-blue focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-medical-blue focus:border-medical-blue focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-medical-blue focus:ring-medical-blue border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-medical-blue hover:text-medical-teal"> Forgot your password? </a>
            </div>
          </div>

          <div>
            <Link href="/dashboard" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-medical-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-blue transition">
              Sign in
            </Link>
          </div>
          
          <div className="text-center text-sm">
            Not registered yet? <Link href="/register" className="font-bold text-medical-teal hover:underline relative z-10">Create an account</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
