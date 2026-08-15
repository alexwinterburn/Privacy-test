import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Sentinel Privacy, a South African data-privacy consultancy on a mission to make POPIA compliance clear, practical and achievable for every business.",
  keywords: "about POPIA consultant, data privacy consultancy South Africa, POPIA experts, privacy compliance advisors",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { title: "Clarity over jargon", body: "We explain the law in plain language so you can make confident, informed decisions, not just tick boxes.", icon: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></> },
  { title: "Practical & proportionate", body: "Compliance is right-sized to your business. A five-person startup shouldn't carry a corporate's overhead.", icon: <path d="M20 6 9 17l-5-5" /> },
  { title: "Integrity first", body: "We'll tell you what you actually need, and what you don't. Your trust is worth more than an upsell.", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  { title: "Empowerment", body: "We transfer knowledge to your team so you become self-sufficient, not permanently dependent on us.", icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" /></> },
  { title: "Responsiveness", body: "Privacy questions rarely wait. When something happens, we're reachable and we move quickly.", icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></> },
  { title: "Depth of expertise", body: "POPIA, PAIA and information-governance knowledge kept current as guidance and enforcement evolve.", icon: <><path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></> },
];

const EXPERTISE = [
  { title: "Information governance", body: "Deep, current knowledge of POPIA, PAIA and the Information Regulator's guidance, translated into practical obligations for your business.", icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
  { title: "Information security", body: "Hands-on experience with the technical and organisational safeguards, breach response and operator management POPIA expects.", icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></> },
  { title: "Training & documentation", body: "The ability to turn complex legal requirements into clear policies, privacy notices and staff training that actually sticks.", icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></> },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> · About Us</div>
          <h1>About Sentinel Privacy</h1>
          <p>
            We&apos;re a South African consultancy on a simple mission: to make data
            privacy compliance clear, practical and achievable, for businesses of
            every size.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Our story</span>
            <h2>Born from a local need for practical privacy help</h2>
            <p>
              When POPIA came into full effect in July 2021, thousands of South
              African businesses were left asking the same question: <em>&quot;What does
              this actually mean for us, and what do we do first?&quot;</em>
            </p>
            <p>
              Too much of the available guidance was written for lawyers, priced for
              large corporates, or copied wholesale from European GDPR templates that
              didn&apos;t fit the South African context. Sentinel Privacy was founded to
              close that gap.
            </p>
            <p>
              We translate the Protection of Personal Information Act into plain
              language and practical action, right-sized to your business, your
              sector and your risk. No scare tactics, no over-engineering, just
              honest guidance that gets you compliant and keeps you there.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <span className="decor-dots" style={{ bottom: -18, left: -18 }} />
            <Reveal className="img-frame">
              <Image src="/assets/img/about.svg" alt="A trusted advisor connecting people to a protected core of business data" width={560} height={440} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="center">
            <span className="eyebrow">What drives us</span>
            <h2>Our values</h2>
            <p className="lead center">The principles behind every engagement we take on.</p>
          </div>
          <div className="grid grid--3" style={{ marginTop: 44 }}>
            {VALUES.map((v) => (
              <Reveal className="card" key={v.title}>
                <div className="card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{v.icon}</svg>
                </div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="stats">
            <div className="stat"><b><Counter value={150} suffix="+" /></b><span>SA businesses guided to compliance</span></div>
            <div className="stat"><b><Counter value={8} /></b><span>industries served, from fintech to healthcare</span></div>
            <div className="stat"><b><Counter value={100} suffix="%" /></b><span>POPIA &amp; PAIA focused, it&apos;s all we do</span></div>
            <div className="stat"><b><Counter value={12} suffix="+" /></b><span>years combined privacy &amp; governance experience</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center">
            <span className="eyebrow">Our expertise</span>
            <h2>Specialists who speak your language</h2>
            <p className="lead center">
              Sentinel Privacy brings together practitioners across three
              disciplines. We keep our engagements confidential and let the work,
              not personalities, speak for itself.
            </p>
          </div>
          <div className="grid grid--3" style={{ marginTop: 44 }}>
            {EXPERTISE.map((e) => (
              <Reveal className="card center" key={e.title}>
                <div className="card__icon" style={{ margin: "0 auto 16px" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{e.icon}</svg>
                </div>
                <h3 style={{ marginBottom: 6 }}>{e.title}</h3>
                <p>{e.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal
            className="card"
            style={{ marginTop: 34, background: "var(--teal-050)", borderColor: "#cfe9e5", display: "flex", gap: 20, alignItems: "flex-start" }}
          >
            <div className="card__icon" style={{ margin: 0, flex: "0 0 auto" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <div>
              <h3 style={{ marginBottom: 6 }}>Discreet &amp; confidential by design</h3>
              <p style={{ margin: 0 }}>
                We operate as an independent, brand-first practice. Client
                engagements, and the identities of the businesses we help, are
                treated with strict confidentiality. When you work with us, your
                data privacy starts with how we handle you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="cta-band">
            <h2>Let&apos;s make privacy simple for your business</h2>
            <p>
              Start with our free POPIA readiness test, or reach out for a
              no-obligation conversation about where you are and where you&apos;d like
              to be.
            </p>
            <Link className="btn btn--gold btn--lg" href="/assessment">Take the free test</Link>
            <Link className="btn btn--light btn--lg" href="/contact">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
