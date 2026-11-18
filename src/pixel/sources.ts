// Vorhandene Sprachtexte und Projektdaten als Wissensquellen für die KI-Schnittstelle sammeln.
import de, { employerFaq as germanFaq } from '../locales/de'
import en, { employerFaq as englishFaq } from '../locales/en'
import ru, { employerFaq as russianFaq } from '../locales/ru'
import { projects } from '../data/portfolioData'

const messages = { de, en, ru }
const faqByLanguage = { de: germanFaq, en: englishFaq, ru: russianFaq }
type KnowledgeLanguage = keyof typeof messages

/** Sources for the AI endpoint, using the same text as the local answers. */
export function getPixelSources(language: KnowledgeLanguage = 'de') {
  const content = messages[language].assistant
  const sources = new Map<string, string>()
  for (const key of ['profileAnswer', 'cvAnswer', 'educationAnswer', 'learningAnswer', 'salaryAnswer', 'contactAnswer'] as const) {
    sources.set('assistant.' + key, content[key])
  }
  for (const group of ['personalReplies', 'overview', 'educationReplies', 'experienceReplies', 'followUp'] as const) {
    for (const [id, value] of Object.entries(content[group])) {
      sources.set('assistant.' + group + '.' + id + (typeof value === 'string' ? '' : '.answer'),
        typeof value === 'string' ? value : value.answer)
    }
  }
  for (const project of projects) {
    sources.set('assistant.projectReplies.' + project.id, [
      content.projectReplies[project.id],
      messages[language].projectDescriptions[project.id],
      'Stack: ' + project.stack,
      'Listed creation month (YYYY-MM): ' + project.createdAt
    ].join('\n'))
  }
  for (const entry of faqByLanguage[language]) {
    sources.set('faq.' + entry.id, entry.question + '\n' + entry.answer)
  }
  return sources
}
