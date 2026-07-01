'use client'

import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-neutral-700"
          >
            {link.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </section>
  )
}
