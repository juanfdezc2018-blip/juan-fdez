import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

// Paths that should not be localized
const PUBLIC_FILE = /\.(.*)$/
const NEXT_PATHS = /^\/_next\//

function getLocaleFromHeader(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language') || ''
  const preferred = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase()
  return locales.includes(preferred as typeof locales[number]) ? preferred : defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files and Next.js internals
  if (PUBLIC_FILE.test(pathname) || NEXT_PATHS.test(pathname)) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale prefix
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!hasLocale) {
    const locale = getLocaleFromHeader(request)
    const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
