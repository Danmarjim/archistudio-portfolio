import type { Metadata } from 'next'
import { siteConfig, sameAsProfiles } from '@/lib/constants'
import { locales, routing } from '@/i18n/routing'
import { getAllProjects } from '@/lib/projects'

/** Locale OpenGraph per ogni lingua del sito. */
export const ogLocales: Record<string, string> = {
  it: 'it_IT',
  es: 'es_ES',
  en: 'en_GB',
}

/**
 * Percorso pubblico di una pagina per una lingua.
 * Con `localePrefix: 'as-needed'` l'italiano (default) non ha prefisso: `/proyectos`,
 * mentre le altre lingue sì: `/es/proyectos`, `/en/proyectos`.
 */
export function localizedPath(locale: string, path = ''): string {
  const clean = path === '/' ? '' : path
  if (locale === routing.defaultLocale) return clean || '/'
  return `/${locale}${clean}`
}

/** URL assoluto di una pagina per una lingua (home italiana = URL base senza slash finale). */
export function localizedUrl(locale: string, path = ''): string {
  const p = localizedPath(locale, path)
  return p === '/' ? siteConfig.url : `${siteConfig.url}${p}`
}

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  return `${siteConfig.url}${pathOrUrl.startsWith('/') ? '' : '/'}${encodeURI(pathOrUrl)}`
}

/** Canonical autoreferenziale + hreflang per tutte le lingue + x-default. */
export function buildAlternates(locale: string, path = ''): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {}
  for (const l of locales) languages[l] = localizedUrl(l, path)
  languages['x-default'] = localizedUrl(routing.defaultLocale, path)
  return {
    canonical: localizedUrl(locale, path),
    languages,
  }
}

let cachedOgImage: string | undefined

/** Immagine OpenGraph di default: la copertina del primo progetto in evidenza. */
export function getDefaultOgImage(): string | undefined {
  if (cachedOgImage !== undefined) return cachedOgImage
  const projects = getAllProjects('it')
  const pick = projects.find((p) => p.featured) ?? projects[0]
  cachedOgImage = pick?.coverImage ? absoluteUrl(pick.coverImage) : ''
  return cachedOgImage || undefined
}

interface PageMetadataInput {
  locale: string
  /** Percorso senza prefisso lingua, es. `/proyectos/casa-archi-colori`. `''` o `'/'` = home. */
  path?: string
  /** Stringa: il layout aggiunge ` | MP_archistudio`. `{ absolute }`: titolo completo. */
  title: string | { absolute: string }
  description: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
}

/**
 * Metadata completi di una pagina. Canonical, hreflang, Open Graph e Twitter devono essere
 * ridichiarati in ogni pagina: Next.js non fa merge profondo dei metadata dei layout.
 */
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  image,
  type = 'website',
  publishedTime,
}: PageMetadataInput): Metadata {
  const url = localizedUrl(locale, path)
  const ogTitle = typeof title === 'string' ? `${title} | ${siteConfig.name}` : title.absolute
  const imageUrl = image ? absoluteUrl(image) : getDefaultOgImage()
  const images = imageUrl ? [{ url: imageUrl }] : undefined

  const openGraph: Metadata['openGraph'] =
    type === 'article'
      ? {
          type: 'article',
          url,
          siteName: siteConfig.name,
          locale: ogLocales[locale] ?? 'it_IT',
          title: ogTitle,
          description,
          images,
          publishedTime,
        }
      : {
          type: 'website',
          url,
          siteName: siteConfig.name,
          locale: ogLocales[locale] ?? 'it_IT',
          title: ogTitle,
          description,
          images,
        }

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

/* ---------------------------------------------------------------------------
 * Dati strutturati (JSON-LD)
 * ------------------------------------------------------------------------- */

const ids = {
  business: `${siteConfig.url}/#business`,
  person: `${siteConfig.url}/#martina-pozzi`,
  website: `${siteConfig.url}/#website`,
}

export const personRef = { '@id': ids.person }
export const businessRef = { '@id': ids.business }

const telephone = siteConfig.phone?.replace(/\s+/g, '')

/** Grafo globale: attività, persona e sito web. Va incluso in tutte le pagine (layout). */
export function buildSiteGraph(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ids.business,
        name: siteConfig.name,
        legalName: 'Martina Chiara Maria Pozzi',
        url: localizedUrl(locale),
        description: siteConfig.description,
        image: getDefaultOgImage(),
        email: siteConfig.email,
        telephone,
        vatID: 'IT07788400963',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Bologna 2',
          postalCode: '24128',
          addressLocality: 'Bergamo',
          addressRegion: 'BG',
          addressCountry: 'IT',
        },
        areaServed: [
          { '@type': 'City', name: 'Bergamo' },
          { '@type': 'AdministrativeArea', name: 'Lombardia' },
        ],
        founder: personRef,
        sameAs: sameAsProfiles,
      },
      {
        '@type': 'Person',
        '@id': ids.person,
        name: 'Martina Chiara Maria Pozzi',
        alternateName: 'Martina Pozzi',
        jobTitle: 'Architetta',
        url: localizedUrl(locale),
        email: siteConfig.email,
        telephone,
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Politecnico di Milano' },
        worksFor: businessRef,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bergamo',
          addressCountry: 'IT',
        },
        sameAs: sameAsProfiles,
      },
      {
        '@type': 'WebSite',
        '@id': ids.website,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: locale,
        publisher: businessRef,
      },
    ],
  }
}

export interface Crumb {
  name: string
  /** Percorso senza prefisso lingua; omesso per l'ultimo elemento = pagina corrente */
  path: string
}

/** BreadcrumbList: la home è sempre il primo elemento. */
export function buildBreadcrumb(locale: string, crumbs: Crumb[]) {
  const items = [{ name: siteConfig.name, path: '/' }, ...crumbs]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: localizedUrl(locale, c.path),
    })),
  }
}
