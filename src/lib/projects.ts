import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project } from '@/types'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

/**
 * Obtiene el directorio de proyectos para un locale
 * Fallback a 'es' si el locale no existe
 */
function getProjectsDir(locale: string = 'es'): string {
  const localeDir = path.join(projectsDirectory, locale)
  if (fs.existsSync(localeDir)) {
    return localeDir
  }
  // Fallback a español si no existe el idioma
  return path.join(projectsDirectory, 'es')
}

/**
 * Lee todos los proyectos desde archivos MDX
 */
export function getAllProjects(locale: string = 'es'): Project[] {
  const dir = getProjectsDir(locale)

  if (!fs.existsSync(dir)) {
    return []
  }

  const fileNames = fs.readdirSync(dir)
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'))

  const projects = mdxFiles.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(dir, fileName)
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
export function getFeaturedProjects(locale: string = 'es'): Project[] {
  return getAllProjects(locale).filter((project) => project.featured)
}

/**
 * Obtiene un proyecto por su slug
 */
export function getProjectBySlug(slug: string, locale: string = 'es'): Project | undefined {
  const projects = getAllProjects(locale)
  return projects.find((project) => project.slug === slug)
}

/**
 * Obtiene los slugs de todos los proyectos (para generateStaticParams)
 * Usa 'es' como fuente canónica de slugs
 */
export function getAllProjectSlugs(): string[] {
  return getAllProjects('es').map((project) => project.slug)
}

/**
 * Obtiene proyecto anterior y siguiente para navegación
 */
export function getAdjacentProjects(slug: string, locale: string = 'es'): {
  prev: Project | null
  next: Project | null
} {
  const projects = getAllProjects(locale)
  const currentIndex = projects.findIndex((p) => p.slug === slug)

  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  }
}
