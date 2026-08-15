import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { getAllPosts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} - POPIA & Data Privacy Consulting in South Africa`,
  description:
    "Sentinel Privacy helps South African businesses achieve and maintain POPIA compliance. Free gap-assessment test, Information Officer support, policies, training and breach response.",
  keywords:
    "POPIA, POPIA compliance, data privacy South Africa, Information Officer, PAIA, data protection, privacy consulting, POPIA assessment, Information Regulator",
  alternates: { canonical: "/" },
};

const SERVICES = [
  { title: "POPIA Gap Assessments", body: "A structured review of your business against all eight conditions for lawful processing, with a prioritised action plan.", icon: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></> },
  { title: "Privacy Operating Model Design", body: "We advise on and design the governance, roles and processes that make privacy a repeatable capability, not a scramble.", icon: <><rect x="9" y="2" width="6" height="6" rx="1" /><rect x="3" y="16" width="6" height="6" rx="1" /><rect x="15" y="16" width="6" height="6" rx="1" /><path d="M12 8v4M6 16v-2h12v2" /></> },
  { title: "Information Officer Support", body: "Registration with the Regulator, role guidance and ongoing support for your appointed Information Officer.", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
  { title: "Policies & Documentation", body: "Privacy notices, PAIA manuals, operator agreements and internal policies drafted for your specific context.", icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
  { title: "Staff Awareness Training", body: "Practical, role-based training that turns POPIA from a policy on a shelf into everyday good habits.", icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></> },
  { title: "Breach & Incident Response", body: "Incident response plans and hands-on support if a security compromise occurs, including Regulator notification.", icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></> },
];

const INDUSTRIES = [
  "Financial services", "Healthcare", "Retail & e-commerce",
  "Professional practices", "Education", "Non-profits", "Fintech & SaaS",
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <span className="orb orb--1" /><span className="orb orb--2" /><span className="orb orb--3" />
        </div>
        <div className="container hero__inner">
          <div>
            <span className="eyebrow">POPIA compliance made practical</span>
            <h1>
              Protect your business.
              <br />
              <span className="grad-text">Respect</span> your customers&apos; data.
            </h1>
            <p>
              We help South African organisations understand, achieve and maintain
              compliance with the Protection of Personal Information Act (POPIA),
              without the jargon and without the guesswork.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary btn--lg" href="/assessment">Take the free test</Link>
            </div>
            <div className="hero__badges">
              <span className="hero__badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4fd1c0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                POPIA-aligned methodology
              </span>
              <span className="hero__badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4fd1c0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                Information Regulator ready
              </span>
              <span className="hero__badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4fd1c0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                Local, SA-based specialists
              </span>
            </div>
          </div>
          <div className="hero__art">
            <Image className="floaty" src="/assets/img/hero.svg" alt="A secure shield safeguarding a business's personal information, illustrating POPIA data protection" width={520} height={480} priority />
            <span className="float-badge floaty floaty--slow" style={{ top: "6%", left: "-6%" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1f9e8f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
              14-question test<small>Instant readiness score</small>
            </span>
            <span className="float-badge floaty floaty--delay" style={{ bottom: "8%", right: "-4%" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e5a521" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              ~5 min<small>No sign-up needed</small>
            </span>
          </div>
        </div>
      </section>

      {/* Industries marquee */}
      <section style={{ padding: "26px 0", borderBottom: "1px solid var(--line)", background: "var(--bg-soft)" }}>
        <div className="container">
          <p className="center text-muted" style={{ margin: "0 0 16px", fontSize: ".82rem", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700 }}>
            Supporting compliance across South African industries
          </p>
          <div className="marquee">
            <div className="marquee__track">
              {[...INDUSTRIES, ...INDUSTRIES].map((name, i) => (
                <span className="marquee__item" key={i}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1f9e8f" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why POPIA matters */}
      <section className="section">
        <div className="container center">
          <span className="eyebrow">Why POPIA matters</span>
          <h2>Non-compliance is a real, growing business risk</h2>
          <p className="lead">
            Since POPIA came into full force in July 2021, the Information
            Regulator has been actively enforcing it. Fines, criminal liability
            and reputational damage are all on the table, but compliance is
            entirely achievable with the right guidance.
          </p>
        </div>
        <div className="container" style={{ marginTop: 44 }}>
          <div className="grid grid--4">
            <Reveal className="card center"><b style={{ fontSize: "2.4rem", color: "var(--gold)", display: "block", lineHeight: 1 }}><Counter value={10} prefix="R" suffix="m" /></b><p>Maximum administrative fine for serious POPIA breaches.</p></Reveal>
            <Reveal className="card center"><b style={{ fontSize: "2.4rem", color: "var(--gold)", display: "block", lineHeight: 1 }}><Counter value={10} suffix=" yrs" /></b><p>Possible imprisonment for the most serious offences.</p></Reveal>
            <Reveal className="card center"><b style={{ fontSize: "2.4rem", color: "var(--gold)", display: "block", lineHeight: 1 }}><Counter value={8} /></b><p>Conditions for lawful processing every business must meet.</p></Reveal>
            <Reveal className="card center"><b style={{ fontSize: "2.4rem", color: "var(--gold)", display: "block", lineHeight: 1 }}><Counter value={72} suffix=" hrs" /></b><p>The urgency expected when responding to a data breach.</p></Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section section--soft">
        <div className="container">
          <div className="center">
            <span className="eyebrow">What we do</span>
            <h2>End-to-end privacy support for SA businesses</h2>
            <p className="lead center">
              From your first gap assessment to ongoing compliance management, we
              meet you wherever you are on the journey.
            </p>
          </div>
          <div className="grid grid--3" style={{ marginTop: 44 }}>
            {SERVICES.map((s) => (
              <Reveal key={s.title}>
                <Link className="card card--link" href="/services" style={{ display: "block", height: "100%" }}>
                  <div className="card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="center" style={{ marginTop: 36 }}>
            <Link className="btn btn--primary btn--lg" href="/services">View all services</Link>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Our approach</span>
            <h2>Compliance in four clear steps</h2>
            <p>We keep it simple and jargon-free. You always know what&apos;s happening, why it matters and what comes next.</p>
            <div className="steps" style={{ marginTop: 28 }}>
              {[
                ["Assess", "We benchmark your current state against POPIA and identify your priority gaps."],
                ["Plan", "You receive a clear, prioritised roadmap tailored to your size, sector and risk."],
                ["Implement", "We help you put policies, controls and documentation in place, practically."],
                ["Sustain", "We keep you compliant with reviews, training and ongoing support."],
              ].map(([title, body]) => (
                <div className="step" key={title}>
                  <div className="step__num" />
                  <div><h3>{title}</h3><p>{body}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <span className="decor-dots" style={{ top: -18, right: -18 }} />
            <Reveal className="img-frame">
              <Image src="/assets/img/approach.svg" alt="A four-step POPIA compliance roadmap: assess, plan, build, compliant" width={560} height={440} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="section section--soft">
        <div className="container">
          <div className="center">
            <span className="eyebrow">Insights &amp; guidance</span>
            <h2>From our POPIA blog</h2>
            <p className="lead center">
              Plain-language articles to help South African businesses navigate
              data privacy with confidence.
            </p>
          </div>
          <div className="post-grid" style={{ marginTop: 44 }}>
            {posts.map((post) => (
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
          <div className="center" style={{ marginTop: 36 }}>
            <Link className="btn btn--ghost btn--lg" href="/blog">Visit the blog</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="center">
            <span className="eyebrow">Trusted by SA businesses</span>
            <h2>What our clients say</h2>
          </div>
          <div className="grid grid--3" style={{ marginTop: 40 }}>
            {[
              ["The free test flagged gaps we didn't know we had. Sentinel then guided us to full compliance in under three months, pragmatic every step of the way.", "NM", "Nomsa M.", "Operations Director, Retail (Johannesburg)"],
              ["As a small practice we thought POPIA was only for big corporates. Sentinel showed us what actually applied to us and kept it affordable and simple.", "DP", "Dr. Devan P.", "Founder, Healthcare Practice (Durban)"],
              ["Their staff training finally made privacy click for our team. It's now part of how we work, not a document nobody reads.", "LF", "Liezl F.", "HR Manager, Fintech (Cape Town)"],
            ].map(([quote, initials, name, role]) => (
              <Reveal className="quote" key={name}>
                <p>&quot;{quote}&quot;</p>
                <div className="quote__by">
                  <span className="quote__avatar">{initials}</span>
                  <div><b>{name}</b><span>{role}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--soft">
        <div className="container">
          <div className="cta-band">
            <h2>Not sure where your business stands?</h2>
            <p>
              Take our free POPIA readiness test and get an instant, categorised
              snapshot of your compliance gaps. No sign-up, no cost, no obligation.
            </p>
            <Link className="btn btn--gold btn--lg" href="/assessment">Take the free test</Link>
            <Link className="btn btn--light btn--lg" href="/contact">Talk to a specialist</Link>
          </div>
        </div>
      </section>
    </>
  );
}
