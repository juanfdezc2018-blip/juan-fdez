export type RoadmapStatus = 'completed' | 'active' | 'upcoming'

export interface RoadmapPhase {
  phase: number
  title: string
  description: string
  items: string[]
  status: RoadmapStatus
}

export const roadmap: RoadmapPhase[] = [
  {
    phase: 1,
    title: 'Launch & First Analysis',
    description: 'Website live and first equity research project.',
    items: [
      'Deploy portfolio website',
      'Amper valuation analysis (EV/EBITDA)',
      'First GitHub repository',
    ],
    status: 'active',
  },
  {
    phase: 2,
    title: 'Risk Dashboard',
    description: 'Interactive tool to visualize portfolio risk metrics.',
    items: [
      'Build risk dashboard with Streamlit',
      'VaR, CVaR, drawdown analysis',
      'Publish on GitHub',
    ],
    status: 'upcoming',
  },
  {
    phase: 3,
    title: 'Small Caps Screener',
    description: 'EV/EBITDA screener for Spanish small caps.',
    items: [
      'Build screener with Pandas + Plotly',
      'Cover 20+ BME small cap names',
      'Automated data pipeline',
    ],
    status: 'upcoming',
  },
  {
    phase: 4,
    title: 'Research Notes',
    description: 'First written research pieces published.',
    items: [
      'Publish Amper research note',
      'Valuation methodology guide',
      'Portfolio risk piece',
    ],
    status: 'upcoming',
  },
  {
    phase: 5,
    title: 'Interactive Tools & Scale',
    description: 'Deploy live dashboards and expand coverage.',
    items: [
      'Live macro risk monitor',
      'SME credit scoring model',
      'Expand research universe',
    ],
    status: 'upcoming',
  },
]
