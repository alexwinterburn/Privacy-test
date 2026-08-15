import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%230f2540'/%3E%3Cpath d='M50 20 L74 30 V52 C74 68 63 78 50 82 C37 78 26 68 26 52 V30 Z' fill='%231f9e8f'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - POPIA & Data Privacy Consulting in South Africa`,
    template: `%s | ${site.name}`,
  },
  description:
    "Sentinel Privacy helps South African businesses achieve and maintain POPIA compliance. Free gap-assessment test, Information Officer support, policies, training and breach response.",
  authors: [{ name: site.author }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_ZA",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [site.ogImage] },
  icons: { icon: FAVICON },
  other: { "geo.region": "ZA", "geo.placename": "South Africa" },
};

export const viewport = { themeColor: "#0f2540" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      description: "POPIA and data-privacy consulting for South African businesses.",
      url: `${site.url}/`,
      areaServed: { "@type": "Country", name: "South Africa" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${site.url}/contact/`,
        areaServed: "ZA",
        availableLanguage: "en",
      },
      knowsAbout: ["POPIA", "PAIA", "Data protection", "Information governance", "Privacy compliance"],
      slogan: "Protect your business. Respect your customers' data.",
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      publisher: { "@id": `${site.url}/#org` },
      inLanguage: "en-ZA",
    },
    {
      "@type": "ProfessionalService",
      name: site.name,
      serviceType: "POPIA & data privacy consulting",
      areaServed: { "@type": "Country", name: "South Africa" },
      provider: { "@id": `${site.url}/#org` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
