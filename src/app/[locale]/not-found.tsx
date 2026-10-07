import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'

export default async function NotFound() {
  const t = await getTranslations('NotFound')

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-600">
            {t('eyebrow')}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium text-foreground md:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-neutral-600">{t('description')}</p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/">{t('backHome')}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
