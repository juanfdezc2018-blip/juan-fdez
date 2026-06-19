'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  label: string
  title: string
  description?: string
}

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <span className="inline-block font-mono text-xs text-[#00D4AA] uppercase tracking-widest mb-3 opacity-80">
        {label}
      </span>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-slate-400 text-base max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
