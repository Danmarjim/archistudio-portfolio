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
})
