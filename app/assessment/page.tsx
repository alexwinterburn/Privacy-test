import type { Metadata } from "next";
import Link from "next/link";
import Assessment from "@/components/Assessment";

export const metadata: Metadata = {
  title: "Free POPIA Readiness Test - Find Your Data Privacy Gaps",
  description:
    "Take our free POPIA readiness test. Answer 14 quick questions and get an instant, categorised view of the data privacy gaps in your South African business.",
  keywords:
    "free POPIA test, POPIA readiness assessment, data privacy gap analysis, POPIA compliance checker South Africa",
  alternates: { canonical: "/assessment" },
};

export default function AssessmentPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> · Take the Test</div>
          <h1>Free POPIA Readiness Test</h1>
          <p>
            Answer 14 quick questions to reveal the data privacy gaps in your
            business. Instant, private and scored across the key POPIA compliance
            areas, no sign-up required.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Assessment />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container center">
          <span className="eyebrow">What happens next</span>
          <h2>From snapshot to action plan</h2>
          <p className="lead center">
            The free test is your starting point. When you&apos;re ready to close the
            gaps, our specialists turn your results into a practical, prioritised
            roadmap.
          </p>
          <div className="grid grid--3" style={{ marginTop: 40, textAlign: "left" }}>
            <div className="card"><h3>1 · See your gaps</h3><p>Get an instant readiness score and a breakdown of where your business is exposed.</p></div>
            <div className="card"><h3>2 · Book a free chat</h3><p>Walk through your results with a specialist in a complimentary 30-minute consultation.</p></div>
            <div className="card"><h3>3 · Close the gaps</h3><p>We help you remediate, from policies and training to full compliance support.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
