'use client'

import { motion } from 'framer-motion'
import { statusStyles } from '@/lib/utils'
import type { ResearchNote, Status } from '@/types'

interface CardDict {
  cta_read: string
  coming_soon: string
}

interface Props {
  note: ResearchNote
  index?: number
  dict: CardDict
  statusDict: Record<string, string>
}

export default function ResearchCard({ note, index = 0, dict, statusDict }: Props) {
  const statusStyle = statusStyles[note.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className="group flex gap-4 p-5 rounded-xl border border-border bg-surface hover:border-border-2 transition-all duration-300"
    >
      {/* Left accent */}
      <div className="w-px bg-gradient-to-b from-sky-500/30 to-transparent shrink-0 mt-1" />

      <div className="flex-1 min-w-0">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full border text-xs font-mono ${statusStyle}`}>
            {statusDict[note.status] ?? note.status}
          </span>
          {note.readingTime && (
            <span className="font-mono text-xs text-slate-600">{note.readingTime}</span>
          )}
          {note.publishedAt && (
            <span className="text-xs text-slate-600">{note.publishedAt}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[#F5F7FA] font-semibold text-sm leading-snug mb-1.5 group-hover:text-sky-300 transition-colors">
          {note.title}
        </h3>

        {/* Main question */}
        {note.mainQuestion && (
          <p className="font-mono text-xs text-amber-400/70 mb-2 italic">{note.mainQuestion}</p>
        )}

        {/* Description */}
        <p className="text-[#9AA7B8] text-xs leading-relaxed mb-3">{note.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {note.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded bg-white/[0.04] border border-border text-slate-500 text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        {note.url ? (
          <a href={note.url} className="text-sky-400 text-xs font-medium hover:underline transition-colors">
            {dict.cta_read} →
          </a>
        ) : (
          <span className="font-mono text-xs text-slate-600">{dict.coming_soon}</span>
        )}
      </div>
    </motion.div>
  )
}
