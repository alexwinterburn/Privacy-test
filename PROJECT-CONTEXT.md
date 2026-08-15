# Sentinel Privacy - Project Context

Paste this into a Claude Project's instructions (or a new chat) to give full
context on this website. It is a handoff / briefing document.

---

## 1. What this is

**Sentinel Privacy** is a marketing website for a South African data-privacy
consulting business focused on **POPIA** (the Protection of Personal
Information Act). The site sells consulting services and generates leads: it
explains the offering, answers common POPIA questions, runs a free interactive
"readiness test", and captures enquiries through a contact form.

It is an anonymous, brand-first venture (run discreetly as a side business), so
**no individual people are named anywhere** on the site.

## 2. Business / brand facts

- Brand name: **Sentinel Privacy**
- Positioning line: "Protect your business. Respect your customers' data."
- Market: South African businesses of all sizes needing POPIA compliance.
- Services offered: POPIA gap assessments, privacy operating model design
  (advising on and designing a firm's privacy governance, roles and
  processes), Information Officer support, policies / notices / PAIA manuals,
  staff awareness training, breach and incident response, and ongoing
  "compliance-as-a-service".
- Tone: practical, plain-language, jargon-free, credible, not fear-mongering.
- Presence shown as "Cape Town, Johannesburg and Durban" plus "remote support
  nationwide". No street address is published.
- Domain is a placeholder: `sentinelprivacy.co.za` (to be replaced with the
  real domain before launch).

## 3. What has been built

Pages (all responsive, SEO-optimised, self-contained):

- **Home** - hero with a single call-to-action, POPIA risk stats (animated
  counters), services overview, a 4-step approach, a blog preview, and
  testimonials.
- **About Us** - story, values, and an anonymous "expertise" section (three
  disciplines, no names) plus a "confidential by design" statement.
- **Services** - the seven services in detail (including privacy operating
  model design), plus who we help and the process.
- **FAQ** - about 19 South-Africa-specific POPIA questions in an accordion,
  with FAQ structured data for search engines.
- **Take the Test** - a free, interactive POPIA readiness questionnaire (14
  questions across 8 POPIA areas). It scores entirely in the browser and shows
  a readiness gauge, a per-category breakdown, and prioritised gaps, then funnels
  to a consultation. No data leaves the visitor's browser.
- **Blog** - an index plus four in-depth articles (POPIA checklist, Information
  Officer explainer, 5 costly mistakes, direct-marketing rules).
- **Contact** - a validated enquiry form (wired for Netlify Forms) with the
  email address shown, plus location and hours.
- **Privacy Policy** and **PAIA Manual** - the site's own compliance pages.

Design and features:

- Custom design system, custom SVG illustrations, subtle animations (hero
  orbs, floating badges, an industries marquee, animated counters, scroll
  reveals, hover effects).
- Full SEO: unique titles / meta descriptions / canonical URLs, Open Graph and
  Twitter cards, JSON-LD structured data, geo meta tags, a generated
  `sitemap.xml` and `robots.txt`, and a 1200x630 social-share image.
- No third-party trackers or external requests on public pages.

## 4. How it is built (tech)

- **Next.js (App Router + TypeScript)**, exported as a fully static site.
  Source pages are in `app/`, the built site lands in `out/`. There is no
  server at runtime, which keeps hosting cheap and simple.
- The **blog is generated from Markdown** files in `content/posts/`; each
  becomes a prerendered page at `/blog/<slug>`, and the blog index and
  sitemap update automatically.
- **Blog admin via Decap CMS** at `/admin`: a friendly editor (title, date,
  category, cover image, tags, SEO fields, rich-text body) with a Publish
  button. It saves a Markdown file and the site rebuilds itself, so posts can
  be added with no coding.
- Header and footer are React components, so nav changes happen in one place.

Commands:
```
npm install     # install dependencies
npm run dev     # local preview at http://localhost:8080
npm run build   # static export into out/
npm run admin   # local CMS backend (http://localhost:8080/admin/)
```

Hosting: designed for **Netlify** (config in `netlify.toml`): build
`npm run build`, publish `out`. Every push rebuilds and redeploys. The
contact form uses Netlify Forms. The CMS login uses Netlify Identity + Git
Gateway (a one-time dashboard setup).

## 5. File structure (orientation)

```
app/                    pages (each folder is a URL)
  layout.tsx            shared header/footer + site-wide SEO
  page.tsx              Home
  about/ services/ faq/ assessment/ contact/
  privacy-policy/ paia/
  blog/                 blog index + blog/[slug] for each post
  sitemap.ts robots.ts  generated at build time
  globals.css           the design system
components/             Header, Footer, Assessment, ContactForm, ...
content/posts/*.md      the blog posts (edit these or use /admin)
lib/site.ts             domain, email, locations, nav
public/                 images + the /admin CMS
```

## 6. Hard rules / conventions (please always follow)

- **Never use em dashes.** Use a hyphen ( - ) or reword. (En dashes are fine
  only for ranges like Mon-Fri.) This is a firm preference for everything.
- **Keep it anonymous.** Never add named individuals, bios, or personal
  contact details. Brand-first, "confidential by design".
- **Contact rules.** No phone number anywhere. The email address appears only
  on the Contact page; other pages point people to the contact form. Show the
  three-city presence and "remote nationwide", never a street address.
- **Hero.** One primary (green) button in the top banner, linking to the free
  test. Do not add a second hero button.
- **SEO.** Every page needs a unique title, meta description, canonical, Open
  Graph + Twitter tags, geo meta, and relevant JSON-LD; keep the sitemap current.
- **Self-contained.** No external CDNs, fonts, or trackers on public pages.
- Content is general information, not legal advice, and should say so.

## 7. Before launch (open items)

- Choose the real domain and replace `sentinelprivacy.co.za` throughout
  (it lives in one place: `lib/site.ts`).
- Deploy to Netlify, connect the domain, enable Identity + Git Gateway for the
  admin, and confirm the contact form delivers.
- Replace any placeholder details and illustrative testimonials with real ones
  when available.
- Optional: privacy-friendly analytics (e.g. Plausible or Cloudflare Web
  Analytics), and a dedicated Information Officer contact channel later.

## 8. Where the code lives

Git repository, working branch: `claude/sa-data-privacy-website-69j009`.
The project is set up for Claude Code (see `CLAUDE.md`).

---

*Use this document as background. When helping with this project, keep to the
hard rules in section 6 - especially: no em dashes, stay anonymous, no phone
number, and a single green hero button.*
