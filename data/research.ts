export type ResearchStatus = 'published' | 'draft' | 'coming_soon'

export interface ResearchNote {
  title: string
  slug: string
  description: string
  date?: string
  status: ResearchStatus
  tags: string[]
  readUrl?: string
  readingTime?: string
}

export const researchNotes: ResearchNote[] = [
  {
    title: 'Amper: From small cap to defense-tech story?',
    slug: 'amper-defense-tech',
    description:
      'Exploring how Amper S.A. is repositioning from a traditional small cap into a defense and critical infrastructure player. A first look at the business, the transformation thesis and early valuation signals.',
    status: 'coming_soon',
    tags: ['Equity Research', 'Defense', 'Spain', 'Small Caps'],
    readingTime: '~8 min',
  },
  {
    title: 'How to think about EV/EBITDA in companies under transformation',
    slug: 'ev-ebitda-transformation',
    description:
      'EV/EBITDA is a standard multiple — but applying it to companies mid-transformation requires careful adjustments. A practical guide with real cases from Spanish markets.',
    status: 'coming_soon',
    tags: ['Valuation', 'EV/EBITDA', 'Methodology'],
    readingTime: '~6 min',
  },
  {
    title: 'Portfolio risk beyond returns: drawdowns, VaR and correlations',
    slug: 'portfolio-risk-beyond-returns',
    description:
      'Most investors focus on returns. Here\'s why drawdown, Value at Risk and correlation structure tell a more complete story about portfolio risk.',
    status: 'coming_soon',
    tags: ['Risk Analytics', 'Portfolio', 'VaR', 'Python'],
    readingTime: '~7 min',
  },
  {
    title: 'Building a public fintech/data portfolio from scratch',
    slug: 'building-public-portfolio',
    description:
      'Notes on how I\'m building this research lab: tools, stack decisions, project selection, and what "building in public" actually means for a data+finance profile.',
    status: 'coming_soon',
    tags: ['Meta', 'Portfolio', 'Data Engineering', 'Fintech'],
    readingTime: '~5 min',
  },
]
