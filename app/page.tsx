import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-medical-light py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted Medical Insights
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Expert health information, research updates, and wellness tips.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/blog" className="px-6 py-3 bg-medical-blue text-white rounded-lg font-medium hover:bg-blue-800 transition">
              Read Latest Articles
            </Link>
            <Link href="#appointment" className="px-6 py-3 bg-white text-medical-blue border border-medical-blue rounded-lg font-medium hover:bg-gray-50 transition">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles Placeholder */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* We will map over actual posts later */}
            {[1, 2, 3].map((post) => (
              <div key={post} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                <div className="text-sm text-medical-teal font-medium mb-2">Category</div>
                <h3 className="text-xl font-bold mb-2">Article Title {post}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">This is a short excerpt of the medical article to give readers an idea of the content.</p>
                <Link href={`/blog/post-${post}`} className="text-medical-blue font-medium hover:underline">Read more &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Row */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Cardiology', 'Nutrition', 'Mental Health', 'Pediatrics'].map((cat) => (
              <span key={cat} className="px-4 py-2 bg-white border rounded-full text-gray-700 shadow-sm cursor-pointer hover:border-medical-teal hover:text-medical-teal transition">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
