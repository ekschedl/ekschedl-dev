// Gemeinsame Zahlen und Daten für Pixel und die Website. Hier stehen Zeiträume, Wochenstunden und JAWA-Technologien.
// Übersetzte Sätze stehen in locales/de.ts, en.ts und ru.ts.
// Projektdaten und Links werden in data/portfolioData.ts gepflegt.
export const pixelFacts = {
  jawa: {
    start: '2025-09',
    end: '2026-10',
    technologies: ['Vue', 'PHP', 'Xdebug', 'SQL', 'Jira Service Management']
  },
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
