"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Question = { cat: string; q: string; opts: [string, number][] };

/* 14 questions across 8 POPIA compliance areas.
   Weights: 2 = in place, 1 = partial, 0 = not in place / unsure. */
const QUESTIONS: Question[] = [
  {
    cat: "Accountability & Governance",
    q: "Has your business appointed and registered an Information Officer with the Information Regulator?",
    opts: [["Yes, appointed and registered with the Regulator", 2], ["Appointed internally but not registered", 1], ["No, or I'm not sure", 0]],
  },
  {
    cat: "Accountability & Governance",
    q: "Do you have a documented, board-approved data protection / POPIA compliance policy?",
    opts: [["Yes, documented and reviewed regularly", 2], ["We have an informal or draft policy", 1], ["No documented policy", 0]],
  },
  {
    cat: "Data Mapping & Processing",
    q: "Do you maintain a record (data inventory) of the personal information you collect, where it is stored and why?",
    opts: [["Yes, a maintained, up-to-date data inventory", 2], ["Partially, some data is documented", 1], ["No data inventory exists", 0]],
  },
  {
    cat: "Data Mapping & Processing",
    q: "Do you only collect personal information that is adequate, relevant and necessary for a defined purpose (minimality)?",
    opts: [["Yes, collection is limited to what we need", 2], ["Sometimes we collect more than strictly needed", 1], ["We collect broadly / haven't assessed this", 0]],
  },
  {
    cat: "Consent & Lawful Processing",
    q: "Do you capture and record a lawful basis (e.g. consent, contract, legal obligation) for processing personal information?",
    opts: [["Yes, lawful basis is recorded per processing activity", 2], ["We rely on consent but don't always record it", 1], ["No, we haven't formalised a lawful basis", 0]],
  },
  {
    cat: "Consent & Lawful Processing",
    q: "For direct marketing, do you obtain and honour opt-in consent and provide an easy opt-out?",
    opts: [["Yes, opt-in captured and opt-out always honoured", 2], ["We offer opt-out but not clear opt-in", 1], ["No formal marketing consent process", 0]],
  },
  {
    cat: "Data Subject Rights",
    q: "Can you respond to data subject requests (access, correction, deletion, objection) within a reasonable time?",
    opts: [["Yes, a defined process and owner exist", 2], ["We'd handle it ad hoc / manually", 1], ["No process in place", 0]],
  },
  {
    cat: "Data Subject Rights",
    q: "Do your privacy notices tell people what data you collect, why, and their rights under POPIA?",
    opts: [["Yes, clear, accessible privacy notices are published", 2], ["We have a basic notice that may be outdated", 1], ["No privacy notice, or unsure", 0]],
  },
  {
    cat: "Security Safeguards",
    q: "Do you apply technical and organisational security measures (access control, encryption, backups) to protect personal information?",
    opts: [["Yes, layered safeguards are documented and tested", 2], ["Some controls exist but aren't formalised", 1], ["Minimal or no documented safeguards", 0]],
  },
  {
    cat: "Security Safeguards",
    q: "Do you have a documented process to detect, contain and report a data breach (security compromise)?",
    opts: [["Yes, an incident response plan is in place", 2], ["We'd react but have no written plan", 1], ["No breach-response process", 0]],
  },
  {
    cat: "Operator & Third-Party Management",
    q: "Do you have written contracts (operator agreements) with third parties who process personal information on your behalf?",
    opts: [["Yes, POPIA-compliant operator agreements are in place", 2], ["Some contracts exist but lack data clauses", 1], ["No operator agreements", 0]],
  },
  {
    cat: "Cross-Border & Retention",
    q: "Do you know when personal information leaves South Africa and have safeguards for cross-border transfers?",
    opts: [["Yes, transfers are mapped and safeguarded", 2], ["We think some data goes offshore but haven't checked", 1], ["No, we haven't assessed cross-border flows", 0]],
  },
  {
    cat: "Cross-Border & Retention",
    q: "Do you have data retention schedules that delete or de-identify personal information when no longer needed?",
    opts: [["Yes, retention schedules are defined and followed", 2], ["Informal, we keep most data indefinitely", 1], ["No retention rules", 0]],
  },
  {
    cat: "Awareness & Training",
    q: "Have your staff received POPIA / data-protection awareness training in the last 12 months?",
    opts: [["Yes, regular, role-appropriate training", 2], ["Once-off or partial training", 1], ["No staff training", 0]],
  },
];

