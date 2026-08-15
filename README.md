# Sentinel Privacy - POPIA Data Privacy Consulting Website

A fast, responsive marketing website for a South African data-privacy
(POPIA) consulting business, with a **blog you manage through an admin panel**,
no coding required to publish articles.

- Built with **Next.js (App Router + TypeScript)** and exported as a **fully
  static site**, so there is no server to maintain and hosting stays cheap.
- **Blog admin** powered by [Decap CMS](https://decapcms.org/) at `/admin`:
  write posts in a friendly editor and hit *Publish*.
- **SEO-ready**: per-page metadata, Open Graph/Twitter cards, JSON-LD
  structured data (incl. FAQ + BlogPosting), generated `sitemap.xml` and
  `robots.txt`.
- **No third-party trackers** on the public pages.

---

## Table of contents
1. [How the site is structured](#how-the-site-is-structured)
2. [Editing the site](#editing-the-site)
3. [Writing blog posts (the admin panel)](#writing-blog-posts-the-admin-panel)
4. [Running it locally](#running-it-locally)
5. [Hosting & going live (Netlify)](#hosting--going-live-netlify)
6. [Turning on the admin panel](#turning-on-the-admin-panel)
7. [Changing your domain & details in one place](#changing-your-domain--details-in-one-place)
8. [Launch checklist](#launch-checklist)

---

## How the site is structured

```
app/                       pages (each folder is a URL)
├── layout.tsx             shared shell: header, footer, site-wide SEO
├── page.tsx               Home
├── about/page.tsx         About Us
├── services/page.tsx      Services
├── faq/page.tsx           FAQ
├── assessment/page.tsx    Take the Test (free POPIA gap tool)
├── contact/page.tsx       Contact form (wired for Netlify Forms)
├── privacy-policy/…       Website privacy policy
├── paia/page.tsx          PAIA manual
├── blog/page.tsx          Blog index (lists posts automatically)
├── blog/[slug]/page.tsx   One page per blog post
├── sitemap.ts robots.ts   generated at build time
└── globals.css            the whole design system
components/                Header, Footer, Assessment, ContactForm, …
content/posts/*.md         ⭐ your blog posts live here
lib/site.ts                domain, email, locations, nav
lib/posts.ts               reads and renders the Markdown posts
public/                    images, and the /admin CMS
out/                       the built static site (generated, never edited)
```

Because the header and footer are React components, changing the navigation
once updates every page.

## Editing the site

| Content | How you edit it |
|--------|-----------------|
| **Blog posts** | The **admin panel** at `/admin` (easiest), or edit `content/posts/*.md`. |
| **Page copy** (Home, About, Services, FAQ, Contact) | Edit the matching `app/<page>/page.tsx`. Text sits in readable blocks near the top of each file. |
| **Nav, footer, domain, email** | `lib/site.ts` and `components/Header.tsx` / `Footer.tsx`. |
| **Design / colours** | `app/globals.css` (CSS variables at the top). |

Any change you commit triggers an automatic rebuild and redeploy once hosting
is connected. You never edit the live server directly.

## Writing blog posts (the admin panel)

Once the admin is switched on (see [below](#turning-on-the-admin-panel)):

1. Go to **`https://YOURDOMAIN/admin/`** and log in.
2. Click **Blog posts → New Blog post**.
3. Fill in the title, date, category, summary, cover image, tags, SEO
   description and the article body (a familiar rich text editor).
4. Click **Publish**.

The CMS saves a Markdown file to `content/posts/`, the site rebuilds, and your
article appears correctly styled, on the blog index, in the sitemap, with SEO
tags and social-share image, with no HTML on your part.

**By hand:** copy a file in `content/posts/`, rename it (the filename becomes
the URL: `my-post.md` → `/blog/my-post`), edit the front matter and body, commit.
Use clean links like `/services/` inside posts, not `.html`.

## Running it locally

You'll need [Node.js](https://nodejs.org/) (v18+). Then:

```bash
npm install        # once
npm run dev        # http://localhost:8080
```

To preview the **admin panel** locally with no cloud login, run `npm run admin`
in a second terminal, then open `http://localhost:8080/admin/`.

To produce the deployable static site into `out/`:

```bash
npm run build
```

## Hosting & going live (Netlify)

1. Create a free account at [netlify.com](https://www.netlify.com/).
2. **Add new site → Import an existing project → GitHub**, and pick this repo.
3. Netlify reads `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Click **Deploy**. The site is live on a temporary `*.netlify.app` URL.
5. Add your real domain under **Domain settings** (free SSL is automatic).

Any static host works (Cloudflare Pages, Vercel, GitHub Pages, S3) using the
same build command and the `out` folder.

### The contact form
The form is wired for **Netlify Forms** and submits via AJAX so the inline
success message still shows. On Netlify it works automatically: submissions
appear under **Forms** in your dashboard, where you can enable email
notifications. Hosting elsewhere? Point it at a service like
[Formspree](https://formspree.io/) instead.

## Turning on the admin panel

The admin needs a way to log you in and save to the repo. Simplest route is
**Netlify Identity + Git Gateway**:

1. In Netlify: **Site settings → Identity → Enable Identity**.
2. **Identity → Services → Git Gateway → Enable**.
3. **Identity → Registration → Invite only**, then **invite your own email**.
4. Accept the invite, set a password, and log in at `https://YOURDOMAIN/admin/`.

Set `branch:` in `public/admin/config.yml` to the branch your live site deploys
from (usually `main`).

## Changing your domain & details in one place

Everything lives in `lib/site.ts`:

```ts
export const site = {
  url: "https://www.sentinelprivacy.co.za",
  email: "hello@sentinelprivacy.co.za",
  locations: "Cape Town · Johannesburg · Durban",
  ...
};
```

Update it and rebuild. Canonical URLs, Open Graph tags, the sitemap and
structured data all follow automatically.

## Launch checklist

- [ ] Choose a domain and update `lib/site.ts`.
- [ ] Deploy to Netlify (connect the repo).
- [ ] Point your domain at the host and confirm SSL (the padlock).
- [ ] Enable Identity + Git Gateway and invite yourself → test `/admin/`.
- [ ] Submit the contact form once and confirm it arrives.
- [ ] Replace placeholder contact details and illustrative testimonials.
- [ ] (Optional) Add privacy-friendly analytics (Plausible / Cloudflare Web Analytics).

---

## Disclaimer
Content on this site is general information about POPIA and does not constitute
legal advice.
