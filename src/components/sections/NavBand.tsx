'use client'

import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
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
    <section style={{ backgroundColor: '#eeb898' }} className="py-14">
      <div className="flex flex-wrap justify-center gap-5 px-6">
        {navLinks.map((link) => (
          <Button
            key={link.href}
            size="lg"
            className="bg-white text-primary-600 hover:bg-primary-50"
            asChild
          >
            <Link href={link.href}>
              {link.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ))}
      </div>
    </section>
  )
}
