'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'
import Logo from '@/components/shared/Logo'
import { LanguageSwitcher } from '@/components/shared'
import { navigation, services } from '@/lib/constants'
import { cn } from '@/lib/utils'

const serviceSlugToKey: Record<string, string> = {
  'archiadvice': 'archiadvice',
  'consulenza-acquisto': 'consulenzaAcquisto',
  'restyling': 'restyling',
  'progettazione-architettonica': 'progettazione',
}

export default function Header() {
  const t = useTranslations('Navigation')
  const tServices = useTranslations('ServicesData')
  const tPage = useTranslations('ServiciosPage')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setServicesOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150)
  }

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
                <li key={item.href} className="relative">
                  {item.label === 'services' ? (
                    <div
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-foreground"
                      >
                        {t(item.label)}
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            servicesOpen && 'rotate-180'
                          )}
                        />
                      </Link>

                      {/* Dropdown */}
                      <div
                        className={cn(
                          'absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200',
                          servicesOpen
                            ? 'pointer-events-auto opacity-100 translate-y-0'
                            : 'pointer-events-none opacity-0 -translate-y-1'
                        )}
                      >
                        <ul className="min-w-[240px] overflow-hidden rounded-2xl border border-neutral-100 bg-background shadow-lg">
                          {services.map((service, i) => (
                            <li key={service.slug}>
                              <Link
                                href={`/servicios#${service.slug}`}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-foreground"
                                onClick={() => setServicesOpen(false)}
                              >
                                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-[10px] font-semibold text-white">
                                  {i + 1}
                                </span>
                                {tServices(`${serviceSlugToKey[service.slug] ?? service.slug}.title` as Parameters<typeof tServices>[0])}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href="/servicios#come-lavoriamo"
                              className="flex items-center gap-3 border-t border-neutral-100 px-4 py-3 text-sm font-medium text-primary-600 transition-colors hover:bg-neutral-50"
                              onClick={() => setServicesOpen(false)}
                            >
                              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-[10px] font-semibold text-primary-600">
                                →
                              </span>
                              {tPage('howWeWorkTitle')}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-neutral-600 transition-colors hover:text-foreground"
                    >
                      {t(item.label)}
                    </Link>
                  )}
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
            mobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          )}
        >
          <ul className="flex flex-col gap-4">
            {navigation.map((item) => (
              <li key={item.href}>
                {item.label === 'services' ? (
                  <div>
                    <button
                      className="flex w-full items-center justify-between text-base font-medium text-neutral-600 transition-colors hover:text-foreground"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      {t(item.label)}
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          mobileServicesOpen && 'rotate-180'
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-200',
                        mobileServicesOpen ? 'max-h-64 mt-2' : 'max-h-0'
                      )}
                    >
                      <ul className="flex flex-col gap-2 pl-4 border-l border-neutral-200">
                        {services.map((service, i) => (
                          <li key={service.slug}>
                            <Link
                              href={`/servicios#${service.slug}`}
                              className="flex items-center gap-2 py-1 text-sm text-neutral-500 hover:text-foreground"
                              onClick={() => {
                                setMobileMenuOpen(false)
                                setMobileServicesOpen(false)
                              }}
                            >
                              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-[9px] font-semibold text-white">
                                {i + 1}
                              </span>
                              {tServices(`${serviceSlugToKey[service.slug] ?? service.slug}.title` as Parameters<typeof tServices>[0])}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-base font-medium text-neutral-600 transition-colors hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.label)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </header>
  )
}
