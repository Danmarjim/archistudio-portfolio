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

type Translator = Awaited<ReturnType<typeof getTranslations<'Testimonials'>>>

/** Da quante testimonianze la home passa dalla griglia alle due file che scorrono */
const MARQUEE_MIN = 8
/** Schede minime per metà fila: sotto questa larghezza su schermi grandi resterebbe un vuoto */
const MIN_CARDS_PER_HALF = 6

interface CardProps {
  item: Testimonial
  locale: string
  t: Translator
  /** Nel carosello il testo si accorcia; la scheda resta leggibile intera da lettore di schermo */
  clamp?: boolean
  /** Copia per il ciclo continuo: nascosta a lettori di schermo e tastiera */
  duplicate?: boolean
}

function TestimonialCard({ item, locale, t, clamp = false, duplicate = false }: CardProps) {
  return (
    <figure
      aria-hidden={duplicate || undefined}
      className={cn(
        'flex flex-col rounded-2xl border border-neutral-200 bg-white p-7',
        clamp && 'w-[300px] shrink-0 sm:w-[370px]'
      )}
    >
      <span aria-hidden="true" className="font-serif text-5xl leading-none text-primary-600">
        “
      </span>
      <blockquote
        lang={item.translation ? locale : item.quoteLang}
        className={cn('mt-2 flex-1 leading-relaxed text-neutral-700', clamp && 'line-clamp-5')}
      >
        <p>{item.translation ?? item.quote}</p>
      </blockquote>
      {item.translation && (
        <p className="mt-3 text-xs text-neutral-500">{t('translated', { lang: item.quoteLang })}</p>
      )}
      <figcaption className="mt-6 text-sm">
        <span className="font-medium text-foreground">— {item.author}</span>
        {item.context && <span className="block pl-4 text-neutral-500">{item.context}</span>}
        {item.source && <span className="block pl-4 text-neutral-500">{t('source', { source: item.source })}</span>}
        {item.project && (
          <Link
            href={projectHref(item.project)}
            tabIndex={duplicate ? -1 : undefined}
            className="mt-2 inline-block pl-4 font-medium text-primary-700 underline-offset-4 hover:underline"
          >
            {t('viewProject')}
          </Link>
        )}
      </figcaption>
    </figure>
  )
}

/**
 * Una fila che scorre all'infinito: la seconda metà ripete la prima, così a -50% il movimento
 * riparte senza salti. Si ferma al passaggio del mouse; con "riduci movimento" resta ferma e
 * si scorre a mano.
 */
function MarqueeRow({ items, reverse, locale, t }: { items: Testimonial[]; reverse?: boolean; locale: string; t: Translator }) {
  const repeat = Math.ceil(MIN_CARDS_PER_HALF / items.length)
  const half = Array.from({ length: repeat }, () => items).flat()

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto">
      <div
        className={cn(
          'flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-6 pr-6">
            {half.map((item, i) => (
              <TestimonialCard
                key={`${item.slug}-${i}`}
                item={item}
                locale={locale}
                t={t}
                clamp
                duplicate={copy === 1 || i >= items.length}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Nessun markup `Review`: Google non mostra le recensioni che un'attività pubblica su se stessa
// (self-serving reviews), quindi qui il valore è solo per chi legge.
export default async function Testimonials({ testimonials, locale, variant = 'home' }: TestimonialsProps) {
  if (testimonials.length === 0) return null
  const t = await getTranslations({ locale, namespace: 'Testimonials' })

  const grid = (
    <div
      className={cn(
        'grid gap-6',
        testimonials.length > 1 && 'md:grid-cols-2',
        testimonials.length > 2 && 'lg:grid-cols-3'
      )}
    >
      {testimonials.map((item) => (
        <TestimonialCard key={item.slug} item={item} locale={locale} t={t} />
      ))}
    </div>
  )

  if (variant === 'inline') {
    return (
      <section className="mt-16">
        <h2 className="font-serif text-2xl font-medium text-foreground md:text-3xl">{t('title')}</h2>
        <div className="mt-8">{grid}</div>
      </section>
    )
  }

  const marquee = testimonials.length >= MARQUEE_MIN
  const rows = [testimonials.filter((_, i) => i % 2 === 0), testimonials.filter((_, i) => i % 2 === 1)]

  return (
    <section className="bg-neutral-50 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-600">{t('eyebrow')}</p>
          <h2 className="mt-4 font-serif text-4xl font-medium text-foreground md:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-neutral-600">{t('subtitle')}</p>
        </div>
        {!marquee && <div className="mt-12">{grid}</div>}
      </Container>
      {marquee && (
        <div className="mt-12 space-y-6">
          <MarqueeRow items={rows[0]} locale={locale} t={t} />
          <MarqueeRow items={rows[1]} locale={locale} t={t} reverse />
        </div>
      )}
    </section>
  )
}
