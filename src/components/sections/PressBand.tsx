import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Container from '@/components/ui/Container'

interface PressItem {
  slug: string
  source: string
  title: string
}

interface PressBandProps {
  items: PressItem[]
}

/** Fascia "Pubblicato su": le testate che hanno pubblicato i progetti, con link alla news. */
export default function PressBand({ items }: PressBandProps) {
  const t = useTranslations('Press')

  // Una sola voce per testata
  const unique = items.filter(
    (item, index) => items.findIndex((other) => other.source === item.source) === index
  )
  if (unique.length === 0) return null

  return (
    <section aria-label={t('title')} className="border-y border-neutral-100 bg-background py-10">
      <Container>
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-center sm:gap-10">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            {t('title')}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {unique.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/news/${item.slug}`}
                  title={item.title}
                  className="inline-flex min-h-11 items-center font-serif text-xl text-foreground/80 transition-colors hover:text-primary-600"
                >
                  {item.source}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
