<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{ language: 'DE' | 'EN' | 'RU' }>()

const copy = {
  DE: {
    reset: 'Zurücksetzen', sortLabel: 'Sortieren', newest: 'Neueste zuerst', oldest: 'Älteste zuerst',
    filter: 'Nach Bereich filtern', categories: { all: 'Alle', degree: 'Schule, Studium & Abschlüsse', it: 'IT-Weiterbildungen', language: 'Sprachkurse' },
    title: 'Ausbildung', label: 'Mein Bildungsweg',
    intro: 'Die Welt ist voller spannender Themen – und Lernen hört für mich nie auf. Mein Bildungsweg führte mich von Wirtschaft und Sprachen zur Softwareentwicklung. Heute sehe ich, was all diese Etappen verbindet: meine Neugier, die Freude am Lernen und der Wunsch, Zusammenhänge zu verstehen.',
    completed: 'Erfolgreich abgeschlossen im Oktober 2026',
    focus: 'Schwerpunkte', topics: 'Objektorientierte Programmierung, Algorithmen, Datenbanken, Softwarearchitektur, REST-APIs und Softwarequalitätssicherung.',
    practice: 'Berufspraxis bei JAWA Management Software GmbH', project: 'Mitarbeit an Kundenprojekten und an inforum, der modularen Management-Plattform für die produzierende Industrie; Fehleranalyse mit PHP und Xdebug, Arbeit mit SQL und Jira Service Management.',
    institution: 'Einrichtung', location: 'Ort', recognition: 'Anerkennung',
    institutionNotes: {
      campus: 'Akademischer Hochschullehrgang Software Engineering',
      glo: 'Online-Schule für Programmierung und Webentwicklung',
      wifi: 'Institut für berufliche Aus- und Weiterbildung der Wirtschaftskammer Steiermark',
      graz: 'Universität Graz; Karl-Franzens-Universität ist die historische Bezeichnung'
    },
    places: ['Graz, Österreich', 'Online', 'Irkutsk, Russland', 'Bratsk, Russland'],
    titles: ['Akademisch geprüfte Softwareentwicklerin', 'Vue.js – Grundlagen und erstes Projekt', 'JavaScript', 'Ausbildung zur Web Developerin', 'Englisch B1', 'Englisch A2 und B1', 'Bachelorstudium Transkulturelle Kommunikation – Deutsch, Italienisch und Russisch', 'Deutsch C1', 'Ökonom – Manager', 'Bankwesen', 'Allgemeinbildende Schulbildung'],
    banking: 'BMWfi – Anerkennung als Bankkauffrau (österreichischer Lehrberuf)'
  },
  EN: {
    reset: 'Reset',
    sortLabel: 'Sort', newest: 'Newest first', oldest: 'Oldest first',
    filter: 'Filter by category', categories: { all: 'All', degree: 'School, university & qualifications', it: 'IT training', language: 'Language courses' },
    title: 'Education', label: 'My learning journey',
    intro: 'The world is full of fascinating subjects, and I never stop learning. My educational path led me from economics and languages to software development. I now see what connects all these stages: my curiosity, love of learning and desire to understand how things fit together.',
    completed: 'Successfully completed in October 2026',
    focus: 'Areas of study', topics: 'Object-oriented programming, algorithms, databases, software architecture, REST APIs and software quality assurance.',
    practice: 'Practical training at JAWA Management Software GmbH', project: 'Contributed to client projects and inforum, the modular management platform for manufacturing; investigated issues with PHP and Xdebug, and worked with SQL and Jira Service Management.',
    institution: 'Institution', location: 'Location', recognition: 'Recognition',
    institutionNotes: {
      campus: 'Academic Programme in Software Engineering',
      glo: 'Online school for programming and web development',
      wifi: 'Professional education institute of the Styrian Economic Chamber',
      graz: 'University of Graz'
    },
    places: ['Graz, Austria', 'Online', 'Irkutsk, Russia', 'Bratsk, Russia'],
    titles: ['Academically certified software developer', 'Vue.js – Fundamentals and first project', 'JavaScript', 'Web development training', 'English B1', 'English A2 and B1', 'Bachelor’s studies in Transcultural Communication – German, Italian and Russian', 'German C1', 'Economist and manager', 'Banking', 'School education'],
    banking: 'BMWfi – recognition as a bank clerk (Austrian apprenticeship qualification)'
  },
  RU: {
    reset: 'Сбросить',
    sortLabel: 'Сортировка', newest: 'Сначала новые', oldest: 'Сначала старые',
    filter: 'Фильтр по категории', categories: { all: 'Все', degree: 'Школа, вуз и квалификации', it: 'Курсы по ИТ', language: 'Языковые курсы' },
    title: 'Образование', label: 'Мой путь в образовании',
    intro: 'Мир полон интересного, и я продолжаю учиться всю жизнь. Мой образовательный путь привёл меня от экономики и языков к разработке ПО. Теперь я понимаю, что объединяет все эти этапы: любознательность, любовь к учёбе и желание разбираться в том, как всё устроено.',
    completed: 'Обучение успешно завершено в октябре 2026 года',
    focus: 'Основные темы', topics: 'Объектно-ориентированное программирование, алгоритмы, базы данных, архитектура ПО, REST API и обеспечение качества ПО.',
    practice: 'Практика в австрийской компании JAWA Management Software GmbH', project: 'Участие в клиентских проектах и работе над inforum — модульной платформой управления для производственной отрасли; анализ ошибок с PHP и Xdebug, работа с SQL и Jira Service Management.',
    institution: 'Учебное заведение', location: 'Место', recognition: 'Признание квалификации',
    institutionNotes: {
      campus: 'Академическая программа по инженерной разработке ПО',
      glo: 'Онлайн-школа программирования и веб-разработки',
      wifi: 'Институт профессионального обучения и повышения квалификации Экономической палаты Штирии',
      graz: 'Университет Карла и Франца в Граце'
    },
    places: ['Грац, Австрия', 'Онлайн', 'Иркутск, Россия', 'Братск, Россия'],
    titles: ['Разработчик программного обеспечения с академической квалификацией', 'Vue.js – основы и первый проект', 'JavaScript', 'Профессиональная подготовка по веб-разработке', 'Английский B1', 'Английский A2 и B1', 'Бакалавриат по транскультурной коммуникации – немецкий, итальянский и русский языки', 'Немецкий C1', 'Экономист-менеджер', 'Банковское дело', 'Среднее общее образование'],
    banking: 'BMWfi – признание квалификации банковского служащего в Австрии'
  }
}

