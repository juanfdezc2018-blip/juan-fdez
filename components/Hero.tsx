'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import DashboardMockup from './DashboardMockup'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00D4AA]/20 bg-[#00D4AA]/5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse-slow" />
              <span className="font-mono text-xs text-[#00D4AA] tracking-wide">
                Building in public · Summer 2026
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-2"
            >
              Juan Fdez
            </motion.h1>

            {/* Tagline */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-xl sm:text-2xl font-mono text-[#00D4AA] mb-6 tracking-wide"
            >
              Data &amp; Markets
            </motion.p>

            {/* Description */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Building data-driven research on markets, risk and fintech.
              I&apos;m a Data Engineering student turning financial data into
              clear analysis, risk insights and market research.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/projects"
                className="px-5 py-2.5 bg-[#00D4AA] text-[#050A14] font-semibold text-sm rounded-lg hover:bg-[#00D4AA]/90 transition-all duration-200 hover:shadow-glow"
              >
                View Projects
              </Link>
              <Link
                href="/research"
                className="px-5 py-2.5 border border-[#00D4AA]/30 text-[#00D4AA] font-medium text-sm rounded-lg hover:bg-[#00D4AA]/8 transition-all duration-200"
              >
                Read Research
              </Link>
              <a
                href="https://github.com/juanfdez"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-white/10 text-slate-300 font-medium text-sm rounded-lg hover:bg-white/5 hover:border-white/20 transition-all duration-200"
              >
                GitHub ↗
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-6 flex items-center gap-4"
            >
              <a
                href="https://linkedin.com/in/juanfdez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                LinkedIn ↗
              </a>
              <span className="text-slate-700">·</span>
              <a
                href="https://x.com/juanfdez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                X / Twitter ↗
              </a>
              <span className="text-slate-700">·</span>
              <a
                href="mailto:juanfdezc.2018@gmail.com"
                className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                Email ↗
              </a>
            </motion.div>
          </div>

          {/* Right: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
