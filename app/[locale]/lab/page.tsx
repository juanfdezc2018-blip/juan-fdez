import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/lib/i18n'
import SectionHeader from '@/components/SectionHeader'
import ToolCard from '@/components/ToolCard'
import EmptyState from '@/components/EmptyState'
import { tools } from '@/data/tools'

interface Props {
  params: { locale: string }
}

export default async function LabPage({ params }: Props) {
  const { locale } = params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const l = dict.lab_page
  const statusDict = dict.common.status

  return (
    <main className="max-w-6xl mx-auto px-5 pt-28 pb-20">
      <SectionHeader
        label={l.section_label}
        title={l.title}
        description={l.desc}
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(l.filters as Record<string, string>).map(([key, label]) => (
          <span
            key={key}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-default ${
              key === 'all'
                ? 'border-sky-500/30 bg-sky-500/8 text-sky-400'
                : 'border-border text-slate-500'
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Tools grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.length > 0 ? (
          tools.map((tool, i) => (
            <ToolCard
              key={tool.slug}
              tool={tool}
              index={i}
              dict={{ cta_open: l.cta_open, cta_github: l.cta_github, coming_soon: l.coming_soon }}
              statusDict={statusDict}
            />
          ))
        ) : (
          <EmptyState title={l.empty_title} description={l.empty_desc} icon="⬡" />
        )}
      </div>
    </main>
  )
}
