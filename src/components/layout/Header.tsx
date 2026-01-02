'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Menu, X } from 'lucide-react'
import Container from '@/components/ui/Container'
import Logo from '@/components/shared/Logo'
import { LanguageSwitcher } from '@/components/shared'
import { navigation } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Header() {
  const t = useTranslations('Navigation')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-neutral-600 transition-colors hover:text-foreground"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
            mobileMenuOpen ? 'max-h-64 pb-6' : 'max-h-0'
          )}
        >
          <ul className="flex flex-col gap-4">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-base font-medium text-neutral-600 transition-colors hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </header>
  )
}
