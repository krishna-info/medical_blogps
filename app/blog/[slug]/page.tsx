import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import BlogPost from '@/components/blog/BlogPost';
import GiscusComments from '@/components/features/GiscusComments';
import SidebarWidget from '@/components/ads/SidebarWidget';
import InPostBanner from '@/components/ads/InPostBanner';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const { meta, content } = post;

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <article className="lg:col-span-8">
          <div className="mb-8">
            <span className="text-sm font-semibold text-medical-teal uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full">
              {meta.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mt-4 mb-4 leading-tight">
              {meta.title}
            </h1>
            <div className="flex items-center text-gray-600 text-sm mt-6 border-b pb-6">
              <div className="font-medium text-gray-900">By {meta.author}</div>
              <span className="mx-3 text-gray-300">|</span>
              <time dateTime={meta.date ? new Date(meta.date).toISOString() : new Date().toISOString()}>
                {meta.date ? new Date(meta.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Unknown Date'}
              </time>
            </div>
          </div>

          {meta.featured_image && (
            <div className="mb-10 rounded-2xl overflow-hidden aspect-video relative bg-gray-100 shadow-sm border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={meta.featured_image} alt={meta.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Medical Disclaimer Banner */}
          <div className="bg-[#FFF3CD] border-l-4 border-[#D97706] p-5 mb-10 rounded-r text-gray-800 text-sm shadow-sm space-y-1">
            <p className="font-bold flex items-center gap-2">
              <span className="text-xl">⚠</span> Medical Disclaimer
            </p>
            <p>This content is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified physician.</p>
          </div>

          <div className="bg-white p-2">
            <BlogPost source={content} />
          </div>

          {/* In-Post Promo Banner */}
          <InPostBanner />

          {/* Comments Section */}
          <GiscusComments />
        </article>
        
        <div className="lg:col-span-4">
          <SidebarWidget />
        </div>
      </div>
    </main>
  );
}
