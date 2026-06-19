'use client'

import { motion } from 'framer-motion'

interface DashDict {
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

interface Props {
  dict: DashDict
}

function PipelineColumn({
  label,
  items,
  color,
  delay,
}: {
  label: string
  items: string[]
  color: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col gap-2"
    >
      <span className={`font-mono text-xs uppercase tracking-widest ${color} opacity-70`}>
        {label}
      </span>
      <div className="flex flex-col gap-1.5">
        {items.map((item) => (
          <div
            key={item}
            className="px-2.5 py-1.5 rounded-md bg-white/[0.03] border border-border text-[#9AA7B8] text-xs font-medium"
          >
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function ResearchDashboardMock({ dict }: Props) {
  return (
    <div className="relative animate-float">
      {/* Outer glow */}
      <div
        className="absolute -inset-6 rounded-2xl opacity-20"
        style={{ background: 'radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, transparent 70%)' }}
      />

      {/* Card */}
      <div className="relative rounded-2xl border border-border bg-surface shadow-card overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[#0A1420]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
            </div>
            <span className="font-mono text-xs text-slate-500 ml-1">{dict.header}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
            <span className="font-mono text-xs text-slate-600">{dict.status_label}</span>
            <span className="font-mono text-xs text-emerald-400">{dict.status_value}</span>
          </div>
        </div>

        {/* Pipeline */}
        <div className="p-5">
          {/* Pipeline flow */}
          <div className="grid grid-cols-3 gap-4 relative">
            {/* Arrows between columns */}
            <div className="absolute left-[calc(33%-8px)] top-8 text-border text-xs hidden sm:block">→</div>
            <div className="absolute left-[calc(67%-8px)] top-8 text-border text-xs hidden sm:block">→</div>

            <PipelineColumn label={dict.sources_label} items={dict.sources} color="text-sky-400" delay={0.1} />
            <PipelineColumn label={dict.model_label} items={dict.model} color="text-violet-400" delay={0.2} />
            <PipelineColumn label={dict.output_label} items={dict.output} color="text-amber-400" delay={0.3} />
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-border" />

          {/* Bottom metrics row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Python', val: 'Primary' },
              { label: 'AWS', val: 'Cloud' },
              { label: 'Public', val: 'Open' },
            ].map((m) => (
              <div key={m.label} className="rounded-lg bg-white/[0.02] border border-border p-2.5 text-center">
                <div className="font-mono text-xs text-sky-400 font-semibold">{m.val}</div>
                <div className="font-mono text-xs text-slate-600 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
