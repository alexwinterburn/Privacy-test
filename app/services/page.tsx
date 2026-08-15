import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "POPIA gap assessments, privacy operating model design, Information Officer support, privacy policies & PAIA manuals, staff training, breach response and compliance-as-a-service for South African businesses.",
  keywords:
    "POPIA gap assessment, privacy operating model, Information Officer registration, PAIA manual, privacy policy, POPIA training, data breach response, compliance as a service South Africa",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    title: "POPIA Gap Assessment",
    body: "A structured review of your business against all eight conditions for lawful processing. You receive a clear report with a risk rating and a prioritised, practical remediation roadmap.",
    points: ["Data-flow mapping & processing inventory", "Gap analysis against POPIA's 8 conditions", "Risk-rated findings & prioritised action plan"],
    icon: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  },
  {
    title: "Privacy Operating Model Design",
    body: "For firms that want privacy to run as a repeatable capability, not a scramble. We advise on and design your privacy operating model, the governance, roles and processes that make data protection part of how the business works every day.",
    points: ["Target operating model & governance structure", "Roles, responsibilities & accountability (RACI)", "Privacy-by-design embedded into everyday processes", "Maturity assessment & a phased roadmap"],
    icon: <><rect x="9" y="2" width="6" height="6" rx="1" /><rect x="3" y="16" width="6" height="6" rx="1" /><rect x="15" y="16" width="6" height="6" rx="1" /><path d="M12 8v4M6 16v-2h12v2" /></>,
  },
  {
    title: "Information Officer Support",
    body: "Every business is automatically an Information Officer (the head of the organisation). We help you understand the role, register with the Information Regulator and support your appointed and deputy officers.",
    points: ["Registration with the Information Regulator", "Role, duty & deputy-officer guidance", "Ongoing advisory & escalation support"],
    icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  },
  {
    title: "Policies, Notices & PAIA Manuals",
    body: "We draft the documentation that underpins compliance, tailored to your business, not generic templates. Includes privacy notices, internal data-protection policies and your PAIA manual.",
    points: ["Website & customer privacy notices", "Internal data-protection & retention policies", "PAIA manual & operator (processor) agreements"],
    icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
  },
  {
    title: "Staff Awareness Training",
    body: "People are the front line of privacy. We deliver practical, role-based training, from all-staff awareness sessions to focused training for teams that handle personal information daily.",
    points: ["All-staff POPIA awareness sessions", "Role-specific training (HR, marketing, IT, sales)", "Onboarding material & refresher content"],
    icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
  },
  {
    title: "Breach & Incident Response",
    body: "When a security compromise happens, speed and process matter. We help you prepare an incident-response plan in advance, and stand alongside you if the worst occurs.",
    points: ["Incident-response plan & breach register", "Containment & assessment support", "Regulator & data-subject notification guidance"],
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    title: "Compliance-as-a-Service",
    body: "POPIA compliance isn't a once-off project, it's an ongoing commitment. Our retainer keeps you compliant as your business grows and the regulatory landscape shifts.",
    points: ["Periodic reviews & policy updates", "Data-subject request handling support", "On-call advisory & annual training refresh"],
    icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  },
];

const AUDIENCES = [
  ["Startups & SMEs", "Affordable, essentials-first compliance that gets you covered without corporate overhead."],
  ["Professional practices", "Medical, legal, accounting and consulting firms handling sensitive client information."],
  ["Retail & e-commerce", "Customer databases, loyalty programmes and direct marketing done the compliant way."],
  ["Fintech & financial services", "Higher-risk data environments needing robust safeguards and documentation."],
  ["Healthcare providers", "Special personal information (health data) requiring extra care under POPIA."],
  ["NPOs & education", "Donor, learner and beneficiary data managed responsibly and lawfully."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "POPIA & data privacy consulting",
  provider: { "@type": "Organization", name: site.name, url: `${site.url}/` },
  areaServed: { "@type": "Country", name: "South Africa" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "POPIA compliance services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
  },
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-head">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> · Our Services</div>
          <h1>Our Services</h1>
          <p>
            Whether you&apos;re just starting out or maintaining an established
            programme, we offer end-to-end support across the full POPIA
            compliance lifecycle.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--2">
            {SERVICES.map((s) => (
              <Reveal className="card" key={s.title}>
                <div className="card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="feature-list" style={{ marginTop: 16 }}>
                  {s.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="center">
            <span className="eyebrow">Who we help</span>
            <h2>Right-sized for your business</h2>
            <p className="lead center">
              POPIA applies to virtually every organisation that processes personal
              information. We tailor our support to your scale and sector.
            </p>
          </div>
          <div className="grid grid--3" style={{ marginTop: 44 }}>
            {AUDIENCES.map(([title, body]) => (
              <Reveal className="card" key={title}><h3>{title}</h3><p>{body}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center">
            <span className="eyebrow">How we work</span>
            <h2>A clear, structured engagement</h2>
          </div>
          <div className="steps" style={{ marginTop: 40, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
            {[
              ["Discovery & free test", "Start with our free online readiness test, then a short discovery call to understand your business and objectives."],
              ["Gap assessment", "We map your data and benchmark you against POPIA, delivering a risk-rated report and prioritised roadmap."],
              ["Implementation", "We help put policies, documentation, controls and training in place, at a pace that works for you."],
              ["Ongoing assurance", "Optional retainer support keeps you compliant through reviews, updates and staff refreshers."],
            ].map(([title, body]) => (
              <Reveal className="step" key={title}>
                <div className="step__num" />
                <div><h3>{title}</h3><p>{body}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="cta-band">
            <h2>Start with a free readiness snapshot</h2>
            <p>
              Take our free POPIA test to see where you stand, then let&apos;s talk
              about the right service mix for your business.
            </p>
            <Link className="btn btn--gold btn--lg" href="/assessment">Take the free test</Link>
            <Link className="btn btn--light btn--lg" href="/contact">Request a proposal</Link>
          </div>
        </div>
      </section>
    </>
  );
}
