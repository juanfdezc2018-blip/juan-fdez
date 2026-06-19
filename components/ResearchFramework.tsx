'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

interface Step {
  number: string
  title: string
  desc: string
}

interface Props {
  dict: {
    section_label: string
    section_title: string
    section_desc: string
    steps: Step[]
  }
}

export default function ResearchFramework({ dict }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeader
        label={dict.section_label}
        title={dict.section_title}
        description={dict.section_desc}
      />

      <div className="relative">
        {/* Horizontal connector line (desktop) */}
        <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {dict.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Number circle */}
              <div className="w-14 h-14 rounded-full border border-border bg-surface group-hover:border-sky-500/30 group-hover:bg-sky-500/5 transition-all duration-300 flex items-center justify-center mb-4 relative z-10">
                <span className="font-mono text-sm font-bold text-sky-400 opacity-80">
                  {step.number}
                </span>
              </div>

              <h3 className="text-[#F5F7FA] font-semibold text-sm mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-[#9AA7B8] text-xs leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
