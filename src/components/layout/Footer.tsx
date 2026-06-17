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
                    {link.platform === 'pinterest' && (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                      </svg>
                    )}
                    {link.platform === 'linktree' && (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M13.511 5.853l4.005-4.117 2.117 2.057-4.12 4.002h5.734v2.912h-5.734l4.12 4.003-2.117 2.057-4.005-4.117v9.35h-3.022v-9.35l-4.004 4.117-2.118-2.057 4.12-4.003H3.753V8.795h5.734L5.367 3.793l2.118-2.057 4.004 4.117V.001h3.022v5.852z"/>
                      </svg>
                    )}
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
