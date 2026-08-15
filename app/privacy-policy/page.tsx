import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sentinel Privacy collects, uses and protects your personal information in line with POPIA. Read our website privacy policy and your data-subject rights.",
  keywords: "privacy policy, POPIA privacy notice, data protection, personal information, Information Officer",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> · Privacy Policy</div>
          <h1>Privacy Policy</h1>
          <p>
            We&apos;re a data-privacy consultancy, so we hold ourselves to the
            standard we advise. Here&apos;s exactly how we handle your personal
            information.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="article">
            <div className="article-body">
              <p className="text-muted"><strong>Last updated:</strong> July 2026</p>

              <h2>1. Who we are</h2>
              <p>Sentinel Privacy (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides POPIA and data-privacy consulting services in South Africa. We are the responsible party for the personal information processed through this website, as defined in the Protection of Personal Information Act, 2013 (POPIA).</p>

              <h2>2. What personal information we collect</h2>
              <p>We only collect what we need:</p>
              <ul>
                <li><strong>Contact enquiries:</strong> when you use our contact form, we collect your name, email address, and optionally your phone number, company name, business size, and the details of your enquiry.</li>
                <li><strong>Assessment tool:</strong> the answers you give in our free POPIA readiness test are processed <em>in your browser only</em> and are not transmitted to or stored by us.</li>
                <li><strong>Technical data:</strong> if analytics are enabled, limited, aggregated usage data (such as pages visited) may be collected in a privacy-respecting way. We do not use invasive tracking or advertising cookies.</li>
              </ul>

              <h2>3. Why we process it and our lawful basis</h2>
              <p>We process your personal information to respond to your enquiry and provide the services you request (lawful basis: steps to enter into or perform a contract, and our legitimate interest in responding to you). Where we send you updates, we do so only with your consent, which you may withdraw at any time.</p>

              <h2>4. Who we share it with</h2>
              <p>We do not sell your personal information. We may share it with trusted operators (processors) who help us run our business, for example, our website host and email provider, under agreements that require them to protect it. Where any information is processed outside South Africa, we take steps to ensure an adequate level of protection.</p>

              <h2>5. How long we keep it</h2>
              <p>We keep enquiry information only as long as necessary to deal with your enquiry and our ongoing relationship, or as required by law, after which it is securely deleted or de-identified.</p>

              <h2>6. How we protect it</h2>
              <p>We apply reasonable technical and organisational safeguards, including access controls, encryption in transit (HTTPS) and the principle of least privilege, to protect your personal information against loss, misuse and unauthorised access.</p>

              <h2>7. Your rights under POPIA</h2>
              <p>You have the right to:</p>
              <ul>
                <li>be told what personal information we hold about you and to access it;</li>
                <li>request correction or deletion of information that is inaccurate, irrelevant or excessive;</li>
                <li>object to the processing of your personal information;</li>
                <li>withdraw consent where we rely on it; and</li>
                <li>complain to the Information Regulator.</li>
              </ul>
              <p>To exercise any of these rights, contact our Information Officer through our <Link href="/contact">contact form</Link> or at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

              <h2>8. Contacting the Information Regulator</h2>
              <p>You may lodge a complaint with the Information Regulator (South Africa):</p>
              <ul>
                <li>Website: <a href="https://inforegulator.org.za" target="_blank" rel="noopener">inforegulator.org.za</a></li>
                <li>Email (POPIA complaints): POPIAComplaints@inforegulator.org.za</li>
              </ul>

              <h2>9. Cookies</h2>
              <p>This website does not use advertising or cross-site tracking cookies. Any storage used is strictly to make the site function or to remember your preferences.</p>

              <h2>10. Changes to this policy</h2>
              <p>We may update this policy from time to time. The current version is always available on this page, with the &quot;last updated&quot; date shown above.</p>

              <div className="callout">
                <h4>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1f9e8f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  {" "}Questions about your data?
                </h4>
                <p>Reach our Information Officer through our <Link href="/contact">contact form</Link> and we&apos;ll be happy to help.</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
