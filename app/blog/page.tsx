import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/components/blog/BlogCard';
import SearchBar from '@/components/features/SearchBar';

export const metadata = {
  title: 'Blog | Medical Insights',
  description: 'Latest medical articles and health tips.',
};

export default function BlogListing() {
  const posts = getAllPosts();

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold font-serif text-gray-900 mb-6">All Articles</h1>
      <SearchBar />
      <div className="border-b pb-8 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post!.slug} className="relative">
             <BlogCard post={post} />
          </div>
        ))}
      </div>
    </main>
  );
}
