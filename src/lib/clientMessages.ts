import type { AbstractIntlMessages } from 'next-intl'

/**
 * Testi che servono ai componenti client presenti in molte pagine (header, footer, card dei
 * progetti, blocchi della home). Il layout radice passa al browser solo questi; ogni sezione
 * aggiunge i propri nel suo layout con `ClientMessages`. Così una pagina non scarica i testi
 * di tutte le altre. `Namespace.chiave` prende una sola chiave.
 */
export const GLOBAL_CLIENT_NAMESPACES = [
  'Navigation',
  'Footer',
  'LanguageSwitcher',
  'ServicesData',
  'ServiciosPage.howWeWorkTitle',
  'AboutPreview',
  'ServicesPreview',
  'CallToAction',
  'FeaturedProjects',
  'ProjectCategories',
]

export function pickMessages(messages: AbstractIntlMessages, keys: string[]): AbstractIntlMessages {
  const picked: Record<string, AbstractIntlMessages | string> = {}
  for (const key of keys) {
    const [namespace, subKey] = key.split('.')
    const value = messages[namespace]
    if (value === undefined) continue
    if (!subKey) {
      picked[namespace] = value
    } else if (typeof value === 'object' && value[subKey] !== undefined) {
      const current = picked[namespace]
      // Non sovrascrivere un namespace già preso per intero
      if (typeof current === 'object' && Object.keys(current).length === Object.keys(value).length) continue
      picked[namespace] = { ...(typeof current === 'object' ? current : {}), [subKey]: value[subKey] }
    }
  }
  return picked
}
