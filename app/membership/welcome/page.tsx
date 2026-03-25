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
