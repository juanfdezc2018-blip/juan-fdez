import type { Project } from '@/types'

/**
 * Add your projects here.
 * Each project will automatically appear in the /projects page.
 *
 * Fields:
 *  - title:        Display name
 *  - slug:         URL-friendly identifier (used for future detail pages)
 *  - description:  Short description shown on the card
 *  - thesis:       (optional) Core investment or analytical thesis
 *  - category:     equity_research | risk | dashboard | data_engineering | fintech | macro
 *  - status:       published | in_progress | coming_soon | planned | draft
 *  - progress:     (optional) 0–100 percentage
 *  - tags:         Array of technology/topic tags
 *  - output:       (optional) What the project produces, e.g. "Dashboard · GitHub repo"
 *  - learningFocus:(optional) Key skills built
 *  - githubUrl:    (optional) GitHub repository URL
 *  - liveUrl:      (optional) Live demo URL
 *  - featured:     Show on homepage?
 *  - createdAt:    ISO date string, e.g. "2026-06-01"
 *  - updatedAt:    (optional) ISO date string
 */
export const projects: Project[] = [
  // Add your projects below. Example:
  //
  // {
  //   title: 'My Project',
  //   slug: 'my-project',
  //   description: 'Short description of what this project does.',
  //   category: 'equity_research',
  //   status: 'in_progress',
  //   progress: 30,
  //   tags: ['Python', 'Pandas', 'EV/EBITDA'],
  //   output: 'Research note · Python notebook',
  //   githubUrl: undefined,
  //   liveUrl: undefined,
  //   featured: true,
  //   createdAt: '2026-06-01',
  // },
]
