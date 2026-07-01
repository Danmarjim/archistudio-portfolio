import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import NewsGrid from '@/components/sections/NewsGrid'
import NavBand from '@/components/sections/NavBand'
import { getAllNews } from '@/lib/news'
import { getTranslations } from 'next-intl/server'

interface NewsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'NewsPage' })
  return {
    title: `${t('title')} | MP_archistudio`,
    description: t('description'),
  }
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params
  const posts = getAllNews(locale)
  const t = await getTranslations({ locale, namespace: 'NewsPage' })

  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-neutral-500">
            {t('description')}
          </p>
        </div>

        <NewsGrid posts={posts} />
      </Container>
      <div className="bg-background py-1" />
      <NavBand />
    </div>
  )
}
