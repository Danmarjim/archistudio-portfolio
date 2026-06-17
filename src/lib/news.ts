import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { NewsPost, NewsCategory } from '@/types'

const newsDirectory = path.join(process.cwd(), 'content/news')

function getNewsDir(locale: string = 'it'): string {
  const localeDir = path.join(newsDirectory, locale)
  if (fs.existsSync(localeDir)) {
    const files = fs.readdirSync(localeDir)
    if (files.some((f) => f.endsWith('.mdx'))) return localeDir
  }
  // Fallback a italiano
  return path.join(newsDirectory, 'it')
}

export function getAllNews(locale: string = 'it'): NewsPost[] {
  const dir = getNewsDir(locale)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(dir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category as NewsCategory,
      coverImage: data.coverImage,
      excerpt: data.excerpt,
      source: data.source,
      sourceUrl: data.sourceUrl,
      imagePosition: data.imagePosition,
      images: data.images ?? [],
      content: content.trim(),
    } as NewsPost
  })

  // Ordine cronologico inverso (più recenti prima)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getNewsByCategory(category: NewsCategory, locale: string = 'it'): NewsPost[] {
  return getAllNews(locale).filter((p) => p.category === category)
}

export function getNewsBySlug(slug: string, locale: string = 'it'): NewsPost | undefined {
  return getAllNews(locale).find((p) => p.slug === slug)
}

export function getAllNewsSlugs(): string[] {
  return getAllNews('it').map((p) => p.slug)
}

export function getAdjacentNews(slug: string, locale: string = 'it'): {
  prev: NewsPost | null
  next: NewsPost | null
} {
  const posts = getAllNews(locale)
  const index = posts.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  }
}
