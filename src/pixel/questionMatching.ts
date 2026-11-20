// Fragen erkennen und passende Themen oder FAQ-Antworten in Deutsch, Englisch und Russisch finden.
import { employerFaq as germanFaq } from '../locales/de'
import { employerFaq as englishFaq } from '../locales/en'
import { employerFaq as russianFaq } from '../locales/ru'
import { i18n } from '../i18n'
import { pixelFacts } from './facts'
import { cvPath, projects, skillGroups } from '../data/portfolioData'

export type FollowUpKind = 'interest' | 'technology' | 'duration' | 'tasks'

interface KnowledgeTopic {
  keywords: string[]
  phrase?: RegExp
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
  portfolio: [
    'pixel', 'portfolio website', 'portfolio webseite', 'portfolio mit pixel',
    'diese website', 'this website', 'this portfolio website',
    'этот сайт', 'сайт портфолио', 'портфолио с pixel'
  ],
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
  softwareExperience: [
    // Deutsch
    'welche erfahrung hat ekaterina in der softwareentwicklung',
    'welche erfahrung hat sie in der softwareentwicklung',
    'welche erfahrung bringt ekaterina in der softwareentwicklung mit',
    'welche erfahrung bringt sie in der softwareentwicklung mit',
    'erfahrung in der softwareentwicklung',
    'erfahrung mit softwareentwicklung',
    'erfahrung als softwareentwicklerin',
    'erfahrung als entwicklerin',
    'praktische erfahrung in der it',
    'praktische erfahrung in der softwareentwicklung',
    'praktische erfahrung als entwicklerin',
    'entwicklungserfahrung',
    'berufserfahrung als entwicklerin',
    'berufserfahrung in der softwareentwicklung',
    'softwareentwicklung erfahrung',
    'softwareentwicklung gearbeitet',
    'in der softwareentwicklung gemacht',
    'in der softwareentwicklung gesammelt',
    'it berufserfahrung',
    'it praxis',

    // Englisch
    'software development experience',
    'experience in software development',
    'experience as a software developer',
    'professional software development experience',
    'practical development experience',
    'experience working as a developer',

    // Russisch
    'опыт разработки программ',
    'опыт разработки по',
    'опыт в разработке',
    'опыт программирования',
    'опыт работы программистом',
    'практический опыт разработки',
    'опыт работы в it'
  ],

