// Vorhandene Sprachtexte und Projektdaten als Wissensquellen für die KI-Schnittstelle sammeln.
import de, { employerFaq as germanFaq } from '../locales/de'
import en, { employerFaq as englishFaq } from '../locales/en'
import ru, { employerFaq as russianFaq } from '../locales/ru'
import { projects } from '../data/portfolioData'

const messages = { de, en, ru }
const faqByLanguage = { de: germanFaq, en: englishFaq, ru: russianFaq }
type KnowledgeLanguage = keyof typeof messages

// Verwendet dieselben Texte wie die lokalen Antworten im Portfolio.
function getPixelSources(language: KnowledgeLanguage) {
  const message = messages[language]
  const content = message.assistant
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
      message.projectDescriptions[project.id],
      'Stack: ' + project.stack,
      'Listed creation month (YYYY-MM): ' + project.createdAt
    ].join('\n'))
  }
  for (const [index, section] of message.aboutSections.entries()) {
    sources.set('profile.about.' + index, section.heading + '\n' + section.before + section.emphasis + section.after)
  }
  sources.set('profile.education', [message.educationPage.title, message.educationPage.intro, message.educationPage.topics].join('\n'))
  sources.set('profile.experience', [message.experiencePage.title, message.experiencePage.intro].join('\n'))
  for (const entry of faqByLanguage[language]) {
    sources.set('faq.' + entry.id, entry.question + '\n' + entry.answer)
  }
  return sources
}

const stopWords = new Set(`
  ekaterina schedlberger екатерина шедльбергер
  was wie wer wann warum welche welcher welches hat hatte haben kann konnte ist sind war wurde
  uber und oder fur von zum zur aus mit ihr ihre ihrer sie ihm sein ein eine den dem der die das
  sich nicht noch nach bitte erzahle erzahl dort dabei auch gemacht
  what which who when where why how did does can could has have had her she the and for about
  was were this that with from will would please tell there been some any more
  что как где кто когда почему какие какой какая чем кем она ее ему они для при или над
  это этом этот была было были есть может могла про расскажи пожалуйста
`.trim().split(/\s+/))

function searchTerms(text: string) {
  const words = text.toLowerCase().normalize('NFKD').replace(/\p{M}/gu, '')
    .replace(/ß/g, 'ss').match(/[\p{L}\p{N}]+/gu) ?? []
  return new Set(words.filter(word =>
    (word.length >= 3 || /^(ai|it|ki|ui|ux|c1|b1|a2|ии)$/.test(word)) && !stopWords.has(word)
  ))
}

const TITLE_MATCH_WEIGHT = 2
const BODY_MATCH_WEIGHT = 1
const MAX_RELATED_SOURCES = 5

/** Index the published texts once per language and reuse the index for each question. */
function createPixelSourceSearch(sources: ReadonlyMap<string, string>) {
  const documents = [...sources].map(([key, text]) => ({
    key,
    terms: searchTerms(text),
    titleTerms: key.startsWith('faq.') || key.startsWith('profile.')
      ? searchTerms(text.split('\n', 1)[0] ?? '')
      : new Set<string>()
  }))

  const frequencyByTerm = new Map<string, number>()
  for (const { terms } of documents) {
    for (const term of terms) {
      frequencyByTerm.set(term, (frequencyByTerm.get(term) ?? 0) + 1)
    }
  }

  // Terms shared by many sources contribute less than distinctive terms.
  const relevanceByTerm = new Map(
    [...frequencyByTerm].map(([term, frequency]) => [
      term, Math.log1p(documents.length / frequency)
    ])
  )

  return function findRelatedSources(question: string, selectedKeys: ReadonlySet<string>) {
    const queryTerms = [...searchTerms(question)].filter(term => relevanceByTerm.has(term))
    if (queryTerms.length === 0) return []

    const matches: { key: string; score: number }[] = []
    for (const { key, terms, titleTerms } of documents) {
      if (selectedKeys.has(key)) continue

      let score = 0
      for (const term of queryTerms) {
        if (!terms.has(term)) continue
        const weight = titleTerms.has(term) ? TITLE_MATCH_WEIGHT : BODY_MATCH_WEIGHT
        score += weight * (relevanceByTerm.get(term) ?? 0)
      }

      if (score > 0) matches.push({ key, score })
    }

    return matches.sort((first, second) => second.score - first.score)
      .slice(0, MAX_RELATED_SOURCES)
      .map(({ key }) => key)
  }
}

export function createPixelKnowledge(language: KnowledgeLanguage) {
  const sources = getPixelSources(language)
  return { sources, findRelatedSources: createPixelSourceSearch(sources) }
}
