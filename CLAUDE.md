# Sentinel Privacy

Marketing website for **Sentinel Privacy**, a South African data-privacy
(POPIA) consulting business. Built with **Next.js (App Router, TypeScript)**
and exported as a fully static site, with a Decap CMS admin for the blog.
Fast, self-contained, no third-party trackers on public pages.

## Commands

```bash
npm install        # install dependencies (once)
npm run dev        # local dev server at http://localhost:8080
npm run build      # static export into out/
npm run admin      # local Decap CMS backend (admin at /admin, no login)
```

Deploy target is **Netlify** (`netlify.toml`): build `npm run build`, publish
`out`. Every push to the live branch rebuilds and redeploys.

## Architecture

- **Next.js App Router** with `output: "export"` in `next.config.mjs`, so the
  build produces plain static HTML in `out/`. There is no server at runtime.
  If we ever add API routes, auth or a client portal, remove that export line.
- `trailingSlash: true` and `images.unoptimized: true` are required for the
  static export and clean URLs on any static host.
- **Pages** live in `app/<route>/page.tsx`. Routes are clean URLs
  (`/about`, `/services`, `/blog/<slug>`), not `.html` files.
- **Blog is generated from Markdown** in `content/posts/*.md` with front
  matter. `lib/posts.ts` reads and renders them (gray-matter + marked);
  `app/blog/[slug]/page.tsx` uses `generateStaticParams` so every post is
  prerendered. The blog index and `app/sitemap.ts` list posts automatically.
- **Shared chrome is componentised**: `components/Header.tsx` and
  `components/Footer.tsx` are used by `app/layout.tsx`, so nav/footer changes
  happen in exactly one place.
- Interactive pieces are client components: `Assessment.tsx` (the POPIA gap
  test), `ContactForm.tsx`, `FaqAccordion.tsx`, `Reveal.tsx`, `Counter.tsx`.
- Central data: `lib/site.ts` (domain, email, locations, nav). Change the
  domain there.
- SEO: per-page `metadata` exports, JSON-LD injected per page, plus
  `app/sitemap.ts` and `app/robots.ts` (both generated at build time).
- Styling: one design system in `app/globals.css`. Class names are shared with
  the components; keep using those classes rather than adding new systems.
- Admin: `public/admin/index.html` + `config.yml` (Decap CMS, `/admin`),
  pointed at `content/posts`.

## Adding a blog post

- Via CMS: `/admin` -> Blog posts -> New (needs Netlify Identity + Git Gateway
  enabled; see README).
- By hand: copy a file in `content/posts/`, rename it (the filename becomes the
  URL: `my-post.md` -> `/blog/my-post`), edit front matter + body, commit.
  Nothing else to touch: the blog index, related posts and sitemap update
  themselves.
- The home page shows the three most recent posts automatically.

## Gotchas worth remembering

- Front matter `date:` is parsed by YAML into a **Date object**. `lib/posts.ts`
  normalises it via `toIsoDate()`; don't naively `String(...).slice(0,10)` it,
  that produces wrong years.
- `Counter.tsx` server-renders the **final** number and only animates after
  mount, so static HTML and no-JS visitors see real values, not zeros.
- Links inside Markdown posts must use clean URLs (`/services/`), not `.html`.

## Project conventions & standing preferences

- **Never use em dashes (the U+2014 "long dash" character) anywhere.** Use a
  hyphen ( - ) for a pause, or reword. This applies to all copy, code comments,
  and commit messages. En dashes are only for numeric/day ranges (e.g. Mon-Fri,
  1-10). This is a hard rule for this project and the owner's general preference.
- **Anonymous brand.** No named individuals anywhere (owner runs this
  discreetly). Positioning is brand-first / "confidential by design". Do not
  add team names or bios.
- **Contact rules.** No phone number anywhere on the site. The email address
  appears **only on the contact page**; every other page routes people to the
  contact form ("Send us a message"). Show SA presence as
  "Cape Town · Johannesburg · Durban" + "Remote support nationwide" - no street
  address. The contact form is wired for Netlify Forms.
- **Hero CTA.** The top banner has a single primary (green) button linking to
  the free test (`/assessment`) - do not add a second hero button.
- **SEO.** Every page needs a unique title, meta description, canonical,
  Open Graph + Twitter tags, `geo.region`/`geo.placename` meta, and relevant
  JSON-LD.
- **Self-contained.** No external CDNs/fonts/trackers on public pages (the one
  exception is the Decap script on `/admin`, which is owner-only).
- **Placeholder domain** `sentinelprivacy.co.za` is used until a real domain is
  chosen. `lib/site.ts` is the single source of truth for it.

## Git

Develop on branch `claude/sa-data-privacy-website-69j009`. Commit and push only
when asked. Do not create pull requests unless explicitly requested.
