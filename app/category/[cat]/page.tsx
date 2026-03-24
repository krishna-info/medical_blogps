import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/components/blog/BlogCard';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post!.meta.category?.toLowerCase()));
  return Array.from(categories).map(cat => ({
    cat,
  }));
}

export default function CategoryListing({ params }: { params: { cat: string } }) {
  const posts = getAllPosts();
  const filteredPosts = posts.filter(post => post!.meta.category?.toLowerCase() === params.cat);

  if (filteredPosts.length === 0) {
    notFound();
  }

  const categoryName = filteredPosts[0]!.meta.category;

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold font-serif text-gray-900 mb-2">Category: {categoryName}</h1>
      <p className="text-gray-600 mb-8 border-b pb-4">Browse all articles related to {categoryName}.</p>
      
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
