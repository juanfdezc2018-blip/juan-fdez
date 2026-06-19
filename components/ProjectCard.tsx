'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Project } from '@/data/projects'
import { statusConfig } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const status = statusConfig[project.status]
  const isAvailable = project.status === 'published'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#00D4AA]/20 transition-all duration-300 overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,212,170,0.06) 0%, transparent 60%)' }}
      />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-white font-semibold text-base leading-snug group-hover:text-[#00D4AA] transition-colors duration-200">
            {project.title}
          </h3>
          <span className={`shrink-0 px-2 py-0.5 rounded-full border text-xs font-mono font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex items-center gap-1.5">
                <span className="font-mono text-xs text-slate-600">{m.label}:</span>
                <span className="font-mono text-xs text-[#00D4AA]">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-slate-400 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isAvailable && project.articleUrl ? (
            <Link
              href={project.articleUrl}
              className="px-3 py-1.5 bg-[#00D4AA]/10 border border-[#00D4AA]/30 text-[#00D4AA] text-xs font-medium rounded-lg hover:bg-[#00D4AA]/20 transition-colors"
            >
              View Project →
            </Link>
          ) : (
            <span className="px-3 py-1.5 bg-white/5 border border-white/8 text-slate-600 text-xs font-medium rounded-lg cursor-not-allowed">
              {project.status === 'planned' ? 'Planned' : 'In progress'}
            </span>
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-white/10 text-slate-400 text-xs font-medium rounded-lg hover:border-white/20 hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
          ) : (
            <span className="px-3 py-1.5 border border-white/5 text-slate-700 text-xs font-medium rounded-lg cursor-not-allowed">
              GitHub —
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
