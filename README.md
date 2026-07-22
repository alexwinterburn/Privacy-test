# Sentinel Privacy — POPIA Data Privacy Consulting Website

A fast, responsive marketing website for a South African data-privacy
(POPIA) consulting business, with a **blog you manage through an admin panel**
— no coding required to publish articles.

- **Static site** built with [Eleventy](https://www.11ty.dev/) (11ty) — no
  database, no servers to maintain, fast and secure.
- **Blog admin** powered by [Decap CMS](https://decapcms.org/) at `/admin` —
  write posts in a friendly editor and hit *Publish*.
- **SEO-ready**: per-page metadata, Open Graph/Twitter cards, JSON-LD
  structured data (incl. FAQ + BlogPosting), `sitemap.xml` and `robots.txt`.
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
src/                       ← everything the site is built from
├── index.html             ← Home  (hand-authored pages, edited directly)
├── about.html             ← About Us
├── services.html          ← Services
├── faq.html               ← FAQ
├── assessment.html        ← Take the Test (free POPIA gap tool)
├── contact.html           ← Contact form (wired for Netlify Forms)
├── resources.html         ← Free templates / lead magnet
├── privacy-policy.html    ← Website privacy policy
├── paia.html              ← PAIA manual
├── blog.njk               ← Blog index (auto-lists your posts)
├── posts/                 ← ⭐ your blog posts live here, one file each
│   ├── popia-checklist.md
│   └── …
├── admin/                 ← the Decap CMS admin panel (/admin)
│   ├── index.html
│   └── config.yml
├── _includes/            ← shared header/footer + article layout
├── _data/site.json       ← your domain & regional details (single source of truth)
├── css/  js/              ← styles, scripts
├── assets/
│   ├── img/               ← illustrations, icons, social image
│   └── downloads/         ← the free downloadable templates
└── robots.txt
.eleventy.js               ← build configuration
netlify.toml               ← hosting configuration
_site/                     ← the built website (generated; not edited by hand)
```

When Eleventy builds, each `posts/*.md` file becomes a fully-styled
`blog-<name>.html` page and is automatically added to the blog index and the
sitemap.

---

## Editing the site

There are two kinds of content:

| Content | How you edit it |
|--------|-----------------|
| **Blog posts** | The **admin panel** at `/admin` (easiest), or by editing `src/posts/*.md`. |
| **Home / About / Services / FAQ / Contact** | Edit the HTML files in `src/` directly (GitHub's web editor is fine for small text changes). |

Any change you commit to the repository triggers an automatic rebuild and
redeploy (once hosting is connected — see below). You never edit the live
server directly.

---

## Writing blog posts (the admin panel)

Once the admin is switched on (see [below](#turning-on-the-admin-panel)):

1. Go to **`https://YOURDOMAIN/admin/`** and log in.
2. Click **Blog posts → New Blog post**.
3. Fill in the title, date, category, summary, cover image, tags, SEO
   description and the article body (a familiar rich text editor).
4. Click **Publish**.

Behind the scenes the CMS saves a Markdown file to `src/posts/`, the site
rebuilds, and your new article appears — correctly styled, on the blog index,
in the sitemap, with SEO tags and social-share image — with no HTML on your part.

**Prefer to do it by hand?** Copy an existing file in `src/posts/`, rename it
(the filename becomes the URL: `my-post.md` → `blog-my-post.html`), edit the
text at the top and the body below, and commit. That's it — no other files to touch.

> Note: the three articles previewed on the **home page** are listed manually
> in `src/index.html`. Update that short section if you want different posts
> featured there. The **blog page itself updates automatically.**

---

## Running it locally

You'll need [Node.js](https://nodejs.org/) (v18+). Then, in the project folder:

```bash
npm install        # once, to install the build tools
npm run start      # preview the site at http://localhost:8080
```

To preview the **admin panel** locally without any cloud login, run:

```bash
npm run dev        # runs the site + a local CMS backend together
# then open http://localhost:8080/admin/
```

(Local edits made this way are written straight to your files on disk.)

To produce the final built site (what gets deployed) into `_site/`:

```bash
npm run build
```

---

## Hosting & going live (Netlify)

Netlify is recommended because it handles hosting, the contact form and the
admin login in one place, and rebuilds automatically on every change.

1. Create a free account at [netlify.com](https://www.netlify.com/).
2. **Add new site → Import an existing project → GitHub**, and pick this repo.
3. Netlify reads `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `_site`
4. Click **Deploy**. Your site is live on a temporary `*.netlify.app` URL in
   a minute or two.
5. Add your real domain under **Domain settings** (Netlify issues a free SSL
   certificate automatically).

Other static hosts (Cloudflare Pages, Vercel, GitHub Pages) also work — use the
same build command (`npm run build`) and publish folder (`_site`).

### The contact form
The form is already wired for **Netlify Forms** (`data-netlify="true"` on the
`<form>` in `src/contact.html`, submitted via AJAX so the inline success
message still shows). When you deploy on Netlify it works automatically —
submissions appear under **Forms** in your Netlify dashboard, and you can set
up email notifications there. No third-party service needed. (Hosting
elsewhere? Point the form at a service like [Formspree](https://formspree.io/)
instead.)

---

## Turning on the admin panel

The admin needs a way to log you in and save changes to the repo. The
simplest route uses **Netlify Identity + Git Gateway**:

1. In Netlify: **Site settings → Identity → Enable Identity**.
2. **Identity → Services → Git Gateway → Enable**.
3. **Identity → Registration → Invite only**, then **invite your own email**.
4. Accept the invite, set a password, and log in at
   `https://YOURDOMAIN/admin/`.

Set the `branch:` in `src/admin/config.yml` to the branch your live site
deploys from (usually `main`).

> Prefer not to use Netlify Identity? Decap also supports a **GitHub** login
> backend (needs a small OAuth app). See the commented notes in
> `src/admin/config.yml` and the [Decap docs](https://decapcms.org/docs/backends-overview/).
> Until the admin is switched on, you can always use `npm run dev` locally.

---

## Changing your domain & details in one place

Your business details for the **blog/generated pages** live in
`src/_data/site.json`:

```json
{
  "url": "https://www.sentinelprivacy.co.za",
  "email": "hello@sentinelprivacy.co.za",
  "phone": "+27 (0)10 000 0000",
  ...
}
```

Update these and rebuild. The hand-authored pages (Home, About, etc.) still
contain the domain and contact details inline — do a find-and-replace across
`src/*.html` for `sentinelprivacy.co.za`, the email and the phone number when
you switch to your real domain. (Happy to centralise those too if you'd like.)

---

## Launch checklist

- [ ] Choose a domain and update `src/_data/site.json` + the inline details in `src/*.html`.
- [ ] Deploy to Netlify (connect the repo).
- [ ] Point your domain at the host and confirm SSL (the padlock).
- [ ] Enable Identity + Git Gateway and invite yourself → test `/admin/`.
- [ ] Wire the contact form to Netlify Forms (or Formspree).
- [ ] Replace placeholder contact details and any illustrative content.
- [ ] (Recommended) Add a Privacy Policy + PAIA manual page — ask and these can be drafted.
- [ ] (Optional) Add privacy-friendly analytics (Plausible / Cloudflare Web Analytics).

---

## Disclaimer
Content on this site is general information about POPIA and does not constitute
legal advice.
