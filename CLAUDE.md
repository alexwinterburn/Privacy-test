# Sentinel Privacy

Marketing website for **Sentinel Privacy**, a South African data-privacy
(POPIA) consulting business. Static site built with Eleventy, with a Decap CMS
admin for the blog. Fast, self-contained, no third-party trackers on public
pages.

## Commands

```bash
npm install        # install build tooling (once)
npm run build      # build the site into _site/  (Eleventy)
npm run start      # local preview at http://localhost:8080
npm run dev        # site + local Decap CMS backend (admin at /admin, no login)
```

Deploy target is **Netlify** (`netlify.toml`): build `npm run build`, publish
`_site`. Every push to the live branch rebuilds and redeploys.

## Architecture

- Source lives in `src/`; Eleventy outputs the finished site to `_site/`
  (git-ignored). Never edit `_site/` by hand.
- **Static marketing pages** (`src/index.html`, `about.html`, `services.html`,
  `faq.html`, `assessment.html`, `contact.html`, `privacy-policy.html`,
  `paia.html`) are hand-authored HTML. They pass through the build **verbatim**
  (`htmlTemplateEngine: false` + listed in `STATIC_PAGES` in `.eleventy.js`),
  so their inline JSON-LD, styles and header/footer are copied unchanged. Edit
  these files directly.
- **Blog is generated.** Posts are Markdown in `src/posts/*.md` with front
  matter; each becomes `blog-<slug>.html` via `src/_includes/layouts/post.njk`.
  `src/blog.njk` builds the blog index and `src/sitemap.njk` generates
  `sitemap.xml` - both list posts automatically.
- Shared chrome for generated pages: `src/_includes/partials/header.njk`,
  `footer.njk`, and `layouts/base.njk` (SEO head). **Static pages duplicate the
  header/footer inline** - if you change nav or footer, update the static pages
  AND the partials to keep them in sync.
- Central data for generated pages: `src/_data/site.json` (domain, locations,
  hours). Static pages hardcode the domain and details inline.
- Admin: `src/admin/index.html` + `config.yml` (Decap CMS, `/admin`).
- Styling: one design system in `src/css/styles.css`. Behaviour in
  `src/js/main.js` (nav, FAQ, reveals, counters, contact form) and
  `src/js/assessment.js` (the POPIA gap test).

## Adding a blog post

- Via CMS: `/admin` -> Blog posts -> New (needs Netlify Identity + Git Gateway
  enabled; see README).
- By hand: copy a file in `src/posts/`, rename it (`my-post.md` ->
  `blog-my-post.html`), edit front matter + body, commit. Nothing else to touch.
- The three posts featured on the home page are listed manually in
  `src/index.html`; the blog page updates itself.

## Project conventions & standing preferences

- **Never use em dashes (the U+2014 "long dash" character) anywhere.** Use a hyphen ( - ) for a pause, or
  reword. This applies to all copy, code comments, and commit messages. En
  dashes are only for numeric/day ranges (e.g. Mon-Fri, 1-10). This is a hard
  rule for this project and the owner's general preference.
- **Anonymous brand.** No named individuals anywhere (owner runs this
  discreetly). Positioning is brand-first / "confidential by design". Do not
  add team names or bios.
- **Contact rules.** No phone number anywhere on the site. The email address
  appears **only on the contact page**; every other page routes people to the
  contact form ("Send us a message"). Show SA presence as
  "Cape Town · Johannesburg · Durban" + "Remote support nationwide" - no street
  address. The contact form is wired for Netlify Forms.
- **Hero CTA.** The top banner has a single primary (green) button linking to
  the free test (`assessment.html`) - do not add a second hero button.
- **SEO.** Every page needs a unique title, meta description, canonical,
  Open Graph + Twitter tags, `geo.region`/`geo.placename` meta, and relevant
  JSON-LD. Keep `sitemap.xml` (generated) and `robots.txt` current.
- **Self-contained.** No external CDNs/fonts/trackers on public pages (the one
  exception is the Decap script on `/admin`, which is owner-only).
- **Placeholder domain** `sentinelprivacy.co.za` is used throughout until a
  real domain is chosen. `src/_data/site.json` is the single source for
  generated pages; static pages need a find-and-replace when the domain changes.

## Git

Develop on branch `claude/sa-data-privacy-website-69j009`. Commit and push only
when asked. Do not create pull requests unless explicitly requested.
