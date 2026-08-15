// Single source of truth for site-wide details.
// Change the domain here when the real one is registered.
export const site = {
  name: "Sentinel Privacy",
  tagline: "POPIA Consulting · South Africa",
  url: "https://www.sentinelprivacy.co.za",
  email: "hello@sentinelprivacy.co.za",
  locations: "Cape Town · Johannesburg · Durban",
  coverage: "Remote support nationwide",
  hours: "Mon-Fri, 08:00-17:00 SAST",
  ogImage: "/assets/img/og-cover.png",
  author: "The Sentinel Privacy Team",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/assessment", label: "Take the Test" },
  { href: "/contact", label: "Contact" },
];
