'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { cn } from '@/lib/utils'

interface Phase {
  phase: number
  title: string
  desc: string
  items: string[]
  status: string
}

interface Props {
  dict: {
    section_label: string
    section_title: string
    section_desc: string
    phases: Phase[]
  }
  statusDict: Record<string, string>
}

export default function Roadmap({ dict, statusDict }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeader
        label={dict.section_label}
        title={dict.section_title}
        description={dict.section_desc}
      />

      <div className="relative">
        {/* Vertical line */}
        <div className="hidden sm:block absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-sky-500/20 via-border to-transparent" />

        <div className="space-y-3">
          {dict.phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.45 }}
              className="sm:pl-16 relative"
            >
              {/* Phase dot */}
              <div className={cn(
                'hidden sm:flex absolute left-0 top-4 w-12 h-12 rounded-full items-center justify-center border',
                phase.status === 'active'
                  ? 'bg-sky-500/10 border-sky-500/30 shadow-glow-sm'
                  : phase.status === 'completed'
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-surface border-border'
              )}>
                <span className={cn(
                  'font-mono text-xs font-bold',
                  phase.status === 'active' ? 'text-sky-400' :
                  phase.status === 'completed' ? 'text-emerald-400' : 'text-slate-600'
                )}>
                  {String(phase.phase).padStart(2, '0')}
                </span>
              </div>

              {/* Card */}
              <div className={cn(
                'rounded-xl border p-5 transition-all duration-200',
                phase.status === 'active'
                  ? 'border-sky-500/20 bg-sky-500/[0.04]'
                  : 'border-border bg-surface'
              )}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className={cn(
                    'font-semibold text-sm',
                    phase.status === 'active' ? 'text-sky-400' : 'text-[#F5F7FA]'
                  )}>
                    {phase.title}
                  </h3>
                  <span className={cn(
                    'shrink-0 font-mono text-xs px-2 py-0.5 rounded-full border',
                    phase.status === 'active'
                      ? 'text-sky-400 border-sky-400/25 bg-sky-400/8'
                      : phase.status === 'completed'
                      ? 'text-emerald-400 border-emerald-400/25 bg-emerald-400/8'
                      : 'text-slate-600 border-border'
                  )}>
                    {statusDict[phase.status] ?? phase.status}
                  </span>
                </div>
                <p className="text-[#9AA7B8] text-xs mb-3">{phase.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {phase.items.map((item) => (
                    <span key={item} className="text-xs text-slate-500 bg-white/[0.03] border border-border px-2.5 py-1 rounded-md">
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
