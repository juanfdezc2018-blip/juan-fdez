'use client'

import Link from 'next/link'
import type { Locale } from '@/i18n/config'

interface Props {
  locale: Locale
  dict: {
    disclaimer: string
    built_with: string
  }
  navDict: {
    projects: string
    research: string
    lab: string
    about: string
  }
}

export default function Footer({ locale, dict, navDict }: Props) {
  const links = [
    { href: `/${locale}/projects`, label: navDict.projects },
    { href: `/${locale}/research`, label: navDict.research },
    { href: `/${locale}/lab`, label: navDict.lab },
    { href: `/${locale}/about`, label: navDict.about },
  ]

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

          {/* Left: brand + nav */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <span className="text-sky-400 font-mono text-xs font-bold leading-none">J</span>
              </span>
              <span className="text-[#F5F7FA] font-semibold text-sm">Juan Fdez Research</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: disclaimer */}
          <div className="text-right space-y-1">
            <p className="text-slate-600 text-xs">{dict.disclaimer}</p>
            <p className="text-slate-700 text-xs font-mono">{dict.built_with}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
