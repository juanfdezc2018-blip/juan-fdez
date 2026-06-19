import type { LabTool } from '@/types'

/**
 * Add your lab tools here.
 *
 * Fields:
 *  - title:       Display name
 *  - slug:        URL-friendly identifier
 *  - description: Short description
 *  - category:    dashboard | tool | model | experiment
 *  - status:      published | in_progress | coming_soon | planned
 *  - liveUrl:     (optional) URL to the live tool
 *  - githubUrl:   (optional) GitHub repository URL
 *  - tags:        Array of tags
 *  - featured:    Show prominently?
 */
export const tools: LabTool[] = [
  // Add your tools below. Example:
  //
  // {
  //   title: 'Risk Dashboard',
  //   slug: 'risk-dashboard',
  //   description: 'Interactive portfolio risk analysis: VaR, drawdown, volatility.',
  //   category: 'dashboard',
  //   status: 'in_progress',
  //   liveUrl: undefined,
  //   githubUrl: undefined,
  //   tags: ['Python', 'Streamlit', 'Risk'],
  //   featured: true,
  // },
]
