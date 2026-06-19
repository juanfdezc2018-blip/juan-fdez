'use client'

import { motion } from 'framer-motion'

const highlights = [
  {
    value: 'Python',
    label: 'Primary Language',
    sub: 'Pandas · NumPy · Plotly',
    color: 'text-violet-300',
  },
  {
    value: 'Finance',
    label: 'Domain Focus',
    sub: 'Markets · Risk · Fintech',
    color: 'text-[#00D4AA]',
  },
  {
    value: 'AWS',
    label: 'Cloud Stack',
    sub: 'S3 · Lambda · RDS',
    color: 'text-orange-300',
  },
  {
    value: 'Public',
    label: 'Build Approach',
    sub: 'Open research · GitHub first',
    color: 'text-cyan-300',
  },
]

const statusCards = [
  { label: 'Projects', value: '5', sub: 'in pipeline', positive: true },
  { label: 'Published', value: '0', sub: 'growing', positive: false },
  { label: 'Focus', value: 'Markets · Risk · Fintech', sub: null, positive: true },
  { label: 'Roadmap', value: 'Q3 2026', sub: 'first release', positive: true },
]

export default function HighlightsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Skill highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {highlights.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-all duration-300 p-5 text-center group"
          >
            <div className={`text-2xl font-bold mb-1 ${item.color} group-hover:scale-110 transition-transform duration-200 inline-block`}>
              {item.value}
            </div>
            <div className="text-white text-xs font-medium mb-1">{item.label}</div>
            <div className="text-slate-600 text-xs font-mono">{item.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Status strip */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 grid grid-cols-2 lg:grid-cols-4 gap-4 divide-x-0 lg:divide-x divide-white/5">
        {statusCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
            className="text-center px-2"
          >
            <div className="font-mono text-xs text-slate-600 mb-1 uppercase tracking-wider">{card.label}</div>
            <div className={`font-semibold text-sm ${card.positive ? 'text-[#00D4AA]' : 'text-slate-400'}`}>
              {card.value}
            </div>
            {card.sub && (
              <div className="text-slate-600 text-xs mt-0.5 font-mono">{card.sub}</div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
