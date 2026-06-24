import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import NewsGrid from '@/components/sections/NewsGrid'
import NavBand from '@/components/sections/NavBand'
import { getAllNews } from '@/lib/news'

export const metadata: Metadata = {
  title: 'News | MP_archistudio',
  description: 'Pubblicazioni, riflessioni, annunci e interviste di MP_archistudio.',
}

interface NewsPageProps {
  params: Promise<{ locale: string }>
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params
  const posts = getAllNews(locale)

  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            News
          </h1>
          <p className="mt-4 text-neutral-500">
            Pubblicazioni, riflessioni, annunci e interviste
          </p>
        </div>

        <NewsGrid posts={posts} />
      </Container>
      <div className="bg-background py-1" />
      <NavBand />
    </div>
  )
}
