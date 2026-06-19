'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#050A14]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-xs text-[#00D4AA] opacity-60 group-hover:opacity-100 transition-opacity">
            {'//'}
          </span>
          <span className="font-semibold text-white tracking-tight">
            Juan Fdez
          </span>
          <span className="hidden sm:inline text-slate-500 text-sm font-light">
            · Research
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                pathname === link.href
                  ? 'text-[#00D4AA] bg-[#00D4AA]/8'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:juanfdezc.2018@gmail.com"
            className="ml-2 px-4 py-1.5 rounded-md border border-[#00D4AA]/30 text-[#00D4AA] text-sm font-medium hover:bg-[#00D4AA]/10 transition-all duration-200"
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={cn('h-px bg-current transition-all', mobileOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('h-px bg-current transition-all', mobileOpen && 'opacity-0')} />
            <span className={cn('h-px bg-current transition-all', mobileOpen && '-rotate-45 -translate-y-2')} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050A14]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-2.5 rounded-md text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-[#00D4AA] bg-[#00D4AA]/8'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
