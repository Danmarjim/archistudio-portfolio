import fs from 'fs'
import path from 'path'
import { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'
import { buildAlternates, localizedUrl } from '@/lib/seo'
import { getAllNews } from '@/lib/news'

// Generato staticamente alla build — nessuna serverless function a runtime
export const dynamic = 'force-static'

/** Legge solo i filename dalla cartella it/ senza importare gray-matter o code pesante */
function getProjectSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content/projects/it')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

type Entry = MetadataRoute.Sitemap[number]

/**
 * Una voce per ogni lingua e pagina. Nessun URL con prefisso `/it` (redirige alla versione
 * senza prefisso) e ogni voce dichiara le alternate hreflang di tutte le lingue.
 */
function entriesFor(
  pagePath: string,
  extra: Pick<Entry, 'changeFrequency' | 'priority' | 'lastModified'>
): Entry[] {
  return locales.map((locale) => ({
    url: localizedUrl(locale, pagePath),
    alternates: { languages: buildAlternates(locale, pagePath).languages as Record<string, string> },
    ...extra,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = getProjectSlugs()
  const news = getAllNews('it')

  return [
    ...entriesFor('/', { changeFrequency: 'weekly', priority: 1 }),
    ...entriesFor('/proyectos', { changeFrequency: 'weekly', priority: 0.9 }),
    ...entriesFor('/sobre-mi', { changeFrequency: 'monthly', priority: 0.7 }),
    ...entriesFor('/servicios', { changeFrequency: 'monthly', priority: 0.7 }),
    ...entriesFor('/tappeti', { changeFrequency: 'monthly', priority: 0.6 }),
    ...entriesFor('/news', { changeFrequency: 'weekly', priority: 0.6 }),
    ...entriesFor('/contacto', { changeFrequency: 'yearly', priority: 0.6 }),
    ...projectSlugs.flatMap((slug) =>
      entriesFor(`/proyectos/${slug}`, { changeFrequency: 'monthly', priority: 0.8 })
    ),
    // lastModified reale: data di pubblicazione dichiarata nel frontmatter della news
    ...news.flatMap((post) =>
      entriesFor(`/news/${post.slug}`, {
        changeFrequency: 'yearly',
        priority: 0.5,
        lastModified: new Date(post.date),
      })
    ),
  ]
}
