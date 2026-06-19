'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ResearchDashboardMock from './ResearchDashboardMock'
import type { Locale } from '@/i18n/config'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
})

interface HeroDict {
  badge: string
  name: string
  descriptor: string
  headline: string
  description: string
  cta_projects: string
  cta_research: string
  cta_github: string
  building: string
}

interface Props {
  locale: Locale
  dict: HeroDict
  dashDict: {
    header: string
    sources_label: string
    sources: string[]
    model_label: string
    model: string[]
    output_label: string
    output: string[]
    status_label: string
    status_value: string
  }
}

export default function Hero({ locale, dict, dashDict }: Props) {
  return (
    <section className="min-h-[90vh] flex items-center pt-20 pb-16 px-5">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div>
            {/* Badge */}
            <motion.div {...fade(0)} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/15 bg-sky-500/5 text-sky-400 font-mono text-xs tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse-slow" />
                {dict.badge}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 {...fade(0.08)} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F5F7FA] tracking-tight leading-none mb-2">
              {dict.name}
            </motion.h1>

            {/* Descriptor */}
            <motion.p {...fade(0.14)} className="text-lg sm:text-xl font-mono text-sky-400 mb-6 tracking-wide">
              {dict.descriptor}
            </motion.p>

            {/* Headline */}
            <motion.p {...fade(0.2)} className="text-xl sm:text-2xl font-medium text-[#F5F7FA] leading-snug mb-4 max-w-lg text-balance">
              {dict.headline}
            </motion.p>

            {/* Description */}
            <motion.p {...fade(0.26)} className="text-[#9AA7B8] text-base leading-relaxed mb-8 max-w-md">
              {dict.description}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fade(0.32)} className="flex flex-wrap gap-3 mb-6">
              <Link
                href={`/${locale}/projects`}
                className="px-5 py-2.5 bg-sky-500 text-white font-semibold text-sm rounded-lg hover:bg-sky-400 transition-all duration-200 shadow-glow-sky"
              >
                {dict.cta_projects}
              </Link>
              <Link
                href={`/${locale}/research`}
                className="px-5 py-2.5 border border-border-2 text-[#9AA7B8] font-medium text-sm rounded-lg hover:text-[#F5F7FA] hover:border-slate-500 transition-all duration-200"
              >
                {dict.cta_research}
              </Link>
              <a
                href="https://github.com/juanfdezc2018-blip"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-border text-slate-500 font-medium text-sm rounded-lg hover:text-slate-300 hover:border-border-2 transition-all duration-200"
              >
                {dict.cta_github} ↗
              </a>
            </motion.div>

            {/* Building note */}
            <motion.p {...fade(0.38)} className="font-mono text-xs text-slate-600">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-slow mr-2 align-middle" />
              {dict.building}
            </motion.p>
          </div>

          {/* ── Right: dashboard mock ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block"
          >
            <ResearchDashboardMock dict={dashDict} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
