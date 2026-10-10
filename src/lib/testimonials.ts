import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Testimonial } from '@/types'
import { hasPendingMarkers, isProductionDeploy } from '@/lib/pending'

const testimonialsDirectory = path.join(process.cwd(), 'content/testimonials')

/** Sotto questa soglia la sezione della home non compare: una sola testimonianza sembra un ripiego. */
export const MIN_HOME_TESTIMONIALS = 2

type Localized = Record<string, string | undefined>

function pick(value: unknown, locale: string): string | undefined {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object') {
    const map = value as Localized
    return map[locale] ?? map.it
  }
  return undefined
}

/**
 * Testimonianze pubblicabili: `published: true` e `consent: true` (permesso scritto del cliente).
 * I file che iniziano con `_` sono modelli e non vengono letti. In produzione una testimonianza
 * con dati da confermare non esce.
 */
export function getTestimonials(locale: string = 'it', options: { service?: string } = {}): Testimonial[] {
  if (!fs.existsSync(testimonialsDirectory)) return []

  return fs
    .readdirSync(testimonialsDirectory)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort()
    .flatMap((fileName) => {
      const { data, content } = matter(fs.readFileSync(path.join(testimonialsDirectory, fileName), 'utf8'))
      const quote = content.trim()
      const context = pick(data.context, locale)
      if (data.published !== true || data.consent !== true || !data.author || !quote) return []
      if (isProductionDeploy && hasPendingMarkers(quote, data.author, context)) return []

      const quoteLang = typeof data.lang === 'string' ? data.lang : 'it'
      const testimonial: Testimonial = {
        slug: fileName.replace(/\.md$/, ''),
        author: data.author,
        context,
        service: data.service,
        project: data.project,
        source: data.source,
        quote,
        quoteLang,
        translation: quoteLang === locale ? undefined : pick(data.translations?.[locale], locale),
      }
      return [testimonial]
    })
    .filter((t) => !options.service || t.service === options.service)
}
