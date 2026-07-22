module.exports = function (eleventyConfig) {
  // Copy these folders/files straight through to the built site, untouched.
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // Static marketing pages are hand-authored HTML. Copy them through verbatim
  // (keeping their exact filenames) instead of running them through templating,
  // so their inline JSON-LD, styles and links stay exactly as written.
  const STATIC_PAGES = ["index", "about", "services", "faq", "assessment", "contact", "privacy-policy", "paia"];
  STATIC_PAGES.forEach((name) => {
    eleventyConfig.addPassthroughCopy({ [`src/${name}.html`]: `${name}.html` });
    eleventyConfig.ignores.add(`src/${name}.html`);
  });

  // Don't treat downloadable templates (Markdown/CSV in assets) as site
  // templates — they're passthrough-copied for download, not rendered.
  eleventyConfig.ignores.add("src/assets/**");

  // Blog posts collection, newest first.
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Human-friendly date filter, e.g. "18 June 2026".
  eleventyConfig.addFilter("readableDate", function (dateObj) {
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
  });

  // ISO date (for <time> and structured data).
  eleventyConfig.addFilter("isoDate", function (dateObj) {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // Rough read-time estimate from body text.
  eleventyConfig.addFilter("readingTime", function (content) {
    const text = String(content).replace(/<[^>]*>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  // Small array helpers (Nunjucks core lacks these).
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("exclude", (arr, url) => (arr || []).filter((p) => p.url !== url));
  // Turn an absolute permalink ("/blog-x.html") into a same-folder link ("blog-x.html").
  eleventyConfig.addFilter("localHref", (url) => String(url).replace(/^\//, ""));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    // Static .html pages pass through untouched (no templating applied to them,
    // so their inline JSON-LD and styles are safe). Markdown uses Nunjucks so
    // our layouts and shortcodes work.
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md", "11ty.js"]
  };
};
