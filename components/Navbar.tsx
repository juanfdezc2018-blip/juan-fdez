'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import LanguageSwitcher from './LanguageSwitcher'
import type { Locale } from '@/i18n/config'

interface NavDict {
  home: string
  projects: string
  research: string
  lab: string
  about: string
  github: string
  menu_open: string
  menu_close: string
}

interface Props {
  locale: Locale
  dict: NavDict
}

export default function Navbar({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: `/${locale}`, label: dict.home },
    { href: `/${locale}/projects`, label: dict.projects },
    { href: `/${locale}/research`, label: dict.research },
    { href: `/${locale}/lab`, label: dict.lab },
    { href: `/${locale}/about`, label: dict.about },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-base/85 backdrop-blur-xl border-b border-border/60'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 group shrink-0"
        >
          <span className="w-6 h-6 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <span className="text-sky-400 font-mono text-xs font-bold leading-none">J</span>
          </span>
          <span className="font-semibold text-[#F5F7FA] text-sm tracking-tight">
            Juan Fdez
          </span>
          <span className="hidden sm:inline text-slate-600 text-xs font-mono">Research</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'text-sky-400 bg-sky-400/8'
                    : 'text-slate-400 hover:text-[#F5F7FA] hover:bg-white/4'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right side: GitHub + Language switcher */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a
            href="https://github.com/juanfdezc2018-blip"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md border border-border text-slate-400 text-sm font-medium hover:text-[#F5F7FA] hover:border-border-2 transition-all duration-150"
          >
            {dict.github}
          </a>
          <LanguageSwitcher currentLocale={locale} />
        </div>

        {/* Mobile: lang switcher + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher currentLocale={locale} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? dict.menu_close : dict.menu_open}
            className="text-slate-400 hover:text-[#F5F7FA] p-1.5 transition-colors"
          >
            <div className="w-4 flex flex-col gap-1">
              <span className={cn('h-px bg-current transition-all duration-200', mobileOpen && 'rotate-45 translate-y-1.5')} />
              <span className={cn('h-px bg-current transition-all duration-200', mobileOpen && 'opacity-0')} />
              <span className={cn('h-px bg-current transition-all duration-200', mobileOpen && '-rotate-45 -translate-y-1.5')} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden overflow-hidden bg-base/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-5 py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-sky-400 bg-sky-400/8'
                      : 'text-slate-400 hover:text-[#F5F7FA]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com/juanfdezc2018-blip"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 text-sm text-slate-400 hover:text-[#F5F7FA] transition-colors"
              >
                {dict.github} ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
