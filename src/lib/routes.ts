import type { ComponentProps } from 'react'
import type { Link } from '@/i18n/navigation'
import { routing, type StaticPathname } from '@/i18n/routing'

/** `href` accettato dal `Link` di next-intl (percorsi interni tipizzati, tradotti per lingua). */
export type AppHref = ComponentProps<typeof Link>['href']

export function projectHref(slug: string): AppHref {
  return { pathname: '/proyectos/[slug]', params: { slug } }
}

export function serviceHref(slug: string): AppHref {
  return { pathname: '/servicios/[slug]', params: { slug } }
}

export function newsHref(slug: string): AppHref {
  return { pathname: '/news/[slug]', params: { slug } }
}

function isStaticPathname(path: string): path is StaticPathname {
  return path in routing.pathnames && !path.includes('[')
}

/**
 * Converte un percorso interno scritto come stringa (es. nel frontmatter MDX:
 * `/tappeti`, `/proyectos/casa-archi-colori`) in un `href` tipizzato.
 * Restituisce `null` se il percorso non corrisponde a nessuna pagina del sito.
 */
export function internalHref(path: string): AppHref | null {
  if (isStaticPathname(path)) return path
  const [, section, slug, ...rest] = path.split('/')
  if (!slug || rest.length) return null
  if (section === 'proyectos') return projectHref(slug)
  if (section === 'news') return newsHref(slug)
  if (section === 'servicios') return serviceHref(slug)
  return null
}
