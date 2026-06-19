import Hero from '@/components/Hero'
import HighlightsSection from '@/components/HighlightsSection'
import ProjectCard from '@/components/ProjectCard'
import ResearchCard from '@/components/ResearchCard'
import ProcessSection from '@/components/ProcessSection'
import TechStack from '@/components/TechStack'
import Roadmap from '@/components/Roadmap'
import SectionHeader from '@/components/SectionHeader'
import { projects } from '@/data/projects'
import { researchNotes } from '@/data/research'

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured)
  const latestResearch = researchNotes.slice(0, 3)

  return (
    <>
      <Hero />
      <HighlightsSection />

      {/* Projects Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          label="// projects"
          title="Featured Projects"
          description="Data engineering + financial research, built in public. All work is open-source when ready."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#00D4AA] transition-colors font-medium"
          >
            View all projects →
          </a>
        </div>
      </section>

      {/* Research Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          label="// research"
          title="Research Notes"
          description="Written analysis on markets, valuation and fintech. Short, data-driven, actionable."
        />
        <div className="space-y-3">
          {latestResearch.map((note, i) => (
            <ResearchCard key={note.slug} note={note} index={i} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href="/research"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#00D4AA] transition-colors font-medium"
          >
            View all research →
          </a>
        </div>
      </section>

      <ProcessSection />
      <TechStack />
      <Roadmap />

      {/* About snippet + CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-xl border border-[#00D4AA]/15 bg-[#00D4AA]/[0.03] p-8 sm:p-12 text-center">
          <span className="font-mono text-xs text-[#00D4AA] uppercase tracking-widest mb-4 block">
            // follow the build
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Building data-driven research, openly.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg mx-auto">
            I&apos;m Juan Fernández — Data Engineering student turning financial data into
            clear research on markets, risk and fintech. All projects are public and
            evolving throughout summer 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/juanfdez"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#00D4AA] text-[#050A14] font-semibold text-sm rounded-lg hover:bg-[#00D4AA]/90 transition-colors"
            >
              Follow on GitHub
            </a>
            <a
              href="/about"
              className="px-5 py-2.5 border border-white/15 text-slate-300 font-medium text-sm rounded-lg hover:bg-white/5 transition-colors"
            >
              About me
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
