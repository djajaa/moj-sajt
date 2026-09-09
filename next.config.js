const isProd = process.env.NODE_ENV === "production";

// Sve spoljne domene koje sajt stvarno kontaktira: next/font je self-hosted
// (nema potrebe za fonts.googleapis.com), Google Analytics + Vercel Analytics
// za statistiku posjeta i Google Maps za embed lokacije u kontakt sekciji.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vitals.vercel-insights.com https://*.vercel-insights.com",
  "frame-src https://www.google.com",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // CSP samo u produkciji — next dev koristi eval/websocket za hot-reload
  // koje bi striktan CSP nepotrebno blokirao.
  ...(isProd ? [{ key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY }] : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