  languages: [
    'welche sprachen',
    'welche sprache',
    'sprachkenntnisse',
    'fremdsprachen',
    'spricht sie',
    'spricht ekaterina',
    'sprachen spricht',
    'sprachen kann',
    'deutschkenntnisse',
    'englischkenntnisse',
    'italienischkenntnisse',

    'which languages',
    'what languages',
    'languages does she speak',
    'languages can she speak',
    'spoken languages',
    'language skills',

    'какие языки',
    'какими языками',
    'на каких языках',
    'знание языков',
    'иностранные языки',
    'говорит по-русски',
    'говорит по-немецки'
  ],

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
    'wochenstunden', 'arbeitsstunden', 'arbeitszeit*', 'stunden pro woche', 'wie viele stunden', 'wie viel stunden', 'teilzeit', 'vollzeit',
    'hours per week', 'how many hours', 'working hours', 'part time', 'full time',
    'часов*', 'сколько часов', 'занятост*', 'полная ставка', 'неполная ставка'
  ],
  workplace: [
    'arbeitsmodell', 'arbeitsort', 'büro', 'vor ort', 'homeoffice', 'hybrid*', 'remote', 'wien', 'vienna',
    'on site', 'in office', 'work location', 'офис*', 'удал*', 'гибрид*', 'вена', 'вене', 'вену', 'формат работ*'
  ],
  authorization: [
    'arbeitsberechtigung', 'arbeitserlaubnis', 'arbeitsbewilligung', 'arbeitsgenehmigung',
    'darf sie arbeiten', 'darf sie in österreich arbeiten', 'arbeitsrechtlich', 'work permit', 'right to work', 'work authorization', 'work authorisation',
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
  {
    keywords: [
      'gehalt*', 'wunschgehalt*', 'lohn', 'lohnerwartung*', 'lohnvorstellung*', 'vergütung*',
      'entlohnung*', 'jahresbrutto', 'wie viel verdienen', 'was möchte sie verdienen',
      'was will sie verdienen', 'was stellt sie sich gehaltlich vor', 'was möchte ekaterina verdienen', 'was möchten sie verdienen',
      'wie viel will sie verdienen', 'wie viel möchte sie verdienen', 'wie viel soll sie verdienen', 'wie viel stellt sie sich vor', 'wie viel geld möchte sie',
      'salary', 'salaries', 'compensation', 'pay expectations', 'pay range', 'expected pay',
      'what pay', 'how much does she want to earn', 'how much would she like to earn',
      'зарплат*', 'оклад*', 'денежное вознаграждение', 'сколько она хочет получать',
      'сколько она хочет зарабатывать', 'на какую оплату она рассчитывает'
    ],
    answerKey: 'assistant.salaryAnswer'
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
    technologies: [...pixelFacts.jawa.technologies, 'jira', 'php debug*', 'debug php', 'отладка php'],
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
    phrase: /\bwas (?:genau )?(?:hat (?:sie|ekaterina)(?: bisher| alles)? gelernt|(?:sie|ekaterina)(?: bisher| schon| alles)? gelernt hat)\b/,
    keywords: [
      'was hat sie in der ausbildung gelernt',
      'welche fächer hat sie gelernt', 'welche kenntnisse hat sie erworben',
      'was hat sie sich beigebracht', 'was hat sie im studium gelernt',
      'what did she learn', 'what has she learned', 'what has she learnt',
      'what did ekaterina learn', 'what subjects did she study', 'what did she study',
      'чему она научилась', 'чему научилась екатерина', 'что она изучала',
      'что она выучила', 'чему её научили', 'какие предметы она изучала'
    ],
    titleKey: 'educationPage.title',
    detailsPath: '/Ausbildung',
    overview: true,
    answerKey: 'assistant.learningAnswer'
  },
  {
    keywords: [
      'ausbildung', 'studium', 'education', 'qualification*',
      'образован*', 'учила*', 'училась', 'университет*',
      'was hat sie studiert', 'was hat ekaterina studiert', 'wo hat sie studiert',
      'where did she study', 'academic background', 'где она училась'
    ],
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
    detailsLabelKey: 'nav.1',
    answerKey: 'assistant.overview.projects'
  },
  {
    phrase: /\bwas (?:genau )?(?:kann (?:sie|ekaterina)|(?:sie|ekaterina) kann)\b/,
    keywords: [
      'technologien', 'technologies', 'tech stack',
      'skills', 'kenntnisse', 'технолог*', 'навык*',
      'инструмент*',
      'was kann sie programmieren',
      'welche fähigkeiten hat sie',
      'welche programmiersprachen kennt sie',
      'welche kenntnisse bringt sie mit',
      'was beherrscht sie', 'worin kennt sie sich aus',
      'welche technischen kenntnisse', 'was bringt sie an kenntnissen mit', 'welche fähigkeiten bringt sie mit',
      'was sind ihre technischen fähigkeiten', 'technische fähigkeiten', 'programmierkenntnisse',
      'programmiersprachen', 'what can she do', 'what can ekaterina do',
      'what can she build', 'what is she able to do', 'what does she know',
      'what tools does she know', 'programming languages', 'technical abilities',
      'что она умеет', 'что умеет екатерина', 'что она может делать',
      'что она умеет делать', 'какими технологиями', 'языки программирования',
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
    keywords: ['kontakt', 'wie erreiche ich sie', 'contact', 'get in touch', 'github', 'контакт*', 'связаться'],
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
    .replace(/\bvue (?:js|3)\b/g, 'vue')
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

const undocumentedSkillsQuestion = /^(?:was (?:genau )?kann (?:sie|ekaterina) (?:noch )?nicht\b(?! nur\b)|was (?:sie|ekaterina) (?:noch )?nicht kann\b|what (?:can (?:she|ekaterina) not|can(?:not| t) (?:she|ekaterina))\b|что (?:она|екатерина) (?:пока )?не умеет(?: |$)|чего (?:она|екатерина) (?:пока )?не умеет(?: |$))/

const undocumentedSkillsTopic: KnowledgeTopic = {
  keywords: [],
  overview: true,
  answerKey: 'assistant.undocumentedSkillsAnswer'
}

const incompleteQuestionTopic: KnowledgeTopic = {
  keywords: [],
  overview: true,
  answerKey: 'assistant.incompleteQuestionAnswer'
}

export function findKnowledgeTopics(question: string) {
  const normalized = normalize(question)
  if (/^(?:was|wer|wie|wo|wann|warum|what|who|how|where|when|why|что|кто|как|где|когда|почему)?$/u.test(normalized)) {
    return [incompleteQuestionTopic]
  }
  if (undocumentedSkillsQuestion.test(normalized)) return [undocumentedSkillsTopic]

  const words = normalized.split(' ')
  const matches = searchableTopics.map(({ topic, keywords, technologies }) => {
    const names = matchKeywords(words, keywords)
    return { topic, names, tools: matchKeywords(words, technologies) }
  })
  const salary = matches.find(match => match.topic.answerKey === 'assistant.salaryAnswer')
  if (salary?.names.length) return [salary.topic]

  const named = preferLongerMatches(matches.filter(match => !match.topic.overview), 'names')
  if (named.length) return named

  const technical = preferLongerMatches(matches, 'tools')
  if (technical.length) return technical

  const overviewMatches = matches.filter(match => match.topic.overview)
  const phrased = overviewMatches.filter(match => match.topic.phrase?.test(normalized))
  if (phrased.length) return phrased.map(match => match.topic)

  const overviews = overviewMatches.filter(match => match.names.length)
  // In “Ekaterina’s education”, the name sets the context and education is the topic.
  const specificOverviews = overviews.filter(match => match.topic.titleKey !== 'portfolioName')
  const relevant = specificOverviews.length ? specificOverviews : overviews
  const longest = Math.max(0, ...relevant.flatMap(match => match.names.map(name => name.length)))
  return relevant.filter(match => match.names.some(name => name.length === longest)).map(match => match.topic)
}


// Die FAQ behalten in DE/EN/RU dieselben IDs. Jede Suche verwendet die gewählte Sprache.
function normalizeEmployerQuestion(value: string): string {
  return value.toLocaleLowerCase('de')
    .normalize('NFKD').replace(/\p{M}/gu, '')
    .replace(/ß/g, 'ss')
    .replace(/[^\p{L}\p{N} ]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\bvue ?3\b/g, 'vue')
    .trim()
}

const employerQuestionAliases: Record<string, number> = {
  'kann sie php': 47,
  'kann ekaterina php': 47,
  'kennt sie php': 47,
  'was hat ekaterina selbst daran erweitert': 108,
  'welche aufgaben übernahm ekaterina bei yoganow': 93,
  'welche projekte hat sie mit vue': 63,
  'welche projekte auf vue': 63,
  'welche erfahrung hat ekaterina in der softwareentwicklung': 41,
  'welche erfahrung hat sie in der softwareentwicklung': 41,
  'welche erfahrung bringt sie in der softwareentwicklung mit': 41,
  'welche erfahrung hat ekaterina als entwicklerin': 41,
  'welche sprachen kann sie': 159,
  'welche sprachen spricht sie': 159,
  'was hat sie am wifi gemacht': 34,
  'was war ihr diplomprojekt am wifi': 35,
  'hat sie inforum allein entwickelt': 44,
  'hat sie alle 16 kundenprojekte allein entwickelt': 45,
  'warum sucht ekaterina eine junior stelle': 209,
  'was ist das feta projekt': 117,
  'wie viel stunden mag sie arbeiten': 144,
  'wie viele stunden mag sie arbeiten': 144
}

function normalizeCandidateName(question: string) {
  return question
    .replace(
      /\b(hat|ist|war|kann|kennt|spricht|arbeitet|mochte|will|bringt|sucht|verwendet|nutzt|beherrscht|wurde) (?:sie|ekaterina(?: schedlberger)?)\b/g,
      '$1 ekaterina'
    )
    .replace(
      /\b(does|did|has|is|can|would|will|could|should) (?:she|ekaterina(?: schedlberger)?)\b/g,
      '$1 ekaterina'
    )
    .replace(/(?<!\p{L})(?:екатерина(?: шедльбергер)?|она)(?!\p{L})/gu, 'екатерина')
}

function indexEmployerFaq(entries: readonly { id: number; question: string; answer: string }[]) {
  const entriesById = new Map(entries.map(entry => [entry.id, entry]))
  const exact = new Map<string, string | null>()
  const subjects = new Map<string, string | null>()

  // Bei mehrdeutigen Formulierungen keine beliebige Antwort auswählen.
  function add(index: Map<string, string | null>, key: string, answer: string) {
    index.set(key, index.has(key) && index.get(key) !== answer ? null : answer)
  }

  for (const entry of entries) {
    const normalized = normalizeEmployerQuestion(entry.question)
    add(exact, normalized, entry.answer)
    add(subjects, normalizeCandidateName(normalized), entry.answer)
  }
  return { entriesById, exact, subjects }
}

const faqIndexes = new Map([
  ['de', indexEmployerFaq(germanFaq)],
  ['en', indexEmployerFaq(englishFaq)],
  ['ru', indexEmployerFaq(russianFaq)]
])

export function getEmployerFaqQuestions(ids: readonly number[], language: string) {
  const index = faqIndexes.get(language) ?? faqIndexes.get('de')
  return ids.flatMap(id => {
    const entry = index?.entriesById.get(id)
    return entry ? [{ id, question: entry.question }] : []
  })
}

const translatedAliases = {
  en: {
    'does she know php': 47,
    'can she use php': 47,
    'does ekaterina know php': 47,
    'what did ekaterina add to colorspiel herself': 108,
    'what did ekaterina contribute to yoganow': 93,
    'which projects use vue': 63,
    'what are her vue projects': 63,
    'which languages does she speak': 159,
    'what languages does she speak': 159,
    'what did she do at jawa': 46,
    'how long did ekaterina work at jawa': 42
  },
  ru: {
    'она умеет php': 47,
    'умеет ли она php': 47,
    'она знает php': 47,
    'знает ли она php': 47,
    'екатерина умеет php': 47,
    'что екатерина самостоятельно добавила в colorspiel': 108,
    'какой вклад екатерина внесла в yoganow': 93,
    'какие проекты на vue': 63,
    'какие проект на vue': 63,
    'какие у нее проекты на vue': 63,
    'какие языки она знает': 159,
    'какие языки она говорит': 159,
    'что она делала в jawa': 46,
    'какой у нее опыт разработки': 41,
    'она говорит по английски': 162,
    'она говорит по немецки': 160
  }
}
const faqAliases = new Map([
  ['de', new Map(Object.entries(employerQuestionAliases))],
  ...Object.entries(translatedAliases).map(([language, aliases]) => [
    language, new Map(Object.entries(aliases).map(([question, id]) => [normalizeEmployerQuestion(question), id]))
  ] as const)
])

/** Liefert eine hinterlegte Antwort in der gewünschten Sprache oder null. */
export function findEmployerFaqAnswer(question: string, language = 'de'): string | null {
  const index = faqIndexes.get(language)
  if (!index) return null
  const normalized = normalizeEmployerQuestion(question)
  if (!normalized) return null

  // Ein mehrdeutiger exakter Treffer darf nicht durch eine lockerere Regel ersetzt werden.
  if (index.exact.has(normalized)) return index.exact.get(normalized) ?? null

  const id = faqAliases.get(language)?.get(normalized)
  if (id !== undefined) return index.entriesById.get(id)?.answer ?? null
  return index.subjects.get(normalizeCandidateName(normalized)) ?? null
}

// Schätzt die Fragesprache. Bei Gleichstand gilt die Website-Sprache.
const germanWords = new Set([
  'war', 'lernt', 'nach', 'ihrem', 'wozu', 'woher', 'verwendet', 'die', 'wäre', 'bevorzugt', 'können', 'wir', 'ihr', 'einen',
  'wer', 'was', 'wie', 'wo', 'woran', 'welche', 'welcher', 'welches', 'warum', 'wann',
  'ist', 'sind', 'hat', 'hast', 'arbeitet', 'gearbeitet', 'entwickelt', 'gebaut',
  'deine', 'dein', 'ihre', 'über', 'ueber', 'erzähle', 'erzähl', 'bitte', 'und',
  'ausbildung', 'berufserfahrung', 'studium', 'projekte', 'kontakt', 'hallo', 'danke', 'teamarbeit', 'stärken', 'schwächen',
  'sie', 'kann', 'kennt', 'gelernt', 'studiert', 'beherrscht', 'verdienen', 'verdient',
  'mochte', 'möchte', 'will', 'gehalt', 'gehaltsvorstellungen', 'wunschgehalt', 'vergütung', 'lohn',
  'kenntnisse', 'fähigkeiten', 'programmiersprachen', 'technologien', 'programmierkenntnisse',
  'jahresbrutto', 'entlohnung', 'gehaltlich', 'qualifikationen',
  'wochenstunden', 'arbeitszeit', 'teilzeit', 'arbeitserlaubnis', 'arbeitsberechtigung', 'arbeitsbewilligung', 'freizeit', 'lebenslauf'
])

const englishWords = new Set([
  'would', 'could', 'her', 'a', 'at', 'into', 'will', 'first', 'client',
  'who', 'what', 'can', 'she', 'learned', 'learnt', 'studied', 'earn', 'salary',
  'salaries', 'pay', 'compensation', 'skills', 'abilities', 'technologies', 'programming',
  'qualifications', 'where', 'how', 'which', 'why', 'when', 'is', 'are', 'were', 'did',
  'does', 'has', 'have', 'worked', 'built', 'developed', 'responsible', 'tell', 'about',
  'your', 'please', 'and', 'education', 'experience', 'projects', 'hello', 'thanks', 'strengths', 'weaknesses', 'teamwork', 'hours', 'permit', 'hobbies', 'resume', 'résumé'
])

export function detectAssistantLanguage(question: string) {
  const words = question.toLowerCase().normalize('NFC').match(/\p{L}+/gu) ?? []
  const scores = { de: 0, en: 0, ru: 0 }

  for (const word of words) {
    if (/\p{Script=Cyrillic}/u.test(word)) scores.ru++
    if (germanWords.has(word)) scores.de++
    if (englishWords.has(word)) scores.en++
  }

  if (scores.ru > scores.de && scores.ru > scores.en) return 'ru'
  if (scores.de > scores.ru && scores.de > scores.en) return 'de'
  if (scores.en > scores.ru && scores.en > scores.de) return 'en'
}
