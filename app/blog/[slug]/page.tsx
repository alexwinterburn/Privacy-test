import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [{ url: post.cover }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.cover] },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);
  const url = `${site.url}/blog/${post.slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${site.url}${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
    articleSection: post.category,
    inLanguage: "en-ZA",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section">
        <div className="container">
          <article className="article">
            <div className="breadcrumb" style={{ color: "var(--muted)" }}>
              <Link href="/">Home</Link> · <Link href="/blog">Blog</Link> · {post.category}
            </div>
            <div className="article__meta">
              <span className="pill">{post.category}</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>
            <h1>{post.title}</h1>
            {post.summary && <p className="lead">{post.summary}</p>}

            <div className="article__hero">
              <Image src={post.cover} alt={post.coverAlt ?? post.title} width={800} height={500} priority />
            </div>

            <div className="article-body">
              <div dangerouslySetInnerHTML={{ __html: post.html }} />

              {post.tags.length > 0 && (
                <div className="tag-row">
                  {post.tags.map((t) => <span className="pill" key={t}>{t}</span>)}
                </div>
              )}

              <div className="author-box">
                <div className="author-box__ico">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <div>
                  <b>{site.author}</b>
                  <p>
                    We&apos;re a South African data-privacy consultancy helping
                    businesses make POPIA practical. We publish under our brand and
                    keep client work confidential.
                  </p>
                </div>
              </div>

              <div className="share-row">
                <span>Share:</span>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} aria-label="Share on LinkedIn" target="_blank" rel="noopener">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zM8.5 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24h-4V8z" /></svg>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(post.title)}`} aria-label="Share on X" target="_blank" rel="noopener">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.6h3.5l-7.6 8.7L23.7 22h-6.9l-5.4-7.1L5.2 22H1.7l8.1-9.3L.9 1.6h7.1l4.9 6.5 5.9-6.5zm-1.2 18.2h1.9L6.4 3.6H4.3l13.4 16.2z" /></svg>
                </a>
                <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${url}`} aria-label="Share by email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>
                </a>
              </div>
            </div>

            {related.length > 0 && (
              <div className="post-more">
                <h3 style={{ marginBottom: 20 }}>Keep reading</h3>
                <div className="post-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  {related.map((r) => (
                    <Link className="post-card" href={`/blog/${r.slug}`} key={r.slug}>
                      <div className="post-card__media">
                        <Image src={r.cover} alt={r.coverAlt ?? r.title} width={800} height={500} />
                      </div>
                      <div className="post-card__body">
                        <div className="post-card__meta">
                          <span className="pill">{r.category}</span>
                        </div>
                        <h3>{r.title}</h3>
                        <span className="post-card__link">Read article →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="cta-band">
            <h2>See your POPIA gaps in 5 minutes</h2>
            <p>
              Take our free readiness test and get an instant, categorised snapshot
              of exactly where your business stands.
            </p>
            <Link className="btn btn--gold btn--lg" href="/assessment">Take the free test</Link>
            <Link className="btn btn--light btn--lg" href="/contact">Talk to a specialist</Link>
          </div>
        </div>
      </section>
    </>
  );
}
