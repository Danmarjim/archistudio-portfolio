import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project } from '@/types'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

/**
 * Lee todos los proyectos desde archivos MDX
 */
export function getAllProjects(): Project[] {
  // Verificar que el directorio existe
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'))

  const projects = mdxFiles.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(projectsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      category: data.category,
      location: data.location,
      year: data.year,
      client: data.client,
      surface: data.surface,
      status: data.status,
      featured: data.featured ?? false,
      coverImage: data.coverImage,
      images: data.images ?? [],
      excerpt: data.excerpt,
      tags: data.tags ?? [],
      content: content.trim(),
    } as Project
  })

  // Ordenar por año descendente (más recientes primero)
  return projects.sort((a, b) => b.year - a.year)
}

/**
 * Obtiene los proyectos destacados
 */
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured)
}

/**
 * Obtiene un proyecto por su slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects()
  return projects.find((project) => project.slug === slug)
}

/**
 * Obtiene los slugs de todos los proyectos (para generateStaticParams)
 */
export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug)
}

/**
 * Obtiene proyecto anterior y siguiente para navegación
 */
export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const projects = getAllProjects()
  const currentIndex = projects.findIndex((p) => p.slug === slug)

  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  }
}
