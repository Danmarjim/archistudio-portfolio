import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'
import { getAllProjects } from '@/lib/projects'
import { locales } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects()
  const baseUrl = siteConfig.url

  // Generate URLs for all locales
  const localizedUrls = locales.flatMap((locale) => {
    const prefix = `${baseUrl}/${locale}`

    const projectUrls = projects.map((project) => ({
      url: `${prefix}/proyectos/${project.slug}`,
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
