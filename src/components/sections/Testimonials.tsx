import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Container from '@/components/ui/Container'
import { projectHref } from '@/lib/routes'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/types'

interface TestimonialsProps {
  testimonials: Testimonial[]
  locale: string
  /** `home`: sezione a tutta larghezza; `inline`: blocco dentro una pagina (servizi) */
  variant?: 'home' | 'inline'
}

// Nessun markup `Review`: Google non mostra le recensioni che un'attività pubblica su se stessa
// (self-serving reviews), quindi qui il valore è solo per chi legge.
export default async function Testimonials({ testimonials, locale, variant = 'home' }: TestimonialsProps) {
  if (testimonials.length === 0) return null
  const t = await getTranslations({ locale, namespace: 'Testimonials' })
  const isHome = variant === 'home'

  const list = (
    <div className={cn('grid gap-8', testimonials.length > 1 && 'md:grid-cols-2', testimonials.length > 2 && 'lg:grid-cols-3')}>
      {testimonials.map((item) => (
        <figure key={item.slug} className="flex flex-col rounded-2xl bg-white p-8 shadow-sm">
          <blockquote
            lang={item.translation ? locale : item.quoteLang}
            className="flex-1 font-serif text-lg leading-relaxed text-foreground"
          >
            <p>“{item.translation ?? item.quote}”</p>
          </blockquote>
          {item.translation && (
            <p className="mt-3 text-xs text-neutral-500">{t('translated', { lang: item.quoteLang })}</p>
          )}
          <figcaption className="mt-6 border-t border-neutral-200 pt-4 text-sm">
            <span className="font-medium text-foreground">{item.author}</span>
            {item.context && <span className="block text-neutral-600">{item.context}</span>}
            {item.source && <span className="block text-neutral-500">{t('source', { source: item.source })}</span>}
            {item.project && (
              <Link
                href={projectHref(item.project)}
                className="mt-2 inline-block font-medium text-primary-700 underline-offset-4 hover:underline"
              >
                {t('viewProject')}
              </Link>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  )

  if (!isHome) {
    return (
      <section className="mt-16">
        <h2 className="font-serif text-2xl font-medium text-foreground md:text-3xl">{t('title')}</h2>
        <div className="mt-8">{list}</div>
      </section>
    )
  }

  return (
    <section className="bg-neutral-50 py-24">
      <Container>
        <h2 className="text-center font-serif text-4xl font-medium text-foreground md:text-5xl">{t('title')}</h2>
        <div className="mt-12">{list}</div>
      </Container>
    </section>
  )
}
