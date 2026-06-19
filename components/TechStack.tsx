'use client'

import { motion } from 'framer-motion'
import { techStack, categoryLabels } from '@/data/techStack'
import SectionHeader from './SectionHeader'

const categoryColors: Record<string, string> = {
  language: 'border-violet-400/20 bg-violet-400/5 text-violet-300',
  data: 'border-blue-400/20 bg-blue-400/5 text-blue-300',
  cloud: 'border-orange-400/20 bg-orange-400/5 text-orange-300',
  viz: 'border-pink-400/20 bg-pink-400/5 text-pink-300',
  web: 'border-cyan-400/20 bg-cyan-400/5 text-cyan-300',
  tools: 'border-slate-400/20 bg-slate-400/5 text-slate-300',
}

export default function TechStack() {
  const grouped = techStack.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof techStack>)

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <SectionHeader
        label="// stack"
        title="Tools & Technologies"
        description="The tools I use to collect, process and visualize financial data."
      />

      <div className="space-y-6">
        {Object.entries(grouped).map(([category, items], gi) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.06, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="font-mono text-xs text-slate-600 w-24 shrink-0">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </span>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item.name}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200 hover:scale-105 ${categoryColors[item.category]}`}
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
