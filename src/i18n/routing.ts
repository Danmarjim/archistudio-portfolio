import { defineRouting } from 'next-intl/routing'

export const locales = ['es', 'en', 'it'] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  // All supported locales
  locales,

  // Default locale when no match
  defaultLocale: 'it',

  // Omit locale prefix for the default locale (Italian)
  localePrefix: 'as-needed',

  // hreflang e canonical sono dichiarati nell'HTML (generateMetadata). Disattivo l'header HTTP
  // `Link` di next-intl per evitare duplicati o conflitti con le alternate dichiarate in pagina.
  alternateLinks: false,

  // URL pubblici localizzati. Le chiavi sono i percorsi interni (cartelle in app/[locale]),
  // i valori lo slug mostrato in ogni lingua. I vecchi URL hanno redirect 301 in next.config.ts.
  pathnames: {
    '/': '/',
    '/proyectos': { it: '/progetti', es: '/proyectos', en: '/projects' },
    '/proyectos/[slug]': { it: '/progetti/[slug]', es: '/proyectos/[slug]', en: '/projects/[slug]' },
    '/servicios': { it: '/servizi', es: '/servicios', en: '/services' },
    '/sobre-mi': { it: '/chi-sono', es: '/sobre-mi', en: '/about' },
    '/contacto': { it: '/contatti', es: '/contacto', en: '/contact' },
    '/news': '/news',
    '/news/[slug]': '/news/[slug]',
    '/tappeti': '/tappeti',
    '/privacy': '/privacy',
  },
})

export type AppPathname = keyof typeof routing.pathnames
/** Percorsi interni senza parametri dinamici (utilizzabili direttamente come `href`). */
export type StaticPathname = Exclude<AppPathname, `${string}[${string}`>
