'use client'

import { motion } from 'framer-motion'

interface Props {
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ label, title, description, align = 'left' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${align === 'center' ? 'text-center' : ''}`}
    >
      <span className="inline-block font-mono text-xs text-sky-400 uppercase tracking-widest mb-2.5 opacity-80">
        {label}
      </span>
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F7FA] mb-2.5 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className={`text-[#9AA7B8] text-base leading-relaxed ${align === 'center' ? 'max-w-lg mx-auto' : 'max-w-xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
