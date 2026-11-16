import { i18n } from './i18n'
import { cvPath, projects, skillGroups } from './portfolioData'

export type FollowUpKind = 'interest' | 'technology' | 'duration' | 'tasks'

interface KnowledgeTopic {
  keywords: string[]
  titleKey?: string
  replyTitleKey?: string
  searchKeys?: string[]
  technologies?: string[]
  stack?: string
  detailsPath?: string
  detailsLabelKey?: string
  detailsNewTab?: boolean
  project?: typeof projects[number]
  overview?: boolean
  answerKey: string
  followUps?: Partial<Record<FollowUpKind, string>>
}

const projectAliases = {
  yoganow: ['yoganow', 'yoga', 'ios', 'йог*'],
  todo: ['to do', 'todo', 'aufgaben*', 'task list', 'список задач', 'списка задач', 'задачник*'],
  shopplatzi: ['shopplatzi', 'platzi', 'shop demo', 'warenkorb', 'shopping cart', 'магазин*', 'корзин*'],
  hotelverwaltung: ['hotelverwaltung', 'hotel management', 'hotel booking', 'zimmerbuchung', 'гостиниц*', 'бронирован*'],
  uno: ['uno', 'уно', 'konsolenspiel', 'console game', 'консольн*'],
  'uno-web': ['colorspiel', 'color spiel', 'uno web', 'web uno', 'wintermodus', 'winter theme', 'зимний режим'],
  kaffeehaus: ['mokka', 'kaffeehaus*', 'coffee house', 'coffee shop', 'кофейн*'],
  feta: ['feta', 'lutscher*', 'lollipop*', 'produktkatalog', 'product catalog', 'вордпресс'],
  geschenkeverwaltung: ['geschenke*', 'gift manager', 'gift management', 'подар*']
}

const education = {
  softwareEngineering: ['fh campus 02', 'campus 02', 'software engineering', 'softwareentwicklung studiert', 'академическ*'],
  vue: ['vue kurs', 'vue course', 'курс vue'],
  javascript: ['javascript kurs', 'javascript course', 'курс javascript', 'javascript'],
  webDevelopment: ['web developerin', 'web development course', 'wifi diplom', 'диплом wifi', 'wifi', 'web'],
  reception: ['geprüfte rezeptionistin', 'geprüften rezeptionistin', 'ausbildung zur rezeptionistin', 'certified receptionist', 'reception course', 'курс администратора'],
  englishB1: ['englisch b1', 'english b1', 'английский b1'],
  englishA2B1: ['englisch a2', 'english a2', 'английский a2'],
  transculturalCommunication: ['bachelor', 'transkulturell*', 'transcultural*', 'italienisch', 'italian', 'бакалавр*'],
  germanC1: ['deutsch c1', 'german c1', 'немецкий c1', 'vorstudienlehrgang', 'vguh'],
  economics: ['ökonom*', 'economist', 'baikal uni*', 'naric', 'экономист*'],
  banking: ['bankwesen', 'bankkauffrau', 'banking', 'bmwfi', 'банковск*'],
  school: ['schule nr 3', 'secondary school', 'school education', 'школа 3', 'bratsk', 'братск']
}

const experience = [
  { start: '2002-09', keywords: ['stock manadzer', 'registrierungsabteilung', 'registration department', 'отдел регистрации'] },
  { start: '2004-05', keywords: ['edinstvo', 'edinstwo', 'единство', 'finanzreports', 'financial reports'] },
  { start: '2007-03', keywords: ['alfa broker', 'backoffice leiterin', 'head of back office', 'альфа брокер'] },
  { start: '2008-10', keywords: ['neuorientierung', 'career transition', 'переориентац*'] },
  { start: '2009-02', keywords: ['delta kapital', 'controlling', 'cash balances', 'дельта капитал'] },
  { start: '2012-07', keywords: ['karenz', 'elternzeit', 'parental leave', 'декрет*'] },
  { start: '2014-04', keywords: ['caritas', 'marienambulanz', 'dolmetsch*', 'interpreting', 'interpreter', 'переводчик*'] },
  { start: '2015-12', keywords: [] },
  { start: '2020-08', keywords: ['boutiquehotel dom', 'rezeption*', 'receptionist', 'hotellerie', 'hospitality', 'администратор гостиницы'] }
]

