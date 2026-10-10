import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ServicePage } from '@/types'
import { hasPendingMarkers, isProductionDeploy } from '@/lib/pending'

const servicesDirectory = path.join(process.cwd(), 'content/services')

function readServices(locale: string): ServicePage[] {
  const localeDir = path.join(servicesDirectory, locale)
  const dir = fs.existsSync(localeDir) ? localeDir : path.join(servicesDirectory, 'it')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((fileName) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, fileName), 'utf8'))
      return {
        slug: fileName.replace(/\.mdx$/, ''),
        serviceKey: data.serviceKey,
        title: data.title,
        seoTitle: data.seoTitle,
        description: data.description,
        serviceType: data.serviceType,
        // In produzione una pagina con dati da confermare non esce, anche se marcata come pubblicata
        published:
          data.published === true &&
          !(isProductionDeploy && hasPendingMarkers(content, data.title, data.description, data.seoTitle)),
        cta: data.cta === 'calendly' ? 'calendly' : 'contact',
        contactProjectType: data.contactProjectType,
        relatedProjects: data.relatedProjects ?? [],
        priceFrom: typeof data.priceFrom === 'number' ? data.priceFrom : undefined,
        updated: data.updated,
        content: content.trim(),
      } as ServicePage
    })
}

/**
 * Pagine di servizio pubblicate. Una pagina esiste solo con `published: true` nel frontmatter
 * italiano (lingua di riferimento): finché il testo non è completo resta fuori da sito e sitemap.
 */
export function getPublishedServices(locale: string = 'it'): ServicePage[] {
  const publishedSlugs = new Set(readServices('it').filter((s) => s.published).map((s) => s.slug))
  return readServices(locale).filter((s) => publishedSlugs.has(s.slug))
}

export function getPublishedServiceBySlug(slug: string, locale: string = 'it'): ServicePage | undefined {
  return getPublishedServices(locale).find((s) => s.slug === slug)
}
