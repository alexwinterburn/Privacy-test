import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sentinel Privacy. Book a free POPIA consultation or ask a data privacy question. Serving businesses across South Africa.",
  keywords:
    "contact POPIA consultant, POPIA consultation South Africa, data privacy help, book privacy assessment",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> · Contact</div>
          <h1>Let&apos;s talk about your data privacy</h1>
          <p>
            Book a free, no-obligation consultation or send us a question. We
            usually respond within one business day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split" style={{ alignItems: "start" }}>
            <div>
              <div className="form-card">
                <ContactForm />
              </div>
            </div>

            <div>
              <span className="eyebrow">How to reach us</span>
              <h2>Send us a message</h2>
              <p>
                The quickest way to reach our team is the form on this page, it
                comes straight to us and we usually reply within one business day.
                We serve clients across South Africa, both in our main hubs and
                remotely nationwide.
              </p>

              <div className="contact-info" style={{ marginTop: 26 }}>
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div><h4>Email us</h4><p><a href={`mailto:${site.email}`}>{site.email}</a></p></div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div><h4>Where we work</h4><p>Cape Town, Johannesburg &amp; Durban<br />Remote support nationwide</p></div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div><h4>Office hours</h4><p>{site.hours}</p></div>
                </div>
              </div>

              <div className="card" style={{ marginTop: 30, background: "var(--teal-050)", borderColor: "#cfe9e5" }}>
                <h3 style={{ marginBottom: 8 }}>Not sure where to begin?</h3>
                <p style={{ marginBottom: 16 }}>
                  Take our free POPIA readiness test first, it takes 5 minutes and
                  gives you something concrete to discuss.
                </p>
                <Link className="btn btn--primary" href="/assessment">Take the free test</Link>
              </div>

              <div className="card" style={{ marginTop: 20 }}>
                <h3 style={{ marginBottom: 8 }}>Our commitment to your privacy</h3>
                <p style={{ margin: 0, fontSize: ".94rem" }}>
                  We practise what we preach. Information submitted through this
                  form is used solely to respond to your enquiry and is handled in
                  accordance with POPIA. We won&apos;t add you to marketing lists
                  without your consent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
