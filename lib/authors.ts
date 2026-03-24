import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const authorsDirectory = path.join(process.cwd(), 'content/authors');

export function getAuthorSlugs() {
  if (!fs.existsSync(authorsDirectory)) return [];
  return fs.readdirSync(authorsDirectory).filter(f => f.endsWith('.md'));
}

export function getAuthorBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(authorsDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}
