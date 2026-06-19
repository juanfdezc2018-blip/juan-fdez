import type { Locale } from '@/i18n/config'

// Cache dictionaries to avoid re-reading on every request
const dictCache: Partial<Record<Locale, Dictionary>> = {}

export type Dictionary = Awaited<ReturnType<typeof loadDictionary>>

async function loadDictionary(locale: Locale) {
  const dict = (await import(`@/i18n/dictionaries/${locale}.json`)).default
  return dict
}

export async function getDictionary(locale: Locale) {
  if (dictCache[locale]) return dictCache[locale]!
  const dict = await loadDictionary(locale)
  dictCache[locale] = dict
  return dict
}
