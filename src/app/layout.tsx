import type { Metadata, Viewport } from "next";
import { body, display, mono } from "./fonts/fonts";
import { contact, person } from "@/content/site";
import "./globals.css";

/**
 * Set NEXT_PUBLIC_SITE_URL in Vercel once you know your domain so Open Graph
 * images resolve absolutely. Falls back to a sensible default locally.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://abtahi-portfolio.vercel.app";

const description =
  "Portfolio of Abtahi Bin Jahangir Chowdhury — Computer Science graduate and Data Analyst who turns raw, messy data into business-ready insight with PostgreSQL, Python, Power BI and machine learning.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name} — Data Analyst & ML Engineer`,
    template: `%s — ${person.shortName}`,
  },
  description,
  applicationName: `${person.name} — Portfolio`,
  authors: [{ name: person.name, url: contact.github }],
  creator: person.name,
  keywords: [
    "Abtahi Bin Jahangir Chowdhury",
    "Data Analyst",
    "Machine Learning Engineer",
    "PostgreSQL",
    "Power BI",
    "Python",
    "SQL",
    "NLP",
    "BRAC University",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${person.name} — Portfolio`,
    title: `${person.name} — Data Analyst & ML Engineer`,
    description,
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${person.name} — Data Analyst and Machine Learning Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — Data Analyst & ML Engineer`,
    description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#06030B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Structured data so search engines read this as a person, not a blog. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: "Data Analyst & Machine Learning Engineer",
  description: person.summary,
  email: `mailto:${contact.email}`,
  url: siteUrl,
  image: `${siteUrl}/og.jpg`,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "BRAC University",
  },
  sameAs: [contact.github, contact.linkedin, contact.leetcode],
  knowsAbout: [
    "Data Analysis",
    "SQL",
    "PostgreSQL",
    "Power BI",
    "Python",
    "Machine Learning",
    "Natural Language Processing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="text-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-magenta focus:bg-surface-2 focus:px-4 focus:py-2.5 focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase focus:text-paper"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
