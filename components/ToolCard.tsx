'use client'

import { motion } from 'framer-motion'
import { statusStyles } from '@/lib/utils'
import type { LabTool } from '@/types'

interface CardDict {
  cta_open: string
  cta_github: string
  coming_soon: string
}

interface Props {
  tool: LabTool
  index?: number
  dict: CardDict
  statusDict: Record<string, string>
}

export default function ToolCard({ tool, index = 0, dict, statusDict }: Props) {
  const statusStyle = statusStyles[tool.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className="group rounded-xl border border-border bg-surface hover:border-border-2 transition-all duration-300 p-5"
    >
      {/* Status */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className={`px-2 py-0.5 rounded-full border text-xs font-mono ${statusStyle}`}>
          {statusDict[tool.status] ?? tool.status}
        </span>
        <span className="font-mono text-xs text-slate-600 capitalize">{tool.category}</span>
      </div>

      <h3 className="text-[#F5F7FA] font-semibold text-sm mb-2 group-hover:text-sky-300 transition-colors">
        {tool.title}
      </h3>
      <p className="text-[#9AA7B8] text-xs leading-relaxed mb-3">{tool.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded bg-white/[0.04] border border-border text-slate-500 text-xs">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        {tool.liveUrl ? (
          <a href={tool.liveUrl} target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-medium rounded-lg hover:bg-sky-500/15 transition-colors">
            {dict.cta_open} ↗
          </a>
        ) : (
          <span className="px-3 py-1.5 border border-border text-slate-600 text-xs font-mono rounded-lg">
            {dict.coming_soon}
          </span>
        )}
        {tool.githubUrl && (
          <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 border border-border text-slate-400 text-xs font-medium rounded-lg hover:border-border-2 hover:text-slate-300 transition-colors">
            {dict.cta_github} ↗
          </a>
        )}
      </div>
    </motion.div>
  )
}
