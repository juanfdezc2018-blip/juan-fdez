'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { statusStyles } from '@/lib/utils'
import type { Status } from '@/types'

interface FocusItem {
  title: string
  desc: string
  status: string
  tags: string[]
}

interface Props {
  dict: {
    section_label: string
    section_title: string
    section_desc: string
    items: FocusItem[]
  }
  statusDict: Record<string, string>
}

export default function CurrentFocus({ dict, statusDict }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeader
        label={dict.section_label}
        title={dict.section_title}
        description={dict.section_desc}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {dict.items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="group rounded-xl border border-border bg-surface hover:border-border-2 transition-all duration-300 p-5"
          >
            {/* Status */}
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-mono mb-3 ${statusStyles[item.status as Status] ?? statusStyles.planned}`}>
              {statusDict[item.status] ?? item.status}
            </span>

            <h3 className="text-[#F5F7FA] font-semibold text-sm mb-2 group-hover:text-sky-300 transition-colors">
              {item.title}
            </h3>
            <p className="text-[#9AA7B8] text-xs leading-relaxed mb-3">{item.desc}</p>

            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-border text-slate-500 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
