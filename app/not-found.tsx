import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
      <div className="container center" style={{ maxWidth: 620 }}>
        <span className="eyebrow">Error 404</span>
        <h1>We couldn&apos;t find that page</h1>
        <p className="lead center">
          The page you were looking for may have moved or no longer exists. Let&apos;s
          get you back on track.
        </p>
        <div className="hero__actions" style={{ justifyContent: "center", marginTop: 8 }}>
          <Link className="btn btn--primary btn--lg" href="/">Back to home</Link>
          <Link className="btn btn--ghost btn--lg" href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
