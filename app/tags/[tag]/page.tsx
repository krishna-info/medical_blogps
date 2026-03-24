import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/components/blog/BlogCard';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => {
    if (post!.meta.tags) {
      post!.meta.tags.forEach((tag: string) => tags.add(tag.toLowerCase()));
    }
  });
  return Array.from(tags).map(tag => ({
    tag,
  }));
}

export default function TagListing({ params }: { params: { tag: string } }) {
  const posts = getAllPosts();
  const filteredPosts = posts.filter(post => 
    post!.meta.tags && post!.meta.tags.map((t: string) => t.toLowerCase()).includes(params.tag.toLowerCase())
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold font-serif text-gray-900 mb-2">Tag: #{params.tag}</h1>
      <p className="text-gray-600 mb-8 border-b pb-4">Browse all articles tagged with {params.tag}.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <div key={post!.slug} className="relative">
             <BlogCard post={post} />
          </div>
        ))}
      </div>
    </main>
  );
}
