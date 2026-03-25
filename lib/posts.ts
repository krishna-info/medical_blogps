/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
}

export function getPostBySlug(slug: string) {
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {}
  
  const realSlug = decodedSlug.replace(/\.md$/, '');
  const files = getPostSlugs();
  // Allow fallback matching if URL encoded apostrophes mismatch the filesystem
  const fullFileName = files.find(f => 
    f.includes(realSlug) || 
    f.replace(/[’']/g, '').includes(realSlug.replace(/[’']/g, ''))
  );
  if (!fullFileName) return null;

  const fullPath = path.join(postsDirectory, fullFileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)
    .sort((post1, post2) => ((post1!.meta as any).date > (post2!.meta as any).date ? -1 : 1));
  return posts;
}
