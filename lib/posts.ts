import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  description: string;
  keywords?: string;
  cover: string;
  coverAlt?: string;
  tags: string[];
  featured?: boolean;
};

export type Post = PostMeta & {
  html: string;
  readingTime: number;
};

/** YAML front matter parses `date:` into a Date object, so normalise both
 *  Date and string forms to a plain ISO "YYYY-MM-DD". */
function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const s = String(value ?? "").trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const parsed = new Date(s);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: toIsoDate(data.date),
    category: String(data.category ?? "Guidance"),
    summary: String(data.summary ?? ""),
    description: String(data.description ?? data.summary ?? ""),
    keywords: data.keywords ? String(data.keywords) : undefined,
    cover: String(data.cover ?? "/assets/img/cover-checklist.svg"),
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    featured: Boolean(data.featured),
  };
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return toMeta(slug, data);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** A single post with its rendered HTML. */
export function getPost(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const html = marked.parse(content, { async: false }) as string;
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    ...toMeta(slug, data),
    html,
    readingTime: Math.max(1, Math.round(words / 200)),
  };
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
