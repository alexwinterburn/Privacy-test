/* ============================================================
   Sentinel Privacy — POPIA Readiness Gap Test
   Client-side scoring across 8 POPIA condition areas.
   ============================================================ */
(function () {
  "use strict";

  var root = document.getElementById("assessment");
  if (!root) return;

  /* Each question belongs to a category (a POPIA compliance domain).
     Options carry a weight: 2 = in place, 1 = partial, 0 = not in place / unsure. */
  var QUESTIONS = [
    {
      cat: "Accountability & Governance",
      q: "Has your business appointed and registered an Information Officer with the Information Regulator?",
      opts: [
        ["Yes — appointed and registered with the Regulator", 2],
        ["Appointed internally but not registered", 1],
        ["No, or I'm not sure", 0]
      ]
    },
    {
      cat: "Accountability & Governance",
      q: "Do you have a documented, board-approved data protection / POPIA compliance policy?",
      opts: [
        ["Yes — documented and reviewed regularly", 2],
        ["We have an informal or draft policy", 1],
        ["No documented policy", 0]
      ]
    },
    {
      cat: "Data Mapping & Processing",
      q: "Do you maintain a record (data inventory) of the personal information you collect, where it is stored and why?",
      opts: [
        ["Yes — a maintained, up-to-date data inventory", 2],
        ["Partially — some data is documented", 1],
        ["No data inventory exists", 0]
      ]
    },
    {
      cat: "Data Mapping & Processing",
      q: "Do you only collect personal information that is adequate, relevant and necessary for a defined purpose (minimality)?",
      opts: [
        ["Yes — collection is limited to what we need", 2],
        ["Sometimes we collect more than strictly needed", 1],
        ["We collect broadly / haven't assessed this", 0]
      ]
    },
    {
      cat: "Consent & Lawful Processing",
      q: "Do you capture and record a lawful basis (e.g. consent, contract, legal obligation) for processing personal information?",
      opts: [
        ["Yes — lawful basis is recorded per processing activity", 2],
        ["We rely on consent but don't always record it", 1],
        ["No — we haven't formalised a lawful basis", 0]
      ]
    },
    {
      cat: "Consent & Lawful Processing",
      q: "For direct marketing, do you obtain and honour opt-in consent and provide an easy opt-out?",
      opts: [
        ["Yes — opt-in captured and opt-out always honoured", 2],
        ["We offer opt-out but not clear opt-in", 1],
        ["No formal marketing consent process", 0]
      ]
    },
    {
      cat: "Data Subject Rights",
      q: "Can you respond to data subject requests (access, correction, deletion, objection) within a reasonable time?",
      opts: [
        ["Yes — a defined process and owner exist", 2],
        ["We'd handle it ad hoc / manually", 1],
        ["No process in place", 0]
      ]
    },
    {
      cat: "Data Subject Rights",
      q: "Do your privacy notices tell people what data you collect, why, and their rights under POPIA?",
      opts: [
        ["Yes — clear, accessible privacy notices are published", 2],
        ["We have a basic notice that may be outdated", 1],
        ["No privacy notice, or unsure", 0]
      ]
    },
    {
      cat: "Security Safeguards",
      q: "Do you apply technical and organisational security measures (access control, encryption, backups) to protect personal information?",
      opts: [
        ["Yes — layered safeguards are documented and tested", 2],
        ["Some controls exist but aren't formalised", 1],
        ["Minimal or no documented safeguards", 0]
      ]
    },
    {
      cat: "Security Safeguards",
      q: "Do you have a documented process to detect, contain and report a data breach (security compromise)?",
      opts: [
        ["Yes — an incident response plan is in place", 2],
        ["We'd react but have no written plan", 1],
        ["No breach-response process", 0]
      ]
    },
    {
      cat: "Operator & Third-Party Management",
      q: "Do you have written contracts (operator agreements) with third parties who process personal information on your behalf?",
      opts: [
        ["Yes — POPIA-compliant operator agreements are in place", 2],
        ["Some contracts exist but lack data clauses", 1],
        ["No operator agreements", 0]
      ]
    },
    {
      cat: "Cross-Border & Retention",
      q: "Do you know when personal information leaves South Africa and have safeguards for cross-border transfers?",
      opts: [
        ["Yes — transfers are mapped and safeguarded", 2],
        ["We think some data goes offshore but haven't checked", 1],
        ["No — we haven't assessed cross-border flows", 0]
      ]
    },
    {
      cat: "Cross-Border & Retention",
      q: "Do you have data retention schedules that delete or de-identify personal information when no longer needed?",
      opts: [
        ["Yes — retention schedules are defined and followed", 2],
        ["Informal — we keep most data indefinitely", 1],
        ["No retention rules", 0]
      ]
    },
    {
      cat: "Awareness & Training",
      q: "Have your staff received POPIA / data-protection awareness training in the last 12 months?",
      opts: [
        ["Yes — regular, role-appropriate training", 2],
        ["Once-off or partial training", 1],
        ["No staff training", 0]
      ]
    }
  ];

  var TESTIMONIAL_MAX = QUESTIONS.length * 2;
  var answers = new Array(QUESTIONS.length).fill(null);
  var current = 0;

  /* --- Element refs --- */
  var intro = document.getElementById("assess-intro");
  var quiz = document.getElementById("assess-quiz");
  var results = document.getElementById("assess-results");
  var startBtn = document.getElementById("assess-start");
  var bar = document.getElementById("assess-progress");
  var meta = document.getElementById("assess-meta");
  var qHost = document.getElementById("assess-qhost");
  var prevBtn = document.getElementById("assess-prev");
  var nextBtn = document.getElementById("assess-next");

  function show(el) { el.classList.remove("hidden"); }
  function hide(el) { el.classList.add("hidden"); }

  function renderQuestion() {
    var Q = QUESTIONS[current];
    var pct = Math.round((current) / QUESTIONS.length * 100);
    bar.style.width = pct + "%";
    meta.innerHTML = "<span>Question " + (current + 1) + " of " + QUESTIONS.length +
                     "</span><span>" + Q.cat + "</span>";

    var html = '<div class="q-card">';
    html += '<div class="q-card__cat">' + Q.cat + '</div>';
    html += '<div class="q-card__q">' + Q.q + '</div>';
    html += '<div class="q-options" role="radiogroup" aria-label="Answer options">';
    Q.opts.forEach(function (opt, i) {
      var sel = answers[current] === i ? " selected" : "";
      var checked = answers[current] === i ? "true" : "false";
      html += '<label class="q-option' + sel + '" role="radio" aria-checked="' + checked + '" tabindex="0" data-i="' + i + '">' +
                '<span class="dot"></span>' +
                '<span>' + opt[0] + '</span>' +
              '</label>';
    });
    html += '</div></div>';
    qHost.innerHTML = html;

    qHost.querySelectorAll(".q-option").forEach(function (el) {
      function choose() {
        answers[current] = parseInt(el.getAttribute("data-i"), 10);
        qHost.querySelectorAll(".q-option").forEach(function (o) {
          o.classList.remove("selected"); o.setAttribute("aria-checked", "false");
        });
        el.classList.add("selected"); el.setAttribute("aria-checked", "true");
        nextBtn.disabled = false;
      }
      el.addEventListener("click", choose);
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); }
      });
    });

    prevBtn.classList.toggle("hidden", current === 0);
    nextBtn.disabled = answers[current] === null;
    nextBtn.textContent = current === QUESTIONS.length - 1 ? "See my results  →" : "Next  →";
  }

  function computeResults() {
    // Aggregate by category
    var cats = {};
    var totalScore = 0;
    QUESTIONS.forEach(function (Q, i) {
      var s = Q.opts[answers[i]][1];
      totalScore += s;
      if (!cats[Q.cat]) cats[Q.cat] = { score: 0, max: 0 };
      cats[Q.cat].score += s;
      cats[Q.cat].max += 2;
    });
    var overall = Math.round(totalScore / TESTIMONIAL_MAX * 100);

    var tier, tierClass, tierMsg;
    if (overall >= 75) {
      tier = "Well positioned"; tierClass = "tier--high";
      tierMsg = "Your business shows strong POPIA foundations. A focused review can close the remaining gaps and give you documented assurance.";
    } else if (overall >= 45) {
      tier = "Partial readiness"; tierClass = "tier--med";
      tierMsg = "You've made a start, but there are meaningful gaps that could expose your business to complaints, fines or reputational harm. Prioritising these is worthwhile.";
    } else {
      tier = "High risk"; tierClass = "tier--low";
      tierMsg = "Significant POPIA gaps were identified. Your business may be exposed to regulatory action and data-breach risk. We'd strongly recommend a structured remediation plan.";
    }

    // Gauge
    var circumference = 2 * Math.PI * 85;
    var offset = circumference * (1 - overall / 100);
    var gaugeColor = overall >= 75 ? "#2e9e5b" : overall >= 45 ? "#e0a106" : "#d9534f";

    var html = '';
    html += '<div class="result-hero">';
    html += '<div class="gauge">';
    html += '<svg width="200" height="200" viewBox="0 0 200 200">' +
              '<circle cx="100" cy="100" r="85" fill="none" stroke="#eef2f7" stroke-width="16"/>' +
              '<circle cx="100" cy="100" r="85" fill="none" stroke="' + gaugeColor + '" stroke-width="16" ' +
                'stroke-linecap="round" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + circumference + '" ' +
                'style="transition:stroke-dashoffset 900ms ease" id="gauge-arc"/></svg>';
    html += '<div class="gauge__num"><div><b>' + overall + '%</b><br><span>POPIA readiness</span></div></div>';
    html += '</div>';
    html += '<div class="tier ' + tierClass + '">' + tier + '</div>';
    html += '<p class="lead center" style="margin-top:18px">' + tierMsg + '</p>';
    html += '</div>';

    // Category breakdown
    html += '<h3 style="margin-top:20px">Your results by area</h3>';
    html += '<div class="score-cats">';
    Object.keys(cats).forEach(function (name) {
      var c = cats[name];
      var p = Math.round(c.score / c.max * 100);
      var col = p >= 75 ? "#2e9e5b" : p >= 45 ? "#e0a106" : "#d9534f";
      html += '<div class="score-cat">' +
                '<div class="score-cat__head"><span>' + name + '</span><span>' + p + '%</span></div>' +
                '<div class="score-cat__bar"><span style="width:' + p + '%;background:' + col + '"></span></div>' +
              '</div>';
    });
    html += '</div>';

    // Priority gaps (categories scoring below 75%)
    var gaps = Object.keys(cats).filter(function (n) {
      return cats[n].score / cats[n].max < 0.75;
    });
    if (gaps.length) {
      html += '<h3>Priority areas to address</h3>';
      html += '<ul class="gap-list">';
      gaps.forEach(function (n) {
        html += '<li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d9534f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span><b>' + n + '</b> — this area needs attention to reduce your compliance risk.</span></li>';
      });
      html += '</ul>';
    } else {
      html += '<ul class="gap-list"><li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e9e5b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>No major gaps flagged — a verification review can confirm and document your compliance.</span></li></ul>';
    }

    // Next steps CTA
    html += '<div class="cta-band" style="margin-top:40px">' +
              '<h2>Want a detailed, expert breakdown?</h2>' +
              '<p>This free test is a starting point. Book a complimentary 30-minute consultation and our specialists will walk you through your results and a practical remediation roadmap.</p>' +
              '<a class="btn btn--gold btn--lg" href="contact.html">Book my free consultation</a>' +
              '<a class="btn btn--light btn--lg" href="services.html">See how we help</a>' +
            '</div>';

    html += '<p class="center text-muted" style="margin-top:24px;font-size:.85rem">This self-assessment is for general guidance only and does not constitute legal advice. ' +
            '<a href="#" id="assess-restart">Retake the test</a></p>';

    results.innerHTML = html;

    // Animate gauge after paint
    requestAnimationFrame(function () {
      var arc = document.getElementById("gauge-arc");
      if (arc) requestAnimationFrame(function () { arc.style.strokeDashoffset = offset; });
    });

    var restart = document.getElementById("assess-restart");
    if (restart) restart.addEventListener("click", function (e) {
      e.preventDefault();
      answers = new Array(QUESTIONS.length).fill(null);
      current = 0;
      hide(results); hide(quiz); show(intro);
      window.scrollTo({ top: root.offsetTop - 80, behavior: "smooth" });
    });
  }

  /* --- Wiring --- */
  startBtn.addEventListener("click", function () {
    hide(intro); show(quiz);
    current = 0; renderQuestion();
    window.scrollTo({ top: root.offsetTop - 80, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", function () {
    if (current > 0) { current--; renderQuestion(); }
  });

  nextBtn.addEventListener("click", function () {
    if (answers[current] === null) return;
    if (current < QUESTIONS.length - 1) {
      current++; renderQuestion();
    } else {
      bar.style.width = "100%";
      hide(quiz); show(results);
      computeResults();
      window.scrollTo({ top: root.offsetTop - 80, behavior: "smooth" });
    }
  });
})();
