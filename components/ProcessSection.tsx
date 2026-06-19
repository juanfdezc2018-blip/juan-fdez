'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const steps = [
  {
    number: '01',
    title: 'Collect Official Data',
    description: 'Annual reports, regulatory filings, CNMV disclosures, market data APIs and public financial databases.',
    icon: '⬇',
  },
  {
    number: '02',
    title: 'Clean & Model with Python',
    description: 'Pandas pipelines to normalize, validate and structure raw data into analysis-ready formats.',
    icon: '⚙',
  },
  {
    number: '03',
    title: 'Build Scenarios & Risk Views',
    description: 'Valuation models, risk metrics (VaR, volatility, drawdown) and scenario analysis across assumptions.',
    icon: '◈',
  },
  {
    number: '04',
    title: 'Publish Clear Research',
    description: 'Turn the analysis into clear, visual and actionable research notes — public and reproducible.',
    icon: '↗',
  },
]

export default function ProcessSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <SectionHeader
        label="// process"
        title="How I Work"
        description="A data-first methodology for financial research."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative group rounded-xl border border-white/8 bg-white/[0.02] hover:border-[#00D4AA]/20 hover:bg-[#00D4AA]/[0.03] transition-all duration-300 p-5"
          >
            {/* Connection arrow */}
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-700 text-lg">
                →
              </div>
            )}

            <div className="font-mono text-2xl text-[#00D4AA]/20 group-hover:text-[#00D4AA]/40 transition-colors mb-3 font-bold">
              {step.number}
            </div>
            <div className="text-2xl mb-3 opacity-60">{step.icon}</div>
            <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
