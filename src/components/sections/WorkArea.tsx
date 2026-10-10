import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Container from '@/components/ui/Container'

interface WorkAreaProps {
  locale: string
}

export default async function WorkArea({ locale }: WorkAreaProps) {
  const t = await getTranslations({ locale, namespace: 'WorkArea' })

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-medium text-foreground md:text-5xl">{t('title')}</h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">{t('p1')}</p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">{t('p2')}</p>
          <Link
            href="/proyectos"
            className="mt-8 inline-flex items-center gap-2 font-medium text-primary-700 underline-offset-4 hover:underline"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
