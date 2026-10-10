import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui'
import Container from '@/components/ui/Container'
import { useTranslations } from 'next-intl'
import type { StaticPathname } from '@/i18n/routing'

interface HeroProps {
  ctaHref?: StaticPathname
}

export default function Hero({
  ctaHref = '/proyectos',
}: HeroProps) {
  const t = useTranslations('Navigation')
  const tHero = useTranslations('Hero')

  return (
    <section className="relative flex overflow-hidden pt-16 pb-10 justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-background to-background" />

      {/* Decorative elements */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary-100/30 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-primary-200/20 blur-3xl" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Portrait */}
          <div className="mb-8 flex justify-center">
            <div className="relative h-44 w-44 overflow-hidden rounded-full ring-2 ring-primary-300 ring-offset-4 ring-offset-background">
              <Image
                src="/images/about/martina-pozzi.jpg"
                alt="Martina Pozzi"
                fill
                className="object-cover"
                sizes="176px"
                priority
                // Su mobile è l'elemento LCP della home
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Overline */}
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-primary-600">
            {tHero('overline')}
          </p>

          {/* Title */}
          <h1 className="font-serif text-2xl font-medium leading-tight tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl xl:text-5xl">
            {tHero('title')}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-3xl text-balance text-lg leading-relaxed text-foreground/70 sm:text-xl lg:text-2xl">
            {tHero.rich('subtitle', { b: (chunks) => <strong className="font-medium text-foreground">{chunks}</strong> })}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href={ctaHref}>{t('projects')}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contacto">{t('contact')}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/servicios">{t('services')}</Link>
            </Button>
          </div>
        </div>
      </Container>

    </section>
  )
}
