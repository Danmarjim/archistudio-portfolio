'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { usePathname, useRouter } from '@/i18n/navigation'
import { locales, type Locale } from '@/i18n/routing'
import { Globe } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const params = useParams()

  const handleLocaleChange = (newLocale: Locale) => {
    // Con `pathnames` localizzati le rotte dinamiche (/progetti/[slug]) richiedono i params.
    // `params` arriva dal router e corrisponde sempre al `pathname` corrente.
    router.replace(
      // @ts-expect-error -- next-intl non può correlare staticamente pathname e params correnti
      { pathname, params },
      { locale: newLocale }
    )
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-foreground"
        aria-expanded={isOpen}
      >
        {/* Nome accessibile dal contenuto ("IT, Lingua"): un aria-label che non include il testo visibile rompe il controllo vocale */}
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">{locale}</span>
        <span className="sr-only">, {t('label')}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[120px] overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => handleLocaleChange(loc)}
              className={cn(
                'flex w-full items-center px-4 py-2 text-left text-sm transition-colors hover:bg-neutral-100',
                locale === loc
                  ? 'bg-neutral-50 font-medium text-foreground'
                  : 'text-neutral-600'
              )}
            >
              {t(loc)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
