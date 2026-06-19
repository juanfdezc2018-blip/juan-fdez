import type { TechItem, TechCategory } from '@/types'

export const techStack: TechItem[] = [
  { name: 'Python',       category: 'language' },
  { name: 'TypeScript',   category: 'language' },
  { name: 'SQL',          category: 'language' },
  { name: 'Pandas',       category: 'data' },
  { name: 'NumPy',        category: 'data' },
  { name: 'Scikit-learn', category: 'data' },
  { name: 'Matplotlib',   category: 'viz' },
  { name: 'Plotly',       category: 'viz' },
  { name: 'Streamlit',    category: 'viz' },
  { name: 'AWS',          category: 'cloud' },
  { name: 'Next.js',      category: 'web' },
  { name: 'React',        category: 'web' },
  { name: 'Tailwind CSS', category: 'web' },
  { name: 'GitHub',       category: 'tools' },
  { name: 'PostgreSQL',   category: 'tools' },
]

export const categoryLabels: Record<TechCategory, string> = {
  language: 'Languages',
  data:     'Data & ML',
  cloud:    'Cloud',
  viz:      'Visualization',
  web:      'Web',
  tools:    'Tools',
}