const personalTopics = {
  personality: [
    'charakter', 'persönlichkeit', 'arbeitsweise', 'wie arbeitet', 'stärken', 'starke seiten',
    'personality', 'work style', 'working style', 'how does she work', 'strengths',
    'характер*', 'как она работает', 'как работает', 'сильные сторон*', 'сильные качеств*'
  ],
  teamwork: [
    'teamarbeit', 'teamwork', 'im team', 'zusammenarbeit', 'teamfähig*', 'kolleg*',
    'work in a team', 'team player', 'colleagues', 'команд*', 'коллег*', 'общительн*', 'общение', 'любит людей', 'общаться с людьми'
  ],
  growth: [
    'schwäche*', 'schwache seiten', 'verbessern', 'woran arbeitet sie', 'lernt sie', 'weiterlernen',
    'weakness*', 'areas for improvement', 'improve', 'still learning', 'how does she learn',
    'слабые сторон*', 'слабост*', 'улучш*', 'над чем работает', 'как она учится'
  ],
  hours: [
    'wochenstunden', 'arbeitsstunden', 'arbeitszeit*', 'stunden pro woche', 'wie viele stunden', 'teilzeit', 'vollzeit',
    'hours per week', 'how many hours', 'working hours', 'part time', 'full time',
    'часов*', 'сколько часов', 'занятост*', 'полная ставка', 'неполная ставка'
  ],
  workplace: [
    'arbeitsmodell', 'arbeitsort', 'büro', 'vor ort', 'homeoffice', 'hybrid*', 'remote', 'wien', 'vienna',
    'on site', 'in office', 'work location', 'офис*', 'удал*', 'гибрид*', 'вена', 'вене', 'вену', 'формат работ*'
  ],
  authorization: [
    'arbeitsberechtigung', 'arbeitserlaubnis', 'arbeitsbewilligung', 'arbeitsgenehmigung',
    'darf sie arbeiten', 'arbeitsrechtlich', 'work permit', 'right to work', 'work authorization', 'work authorisation',
    'visa sponsorship', 'право на работу', 'разрешение на работу', 'может ли работать', 'рабочая виза'
  ],
  interests: [
    'freizeit', 'hobby', 'hobbys', 'sport', 'halbmarathon*', 'pole sport', 'hip hop', 'tanzen', 'reisen',
    'free time', 'hobbies', 'interests', 'half marathon*', 'pole dancing', 'dance', 'travel',
    'увлечен*', 'хобби', 'свободное время', 'спорт*', 'полумарафон*', 'пилон*', 'хип хоп', 'танц*', 'путешеств*'
  ]
}

const skills = [...new Set(skillGroups.flatMap(group =>
  group.skills?.flatMap(({ name }) => name.split(' · ')) ?? []
))]

