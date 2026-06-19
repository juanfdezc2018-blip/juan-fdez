'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { techStack } from '@/data/techStack'
import { categoryLabels } from '@/data/techStack'
import type { TechCategory } from '@/types'

const categoryColors: Record<TechCategory, string> = {
  language: 'text-violet-400 border-violet-400/20 bg-violet-400/5',
  data:     'text-sky-400 border-sky-400/20 bg-sky-400/5',
  cloud:    'text-amber-400 border-amber-400/20 bg-amber-400/5',
  viz:      'text-pink-400 border-pink-400/20 bg-pink-400/5',
  web:      'text-cyan-400 border-cyan-400/20 bg-cyan-400/5',
  tools:    'text-slate-400 border-slate-400/20 bg-slate-400/5',
}

interface Props {
  dict: {
    section_label: string
    section_title: string
    section_desc: string
  }
}

export default function TechStack({ dict }: Props) {
  const grouped = techStack.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<TechCategory, typeof techStack>)

  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeader
        label={dict.section_label}
        title={dict.section_title}
        description={dict.section_desc}
      />

      <div className="space-y-4">
        {(Object.entries(grouped) as [TechCategory, typeof techStack][]).map(([cat, items], gi) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.06, duration: 0.4 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="font-mono text-xs text-slate-600 w-20 shrink-0">
              {categoryLabels[cat]}
            </span>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item.name}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-transform duration-200 hover:scale-105 ${categoryColors[item.category]}`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
