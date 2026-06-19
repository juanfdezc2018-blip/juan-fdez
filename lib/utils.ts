import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const statusConfig = {
  published: { label: 'Published', color: 'text-teal-400 bg-teal-400/10 border-teal-400/20' },
  in_progress: { label: 'In Progress', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
  coming_soon: { label: 'Coming Soon', color: 'text-slate-400 bg-slate-400/10 border-slate-400/20' },
  planned: { label: 'Planned', color: 'text-slate-500 bg-slate-500/10 border-slate-500/20' },
  draft: { label: 'Draft', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
} as const
