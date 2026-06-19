'use client'

import { motion } from 'framer-motion'
import { roadmap } from '@/data/roadmap'
import SectionHeader from './SectionHeader'
import { cn } from '@/lib/utils'

export default function Roadmap() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <SectionHeader
        label="// roadmap"
        title="Summer 2026 Build Plan"
        description="Projects and milestones I'm working toward this summer. Everything is public and evolving."
      />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-3 bottom-3 w-px bg-gradient-to-b from-[#00D4AA]/30 via-[#00D4AA]/10 to-transparent hidden sm:block" />

        <div className="space-y-4">
          {roadmap.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="sm:pl-16 relative"
            >
              {/* Phase dot */}
              <div className={cn(
                'hidden sm:flex absolute left-0 top-4 w-12 h-12 rounded-full items-center justify-center border',
                phase.status === 'active'
                  ? 'bg-[#00D4AA]/10 border-[#00D4AA]/40 shadow-glow-sm'
                  : phase.status === 'completed'
                  ? 'bg-[#00D4AA]/20 border-[#00D4AA]/60'
                  : 'bg-white/[0.03] border-white/10'
              )}>
                <span className={cn(
                  'font-mono text-xs font-bold',
                  phase.status === 'active' ? 'text-[#00D4AA]' : phase.status === 'completed' ? 'text-[#00D4AA]' : 'text-slate-600'
                )}>
                  {String(phase.phase).padStart(2, '0')}
                </span>
              </div>

              {/* Card */}
              <div className={cn(
                'rounded-xl border p-5 transition-all duration-300',
                phase.status === 'active'
                  ? 'border-[#00D4AA]/25 bg-[#00D4AA]/5'
                  : 'border-white/8 bg-white/[0.02]'
              )}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="font-mono text-xs text-slate-600 sm:hidden mr-2">
                      Phase {phase.phase}
                    </span>
                    <h3 className={cn(
                      'font-semibold text-base',
                      phase.status === 'active' ? 'text-[#00D4AA]' : 'text-white'
                    )}>
                      {phase.title}
                    </h3>
                  </div>
                  {phase.status === 'active' && (
                    <span className="shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
                      <span className="font-mono text-xs text-[#00D4AA]">Active</span>
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm mb-3">{phase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {phase.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs text-slate-500 bg-white/[0.03] border border-white/6 px-2.5 py-1 rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