const categories = ['all', 'degree', 'it', 'language'] as const
type Category = typeof categories[number]
type InstitutionNoteKey = 'campus' | 'glo' | 'wifi' | 'graz'
const selectedCategory = ref<Category>('all')
const sortOrder = ref<'newest' | 'oldest'>('newest')

const entries: {
  category: Exclude<Category, 'all'>
  additionalCategories?: Exclude<Category, 'all'>[]
  start: string
  end: string
  institution?: string
  institutionEn?: string
  institutionRu?: string
  institutionNote?: InstitutionNoteKey
  place: number
  recognition?: string
  recognitionRu?: string
}[] = [
  { category: 'degree', start: '2025-02', end: '2026-10', institution: 'FH CAMPUS 02 – Fachhochschule der Wirtschaft', institutionEn: 'CAMPUS 02 University of Applied Sciences for Business and the Economy', institutionRu: 'FH CAMPUS 02 — высшее учебное заведение с прикладной подготовкой в сфере экономики', institutionNote: 'campus', place: 0 },
  { category: 'it', start: '2025-01', end: '2025-03', institution: 'Glo Academy', institutionNote: 'glo', place: 1 },
  { category: 'it', start: '2024-03', end: '2024-05', institution: 'Glo Academy', institutionNote: 'glo', place: 1 },
  { category: 'it', start: '2022-11', end: '2023-03', institution: 'WIFI Steiermark', institutionNote: 'wifi', place: 0 },
  { category: 'language', start: '2019-10', end: '2020-01', institution: 'Internationales Sprachzentrum an der Universität Graz', institutionEn: 'Internationales Sprachzentrum an der Universität Graz — International Language Centre at the University of Graz', institutionRu: 'Internationales Sprachzentrum an der Universität Graz — Международный языковой центр при Университете Граца', place: 0 },
  { category: 'language', start: '2016-11', end: '2017-07', institution: 'Internationales Sprachzentrum an der Universität Graz', institutionEn: 'Internationales Sprachzentrum an der Universität Graz — International Language Centre at the University of Graz', institutionRu: 'Internationales Sprachzentrum an der Universität Graz — Международный языковой центр при Университете Граца', place: 0 },
  { category: 'degree', additionalCategories: ['language'], start: '2010-09', end: '2015-09', institution: 'Karl-Franzens-Universität Graz', institutionNote: 'graz', place: 0 },
  { category: 'language', start: '2009-09', end: '2010-07', institution: 'Vorstudienlehrgang der Grazer Universitäten und Hochschulen', institutionEn: 'University Preparation Programme of the Universities and Higher Education Institutions of Graz (VGUH)', institutionRu: 'Подготовительная программа университетов и высших учебных заведений Граца (VGUH)', place: 0 },
  { category: 'degree', start: '2002-09', end: '2006-12', institution: 'Baikal Universität für Ökonomie und Recht', institutionEn: 'Baikal State University of Economics and Law', institutionRu: 'Байкальский государственный университет экономики и права', place: 2, recognition: 'ENIC NARIC Austria', recognitionRu: 'австрийский национальный центр по оценке иностранных дипломов для профессиональных целей' },
  { category: 'degree', start: '2000-09', end: '2002-07', institution: 'Kolleg der Baikal Universität für Ökonomie und Recht', institutionEn: 'College of Baikal State University of Economics and Law', institutionRu: 'Колледж Байкальского государственного университета экономики и права', place: 2, recognition: 'banking' },
  { category: 'degree', start: '1990-09', end: '2000-07', institution: 'Schule Nr. 3', institutionEn: 'Secondary School No. 3', institutionRu: 'Средняя школа № 3', place: 3 }
]

