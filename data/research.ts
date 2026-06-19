import type { ResearchNote } from '@/types'

/**
 * Add your research notes here.
 *
 * Fields:
 *  - title:        Display title
 *  - slug:         URL-friendly identifier
 *  - description:  Summary shown on the card
 *  - mainQuestion: (optional) The central question the note answers
 *  - category:     valuation | risk | macro | fintech | methodology | data
 *  - status:       published | draft | coming_soon
 *  - readingTime:  e.g. "~6 min"
 *  - tags:         Array of tags
 *  - publishedAt:  ISO date string
 *  - updatedAt:    (optional) ISO date string
 *  - url:          (optional) URL or path to the full note
 */
export const researchNotes: ResearchNote[] = [
  {
    title: 'Amper S.A. — Análisis de Valoración EV/EBITDA',
    slug: 'amper-sa',
    description:
      'Análisis financiero completo de Amper S.A. (BME: AMP) en su transformación hacia defensa, comunicaciones críticas y energía. Incluye tabla de sensibilidad, escenarios conservador/base/optimista y comparables europeos. Contra-split 25:1 pendiente (30/06/2026).',
    mainQuestion: '¿Qué precio objetivo implica el plan 2026–2028 bajo distintos múltiplos y niveles de EBITDA?',
    category: 'valuation',
    status: 'in_progress',
    readingTime: '~10 min',
    tags: ['EV/EBITDA', 'Defensa', 'Small Cap', 'Python', 'CNMV', 'Contra-split'],
    publishedAt: undefined,
    url: '/es/research/amper-sa',
  },
]
