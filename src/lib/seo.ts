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
 * Traduce un percorso interno (`/proyectos/casa-archi-colori`) nello slug pubblico della lingua
 * (`/progetti/casa-archi-colori` in italiano) secondo `routing.pathnames`.
 */
function translatePath(locale: string, internal: string): string {
  for (const [pattern, value] of Object.entries(routing.pathnames)) {
    const target = typeof value === 'string' ? value : value[locale as keyof typeof value]
    if (pattern === internal) return target
    const param = pattern.match(/\[(\w+)\]/)?.[1]
    if (!param) continue
    const prefix = pattern.slice(0, pattern.indexOf('['))
    if (internal.startsWith(prefix) && !internal.slice(prefix.length).includes('/')) {
      return target.replace(`[${param}]`, internal.slice(prefix.length))
    }
  }
  return internal
}

/**
 * Percorso pubblico di una pagina per una lingua, a partire dal percorso interno.
 * Con `localePrefix: 'as-needed'` l'italiano (default) non ha prefisso: `/progetti`,
 * mentre le altre lingue sì: `/es/proyectos`, `/en/projects`.
 */
export function localizedPath(locale: string, path = ''): string {
  const clean = path === '/' ? '' : translatePath(locale, path)
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

const logoUrl = absoluteUrl('/images/about/mparchistudio-logo.png')
const portraitUrl = absoluteUrl('/images/about/martina-pozzi.jpg')

export const personRef = { '@id': ids.person }
export const businessRef = { '@id': ids.business }

/**
 * Riferimenti con i dati minimi in linea. Da usare nei JSON-LD di pagina (Article, Service…):
 * sono in un blocco <script> diverso dal grafo globale e Google potrebbe non risolvere il solo `@id`.
 */
export const personSummary = {
  ...personRef,
  '@type': 'Person',
  name: 'Martina Chiara Maria Pozzi',
  url: siteConfig.url,
}
export const businessSummary = {
  ...businessRef,
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: { '@type': 'ImageObject', url: logoUrl },
}

const telephone = siteConfig.phone?.replace(/\s+/g, '')

/** Articoli di stampa esterni sui progetti dello studio (Person.subjectOf). */
const pressCoverage = [
  {
    name: 'Casa ARCHI & COLORI: A Playful Milan Apartment',
    url: 'https://homeadore.com/2026/08/05/casa-archi-colori-a-playful-milan-apartment/',
    publisher: 'Homeadore',
    datePublished: '2026-08-05',
  },
  {
    name: 'Archiboost Talks: MP_archistudio',
    url: 'https://www.archiboost.it/blog-detail/post/622968/mp-archistudio',
    publisher: 'Archiboost',
    datePublished: '2026-07-14',
  },
  {
    name: 'Lovingcolors Opens a 1960s Apartment by Martina Pozzi',
    url: 'https://homeadore.com/2026/06/25/lovingcolors-opens-a-1960s-apartment-by-martina-pozzi/',
    publisher: 'Homeadore',
    datePublished: '2026-06-25',
  },
  {
    name: '80 mq con arredi super smart',
    url: 'https://www.cosedicasa.com/case/case-50-100-mq/80-mq-a-tutto-colore-con-soluzioni-che-ottimizzano-lo-spazio-e-con-zona-studio-nellarmadio-30843',
    publisher: 'Cose di Casa',
    datePublished: '2022-10-01',
  },
].map(({ publisher, ...article }) => ({
  '@type': 'Article',
  ...article,
  publisher: { '@type': 'Organization', name: publisher },
}))

/**
 * Grafo globale: attività, persona e sito web. Va incluso in tutte le pagine (layout).
 * `description` è la descrizione del sito nella lingua della pagina (Metadata.description).
 */
export function buildSiteGraph(locale: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ids.business,
        name: siteConfig.name,
        legalName: 'Martina Chiara Maria Pozzi',
        url: siteConfig.url,
        description,
        logo: { '@type': 'ImageObject', url: logoUrl },
        image: portraitUrl,
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
        geo: { '@type': 'GeoCoordinates', latitude: 45.6995, longitude: 9.65781 },
        // Stessi orari mostrati nella pagina contatti
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        areaServed: [
          { '@type': 'City', name: 'Bergamo' },
          { '@type': 'AdministrativeArea', name: 'Provincia di Bergamo' },
          { '@type': 'City', name: 'Milano' },
          { '@type': 'AdministrativeArea', name: 'Monza e Brianza' },
          { '@type': 'AdministrativeArea', name: 'Lombardia' },
          { '@type': 'City', name: 'Sevilla' },
        ],
        knowsLanguage: ['it', 'es', 'en'],
        founder: personRef,
        sameAs: sameAsProfiles,
      },
      {
        '@type': 'Person',
        '@id': ids.person,
        name: 'Martina Chiara Maria Pozzi',
        alternateName: 'Martina Pozzi',
        jobTitle: 'Architetta',
        url: localizedUrl(locale, '/sobre-mi'),
        image: portraitUrl,
        email: siteConfig.email,
        telephone,
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Politecnico di Milano' },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Laurea in Architettura',
          credentialCategory: 'degree',
          recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Politecnico di Milano' },
        },
        memberOf: {
          '@type': 'Organization',
          name: 'Ordine degli Architetti, Pianificatori, Paesaggisti e Conservatori della Provincia di Monza e della Brianza',
          url: 'https://ordinearchitetti.mb.it/',
        },
        knowsAbout: [
          'Architettura',
          "Interior design",
          'Ristrutturazione di appartamenti',
          'Progettazione di bagni e cucine',
          'Colore in architettura',
          'Consulenza per l\'acquisto di immobili',
        ],
        knowsLanguage: ['it', 'es', 'en'],
        subjectOf: pressCoverage,
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