const topics: KnowledgeTopic[] = [
  {
    keywords: ['lebenslauf*', 'cv', 'resume', 'curriculum vitae', 'резюме'],
    titleKey: 'assistant.cvTitle',
    detailsPath: cvPath,
    detailsLabelKey: 'cvDownload',
    detailsNewTab: true,
    answerKey: 'assistant.cvAnswer'
  },
  ...Object.entries(personalTopics).map(([id, keywords]) => {
    const path = `assistant.personalReplies.${id}`
    return {
      keywords,
      titleKey: `${path}.title`,
      answerKey: `${path}.answer`
    }
  }),
  {
    keywords: ['jawa', 'inforum', 'джава', 'джава менеджмент', '2025-09'],
    technologies: ['php', 'xdebug', 'sql', 'jira', 'jira service management', 'php debug*', 'debug php', 'отладка php'],
    detailsPath: '/Berufserfahrung',
    answerKey: 'assistant.experienceReplies.2025-09',
    followUps: {
      interest: 'assistant.followUp.jawaInterest',
      technology: 'assistant.followUp.jawaTechnology',
      duration: 'assistant.followUp.jawaDuration',
      tasks: 'assistant.followUp.jawaTasks'
    }
  },
  ...projects.map(project => ({
    keywords: projectAliases[project.id],
    technologies: [
      ...project.stack.split(' · '),
      ...(project.id === 'kaffeehaus' ? ['swiper'] : [])
    ],
    titleKey: `projectTitles.${project.id}`,
    searchKeys: [`projectTitles.${project.id}`],
    detailsPath: `/#${project.id}`,
    detailsLabelKey: 'assistant.projectDetailsLink',
    answerKey: `assistant.projectReplies.${project.id}`,
    stack: project.stack,
    project
  })),
  ...Object.entries(education).map(([id, keywords]) => ({
    keywords,
    titleKey: `educationPage.entries.${id}.title`,
    searchKeys: [
      ...(id === 'javascript' ? [] : [`educationPage.entries.${id}.title`]),
      `educationPage.entries.${id}.institution`
    ],
    detailsPath: '/Ausbildung',
    answerKey: `assistant.educationReplies.${id}`
  })),
  ...experience.map(({ start, keywords }) => {
    const path = `experiencePage.entries.${start}`
    return {
      keywords: [...keywords, start],
      titleKey: `${path}.role`,
      searchKeys: start === '2015-12' ? [] : [`${path}.role`],
      detailsPath: '/Berufserfahrung',
      answerKey: `assistant.experienceReplies.${start}`
    }
  }),
  {
    keywords: ['ausbildung', 'studium', 'education', 'qualification*', 'образован*', 'учила*', 'училась', 'университет*'],
    titleKey: 'educationPage.title',
    overview: true,
    detailsPath: '/Ausbildung',
    answerKey: 'assistant.educationAnswer'
  },
  {
    keywords: ['berufserfahrung', 'berufsweg', 'work experience', 'career', 'опыт работ*', 'карьер*'],
    titleKey: 'experiencePage.title',
    overview: true,
    detailsPath: '/Berufserfahrung',
    answerKey: 'assistant.overview.experience'
  },
  {
    keywords: ['projekt*', 'project*', 'проект*', 'portfolio', 'портфолио'],
    titleKey: 'projectsTitle',
    replyTitleKey: 'assistant.replyTitles.projects',
    overview: true,
    detailsPath: '/#projects',
    answerKey: 'assistant.overview.projects'
  },
  {
    keywords: [
      'technologien', 'technologies', 'tech stack', 'skills', 'kenntnisse', 'технолог*', 'навык*', 'инструмент*',
      ...skills
    ],
    titleKey: 'technologiesTitle',
    replyTitleKey: 'assistant.replyTitles.technologies',
    stack: skills.join(' · '),
    overview: true,
    detailsPath: '/#technologies',
    answerKey: 'assistant.overview.technologies'
  },
  {
    keywords: [
      'wer bist du', 'über mich', 'who are you', 'about yourself', 'кто ты', 'о себе',
      'ekaterin*', 'yekaterin*', 'екатерин*', 'екатерн*', 'schedlberger', 'шедльбергер*', 'graz', 'грац'
    ],
    searchKeys: ['portfolioName'],
    titleKey: 'portfolioName',
    overview: true,
    answerKey: 'assistant.profileAnswer'
  },
  {
    keywords: ['kontakt', 'contact', 'github', 'контакт*', 'связаться'],
    titleKey: 'helloTitle',
    replyTitleKey: 'assistant.replyTitles.contact',
    overview: true,
    detailsPath: '/#contact',
    answerKey: 'assistant.overview.contact'
  },
  {
    keywords: ['python'],
    titleKey: 'educationNext',
    overview: true,
    detailsPath: '/#about',
    answerKey: 'assistant.overview.python'
  },
  {
    keywords: ['künstliche intelligenz', 'ai', 'ki', 'ии', 'chatgpt'],
    titleKey: 'aboutSections.1.heading',
    replyTitleKey: 'assistant.replyTitles.ai',
    overview: true,
    detailsPath: '/#about',
    answerKey: 'assistant.overview.ai'
  }
]

