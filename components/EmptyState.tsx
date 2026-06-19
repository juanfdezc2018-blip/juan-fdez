'use client'

import { motion } from 'framer-motion'

interface Props {
  title: string
  description: string
  icon?: string
}

export default function EmptyState({ title, description, icon = '◈' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="col-span-full flex flex-col items-center justify-center py-20 px-6 text-center rounded-xl border border-dashed border-border"
    >
      <div className="text-3xl text-slate-700 mb-4 font-mono">{icon}</div>
      <h3 className="text-[#F5F7FA] font-semibold text-base mb-2">{title}</h3>
      <p className="text-[#9AA7B8] text-sm max-w-xs leading-relaxed">{description}</p>
    </motion.div>
  )
}
