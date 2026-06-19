import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/lib/i18n'
import SectionHeader from '@/components/SectionHeader'
import ResearchCard from '@/components/ResearchCard'
import EmptyState from '@/components/EmptyState'
import { researchNotes } from '@/data/research'

interface Props {
  params: { locale: string }
}

export default async function ResearchPage({ params }: Props) {
  const { locale } = params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const r = dict.research_page
  const statusDict = dict.common.status

  return (
    <main className="max-w-4xl mx-auto px-5 pt-28 pb-20">
      <SectionHeader
        label={r.section_label}
        title={r.title}
        description={r.desc}
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(r.filters as Record<string, string>).map(([key, label]) => (
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

      {/* Notes */}
      <div className="space-y-3">
        {researchNotes.length > 0 ? (
          researchNotes.map((note, i) => (
            <ResearchCard
              key={note.slug}
              note={note}
              index={i}
              dict={{ cta_read: r.cta_read, coming_soon: r.coming_soon }}
              statusDict={statusDict}
            />
          ))
        ) : (
          <EmptyState title={r.empty_title} description={r.empty_desc} icon="✦" />
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-10 rounded-xl border border-border bg-surface p-5 flex items-start gap-3">
        <span className="text-sky-400 text-base mt-0.5">ℹ</span>
        <p className="text-[#9AA7B8] text-sm leading-relaxed">{r.disclaimer}</p>
      </div>
    </main>
  )
}
