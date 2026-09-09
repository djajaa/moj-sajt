import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

// Postavi NEXT_PUBLIC_GA_ID (npr. u Vercel project settings) da aktiviraš
// Google Analytics — dok god ta varijabla ne postoji, skripta se ne učitava.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  preload: true,
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#B85708" },
    { media: "(prefers-color-scheme: dark)",  color: "#08090b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sergejjanjic.com"),

  title: {
    default:  "Sergej Janjić | Personal Coaching – Banja Luka",
    template: "%s | Sergej Janjić",
  },

  description:
    "1:1 personal coaching uživo i online. Sistemski pristup, jasan plan, mjerljiv rezultat. Banja Luka.",

  keywords: [
    "personal trainer", "personal coaching", "lični trener",
    "fitness", "trening", "Banja Luka", "online coaching",
    "mršavljenje", "mišićna masa", "Sergej Janjić",
  ],

  authors: [{ name: "Sergej Janjić", url: "https://sergejjanjic.com" }],
  creator: "Sergej Janjić",

  openGraph: {
    type:        "website",
    locale:      "sr_BA",
    url:         "https://sergejjanjic.com",
    siteName:    "Sergej Janjić Personal Coaching",
    title:       "Sergej Janjić | Personal Coaching",
    description: "1:1 coaching uživo i online. Sistemski pristup, jasan plan, mjerljiv rezultat.",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Sergej Janjić | Personal Coaching",
    description: "1:1 coaching uživo i online. Sistemski pristup, jasan plan, mjerljiv rezultat.",
  },

  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  // icon.tsx, apple-icon.tsx, opengraph-image.tsx, manifest.ts i favicon.ico
  // se automatski otkrivaju preko Next.js file konvencija — nema potrebe da se
  // ovdje ručno navode, i tako se izbjegava referenciranje fajlova koji ne postoje.

  alternates: {
    canonical: "https://sergejjanjic.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${instrumentSans.variable} ${instrumentSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        {GA_MEASUREMENT_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}