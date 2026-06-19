import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/lib/i18n'

interface Props {
  params: { locale: string }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const a = dict.about_page

  return (
    <main className="max-w-3xl mx-auto px-5 pt-28 pb-20">

      {/* Header */}
      <div className="mb-12">
        <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block mb-3 opacity-70">
          {a.section_label}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA] mb-6 tracking-tight">
          {a.title}
        </h1>
        <p className="text-[#9AA7B8] text-base leading-relaxed">
          {a.bio}
        </p>
      </div>

      {/* Focus areas */}
      <div className="mb-12">
        <h2 className="text-[#F5F7FA] font-semibold text-lg mb-5">{a.focus_title}</h2>
        <div className="space-y-2">
          {a.focus_items.map((item: string, i: number) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-surface">
              <span className="text-sky-400 font-mono text-sm mt-0.5 shrink-0 opacity-60">→</span>
              <span className="text-[#9AA7B8] text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="mb-12">
        <h2 className="text-[#F5F7FA] font-semibold text-lg mb-4">{a.stack_title}</h2>
        <div className="flex flex-wrap gap-2">
          {['Python', 'Pandas', 'NumPy', 'Plotly', 'Streamlit', 'AWS', 'SQL', 'Next.js', 'TypeScript', 'GitHub'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg border border-border bg-surface text-[#9AA7B8] text-sm hover:border-border-2 hover:text-[#F5F7FA] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Connect */}
      <div className="mb-8">
        <h2 className="text-[#F5F7FA] font-semibold text-lg mb-4">{a.connect_title}</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Email', href: 'mailto:juanfdezc.2018@gmail.com', desc: 'juanfdezc.2018@gmail.com' },
            { label: 'GitHub', href: 'https://github.com/juanfdezc2018-blip', desc: 'github.com/juanfdezc2018-blip' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface hover:border-sky-500/25 hover:bg-sky-500/[0.03] transition-all duration-200 group"
            >
              <div>
                <div className="text-[#F5F7FA] font-medium text-sm group-hover:text-sky-400 transition-colors">
                  {link.label}
                </div>
                <div className="text-slate-500 text-xs font-mono mt-0.5">{link.desc}</div>
              </div>
              <span className="text-slate-600 group-hover:text-sky-400 transition-colors text-sm">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* CV + disclaimer */}
      <div className="space-y-2">
        <div className="rounded-xl border border-border/50 p-3 text-center">
          <p className="text-slate-600 text-xs font-mono">{a.cv_note} · juanfdezc.2018@gmail.com</p>
        </div>
        <div className="rounded-xl border border-border/50 p-3 text-center">
          <p className="text-slate-700 text-xs">{a.disclaimer}</p>
        </div>
      </div>
    </main>
  )
}