const indexedEntries = entries.map((entry, index) => ({ ...entry, index }))
const visibleEntries = computed(() => indexedEntries
  .filter((entry) => selectedCategory.value === 'all' || entry.category === selectedCategory.value || entry.additionalCategories?.includes(selectedCategory.value) === true)
  .sort((first, second) => {
    const order = first.start.localeCompare(second.start)
    return sortOrder.value === 'newest' ? -order : order
  })
)

const t = computed(() => copy[props.language])
function resetEducationControls() {
  selectedCategory.value = 'all'
  sortOrder.value = 'newest'
}

const formatter = computed(() => new Intl.DateTimeFormat(
  { DE: 'de-AT', EN: 'en-GB', RU: 'ru-RU' }[props.language],
  { month: 'long', year: 'numeric', timeZone: 'UTC' }
))

function formatMonth(value: string) {
  return formatter.value.format(new Date(value + '-01T00:00:00Z'))
}
</script>

<template>
  <main class="section" aria-labelledby="education-title">
    <header class="tile education-heading">
      <span class="eyebrow">{{ t.label }}</span>
      <h1 id="education-title">{{ t.title }}</h1>
      <p>{{ t.intro }}</p>
    </header>
    <div class="education-filters" role="group" :aria-label="t.filter">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        :data-category="category"
        :aria-pressed="selectedCategory === category"
        @click="selectedCategory = category"
      >
        {{ t.categories[category] }}
      </button>
    </div>

    <div class="education-toolbar">
      <div class="education-sort" role="group" :aria-label="t.sortLabel">
        <button
          type="button"
          :aria-label="t.newest"
          :aria-pressed="sortOrder === 'newest'"
          :title="t.newest"
          @click="sortOrder = 'newest'"
        >↓</button>
        <button
          type="button"
          :aria-label="t.oldest"
          :aria-pressed="sortOrder === 'oldest'"
          :title="t.oldest"
          @click="sortOrder = 'oldest'"
        >↑</button>
      </div>
      <button
        v-if="selectedCategory !== 'all' || sortOrder !== 'newest'"
        class="education-reset"
        type="button"
        @click="resetEducationControls"
      >
        {{ t.reset }}
      </button>
    </div>
    <ol class="projects-grid education-list" role="list">
      <li
        v-for="entry in visibleEntries"
        :key="entry.start"
        :data-category="entry.category"
        class="tile project-card project-meta education-entry"
        :class="{ 'education-entry-featured': entry.index === 0 }"
      >
        <div class="project-type education-dates">
          <span class="education-category-list">
            <span
              v-for="category in [entry.category, ...(entry.additionalCategories ?? [])]"
              :key="category"
              class="education-category"
              :data-category="category"
            >{{ t.categories[category] }}</span>
          </span>
          <time :datetime="entry.start">{{ formatMonth(entry.start) }}</time>
          –
          <time :datetime="entry.end">{{ formatMonth(entry.end) }}</time>
        </div>
        <h3>{{ t.titles[entry.index] }}</h3>
        <div v-if="entry.index === 0" class="project-stack education-completed">{{ t.completed }}</div>
        <dl class="education-details">
          <div v-if="entry.institution">
            <dt>{{ t.institution }}</dt>
            <dd>{{ props.language === 'RU' && entry.institutionRu ? entry.institutionRu : props.language === 'EN' && entry.institutionEn ? entry.institutionEn : entry.institution }}<template v-if="entry.institutionNote"> — {{ t.institutionNotes[entry.institutionNote] }}</template></dd>
          </div>
          <div>
            <dt>{{ t.location }}</dt>
            <dd>{{ t.places[entry.place] }}</dd>
          </div>
          <div v-if="entry.recognition">
            <dt>{{ t.recognition }}</dt>
            <dd>{{ entry.recognition === 'banking' ? t.banking : entry.recognition }}<template v-if="props.language === 'RU' && entry.recognitionRu"> — {{ entry.recognitionRu }}</template></dd>
          </div>
        </dl>
        <template v-if="entry.index === 0">
          <div class="education-notes">
            <div>
              <h4>{{ t.focus }}</h4>
              <p>{{ t.topics }}</p>
            </div>
            <div>
              <h4>{{ t.practice }}</h4>
              <p>{{ t.project }}</p>
            </div>
          </div>
        </template>
      </li>
    </ol>
  </main>
