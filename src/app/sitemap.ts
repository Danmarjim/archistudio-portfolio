import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'
import { getAllProjects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects()

  const projectUrls = projects.map((project) => ({
    url: `${siteConfig.url}/proyectos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/proyectos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/sobre-mi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    ...projectUrls,
  ]
}
