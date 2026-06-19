'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

interface PrincipleItem {
  title: string
  desc: string
}

interface Props {
  dict: {
    section_label: string
    section_title: string
    section_desc: string
    items: PrincipleItem[]
  }
}

const icons = ['◆', '◇', '◈', '○', '◎']

export default function Principles({ dict }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeader
        label={dict.section_label}
        title={dict.section_title}
        description={dict.section_desc}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {dict.items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            className="group rounded-xl border border-border bg-surface hover:border-sky-500/20 hover:bg-sky-500/[0.02] transition-all duration-300 p-5"
          >
            <div className="flex items-start gap-3">
              <span className="text-sky-400 font-mono text-sm mt-0.5 opacity-40 group-hover:opacity-70 transition-opacity shrink-0">
                {icons[i % icons.length]}
              </span>
              <div>
                <h3 className="text-[#F5F7FA] font-semibold text-sm mb-1.5">{item.title}</h3>
                <p className="text-[#9AA7B8] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
