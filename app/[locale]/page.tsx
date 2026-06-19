import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/lib/i18n'
import Hero from '@/components/Hero'
import CurrentFocus from '@/components/CurrentFocus'
import ResearchFramework from '@/components/ResearchFramework'
import Principles from '@/components/Principles'
import DataSources from '@/components/DataSources'
import TechStack from '@/components/TechStack'
import Roadmap from '@/components/Roadmap'
import SectionHeader from '@/components/SectionHeader'

interface Props {
  params: { locale: string }
}

export default async function HomePage({ params }: Props) {
  const { locale } = params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const statusDict = dict.common.status

  return (
    <>
      <Hero locale={locale as Locale} dict={dict.hero} dashDict={dict.dashboard_mock} />
      <CurrentFocus dict={dict.focus} statusDict={statusDict} />
      <ResearchFramework dict={dict.framework} />
      <Principles dict={dict.principles} />
      <DataSources dict={dict.data_sources} />
      <TechStack dict={dict.tech_stack} />
      <Roadmap dict={dict.roadmap} statusDict={statusDict} />

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="rounded-2xl border border-sky-500/10 bg-sky-500/[0.03] p-8 sm:p-12 text-center">
          <span className="font-mono text-xs text-sky-400 uppercase tracking-widest mb-4 block opacity-70">
            {dict.cta.section_label}
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F7FA] mb-4 tracking-tight">
            {dict.cta.headline}
          </h2>
          <p className="text-[#9AA7B8] text-base leading-relaxed mb-8 max-w-lg mx-auto">
            {dict.cta.desc}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`/${locale}/projects`}
              className="px-5 py-2.5 bg-sky-500 text-white font-semibold text-sm rounded-lg hover:bg-sky-400 transition-colors"
            >
              {dict.cta.cta_projects}
            </a>
            <a
              href={`/${locale}/about`}
              className="px-5 py-2.5 border border-border-2 text-[#9AA7B8] font-medium text-sm rounded-lg hover:text-[#F5F7FA] transition-colors"
            >
              {dict.cta.cta_about}
            </a>
            <a
              href="mailto:juanfdezc.2018@gmail.com"
              className="px-5 py-2.5 border border-border text-slate-500 font-medium text-sm rounded-lg hover:text-slate-300 transition-colors"
            >
              {dict.cta.cta_contact}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