function normalize(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/\p{M}/gu, '')
    .replace(/ß/g, 'ss')
    .replace(/[^\p{L}\p{N}#+ ]+/gu, ' ')
    .replace(/(\p{L})(\p{N})/gu, '$1 $2')
    .replace(/\s+/g, ' ')
    .replace(/\bcampus 2\b/g, 'campus 02')
    .replace(/\bc sharp\b/g, 'c#')
    .replace(/\bjava script\b/g, 'javascript')
    .replace(/\btype script\b/g, 'typescript')
    .replace(/\bnodejs\b/g, 'node js')
    .replace(/\brest apis?\b/g, 'rest api')
    .replace(/\bvue js\b/g, 'vue')
    .trim()
}

function compileKeywords(keywords: string[]) {
  return [...new Set(keywords)].map(keyword => ({
    words: normalize(keyword).split(/\s+/),
    prefix: keyword.endsWith('*')
  }))
}

const searchableTopics = topics.map(topic => ({
  topic,
  keywords: compileKeywords([
    ...topic.keywords,
    ...(topic.searchKeys ?? []).flatMap(key =>
      i18n.global.availableLocales.map(locale => i18n.global.t(key, {}, { locale }))
    )
  ]),
  technologies: compileKeywords((topic.technologies ?? []).flatMap(technology =>
    technology === 'Vue 3' ? ['Vue', technology] :
      technology === 'SQL Server LocalDB' ? ['SQL Server', technology] : [technology]
  ))
}))

function matchKeywords(question: string[], keywords: ReturnType<typeof compileKeywords>) {
  return keywords.flatMap(({ words, prefix }) =>
    question.flatMap((_, start) => {
      const found = words.every((word, offset) => {
        const candidate = question[start + offset]
        return prefix && offset === words.length - 1 ? candidate?.startsWith(word) : candidate === word
      })
      return found ? [{ start, length: words.length }] : []
    })
  )
}

type KeywordMatch = { start: number; length: number }

function preferLongerMatches(
  matches: { topic: KnowledgeTopic; names: KeywordMatch[]; tools: KeywordMatch[] }[],
  field: 'names' | 'tools'
) {
  const hits = matches.flatMap(match => match[field])
  return matches.filter(match => match[field].some(hit => !hits.some(other =>
    other.length > hit.length && other.start <= hit.start &&
    other.start + other.length >= hit.start + hit.length
  ))).map(match => match.topic)
}

export function findKnowledgeTopics(question: string) {
  const words = normalize(question).split(/\s+/)
  const matches = searchableTopics.map(({ topic, keywords, technologies }) => ({
    topic,
    names: matchKeywords(words, keywords),
    tools: matchKeywords(words, technologies)
  }))
  const named = preferLongerMatches(matches.filter(match => !match.topic.overview), 'names')
  if (named.length) return named

  const technical = preferLongerMatches(matches, 'tools')
  if (technical.length) return technical

  const overviews = matches.filter(match => match.topic.overview && match.names.length)
  // In “Ekaterina’s education”, the name sets the context and education is the topic.
  const specificOverviews = overviews.filter(match => match.topic.titleKey !== 'portfolioName')
  const relevant = specificOverviews.length ? specificOverviews : overviews
  const longest = Math.max(0, ...relevant.flatMap(match => match.names.map(name => name.length)))
  return relevant.filter(match => match.names.some(name => name.length === longest)).map(match => match.topic)
}
