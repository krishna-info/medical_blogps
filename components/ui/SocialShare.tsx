'use client';

export default function SocialShare({ url, title }: { url: string, title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
      <span className="text-sm font-semibold text-gray-700">Share:</span>
      <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-medical-blue transition text-sm font-medium">
        Twitter
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-medical-blue transition text-sm font-medium">
        Facebook
      </a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-medical-blue transition text-sm font-medium">
        LinkedIn
      </a>
    </div>
  );
}
