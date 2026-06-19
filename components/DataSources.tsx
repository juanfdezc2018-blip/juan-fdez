'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

interface Props {
  dict: {
    section_label: string
    section_title: string
    section_desc: string
    items: string[]
  }
}

export default function DataSources({ dict }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeader
        label={dict.section_label}
        title={dict.section_title}
        description={dict.section_desc}
      />

      <div className="flex flex-wrap gap-2">
        {dict.items.map((source, i) => (
          <motion.span
            key={source}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="px-3.5 py-2 rounded-lg border border-border bg-surface text-[#9AA7B8] text-sm font-medium hover:border-border-2 hover:text-[#F5F7FA] transition-all duration-200"
          >
            {source}
          </motion.span>
        ))}
      </div>
    </section>
  )
}
