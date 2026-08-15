import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1.0, "monthly"],
    ["/about", 0.7, "monthly"],
    ["/services", 0.9, "monthly"],
    ["/faq", 0.8, "monthly"],
    ["/blog", 0.8, "weekly"],
    ["/assessment", 0.9, "monthly"],
    ["/contact", 0.6, "yearly"],
    ["/privacy-policy", 0.3, "yearly"],
    ["/paia", 0.3, "yearly"],
  ];

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${site.url}${path}/`,
      priority,
      changeFrequency,
    })),
    ...getAllPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}/`,
      lastModified: p.date,
      priority: 0.7,
      changeFrequency: "yearly" as const,
    })),
  ];
}
