import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    // Le immagini in public/ sono servite dalla CDN di Vercel, non vanno mai
    // nel bundle Lambda. projects.ts le legge a build-time (generateStaticParams)
    // e il file tracer le includerebbe in ogni function → 250 MB+ su 40 routes.
    '*': ['public/**'],
  },
};

export default withNextIntl(nextConfig);
