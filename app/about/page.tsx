import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Juan Fdez Research',
  description: 'Data Engineering student building public projects on financial markets, risk and fintech.',
}

const links = [
  { label: 'GitHub', href: 'https://github.com/juanfdez', description: 'Code & projects' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/juanfdez', description: 'Professional profile' },
  { label: 'X / Twitter', href: 'https://x.com/juanfdez', description: 'Market thoughts' },
  { label: 'Email', href: 'mailto:juanfdezc.2018@gmail.com', description: 'Get in touch' },
]

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pt-28 pb-20">
      {/* Header */}
      <div className="mb-12">
        <span className="font-mono text-xs text-[#00D4AA] uppercase tracking-widest block mb-3">
          // about
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Juan Fernández</h1>

        <div className="space-y-4 text-slate-400 text-base leading-relaxed">
          <p>
            I&apos;m a Data Engineering student building public projects at the intersection of financial
            markets, risk analytics and data. My goal is to turn complex financial data into clear,
            visual and reproducible analysis.
          </p>
          <p>
            I work primarily with Python — Pandas, NumPy, Plotly — and I&apos;m building cloud pipelines
            on AWS. On the frontend, I use Next.js and TypeScript to deploy interactive dashboards
            and research interfaces.
          </p>
          <p>
            This site is a lab, not a finished product. I&apos;m building everything in public during
            summer 2026: equity research, risk dashboards, screeners and research notes. Everything
            evolves, everything is open.
          </p>
        </div>
      </div>

      {/* Focus areas */}
      <div className="mb-12">
        <h2 className="text-white font-semibold text-lg mb-4">What I&apos;m working on</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: 'Equity Research', desc: 'Valuation analysis of Spanish small caps and transformation stories.' },
            { title: 'Risk Analytics', desc: 'Portfolio risk — VaR, CVaR, drawdown, volatility and stress testing.' },
            { title: 'Data Engineering', desc: 'Python pipelines to collect, clean and model financial data at scale.' },
            { title: 'Fintech', desc: 'Credit scoring models, screening tools and financial data infrastructure.' },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
            >
              <h3 className="text-[#00D4AA] font-medium text-sm mb-1">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="mb-12">
        <h2 className="text-white font-semibold text-lg mb-4">Stack</h2>
        <div className="flex flex-wrap gap-2">
          {['Python', 'Pandas', 'NumPy', 'Plotly', 'Streamlit', 'AWS', 'SQL', 'Next.js', 'TypeScript', 'GitHub'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-4">Connect</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-[#00D4AA]/25 hover:bg-[#00D4AA]/[0.03] transition-all duration-200 group"
            >
              <div>
                <div className="text-white font-medium text-sm group-hover:text-[#00D4AA] transition-colors">
                  {link.label}
                </div>
                <div className="text-slate-500 text-xs">{link.description}</div>
              </div>
              <span className="text-slate-600 group-hover:text-[#00D4AA] transition-colors">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* CV note */}
      <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.01] p-4 text-center">
        <p className="text-slate-600 text-sm font-mono">CV available on request · juanfdezc.2018@gmail.com</p>
      </div>
    </main>
  )
}
