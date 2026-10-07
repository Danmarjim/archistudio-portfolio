import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]

const nextConfig: NextConfig = {
  // Non esporre `X-Powered-By: Next.js`
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  outputFileTracingExcludes: {
    // Le immagini in public/ sono servite dalla CDN di Vercel, non vanno mai
    // nel bundle Lambda. projects.ts le legge a build-time (generateStaticParams)
    // e il file tracer le includerebbe in ogni function → 250 MB+ su 40 routes.
    '*': ['public/**'],
  },
};

export default withNextIntl(nextConfig);
