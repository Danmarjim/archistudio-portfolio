'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Instagram, Linkedin, Mail } from 'lucide-react'
import Container from '@/components/ui/Container'
import Logo from '@/components/shared/Logo'
import { navigation, siteConfig } from '@/lib/constants'

export default function Footer() {
  const t = useTranslations('Footer')
  const tNav = useTranslations('Navigation')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-4">
              <Logo />
              <p className="max-w-xs text-sm text-neutral-600">
                {t('description')}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                {t('navigation')}
              </h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-600 transition-colors hover:text-foreground"
                    >
                      {tNav(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                {t('contact')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" />
                    {siteConfig.email}
                  </a>
                </li>
              </ul>

              {/* Social Links */}
              <div className="mt-6 flex gap-4">
                {siteConfig.social.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 transition-colors hover:text-foreground"
                    aria-label={link.platform}
                  >
                    {link.platform === 'instagram' && <Instagram className="h-5 w-5" />}
                    {link.platform === 'linkedin' && <Linkedin className="h-5 w-5" />}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <p className="text-center text-sm text-neutral-500">
              &copy; {currentYear} {siteConfig.name}. {t('rights')}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
