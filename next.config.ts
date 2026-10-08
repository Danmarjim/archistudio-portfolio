import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // In modalità Report-Only: il browser segnala le violazioni in console senza bloccare nulla.
  // Il sito non carica risorse esterne (Calendly e i social sono solo link; Vercel Analytics è
  // servito da /_vercel). 'unsafe-inline' serve agli script inline di Next.js e ai JSON-LD.
  // Quando la console resta pulita in produzione, passare a `Content-Security-Policy`.
  {
    key: 'Content-Security-Policy-Report-Only',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  // Non esporre `X-Powered-By: Next.js`
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  // URL storici (slug spagnoli usati anche per IT/EN) → slug localizzati di routing.pathnames.
  // Permanenti: Google trasferisce i segnali alla nuova URL. Non vanno mai rimossi.
  async redirects() {
    const moved: Array<[string, string]> = [
      // cucina-MITE è diventato cucina-mite: regola esplicita prima di quella generica
      ['/proyectos/cucina-mite', '/progetti/cucina-mite'],
      ['/en/proyectos/cucina-mite', '/en/projects/cucina-mite'],
      ['/proyectos', '/progetti'],
      ['/proyectos/:slug', '/progetti/:slug'],
      ['/servicios', '/servizi'],
      ['/sobre-mi', '/chi-sono'],
      ['/contacto', '/contatti'],
      ['/en/proyectos', '/en/projects'],
      ['/en/proyectos/:slug', '/en/projects/:slug'],
      ['/en/servicios', '/en/services'],
      ['/en/sobre-mi', '/en/about'],
      ['/en/contacto', '/en/contact'],
    ]
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }))
  },
  outputFileTracingExcludes: {
    // Le immagini in public/ sono servite dalla CDN di Vercel, non vanno mai
    // nel bundle Lambda. projects.ts le legge a build-time (generateStaticParams)
    // e il file tracer le includerebbe in ogni function → 250 MB+ su 40 routes.
    '*': ['public/**'],
  },
};

export default withNextIntl(nextConfig);
