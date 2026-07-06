'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui'

export default function NavBand() {
  const t = useTranslations('Navigation')

  const navLinks = [
    { label: t('projects'), href: '/proyectos' },
    { label: t('about'), href: '/sobre-mi' },
    { label: t('services'), href: '/servicios' },
    { label: t('news'), href: '/news' },
    { label: t('contact'), href: '/contacto' },
  ]

  return (
    <section className="bg-primary-200 py-14">
      <div className="flex flex-wrap justify-center gap-5 px-6">
        {navLinks.map((link) => (
          <Button key={link.href} variant="inverse" size="lg" trailingIcon asChild>
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </div>
    </section>
  )
}
