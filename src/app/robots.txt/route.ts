import { siteConfig } from '@/lib/constants'

// Handler di testo invece di `robots.ts`: `MetadataRoute.Robots` non permette righe personalizzate
// come `Content-Signal`.
export const dynamic = 'force-static'

// Content-Signal (bozza IETF): i contenuti si possono usare per la ricerca e per rispondere con l'IA,
// non per addestrare modelli. È una preferenza dichiarata, non un blocco; non incide su Google Search.
const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=no'

function buildRobotsTxt(): string {
  return [
    'User-Agent: *',
    `Content-Signal: ${CONTENT_SIGNAL}`,
    'Allow: /',
    'Disallow: /api/',
    '',
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    '',
  ].join('\n')
}

export function GET() {
  return new Response(buildRobotsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
