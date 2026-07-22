# Sentinel Privacy — POPIA Data Privacy Consulting Website

A complete, responsive, multi-page marketing website for a South African
data-privacy consulting business, focused on the **Protection of Personal
Information Act (POPIA)**.

Built as a fast, dependency-free **static site** — plain HTML, CSS and
vanilla JavaScript. No build step, no frameworks, no external requests.

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Overview, value proposition, services preview, process, testimonials |
| About Us | `about.html` | Company story, values, team and stats |
| Our Services | `services.html` | Detailed service offering and who we help |
| FAQ | `faq.html` | South-Africa-specific data-privacy / POPIA questions & answers |
| Take the Test | `assessment.html` | Free, interactive POPIA gap-analysis questionnaire |
| Contact | `contact.html` | Validated contact / enquiry form and contact details |

## Key features

- **Interactive POPIA readiness test** (`js/assessment.js`) — 14 questions
  across 8 POPIA compliance areas, with instant client-side scoring, an
  animated readiness gauge, per-category breakdown and prioritised gaps.
- **Accessible contact form** (`js/main.js`) — client-side validation with
  inline errors and a success state. (Static demo — wire up a backend or a
  form service such as Formspree to receive real submissions.)
- **Responsive design** — mobile-first, works from small phones to desktop.
- **Accordion FAQ**, scroll-reveal animations, sticky navigation with a
  mobile menu, and a cohesive design system in `css/styles.css`.
- **No external dependencies** — no CDNs, fonts or trackers; everything is
  self-contained, so it loads fast and respects visitor privacy.

## Project structure

```
.
├── index.html
├── about.html
├── services.html
├── faq.html
├── assessment.html
├── contact.html
├── css/
│   └── styles.css
└── js/
    ├── main.js         # nav, FAQ, reveals, contact-form validation
    └── assessment.js   # the POPIA gap test engine
```

## Running locally

It's a static site — just open `index.html` in a browser, or serve the
folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Going to production

- Point the contact form at a real handler (backend endpoint or a hosted
  form service) — see the note in `js/main.js`.
- Replace placeholder contact details, addresses and the team section with
  your real business information.
- Deploy anywhere that serves static files (Netlify, Vercel, GitHub Pages,
  Cloudflare Pages, S3, etc.).

## Disclaimer

The content on this site is general information about POPIA and does not
constitute legal advice.