</template>

<style scoped>
.education-heading {
  padding: clamp(24px, 6vw, 76px);
  background: var(--slate);
}

.education-heading .eyebrow {
  color: var(--ink);
}

.education-heading h1 {
  margin: 10px 0 16px;
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-size: clamp(2rem, 7vw, 5.5rem);
  font-weight: 500;
  letter-spacing: -.045em;
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.education-heading p {
  max-width: 48ch;
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
}

.education-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin: 18px 0;
}

.education-sort {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  color: var(--muted);
  font-size: 13px;
}

.education-sort button {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font-size: 20px;
}

.education-sort button[aria-pressed='true'] {
  border-color: var(--accent);
  background: var(--mist);
}

.education-reset {
  padding: 6px 8px;
  border: 0;
  background: transparent;
  color: var(--muted);
  font: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 520px) {
  .education-toolbar {
    justify-content: space-between;
  }

  .education-sort {
    margin-left: auto;
  }

  .education-reset {
    font-size: 12px;
  }
}

@media (max-width: 380px) {
  .education-heading {
    padding: 18px 14px;
  }

  .education-heading h1 {
    font-size: clamp(24px, 8vw, 32px);
  }

  .education-heading p {
    font-size: 14px;
    overflow-wrap: anywhere;
  }

  .education-entry,
  .education-entry-featured {
    padding: 18px 14px;
  }

  .education-filters button,
  .education-reset {
    max-width: 100%;
    overflow-wrap: anywhere;
  }
}

.education-list {
  padding: 0;
  list-style: none;
}

.education-entry {
  padding: clamp(18px, 3vw, 30px);
  background: var(--category-color);
  overflow-wrap: anywhere;
}

[data-category='degree'] {
  --category-color: var(--mist);
}

[data-category='it'] {
  --category-color: var(--lilac);
}

[data-category='language'] {
  --category-color: var(--slate);
}

.education-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.education-filters button {
  padding: 8px 12px;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--category-color, var(--surface));
  color: var(--ink);
}

.education-filters button[aria-pressed='true'] {
  outline: 3px solid var(--ink);
  outline-offset: 2px;
}

.education-category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
}

.education-category {
  display: inline-block;
  padding: 3px 8px;
  border: 1px solid color-mix(in srgb, var(--ink) 24%, transparent);
  border-radius: 999px;
  background: var(--category-color);
  font-weight: 700;
}

.education-entry-featured {
  grid-column: 1 / -1;
  display: grid;
  gap: 12px;
  padding: clamp(24px, 5vw, 60px);
  border: 1px solid var(--line);
  background: var(--category-color);
}

.education-details {
  display: grid;
  gap: 8px;
  margin: 16px 0 0;
  font-size: 13px;
  line-height: 1.7;
}

.education-details dt {
  font-weight: 600;
}

.education-details dd {
  margin: 0;
}

.education-entry .project-type,
.education-entry p {
  color: var(--ink);
}

.education-entry-featured h3 {
  max-width: 28ch;
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 3rem);
  line-height: 1.12;
}

.education-completed {
  justify-self: start;
  padding: 7px 12px;
  border-radius: 6px;
  background: var(--surface);
  color: var(--ink);
  line-height: 1.5;
}

.education-notes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 20px 36px;
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}

.education-notes h4 {
  margin: 0 0 6px;
}

.education-notes p {
  margin: 0;
}

@media (min-width: 700px) {
  .education-entry h3 {
    font-size: clamp(20px, 1.65vw, 25px);
    line-height: 1.25;
  }

  .education-entry .project-type {
    font-size: clamp(12px, .9vw, 14px);
  }

  .education-details {
    font-size: clamp(15px, 1.05vw, 18px);
  }

  .education-completed {
    font-size: clamp(14px, .95vw, 16px);
  }

  .education-notes p {
    font-size: clamp(15px, 1.05vw, 17px);
    line-height: 1.7;
  }
}

@media (min-width: 800px) {
  .education-entry-featured {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    column-gap: clamp(24px, 5vw, 72px);
    align-items: start;
  }

  .education-entry-featured .education-dates {
    grid-area: 1 / 1;
  }

  .education-entry-featured .education-details {
    grid-area: 2 / 1 / 4;
    margin: 0;
  }

  .education-entry-featured h3 {
    grid-area: 1 / 2;
  }

  .education-completed {
    grid-area: 2 / 2;
  }

  .education-notes {
    grid-area: 3 / 2;
  }
}
</style>
