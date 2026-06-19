export type ProjectStatus = 'published' | 'in_progress' | 'coming_soon' | 'planned'

export interface Project {
  title: string
  slug: string
  description: string
  longDescription?: string
  status: ProjectStatus
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  articleUrl?: string
  featured: boolean
  metrics?: {
    label: string
    value: string
  }[]
}

export const projects: Project[] = [
  {
    title: 'Amper Valuation Analysis',
    slug: 'amper-valuation',
    description:
      'Scenario-based analysis of Amper\'s transformation into defense, critical communications and industrial technology.',
    longDescription:
      'Deep-dive valuation of Amper S.A. (AMP.MC), exploring its strategic pivot toward defense contracts, critical infrastructure and industrial tech. Includes EV/EBITDA sensitivity analysis across three scenarios.',
    status: 'in_progress',
    tags: ['Equity Research', 'EV/EBITDA', 'Python', 'Risk'],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    metrics: [
      { label: 'Method', value: 'EV/EBITDA' },
      { label: 'Scenarios', value: '3' },
      { label: 'Sector', value: 'Defense' },
    ],
  },
  {
    title: 'Portfolio Risk Dashboard',
    slug: 'portfolio-risk-dashboard',
    description:
      'Interactive dashboard to analyze volatility, drawdowns, correlations, VaR and Expected Shortfall.',
    status: 'coming_soon',
    tags: ['Risk Analytics', 'Python', 'Streamlit', 'Portfolio'],
    featured: true,
    metrics: [
      { label: 'Metrics', value: 'VaR · CVaR' },
      { label: 'Stack', value: 'Streamlit' },
    ],
  },
  {
    title: 'Spanish Small Caps Screener',
    slug: 'spanish-smallcaps-screener',
    description:
      'A simple EV/EBITDA and financial metrics screener for selected Spanish small caps.',
    status: 'coming_soon',
    tags: ['Markets', 'Valuation', 'Pandas', 'Data'],
    featured: true,
    metrics: [
      { label: 'Universe', value: 'BME Small' },
      { label: 'Method', value: 'EV/EBITDA' },
    ],
  },
  {
    title: 'Macro Risk Monitor',
    slug: 'macro-risk-monitor',
    description:
      'A dashboard that tracks macro indicators such as inflation, rates, PMI, unemployment and market stress signals.',
    status: 'coming_soon',
    tags: ['Macro', 'Risk', 'Data Visualization'],
    featured: false,
  },
  {
    title: 'SME Credit Risk Scoring',
    slug: 'sme-credit-risk',
    description:
      'A financial risk scoring model for SMEs using profitability, leverage, liquidity and growth metrics.',
    status: 'planned',
    tags: ['Credit Risk', 'Fintech', 'ML', 'Python'],
    featured: false,
  },
]
