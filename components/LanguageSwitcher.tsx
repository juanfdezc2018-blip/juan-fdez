'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'

interface Props {
  currentLocale: Locale
}

export default function LanguageSwitcher({ currentLocale }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: Locale) {
    if (newLocale === currentLocale) return
    // Replace the locale segment in the current path
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border bg-surface p-0.5">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={cn(
            'px-2.5 py-1 rounded text-xs font-mono font-medium uppercase tracking-wide transition-all duration-150',
            locale === currentLocale
              ? 'bg-sky-500/15 text-sky-400'
              : 'text-slate-500 hover:text-slate-300'
          )}
        >
          {locale}
        </button>
      ))}
    </div>
  )
}
