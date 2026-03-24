/* eslint-disable @typescript-eslint/no-explicit-any */
import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4 font-serif text-gray-900" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4 font-serif text-gray-900" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3 font-serif text-gray-900" {...props} />,
  p: (props: any) => <p className="mb-5 text-gray-800 leading-relaxed font-serif text-lg" {...props} />,
  a: (props: any) => <a className="text-medical-blue hover:underline font-medium" {...props} />,
  img: (props: any) => (
    <span className="block my-8">
      {/* Fallback to regular img if it's an external URL that next/image isn't configured for */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={props.src} alt={props.alt || ''} className="rounded-xl w-full object-cover max-h-[500px]" />
    </span>
  ),
  ul: (props: any) => <ul className="list-disc pl-6 mb-5 text-gray-800 font-serif text-lg" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-5 text-gray-800 font-serif text-lg" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-medical-teal pl-4 italic text-gray-600 mb-5 bg-gray-50 py-2 rounded-r" {...props} />,
  code: (props: any) => <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded font-mono text-sm" {...props} />,
};

export default function BlogPost({ source }: { source: string }) {
  return (
    <article className="max-w-none">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
