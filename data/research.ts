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
  // Add your research notes below. Example:
  //
  // {
  //   title: 'My Research Note',
  //   slug: 'my-research-note',
  //   description: 'What this analysis covers and what it concludes.',
  //   mainQuestion: 'What is the fair value under different scenarios?',
  //   category: 'valuation',
  //   status: 'coming_soon',
  //   readingTime: '~8 min',
  //   tags: ['Valuation', 'EV/EBITDA', 'Python'],
  //   publishedAt: undefined,
  // },
]
