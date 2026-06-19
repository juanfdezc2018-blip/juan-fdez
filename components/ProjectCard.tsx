'use client'

import { motion } from 'framer-motion'
import { statusStyles } from '@/lib/utils'
import type { Project, Status } from '@/types'

interface CardDict {
  cta_view: string
  cta_github: string
  cta_live: string
  coming_soon: string
}

interface Props {
  project: Project
  index?: number
  dict: CardDict
  statusDict: Record<string, string>
}

export default function ProjectCard({ project, index = 0, dict, statusDict }: Props) {
  const statusStyle = statusStyles[project.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className="group rounded-xl border border-border bg-surface hover:border-border-2 transition-all duration-300 overflow-hidden"
    >
      {/* Top accent bar */}
      {project.status === 'published' && (
        <div className="h-px bg-gradient-to-r from-sky-500/0 via-sky-500/40 to-sky-500/0" />
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-[#F5F7FA] font-semibold text-sm leading-snug group-hover:text-sky-300 transition-colors">
            {project.title}
          </h3>
          <span className={`shrink-0 px-2 py-0.5 rounded-full border text-xs font-mono ${statusStyle}`}>
            {statusDict[project.status] ?? project.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-[#9AA7B8] text-xs leading-relaxed mb-3">{project.description}</p>

        {/* Progress bar */}
        {project.progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-xs text-slate-600">Progress</span>
              <span className="font-mono text-xs text-sky-400">{project.progress}%</span>
            </div>
            <div className="h-1 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-sky-500 transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Output */}
        {project.output && (
          <div className="flex items-center gap-1.5 mb-3">
            <span className="font-mono text-xs text-slate-600">Output:</span>
            <span className="font-mono text-xs text-amber-400">{project.output}</span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded bg-white/[0.04] border border-border text-slate-500 text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-medium rounded-lg hover:bg-sky-500/15 transition-colors">
              {dict.cta_live}
            </a>
          ) : project.status === 'published' ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-medium rounded-lg hover:bg-sky-500/15 transition-colors">
              {dict.cta_view}
            </a>
          ) : (
            <span className="px-3 py-1.5 border border-border text-slate-600 text-xs font-mono rounded-lg">
              {dict.coming_soon}
            </span>
          )}
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 border border-border text-slate-400 text-xs font-medium rounded-lg hover:border-border-2 hover:text-slate-300 transition-colors">
              {dict.cta_github} ↗
            </a>
          ) : (
            <span className="px-3 py-1.5 border border-border/50 text-slate-700 text-xs rounded-lg cursor-default">
              {dict.cta_github} —
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
