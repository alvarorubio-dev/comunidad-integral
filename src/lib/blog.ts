import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { BlogFrontmatter, BlogHeading, BlogPost } from '@/types/blog';
import { slugify } from '@/lib/utils/slugify';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const WORDS_PER_MINUTE = 200;

function extractHeadings(content: string): BlogHeading[] {
  const matches = content.matchAll(/^##\s+(.+)$/gm);
  return [...matches].map((match) => {
    const text = match[1].trim();
    return { text, id: slugify(text) };
  });
}

function readPost(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8');
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    headings: extractHeadings(content),
  };
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  return files
    .map(readPost)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  return readPost(`${slug}.mdx`);
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
}
