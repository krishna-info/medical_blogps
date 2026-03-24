/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';

export default function BlogCard({ post }: { post: any }) {
  const getReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute) + ' min read';
  };

  const readTime = post.content ? getReadTime(post.content) : '5 min read';

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition bg-white flex flex-col h-full overflow-hidden">
      <div className="aspect-video relative bg-gray-200">
        {post.meta.featured_image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={post.meta.featured_image} alt={post.meta.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-medical-teal uppercase bg-teal-50 px-2 py-1 rounded-full border border-teal-100">
            {post.meta.category}
          </span>
          <span className="text-xs text-gray-500 font-medium">{readTime}</span>
        </div>
        <h3 className="text-xl font-bold font-serif text-gray-900 mb-2 line-clamp-2">
          {post.meta.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {post.meta.excerpt}
        </p>
        <div className="mt-auto pt-4 border-t flex items-center justify-between">
          <div className="text-xs text-gray-500 font-medium">{post.meta.author}</div>
          <time dateTime={post.meta.date} className="text-xs text-gray-400 font-medium">
            {post.meta.date ? new Date(post.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
          </time>
        </div>
      </div>
      <Link href={`/blog/${post.slug}`} className="absolute inset-0" aria-label={`Read ${post.meta.title}`}></Link>
    </div>
  );
}
