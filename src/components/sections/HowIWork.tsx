import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Container from '@/components/ui/Container'
import { serviceHref } from '@/lib/routes'

interface HowIWorkProps {
  locale: string
  /** Slug della pagina sulla ristrutturazione, se pubblicata; altrimenti il link va all'hub /servizi */
  renovationSlug?: string
}

const STEPS = ['1', '2', '3', '4'] as const

export default async function HowIWork({ locale, renovationSlug }: HowIWorkProps) {
  const t = await getTranslations({ locale, namespace: 'HowIWork' })

  return (
    <section className="bg-neutral-50 py-24">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl font-medium text-foreground md:text-5xl">{t('title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">{t('subtitle')}</p>
        </div>

        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step} className="rounded-2xl bg-white p-8">
              <span className="font-serif text-3xl text-primary-600">{step}</span>
              <h3 className="mt-4 font-serif text-xl font-medium text-foreground">{t(`s${step}title`)}</h3>
              <p className="mt-3 leading-relaxed text-neutral-600">{t(`s${step}`)}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <Link
            href={renovationSlug ? serviceHref(renovationSlug) : '/servicios'}
            className="inline-flex items-center gap-2 font-medium text-primary-700 underline-offset-4 hover:underline"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
