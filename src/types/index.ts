import type { StaticPathname } from '@/i18n/routing'

// Tipos principales del portfolio

export interface ImageDimensions {
  width: number
  height: number
}

export interface Project {
  title: string
  slug: string
  category: string
  location: string
  year: number
  client: string
  surface: string
  status: string
  photographer?: string
  featured: boolean
  coverImage: string
  coverImageWidth?: number
  coverImageHeight?: number
  images: string[]
  imagesDimensions: Array<ImageDimensions | null>
  excerpt: string
  /** Meta description SEO (opzionale): se assente si usa `excerpt` */
  description?: string
  /** Data dell'ultima modifica sostanziale (YYYY-MM-DD), usata come lastmod nella sitemap */
  updated?: string
  tags: string[]
  content?: string
}

export interface Service {
  title: string
  slug: string
  description: string
  icon: string
  features: string[]
}

export interface NavItem {
  label: string
  href: StaticPathname
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'pinterest' | 'behance' | 'linktree'
  url: string
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  email: string
  phone?: string
  address?: string
  social: SocialLink[]
}

export type NewsCategory = 'pubblicazioni' | 'riflessioni' | 'annunci' | 'interviste'

export interface NewsPost {
  title: string
  slug: string
  date: string
  category: NewsCategory
  coverImage: string
  excerpt: string
  /** Meta description SEO (opzionale, ≤ 155 caratteri): se assente si usa `excerpt` */
  description?: string
  source?: string        // nome rivista/media (solo per pubblicazioni)
  sourceUrl?: string     // link all'articolo originale
  imagePosition?: string  // es. "center 20%" per centrare il soggetto nel crop 16:9
  imageAspect?: string    // es. "portrait" per mostrare la cover in formato verticale
  images?: string[]       // galleria aggiuntiva (es. pagine scansionate della rivista)
  relatedProjectUrl?: string   // path interno al progetto correlato (es. /proyectos/bagno-italian-summer)
  relatedProjectLabel?: string // testo del link al progetto (localizzato nel frontmatter)
  /** Titolo SEO (opzionale, ≤ 43 caratteri: il layout aggiunge " | MP_archistudio"); se assente si usa `title` */
  seoTitle?: string
  /** Data dell'ultimo aggiornamento sostanziale (YYYY-MM-DD): dateModified e lastmod */
  updated?: string
  content?: string
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  projectType: 'vivienda' | 'reforma' | 'comercial' | 'otro'
  message: string
  budget?: string
}

/** Pagina di servizio (`content/services/{locale}/{slug}.mdx`). */
export interface ServicePage {
  slug: string
  /** Chiave del servizio in `ServicesData` / `/servizi` (archiadvice, consulenza-acquisto, …) */
  serviceKey: string
  title: string
  /** Titolo SEO (≤ 43 caratteri: il layout aggiunge " | MP_archistudio") */
  seoTitle?: string
  description: string
  /** Valore di schema.org `serviceType` */
  serviceType: string
  published: boolean
  /** Call to action principale: prenotazione su Calendly o modulo di contatto */
  cta: 'calendly' | 'contact'
  /** Tipo di progetto preselezionato nel modulo di contatto */
  contactProjectType?: string
  /** Slug dei progetti da mostrare come esempi */
  relatedProjects: string[]
  /** Prezzo di partenza in euro, se pubblicato (genera un `Offer` nel JSON-LD) */
  priceFrom?: number
  updated?: string
  content: string
}
