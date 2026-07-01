import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import matter from 'gray-matter'
import type { Project } from '@/types'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

/**
 * Legge dimensioni e hash MD5 di un'immagine in un'unica lettura (128 KB).
 * L'hash serve a rilevare file con contenuto identico ma nome diverso (duplicati reali).
 * Supporta JPEG e PNG.
 */
function analyzeImage(imagePath: string): {
  dims: { width: number; height: number } | null
  hash: string | null
} {
  const fullPath = path.join(process.cwd(), 'public', imagePath)
  try {
    const fd = fs.openSync(fullPath, 'r')
    const bufSize = 131072 // 128 KB — sufficiente per SOF JPEG e per un hash affidabile
    const buffer = Buffer.alloc(bufSize)
    const bytesRead = fs.readSync(fd, buffer, 0, bufSize, 0)
    fs.closeSync(fd)
    const buf = buffer.subarray(0, bytesRead)

    // Hash MD5 dei primi 128 KB: file identici avranno lo stesso hash
    const hash = crypto.createHash('md5').update(buf).digest('hex')

    const ext = path.extname(imagePath).toLowerCase()
    let dims: { width: number; height: number } | null = null

    if (ext === '.png') {
      if (buf.length >= 24) {
        dims = { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
      }
    } else if (ext === '.jpg' || ext === '.jpeg') {
      if (buf[0] === 0xFF && buf[1] === 0xD8) {
        let i = 2
        while (i < buf.length - 9) {
          // Salta padding 0xFF (valido nel formato JPEG)
          if (buf[i] !== 0xFF) break
          while (i < buf.length && buf[i] === 0xFF) i++
          const marker = buf[i++]
          if (marker === 0xD8) continue
          if (marker === 0xD9) break
          if (marker >= 0xD0 && marker <= 0xD7) continue
          if (i + 2 > buf.length) break
          const segLen = buf.readUInt16BE(i)
          // SOF0-SOF3, SOF5-SOF7, SOF9-SOF11, SOF13-SOF15
          const isSOF =
            (marker >= 0xC0 && marker <= 0xC3) ||
            (marker >= 0xC5 && marker <= 0xC7) ||
            (marker >= 0xC9 && marker <= 0xCB) ||
            (marker >= 0xCD && marker <= 0xCF)
          if (isSOF) {
            if (i + 7 <= buf.length) {
              dims = { height: buf.readUInt16BE(i + 3), width: buf.readUInt16BE(i + 5) }
            }
            break
          }
          i += segLen
        }
      }
    }

    return { dims, hash }
  } catch {
    return { dims: null, hash: null }
  }
}

/**
 * Obtiene el directorio de proyectos para un locale
 * Fallback a 'it' si el locale no existe o esta vacio
 */
function getProjectsDir(locale: string = 'it'): string {
  const localeDir = path.join(projectsDirectory, locale)

  // Check if directory exists and has MDX files
  if (fs.existsSync(localeDir)) {
    const files = fs.readdirSync(localeDir)
    const hasMdxFiles = files.some((f) => f.endsWith('.mdx'))
    if (hasMdxFiles) {
      return localeDir
    }
  }

  // Fallback a italiano se non esiste la cartella locale
  return path.join(projectsDirectory, 'it')
}

/**
 * Lee todos los proyectos desde archivos MDX
 */
export function getAllProjects(locale: string = 'it'): Project[] {
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

    const { dims: coverDims } = analyzeImage(data.coverImage)

    // Legge le immagini: prima cerca per prefisso slug nella cartella,
    // se non trova nulla usa la lista esplicita dell'MDX (per sottoprogetti che usano foto di altri)
    const projectsImagesDir = path.join(process.cwd(), 'public/images/projects')
    let folderImages: string[] = fs.existsSync(projectsImagesDir)
      ? fs.readdirSync(projectsImagesDir)
          .filter((f) => f.startsWith(slug + '-') && /\.(jpg|jpeg|png|webp)$/i.test(f))
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
          .map((f) => `/images/projects/${f}`)
      : []

    // Fallback: se non ci sono foto per prefisso slug, usa la lista images dell'MDX
    if (folderImages.length === 0 && Array.isArray(data.images) && data.images.length > 0) {
      folderImages = data.images as string[]
    }

    // Analizza ogni immagine (dimensioni + hash) in un'unica lettura per file
    const analyses = folderImages.map((img: string) => ({ img, ...analyzeImage(img) }))

    // 4. Deduplicazione per contenuto: elimina file con hash identico (stesso JPEG, nome diverso)
    const seenHashes = new Set<string>()
    const unique = analyses.filter(({ hash }) => {
      if (!hash) return true          // file non leggibile → teniamo per sicurezza
      if (seenHashes.has(hash)) return false  // contenuto già visto → duplicato, scarta
      seenHashes.add(hash)
      return true
    })

    const imagesDimensions = unique.map(({ dims }) => dims)
    const images = unique.map(({ img }) => img)

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
      coverImageWidth: coverDims?.width,
      coverImageHeight: coverDims?.height,
      photographer: data.photographer,
      images,
      imagesDimensions,
      excerpt: data.excerpt,
      tags: data.tags ?? [],
      content: content.trim(),
    } as Project
  })

  // Ordina: prima Ristrutturazione integrale e Restyling, poi le altre categorie, poi per anno desc
  const categoryPriority: Record<string, number> = {
    'Ristrutturazione integrale': 0,
    'Restyling': 1,
  }
  return projects.sort((a, b) => {
    const pa = categoryPriority[a.category] ?? 99
    const pb = categoryPriority[b.category] ?? 99
    if (pa !== pb) return pa - pb
    return b.year - a.year
  })
}

/**
 * Obtiene los proyectos destacados
 */
export function getFeaturedProjects(locale: string = 'it'): Project[] {
  return getAllProjects(locale).filter((project) => project.featured)
}

/**
 * Obtiene un proyecto por su slug
 */
export function getProjectBySlug(slug: string, locale: string = 'it'): Project | undefined {
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
export function getAdjacentProjects(slug: string, locale: string = 'it'): {
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
