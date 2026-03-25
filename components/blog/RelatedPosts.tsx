import { getAllPosts } from '@/lib/posts';
import BlogCard from './BlogCard';

export default function RelatedPosts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const posts = getAllPosts();
  const related = posts
    .filter(post => post!.slug !== currentSlug && post!.meta.category === category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <h3 className="text-2xl font-bold font-serif text-gray-900 mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map(post => (
          <div key={post!.slug} className="relative">
             <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
