import ResearchCard from '@/components/ResearchCard'
import SectionHeader from '@/components/SectionHeader'
import { researchNotes } from '@/data/research'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research | Juan Fdez Research',
  description: 'Data-driven research notes on markets, valuation, risk and fintech.',
}

export default function ResearchPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">
      <SectionHeader
        label="// research"
        title="Research Notes"
        description="Short, data-driven research on markets, valuation methods, risk and fintech. No investment advice — just analysis."
      />

      <div className="space-y-3">
        {researchNotes.map((note, i) => (
          <ResearchCard key={note.slug} note={note} index={i} />
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-white/8 bg-white/[0.02] p-6">
        <div className="flex items-start gap-3">
          <span className="text-[#00D4AA] text-lg mt-0.5">ℹ</span>
          <div>
            <p className="text-white text-sm font-medium mb-1">Note on content</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              All research published here is for educational and analytical purposes only.
              Nothing on this site constitutes investment advice or a recommendation to buy or sell any security.
              Always do your own due diligence.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
