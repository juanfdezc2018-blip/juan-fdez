import ProjectCard from '@/components/ProjectCard'
import SectionHeader from '@/components/SectionHeader'
import { projects } from '@/data/projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Juan Fdez Research',
  description: 'Data engineering and financial research projects — equity analysis, risk dashboards, screeners and more.',
}

export default function ProjectsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 pt-28 pb-20">
      <SectionHeader
        label="// projects"
        title="All Projects"
        description="Financial data projects built in public. From equity research to risk dashboards and automated screeners."
      />

      {/* Status legend */}
      <div className="flex flex-wrap gap-3 mb-10">
        {[
          { label: 'Published', color: 'text-teal-400 border-teal-400/30 bg-teal-400/5' },
          { label: 'In Progress', color: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5' },
          { label: 'Coming Soon', color: 'text-slate-400 border-slate-400/20 bg-slate-400/5' },
          { label: 'Planned', color: 'text-slate-500 border-slate-500/20 bg-slate-500/5' },
        ].map((s) => (
          <span key={s.label} className={`px-2.5 py-1 rounded-full border text-xs font-mono ${s.color}`}>
            {s.label}
          </span>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/* Early portfolio note */}
      <div className="mt-12 rounded-xl border border-white/8 bg-white/[0.02] p-6 text-center">
        <p className="font-mono text-xs text-[#00D4AA] mb-2">Early portfolio · Summer 2026</p>
        <p className="text-slate-400 text-sm">
          More projects will be published throughout the summer. Check back soon.
        </p>
      </div>
    </main>
  )
}