const MAX = QUESTIONS.length * 2;

type Stage = "intro" | "quiz" | "results";

export default function Assessment() {
  const [stage, setStage] = useState<Stage>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );

  const results = useMemo(() => {
    if (stage !== "results") return null;
    const cats: Record<string, { score: number; max: number }> = {};
    let total = 0;
    QUESTIONS.forEach((question, i) => {
      const score = question.opts[answers[i] ?? 0][1];
      total += score;
      cats[question.cat] ??= { score: 0, max: 0 };
      cats[question.cat].score += score;
      cats[question.cat].max += 2;
    });
    const overall = Math.round((total / MAX) * 100);
    const tier =
      overall >= 75
        ? { label: "Well positioned", cls: "tier--high", colour: "#2e9e5b", msg: "Your business shows strong POPIA foundations. A focused review can close the remaining gaps and give you documented assurance." }
        : overall >= 45
        ? { label: "Partial readiness", cls: "tier--med", colour: "#e0a106", msg: "You've made a start, but there are meaningful gaps that could expose your business to complaints, fines or reputational harm. Prioritising these is worthwhile." }
        : { label: "High risk", cls: "tier--low", colour: "#d9534f", msg: "Significant POPIA gaps were identified. Your business may be exposed to regulatory action and data-breach risk. We'd strongly recommend a structured remediation plan." };
    const gaps = Object.keys(cats).filter((c) => cats[c].score / cats[c].max < 0.75);
    return { cats, overall, tier, gaps };
  }, [stage, answers]);

  const select = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
  };

  const next = () => {
    if (answers[current] === null) return;
    if (current < QUESTIONS.length - 1) setCurrent((c) => c + 1);
    else setStage("results");
  };

  const restart = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrent(0);
    setStage("intro");
  };

  /* ---------- Intro ---------- */
  if (stage === "intro") {
    return (
      <div className="assess">
        <div className="card" style={{ textAlign: "center", padding: "40px 30px" }}>
          <div className="card__icon" style={{ margin: "0 auto 20px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
          </div>
          <h2>How ready is your business for POPIA?</h2>
          <p className="lead" style={{ margin: "0 auto 6px" }}>
            In about 5 minutes you&apos;ll get an instant readiness score, a breakdown
            across 8 compliance areas, and your priority gaps to address.
          </p>
          <div className="grid grid--3" style={{ margin: "32px 0", textAlign: "left" }}>
            <div><b style={{ color: "var(--gold)", fontSize: "1.8rem" }}>14</b><p style={{ margin: 0 }}>Focused questions</p></div>
            <div><b style={{ color: "var(--gold)", fontSize: "1.8rem" }}>8</b><p style={{ margin: 0 }}>POPIA areas scored</p></div>
            <div><b style={{ color: "var(--gold)", fontSize: "1.8rem" }}>0</b><p style={{ margin: 0 }}>Cost &amp; sign-ups</p></div>
          </div>
          <button className="btn btn--primary btn--lg" onClick={() => setStage("quiz")}>
            Start the test  →
          </button>
          <p className="text-muted" style={{ marginTop: 18, fontSize: ".85rem" }}>
            Your answers stay in your browser. We don&apos;t store or transmit them.
          </p>
        </div>
      </div>
    );
  }

  /* ---------- Quiz ---------- */
  if (stage === "quiz") {
    const question = QUESTIONS[current];
    const pct = Math.round((current / QUESTIONS.length) * 100);
    return (
      <div className="assess">
        <div className="assess__bar"><span style={{ width: `${pct}%` }} /></div>
        <div className="assess__meta">
          <span>Question {current + 1} of {QUESTIONS.length}</span>
          <span>{question.cat}</span>
        </div>

        <div className="q-card">
          <div className="q-card__cat">{question.cat}</div>
          <div className="q-card__q">{question.q}</div>
          <div className="q-options" role="radiogroup" aria-label="Answer options">
            {question.opts.map(([label], i) => {
              const selected = answers[current] === i;
              return (
                <label
                  key={i}
                  className={`q-option${selected ? " selected" : ""}`}
                  role="radio"
                  aria-checked={selected}
                  tabIndex={0}
                  onClick={() => select(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(i); }
                  }}
                >
                  <span className="dot" />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="q-nav" style={{ marginTop: 24 }}>
          {current > 0 && (
            <button className="btn btn--ghost" onClick={() => setCurrent((c) => c - 1)}>
              ←  Previous
            </button>
          )}
          <span style={{ flex: 1 }} />
          <button className="btn btn--primary" onClick={next} disabled={answers[current] === null}>
            {current === QUESTIONS.length - 1 ? "See my results  →" : "Next  →"}
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Results ---------- */
  const r = results!;
  const circumference = 2 * Math.PI * 85;
  const offset = circumference * (1 - r.overall / 100);

  return (
    <div className="assess">
      <div className="result-hero">
        <div className="gauge">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="85" fill="none" stroke="#eef2f7" strokeWidth="16" />
            <circle
              cx="100" cy="100" r="85" fill="none" stroke={r.tier.colour} strokeWidth="16"
              strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 900ms ease" }}
            />
          </svg>
          <div className="gauge__num">
            <div>
              <b>{r.overall}%</b>
              <br />
              <span>POPIA readiness</span>
            </div>
          </div>
        </div>
        <div className={`tier ${r.tier.cls}`}>{r.tier.label}</div>
        <p className="lead center" style={{ marginTop: 18 }}>{r.tier.msg}</p>
      </div>

      <h3 style={{ marginTop: 20 }}>Your results by area</h3>
      <div className="score-cats">
        {Object.entries(r.cats).map(([name, c]) => {
          const p = Math.round((c.score / c.max) * 100);
          const colour = p >= 75 ? "#2e9e5b" : p >= 45 ? "#e0a106" : "#d9534f";
          return (
            <div className="score-cat" key={name}>
              <div className="score-cat__head"><span>{name}</span><span>{p}%</span></div>
              <div className="score-cat__bar"><span style={{ width: `${p}%`, background: colour }} /></div>
            </div>
          );
        })}
      </div>

      <h3>{r.gaps.length ? "Priority areas to address" : "Your standing"}</h3>
      <ul className="gap-list">
        {r.gaps.length ? (
          r.gaps.map((name) => (
            <li key={name}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d9534f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              <span><b>{name}</b> - this area needs attention to reduce your compliance risk.</span>
            </li>
          ))
        ) : (
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e9e5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            <span>No major gaps flagged. A verification review can confirm and document your compliance.</span>
          </li>
        )}
      </ul>

      <div className="cta-band" style={{ marginTop: 40 }}>
        <h2>Want a detailed, expert breakdown?</h2>
        <p>
          This free test is a starting point. Book a complimentary 30-minute
          consultation and our specialists will walk you through your results and
          a practical remediation roadmap.
        </p>
        <Link className="btn btn--gold btn--lg" href="/contact">Book my free consultation</Link>
        <Link className="btn btn--light btn--lg" href="/services">See how we help</Link>
      </div>

      <p className="center text-muted" style={{ marginTop: 24, fontSize: ".85rem" }}>
        This self-assessment is for general guidance only and does not constitute
        legal advice.{" "}
        <button
          onClick={restart}
          style={{ background: "none", border: 0, padding: 0, color: "var(--teal-600)", cursor: "pointer", font: "inherit", textDecoration: "underline" }}
        >
          Retake the test
        </button>
      </p>
    </div>
  );
}
