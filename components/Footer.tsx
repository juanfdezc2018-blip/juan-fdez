'use client'

import Link from 'next/link'

const links = [
  { label: 'GitHub', href: 'https://github.com/juanfdez' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/juanfdez' },
  { label: 'X / Twitter', href: 'https://x.com/juanfdez' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#00D4AA] opacity-40">{'//'}</span>
          <p className="text-slate-500 text-sm">
            © Juan Fdez Research.{' '}
            <span className="text-slate-600">
              Built with Next.js, data and curiosity.
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-[#00D4AA] text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
