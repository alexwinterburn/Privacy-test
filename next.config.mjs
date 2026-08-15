/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export a fully static site. Keeps hosting simple and cheap (any static
  // host works: Netlify, Cloudflare Pages, Vercel, S3) and means there is no
  // server to maintain. Switch this off later if we ever add API routes or a
  // client portal.
  output: "export",

  // Static export cannot use the built-in image optimisation server.
  images: { unoptimized: true },

  // Emit /about/index.html style paths so clean URLs work on any static host.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
