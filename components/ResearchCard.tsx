'use client'

import { motion } from 'framer-motion'
import { ResearchNote } from '@/data/research'
import { statusConfig } from '@/lib/utils'

interface ResearchCardProps {
  note: ResearchNote
  index?: number
}

export default function ResearchCard({ note, index = 0 }: ResearchCardProps) {
  const status = statusConfig[note.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group flex gap-5 p-5 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300"
    >
      {/* Left accent line */}
      <div className="w-px bg-gradient-to-b from-[#00D4AA]/40 to-transparent shrink-0 mt-1" />

      <div className="flex-1 min-w-0">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full border text-xs font-mono ${status.color}`}>
            {status.label}
          </span>
          {note.readingTime && (
            <span className="text-slate-600 text-xs font-mono">{note.readingTime}</span>
          )}
          {note.date && (
            <span className="text-slate-600 text-xs">{note.date}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-slate-100 transition-colors">
          {note.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-3">
          {note.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-slate-400 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read button */}
        {note.readUrl ? (
          <a
            href={note.readUrl}
            className="inline-flex items-center gap-1 text-[#00D4AA] text-xs font-medium hover:underline transition-colors"
          >
            Read →
          </a>
        ) : (
          <span className="text-slate-600 text-xs font-mono">Coming soon</span>
        )}
      </div>
    </motion.div>
  )
}
