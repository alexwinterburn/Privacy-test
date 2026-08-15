import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "POPIA Blog - Data Privacy Insights for South African Businesses",
  description:
    "Practical, plain-language articles on POPIA and data privacy for South African businesses: compliance checklists, Information Officer guidance, marketing rules and more.",
  keywords:
    "POPIA blog, data privacy South Africa, POPIA compliance tips, Information Officer, POPIA marketing, data protection articles",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} Blog`,
    description: "Practical POPIA and data privacy insights for South African businesses.",
    url: `${site.url}/blog/`,
    publisher: { "@type": "Organization", name: site.name },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${site.url}/blog/${p.slug}/`,
      datePublished: p.date,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-head">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> · Blog</div>
          <h1>POPIA &amp; Data Privacy Blog</h1>
          <p>
            Practical, plain-language guidance to help South African businesses
            navigate the Protection of Personal Information Act with confidence.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {featured && (
            <Reveal>
              <Link className="featured-post" href={`/blog/${featured.slug}`} style={{ color: "inherit" }}>
                <div className="featured-post__media">
                  <Image src={featured.cover} alt={featured.coverAlt ?? featured.title} width={800} height={500} />
                </div>
                <div className="featured-post__body">
                  <div className="post-card__meta">
                    <span className="pill">Featured</span>
                    <span>{featured.category}</span>
                    <span>·</span>
                    <span>{getPost(featured.slug)?.readingTime ?? 5} min read</span>
                  </div>
                  <h2 style={{ marginBottom: 12 }}>{featured.title}</h2>
                  <p>{featured.summary}</p>
                  <span className="post-card__link" style={{ marginTop: 10 }}>Read the full article →</span>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="post-grid" style={{ marginTop: 8 }}>
            {rest.map((post) => (
              <Reveal key={post.slug}>
                <Link className="post-card" href={`/blog/${post.slug}`} style={{ height: "100%" }}>
                  <div className="post-card__media">
                    <Image src={post.cover} alt={post.coverAlt ?? post.title} width={800} height={500} />
                  </div>
                  <div className="post-card__body">
                    <div className="post-card__meta">
                      <span className="pill">{post.category}</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                    <span className="post-card__link">Read article →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="cta-band" as="div">
            <div style={{ marginTop: 0 }}>
              <h2>Get practical POPIA tips in your inbox</h2>
              <p>
                No spam, no legalese, just occasional, useful guidance for South
                African businesses. (And yes, we honour opt-in consent.)
              </p>
              <Link className="btn btn--gold btn--lg" href="/contact">Request updates</Link>
              <Link className="btn btn--light btn--lg" href="/assessment">Take the free test</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
