import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/lib/i18n'
import SectionHeader from '@/components/SectionHeader'
import ProjectCard from '@/components/ProjectCard'
import EmptyState from '@/components/EmptyState'
import { projects } from '@/data/projects'

interface Props {
  params: { locale: string }
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const p = dict.projects_page
  const statusDict = dict.common.status

  return (
    <main className="max-w-6xl mx-auto px-5 pt-28 pb-20">
      <SectionHeader
        label={p.section_label}
        title={p.title}
        description={p.desc}
      />

      {/* Filter tabs (static for now — wire up interactivity when projects grow) */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(p.filters as Record<string, string>).map(([key, label]) => (
          <span
            key={key}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-default transition-colors ${
              key === 'all'
                ? 'border-sky-500/30 bg-sky-500/8 text-sky-400'
                : 'border-border text-slate-500'
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length > 0 ? (
          projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              dict={{ cta_view: p.cta_view, cta_github: p.cta_github, cta_live: p.cta_live, coming_soon: p.coming_soon }}
              statusDict={statusDict}
            />
          ))
        ) : (
          <EmptyState title={p.empty_title} description={p.empty_desc} />
        )}
      </div>

      {/* Note */}
      <div className="mt-10 rounded-xl border border-border bg-surface p-5 text-center">
        <p className="font-mono text-xs text-sky-400 mb-1 opacity-70">{p.note_label}</p>
        <p className="text-[#9AA7B8] text-sm">{p.note_desc}</p>
      </div>
    </main>
  )
}
