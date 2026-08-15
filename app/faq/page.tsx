import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "POPIA FAQ - Data Privacy Questions Answered",
  description:
    "Answers to common South African data privacy questions: what POPIA is, who it applies to, Information Officers, consent, data breaches, fines, PAIA and data subject rights.",
  keywords:
    "POPIA FAQ, what is POPIA, POPIA fines, Information Officer, data breach South Africa, PAIA, data subject rights, POPIA consent, direct marketing POPIA",
  alternates: { canonical: "/faq" },
};

const GROUPS: { heading: string; items: FaqItem[] }[] = [
  {
    heading: "POPIA basics",
    items: [
      {
        q: "What is POPIA?",
        a: (<><p>POPIA, the <strong>Protection of Personal Information Act 4 of 2013</strong>, is South Africa&apos;s data protection law. It sets conditions for how organisations may lawfully collect, use, store and share the personal information of individuals (&quot;data subjects&quot;). It gives people rights over their information and is enforced by the Information Regulator.</p><p>POPIA commenced on 1 July 2020, and the one-year grace period ended on <strong>1 July 2021</strong>, meaning full compliance has been required since then.</p></>),
      },
      {
        q: "Does POPIA apply to my business?",
        a: (<><p>Almost certainly. POPIA applies to any &quot;responsible party&quot; (a person or organisation) that is based in South Africa, or that processes personal information in South Africa, as part of its activities. This covers virtually every business, from a sole proprietor with a customer list to a large corporation.</p><p>It applies whether you process data on paper or digitally, and regardless of your size. There are limited exclusions (for example, purely personal or household activity, and certain journalistic, state security or Cabinet functions), but ordinary commercial activity is squarely within scope.</p></>),
      },
      {
        q: "What counts as \"personal information\" under POPIA?",
        a: (<><p>Personal information is any information relating to an identifiable, living natural person, and, importantly under POPIA, an identifiable existing <em>juristic</em> person (a company) too. Examples include names, ID numbers, contact details, email addresses, location data, financial information, employment history and even opinions about a person.</p><p>POPIA also recognises <strong>special personal information</strong>, such as health, religion, race, biometric data, sexual orientation and criminal history, which is subject to stricter conditions.</p></>),
      },
      {
        q: "What are the 8 conditions for lawful processing?",
        a: (<><p>POPIA is built around eight conditions that every responsible party must meet:</p><ol><li><strong>Accountability</strong>, you are responsible for complying with POPIA.</li><li><strong>Processing limitation</strong>, process lawfully, minimally and with consent or another lawful basis.</li><li><strong>Purpose specification</strong>, collect for a specific, defined purpose.</li><li><strong>Further processing limitation</strong>, don&apos;t use data in ways incompatible with the original purpose.</li><li><strong>Information quality</strong>, keep information accurate and up to date.</li><li><strong>Openness</strong>, be transparent; tell people what you do with their data.</li><li><strong>Security safeguards</strong>, protect information with appropriate measures.</li><li><strong>Data subject participation</strong>, let people access and correct their information.</li></ol></>),
      },
      {
        q: "How is POPIA different from the GDPR?",
        a: (<p>POPIA and the EU&apos;s GDPR share the same DNA and many principles overlap, so a GDPR-compliant business has a strong head start. But there are important differences: POPIA protects the personal information of <strong>juristic persons</strong> (companies), not just individuals; it uses South-African-specific terms like &quot;responsible party&quot; (controller) and &quot;operator&quot; (processor); and it works alongside <strong>PAIA</strong> (access to information) and the local Information Regulator. Copy-pasting a GDPR programme without localising it is a common and risky mistake.</p>),
      },
    ],
  },
  {
    heading: "Roles & registration",
    items: [
      {
        q: "What is an Information Officer, and do I need one?",
        a: (<><p>Yes. Under POPIA, the <strong>Information Officer is automatically the head of your organisation</strong>, the CEO, MD or business owner, unless formally delegated. The Information Officer is responsible for ensuring the business complies with POPIA, encouraging compliance, dealing with the Regulator and handling requests.</p><p>You may appoint <strong>Deputy Information Officers</strong> to help carry out these duties. Information Officers must be <strong>registered with the Information Regulator</strong> before they perform their functions.</p></>),
      },
      {
        q: "How do I register my Information Officer with the Regulator?",
        a: (<><p>Registration is done through the Information Regulator&apos;s online portal (or via the prescribed form). You&apos;ll provide details of your organisation and the designated Information Officer (and any deputies). Registration is free.</p><p>We routinely assist clients with this process, including getting the supporting governance and delegation in place. If you&apos;d like a hand, <Link href="/contact">reach out</Link>.</p></>),
      },
      {
        q: "What is PAIA and how does it relate to POPIA?",
        a: (<><p>PAIA, the <strong>Promotion of Access to Information Act</strong>, gives people the right to request access to records held by public and private bodies. POPIA and PAIA are administered together by the same Information Regulator.</p><p>Most private bodies must have a <strong>PAIA manual</strong> that explains what records they hold and how to request access. POPIA amended parts of PAIA, so your PAIA manual should reflect data-protection requirements too.</p></>),
      },
      {
        q: "What is the difference between a \"responsible party\" and an \"operator\"?",
        a: (<><p>A <strong>responsible party</strong> determines why and how personal information is processed (equivalent to a &quot;controller&quot; under GDPR). An <strong>operator</strong> processes personal information on behalf of a responsible party, under its instruction (a &quot;processor&quot;), for example, a payroll provider or cloud hosting service.</p><p>POPIA requires a <strong>written contract (operator agreement)</strong> between the two, obliging the operator to keep the information secure and to process it only as instructed.</p></>),
      },
    ],
  },
  {
    heading: "Consent, rights & marketing",
    items: [
      {
        q: "Do I always need consent to process personal information?",
        a: (<><p>No, consent is one lawful basis, but not the only one. POPIA also permits processing where it is <strong>necessary to conclude or perform a contract</strong>, to <strong>comply with a legal obligation</strong>, to <strong>protect a legitimate interest</strong> of the data subject, for the <strong>proper performance of a public-law duty</strong>, or for the <strong>legitimate interests</strong> of the responsible party or a third party.</p><p>Where you do rely on consent, it must be voluntary, specific and informed, and the data subject can withdraw it.</p></>),
      },
      {
        q: "What are my customers' rights under POPIA?",
        a: (<p>Data subjects have the right to: be notified that their information is being collected; know whether you hold information about them and to access it; request correction or deletion of inaccurate, irrelevant or excessive information; object to processing (including for direct marketing); and complain to the Information Regulator. You must have a practical process to respond to these requests.</p>),
      },
      {
        q: "Can I still send marketing emails and SMSes under POPIA?",
        a: (<><p>Yes, but with rules. For electronic direct marketing to people who are not already your customers, POPIA generally requires <strong>opt-in consent</strong>, you may typically approach a person only once to obtain that consent. There is a limited exception for <strong>existing customers</strong>, where you may market similar products or services provided you gave them a chance to opt out at collection and in every message.</p><p>Every marketing communication must identify the sender and offer an easy way to opt out, which you must honour.</p></>),
      },
      {
        q: "Can I transfer personal information outside South Africa?",
        a: (<p>Yes, but cross-border transfers are restricted. You may transfer personal information out of South Africa only where certain conditions are met, for example, the recipient is subject to a law or binding agreement providing an adequate, similar level of protection; the data subject consents; or the transfer is necessary for the performance of a contract. If you use offshore cloud services, this almost certainly applies to you.</p>),
      },
    ],
  },
  {
    heading: "Breaches & enforcement",
    items: [
      {
        q: "What must I do if we have a data breach?",
        a: (<><p>POPIA calls this a &quot;security compromise.&quot; Where there are reasonable grounds to believe that personal information has been accessed or acquired by an unauthorised person, you must notify <strong>both the Information Regulator and the affected data subjects</strong> as soon as reasonably possible after discovering the breach.</p><p>The notification must be in writing and give enough detail for people to protect themselves. Having an incident-response plan ready before anything happens makes all the difference, it&apos;s something we help clients put in place.</p></>),
      },
      {
        q: "What are the penalties for non-compliance?",
        a: (<p>The consequences can be serious. The Information Regulator can issue enforcement notices, and failure to comply can lead to <strong>administrative fines of up to R10 million</strong>, or on conviction for certain offences, fines and/or <strong>imprisonment of up to 10 years</strong> depending on the seriousness. Beyond penalties, data subjects can institute civil claims for damage, and reputational harm can be significant.</p>),
      },
      {
        q: "Who is the Information Regulator?",
        a: (<p>The <strong>Information Regulator (South Africa)</strong> is the independent body established to promote and enforce both POPIA and PAIA. It handles registrations, investigates complaints, issues guidance and codes of conduct, and can take enforcement action against non-compliant organisations.</p>),
      },
    ],
  },
  {
    heading: "Getting compliant",
    items: [
      {
        q: "Where should my business start with POPIA?",
        a: (<p>Start by understanding your current position. Our <Link href="/assessment">free POPIA readiness test</Link> gives you an instant, categorised snapshot of where the gaps are. From there, the usual path is: map your data, appoint and register your Information Officer, put policies and privacy notices in place, secure your operator agreements, implement safeguards and train your staff.</p>),
      },
      {
        q: "How long does it take to become compliant?",
        a: (<p>It depends on your size, complexity and starting point, but many small-to-medium businesses reach a solid baseline within <strong>6 to 12 weeks</strong> of focused effort. Compliance is then an ongoing commitment rather than a once-off exercise, which is why we offer ongoing support options.</p>),
      },
      {
        q: "Is the information on this site legal advice?",
        a: (<p>No. This FAQ and the rest of this website provide general information to help you understand your obligations. It is not legal advice and should not be relied on as such. For guidance tailored to your specific circumstances, please <Link href="/contact">contact us</Link> or consult a qualified professional.</p>),
      },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { q: "What is POPIA?", a: "POPIA, the Protection of Personal Information Act 4 of 2013, is South Africa's data protection law. It sets conditions for how organisations may lawfully collect, use, store and share personal information, and is enforced by the Information Regulator. Full compliance has been required since 1 July 2021." },
    { q: "Does POPIA apply to my business?", a: "Almost certainly. POPIA applies to any responsible party based in South Africa, or processing personal information in South Africa, as part of its activities. This covers virtually every business regardless of size." },
    { q: "What are the 8 conditions for lawful processing?", a: "Accountability; processing limitation; purpose specification; further processing limitation; information quality; openness; security safeguards; and data subject participation." },
    { q: "What is an Information Officer, and do I need one?", a: "Yes. Under POPIA the Information Officer is automatically the head of your organisation unless delegated. They must be registered with the Information Regulator before performing their functions." },
    { q: "Can I still send marketing emails and SMSes under POPIA?", a: "Yes, with rules. Electronic direct marketing to non-customers generally requires opt-in consent. Existing customers may be marketed similar products if given an easy opt-out. Every message must identify the sender and offer an opt-out." },
    { q: "What must I do if we have a data breach?", a: "Notify both the Information Regulator and the affected data subjects as soon as reasonably possible after discovering the breach, in writing and with enough detail for people to protect themselves." },
    { q: "What are the penalties for POPIA non-compliance?", a: "Administrative fines of up to R10 million, or on conviction for certain offences, fines and/or imprisonment of up to 10 years. Data subjects can also institute civil claims." },
    { q: "Where should my business start with POPIA?", a: "Start with a readiness assessment, then map your data, appoint and register your Information Officer, put policies and privacy notices in place, secure operator agreements, implement safeguards and train staff." },
  ].map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="page-head">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> · FAQ</div>
          <h1>Data Privacy FAQ</h1>
          <p>
            Straight answers to the questions South African businesses ask most
            about POPIA and data privacy. For advice specific to your situation,
            get in touch.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="faq">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 className="faq__cat">{group.heading}</h2>
                <FaqAccordion items={group.items} />
              </div>
            ))}
          </div>

          <div className="center" style={{ marginTop: 50 }}>
            <p className="lead">Still have a question we haven&apos;t covered?</p>
            <Link className="btn btn--primary btn--lg" href="/contact">Ask a specialist</Link>
          </div>
        </div>
      </section>
    </>
  );
}
