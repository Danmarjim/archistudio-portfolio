import { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'
import { buildAlternates, localizedUrl } from '@/lib/seo'
import { getAllNews } from '@/lib/news'
import { getAllProjects } from '@/lib/projects'
import { getPublishedServices } from '@/lib/services'

// Generato staticamente alla build — nessuna serverless function a runtime
export const dynamic = 'force-static'

/**
 * Una voce per ogni lingua e pagina. Nessun URL con prefisso `/it` (redirige alla versione
 * senza prefisso) e ogni voce dichiara le alternate hreflang di tutte le lingue.
 * `lastModified` solo quando è una data reale dal frontmatter: Google ignora le date fittizie.
 * Niente `changefreq`/`priority`: Google non li usa.
 */
function entriesFor(pagePath: string, lastModified?: Date): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localizedUrl(locale, pagePath),
    alternates: { languages: buildAlternates(locale, pagePath).languages as Record<string, string> },
    ...(lastModified ? { lastModified } : {}),
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects('it')
  const news = getAllNews('it')

  return [
    ...['/', '/proyectos', '/sobre-mi', '/servicios', '/tappeti', '/news', '/contacto'].flatMap(
      (pagePath) => entriesFor(pagePath)
    ),
    ...projects.flatMap((project) =>
      entriesFor(`/proyectos/${project.slug}`, project.updated ? new Date(project.updated) : undefined)
    ),
    ...getPublishedServices('it').flatMap((service) =>
      entriesFor(`/servicios/${service.slug}`, service.updated ? new Date(service.updated) : undefined)
    ),
    ...news.flatMap((post) => entriesFor(`/news/${post.slug}`, new Date(post.updated ?? post.date))),
  ]
}
