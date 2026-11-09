<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ language: 'DE' | 'EN' | 'RU' }>()

const copy = {
  DE: {
    title: 'Ausbildung', label: 'Mein Bildungsweg',
    intro: 'Von Sprachen und Wirtschaft über Webentwicklung bis zum Abschluss als akademisch geprüfte Softwareentwicklerin.',
    completed: 'Erfolgreich abgeschlossen im Oktober 2026',
    focus: 'Schwerpunkte', topics: 'Objektorientierte Programmierung, Algorithmen, Datenbanken, Softwarearchitektur, REST-APIs und Softwarequalitätssicherung.',
    practice: 'Berufspraxis bei JAWA', project: 'Mitarbeit an Kundenprojekten und an INFORUM, Fehleranalyse mit PHP und Xdebug, SQL und Jira Service Management.',
    institution: 'Einrichtung', location: 'Ort', recognition: 'Anerkennung',
    places: ['Graz, Österreich', 'Online', 'Irkutsk, Russland', 'Bratsk, Russland'],
    titles: ['Akademisch geprüfte Softwareentwicklerin', 'Vue.js – Grundlagen und erstes Projekt', 'JavaScript', 'Ausbildung zur Web Developerin', 'Englisch B1', 'Englisch A2 und B1', 'Bachelorstudium Transkulturelle Kommunikation – Deutsch, Italienisch und Russisch', 'Deutsch C1', 'Ökonom – Manager', 'Bankwesen', 'Grundschule'],
    banking: 'BMWfi – Anerkennung als Bankkauffrau (österreichischer Lehrberuf)'
  },
  EN: {
    title: 'Education', label: 'My learning journey',
    intro: 'From languages and economics through web development to qualifying as an academically certified software developer.',
    completed: 'Successfully completed in October 2026',
    focus: 'Areas of study', topics: 'Object-oriented programming, algorithms, databases, software architecture, REST APIs and software quality assurance.',
    practice: 'Practical training at JAWA', project: 'Contributed to client projects and INFORUM, investigated issues with PHP and Xdebug, and worked with SQL and Jira Service Management.',
    institution: 'Institution', location: 'Location', recognition: 'Recognition',
    places: ['Graz, Austria', 'Online', 'Irkutsk, Russia', 'Bratsk, Russia'],
    titles: ['Academically certified software developer', 'Vue.js – Fundamentals and first project', 'JavaScript', 'Web development training', 'English B1', 'English A2 and B1', 'Bachelor’s studies in Transcultural Communication – German, Italian and Russian', 'German C1', 'Economist and manager', 'Banking', 'Primary school'],
    banking: 'BMWfi – recognition as Bankkauffrau (Austrian banking apprenticeship qualification)'
  },
  RU: {
    title: 'Образование', label: 'Мой путь в образовании',
    intro: 'От изучения языков и экономики через веб-разработку к академической квалификации разработчика программного обеспечения.',
    completed: 'Обучение успешно завершено в октябре 2026 года',
    focus: 'Основные темы', topics: 'Объектно-ориентированное программирование, алгоритмы, базы данных, архитектура ПО, REST API и обеспечение качества ПО.',
    practice: 'Практика в JAWA', project: 'Участие в клиентских проектах и разработке INFORUM, анализ ошибок с помощью PHP и Xdebug, работа с SQL и Jira Service Management.',
    institution: 'Учебное заведение', location: 'Место', recognition: 'Признание квалификации',
    places: ['Грац, Австрия', 'Онлайн', 'Иркутск, Россия', 'Братск, Россия'],
    titles: ['Разработчик программного обеспечения с академической квалификацией', 'Vue.js – основы и первый проект', 'JavaScript', 'Профессиональная подготовка по веб-разработке', 'Английский B1', 'Английский A2 и B1', 'Бакалавриат по транскультурной коммуникации – немецкий, итальянский и русский языки', 'Немецкий C1', 'Экономист-менеджер', 'Банковское дело', 'Начальная школа'],
    banking: 'BMWfi – признание квалификации Bankkauffrau (австрийская профессия в банковском деле)'
  }
}

const entries = [
  { start: '2025-02', end: '2026-10', institution: 'FH CAMPUS 02 – Fachhochschule der Wirtschaft & zam Steiermark GmbH', place: 0 },
  { start: '2025-01', end: '2025-03', institution: 'Glo Academy', place: 1 },
  { start: '2024-03', end: '2024-05', institution: 'Glo Academy', place: 1 },
  { start: '2022-11', end: '2023-03', institution: 'WIFI Steiermark', place: 0 },
  { start: '2019-10', end: '2020-01', institution: 'Internationales Sprachzentrum an der Universität Graz', place: 0 },
  { start: '2016-11', end: '2017-07', institution: 'Internationales Sprachzentrum an der Universität Graz', place: 0 },
  { start: '2010-09', end: '2015-09', institution: 'Karl-Franzens-Universität Graz', place: 0 },
  { start: '2009-09', end: '2010-07', institution: 'Vorstudienlehrgang der Grazer Universitäten und Hochschulen', place: 0 },
  { start: '2002-09', end: '2006-12', institution: 'Baikal Universität für Ökonomie und Recht', place: 2, recognition: 'ENIC NARIC Austria' },
  { start: '2000-09', end: '2002-07', institution: 'Kolleg der Baikal Universität für Ökonomie und Recht', place: 2, recognition: 'banking' },
  { start: '1990-09', end: '2000-07', place: 3 }
]

const t = computed(() => copy[props.language])
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
    <ol class="projects-grid education-list" role="list">
      <li
        v-for="(entry, index) in entries"
        :key="entry.start"
        class="tile project-card project-meta education-entry"
        :class="{ 'education-entry-featured': index === 0 }"
      >
        <div class="project-type education-dates">
          <time :datetime="entry.start">{{ formatMonth(entry.start) }}</time>
          –
          <time :datetime="entry.end">{{ formatMonth(entry.end) }}</time>
        </div>
        <h3>{{ t.titles[index] }}</h3>
        <div v-if="index === 0" class="project-stack education-completed">{{ t.completed }}</div>
        <dl class="education-details">
          <div v-if="entry.institution">
            <dt>{{ t.institution }}</dt>
            <dd>{{ entry.institution }}</dd>
          </div>
          <div>
            <dt>{{ t.location }}</dt>
            <dd>{{ t.places[entry.place] }}</dd>
          </div>
          <div v-if="entry.recognition">
            <dt>{{ t.recognition }}</dt>
            <dd>{{ entry.recognition === 'banking' ? t.banking : entry.recognition }}</dd>
          </div>
        </dl>
        <template v-if="index === 0">
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

.education-list {
  padding: 0;
  list-style: none;
}

.education-entry {
  padding: clamp(18px, 3vw, 30px);
  background: var(--mist);
  overflow-wrap: anywhere;
}

.education-entry:nth-child(3n + 2) {
  background: var(--slate);
}

.education-entry:nth-child(3n) {
  background: var(--lilac);
}

.education-entry-featured {
  grid-column: 1 / -1;
  display: grid;
  gap: 12px;
  padding: clamp(24px, 5vw, 60px);
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--mist) 55%, var(--surface));
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
  background: var(--mist);
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
