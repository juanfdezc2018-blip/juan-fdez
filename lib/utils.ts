import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Status } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string, locale = 'en'): string {
  return new Date(dateString).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const statusStyles: Record<Status, string> = {
  published:    'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  in_progress:  'text-sky-400 bg-sky-400/10 border-sky-400/20',
  coming_soon:  'text-slate-400 bg-slate-400/8 border-slate-400/15',
  planned:      'text-slate-500 bg-slate-500/8 border-slate-500/15',
  draft:        'text-amber-400 bg-amber-400/10 border-amber-400/20',
}
