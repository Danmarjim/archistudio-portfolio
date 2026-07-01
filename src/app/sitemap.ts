import fs from 'fs'
import path from 'path'
import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'
import { locales } from '@/i18n/routing'

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

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getProjectSlugs()
  const baseUrl = siteConfig.url

  // Generate URLs for all locales
  const localizedUrls = locales.flatMap((locale) => {
    const prefix = `${baseUrl}/${locale}`

    const projectUrls = slugs.map((slug) => ({
      url: `${prefix}/proyectos/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    return [
      {
        url: prefix,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: `${prefix}/proyectos`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      {
        url: `${prefix}/sobre-mi`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${prefix}/servicios`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${prefix}/contacto`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      },
      ...projectUrls,
    ]
  })

  return localizedUrls
}
