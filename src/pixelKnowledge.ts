// Shared facts. Translated sentences belong in locales/de.ts, en.ts and ru.ts.
// Project dates, stacks and links remain in the shared portfolioData.ts.
export const pixelFacts = {
  jawa: { start: '2025-09', end: '2026-10' },
  softwareEngineering: { completed: '2026-10' },
  hoursPerWeek: { min: 20, max: 35 }
} as const

// The portfolio counts both the starting and ending calendar month.
export const jawaExperienceMonths =
  (Number(pixelFacts.jawa.end.slice(0, 4)) - Number(pixelFacts.jawa.start.slice(0, 4))) * 12 +
  Number(pixelFacts.jawa.end.slice(5)) - Number(pixelFacts.jawa.start.slice(5)) + 1

export function formatKnowledgeMonth(value: string, locale: 'de' | 'en' | 'ru', grammaticalCase: 'nominative' | 'genitive' = 'nominative') {
  const date = new Date(value + '-01T00:00:00Z')
  const parts = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    ...(grammaticalCase === 'genitive' ? { day: 'numeric' as const } : {}),
    timeZone: 'UTC'
  }).formatToParts(date)
  return parts.find(part => part.type === 'month')!.value + ' ' +
    parts.find(part => part.type === 'year')!.value
}
