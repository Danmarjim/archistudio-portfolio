import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  // Tutti gli URL del sito sono in minuscolo: le varianti con maiuscole (/PROGETTI,
  // /es/proyectos/cucina-MITE) vengono reindirizzate in modo permanente invece di dare 404.
  // Va fatto qui e non in next.config.ts, dove i redirect ignorano le maiuscole e andrebbero in loop.
  const { pathname } = request.nextUrl
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.toLowerCase()
    return NextResponse.redirect(url, 301)
  }
  return handleI18nRouting(request)
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals
  // - Static files
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
