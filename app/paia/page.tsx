import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PAIA Manual",
  description:
    "Sentinel Privacy's PAIA manual: the records we hold and how to request access under the Promotion of Access to Information Act (PAIA), read alongside POPIA.",
  keywords: "PAIA manual, Promotion of Access to Information Act, access to information, POPIA, Information Officer, information request",
  alternates: { canonical: "/paia" },
};

export default function PaiaPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> · PAIA Manual</div>
          <h1>PAIA Manual</h1>
          <p>
            Our manual under the Promotion of Access to Information Act (PAIA),
            which works alongside POPIA and is administered by the same Information
            Regulator.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="article">
            <div className="article-body">
              <p className="text-muted"><strong>Last updated:</strong> July 2026</p>

              <h2>1. Introduction</h2>
              <p>This manual is published in terms of section 51 of the Promotion of Access to Information Act, 2000 (PAIA). It explains the records held by Sentinel Privacy and how a person may request access to them. It should be read together with our <Link href="/privacy-policy">Privacy Policy</Link>.</p>

              <h2>2. About the organisation</h2>
              <ul>
                <li><strong>Name:</strong> Sentinel Privacy (Pty) Ltd</li>
                <li><strong>Nature of business:</strong> POPIA and data-privacy consulting</li>
                <li><strong>Information Officer:</strong> The head of the organisation (contactable via the details below)</li>
                <li><strong>Contact:</strong> via our <Link href="/contact">contact form</Link></li>
              </ul>

              <h2>3. The Information Regulator</h2>
              <p>You may contact the Information Regulator for guidance or to lodge a complaint:</p>
              <ul>
                <li>Website: <a href="https://inforegulator.org.za" target="_blank" rel="noopener">inforegulator.org.za</a></li>
                <li>PAIA email: PAIAComplaints@inforegulator.org.za</li>
                <li>POPIA email: POPIAComplaints@inforegulator.org.za</li>
              </ul>

              <h2>4. Records we hold</h2>
              <p>Depending on our activities, we may hold records in the following categories:</p>
              <ul>
                <li>Client and enquiry records (contact details, correspondence, engagement documents)</li>
                <li>Supplier and operator records</li>
                <li>Financial and tax records</li>
                <li>Employment and internal governance records</li>
                <li>Marketing and website records</li>
              </ul>
              <p>Some records are also available without a formal request, for example, information published on this website.</p>

              <h2>5. How to request access</h2>
              <ol>
                <li>Complete the prescribed PAIA request form (available from the Information Regulator&apos;s website).</li>
                <li>Send it to our Information Officer via our <Link href="/contact">contact form</Link>.</li>
                <li>Provide enough detail to identify the record and to identify you as the requester, and specify the form of access required.</li>
                <li>Pay any applicable request and access fees, where required.</li>
              </ol>
              <p>We will respond within the timeframes set out in PAIA. Access may be refused on the limited grounds provided for in the Act (for example, to protect the privacy of a third party or commercially confidential information).</p>

              <h2>6. Fees</h2>
              <p>Prescribed request and access fees under PAIA may apply. We will advise you of any fees before processing your request.</p>

              <h2>7. Availability of this manual</h2>
              <p>This manual is available on this website and on request from our Information Officer.</p>

              <div className="callout">
                <h4>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1f9e8f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                  {" "}Need a PAIA manual for your own business?
                </h4>
                <p>We prepare PAIA manuals tailored to South African businesses. <Link href="/contact">Get in touch</Link> or <Link href="/assessment">take the free test</Link> to see where you stand.</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
