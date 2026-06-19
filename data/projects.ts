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
  {
    title: 'Amper S.A. — Análisis EV/EBITDA',
    slug: 'amper-sa',
    description:
      'Análisis financiero de Amper S.A. (BME: AMP) usando datos de la CNMV y la web de IR de Amper. Cubre la transformación 2022–2025, la adquisición de Teltronic y el Plan Estratégico 2026–2028. Valoración por EV/EBITDA con tres escenarios, tabla de sensibilidad y comparables europeos de defensa.',
    thesis:
      'La transformación 2022–2025 fue real y medible (EBITDA: 11M€ → 46M€). El plan 2026–2028 es ambicioso. El riesgo principal está en la ejecución del inorgánico y la dilución accionarial.',
    category: 'equity_research',
    status: 'in_progress',
    progress: 70,
    tags: ['Python', 'Pandas', 'EV/EBITDA', 'Defensa', 'CNMV', 'Small Cap'],
    output: 'Nota de research · Notebook Python · CSV datos CNMV',
    learningFocus: 'Valoración por múltiplos, análisis de sensibilidad, datos financieros oficiales',
    githubUrl: undefined,
    liveUrl: '/es/research/amper-sa',
    featured: true,
    createdAt: '2026-06-01',
    updatedAt: '2026-06-19',
  },
]
