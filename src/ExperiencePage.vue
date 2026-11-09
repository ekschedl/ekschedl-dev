<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ language: 'DE' | 'EN' | 'RU' }>()

const entries = [
  {
    start: "2002-09",
    end: "2004-05",
    roles: ["Mitarbeiterin in der Registrierungsabteilung", "Registration department staff member", "Сотрудница отдела регистрации"],
    institution: "Stock Manadzer AG",
    place: 3,
    field: 0,
    tasks: [
      ["Kundenbetreuung", "Dokumentation"],
      ["Client support", "Documentation"],
      ["Обслуживание клиентов", "Ведение документации"],
    ],
  },
  {
    start: "2004-05",
    end: "2007-02",
    roles: ["Mitarbeiterin im Backoffice", "Back office staff member", "Сотрудница бэк-офиса"],
    institution: "Edinstvo AG Investmentfirma",
    place: 3,
    field: 0,
    tasks: [
      ["Kundenbetreuung", "Abwicklung von Wertpapiergeschäften", "Mitwirkung an Finanzreports"],
      ["Client support", "Securities trade settlement", "Contributed to financial reports"],
      ["Обслуживание клиентов", "Расчёты по сделкам с ценными бумагами", "Участие в подготовке финансовой отчётности"],
    ],
  },
  {
    start: "2007-03",
    end: "2008-09",
    roles: ["Leiterin des Backoffice", "Head of Back Office", "Руководительница бэк-офиса"],
    institution: "Alfa Broker Kapital GmbH",
    place: 2,
    field: 0,
    tasks: [
      ["Kundenbetreuung", "Abwicklung von Wertpapiergeschäften", "Verbuchung von Wertpapieren"],
      ["Client support", "Securities trade settlement", "Recording securities transactions"],
      ["Обслуживание клиентов", "Расчёты по сделкам с ценными бумагами", "Учёт ценных бумаг"],
    ],
  },
  {
    start: "2008-10",
    end: "2009-01",
    roles: ["Berufliche Neuorientierung", "Career transition", "Профессиональная переориентация"],
    place: 1,
  },
  {
    start: "2009-02",
    end: "2009-06",
    roles: ["Internes Controlling von Wertpapiergeschäften", "Internal controlling of securities transactions", "Внутренний контроль операций с ценными бумагами"],
    institution: "Delta Kapital AG",
    place: 1,
    field: 0,
    tasks: [
      ["Allgemeine Abwicklungstätigkeiten", "Übertragung von Wertpapieren", "Überwachung des Finanzmittelbestands", "Kundenbetreuung"],
      ["General settlement operations", "Securities transfers", "Monitoring cash balances", "Client support"],
      ["Общие расчётные операции", "Перевод ценных бумаг", "Контроль остатков денежных средств", "Обслуживание клиентов"],
    ],
  },
  {
    start: "2012-07",
    end: "2014-01",
    roles: ["Karenzzeit", "Parental leave", "Отпуск по уходу за ребёнком"],
  },
  {
    start: "2014-04",
    end: "2015-10",
    roles: ["Ehrenamtliche Dolmetscherin für Russisch", "Volunteer Russian interpreter", "Волонтёр — устный переводчик русского языка"],
    institution: "Ambulatorium Caritas Marienambulanz",
    place: 0,
    field: 1,
  },
  {
    start: "2015-12",
    end: "2020-01",
    roles: ["Karenzzeit", "Parental leave", "Отпуск по уходу за ребёнком"],
  },
  {
    start: "2020-08",
    end: "2024-07",
    roles: ["Rezeptionistin", "Receptionist", "Администратор гостиницы"],
    institution: "Boutiquehotel Dom – Rooms & Suites",
    place: 0,
    field: 2,
  },
  {
    start: "2025-09",
    end: "2026-10",
    roles: ["Softwareentwicklung", "Software development", "Разработка программного обеспечения"],
    institution: "JAWA",
    place: 0,
    field: 3,
    tasks: [
      ["Mitarbeit an Kundenprojekten und an der modularen Plattform INFORUM", "Fehleranalyse und PHP-Debugging mit Xdebug", "Arbeit mit SQL und Jira Service Management"],
      ["Contributed to client projects and the modular INFORUM platform", "Investigated issues and debugged PHP with Xdebug", "Worked with SQL and Jira Service Management"],
      ["Участие в клиентских проектах и разработке модульной платформы INFORUM", "Анализ ошибок и отладка PHP с помощью Xdebug", "Работа с SQL и Jira Service Management"],
    ],
  },
]

const copy = {
  DE: {
    title: 'Berufserfahrung',
    intro: 'Meine Stationen in der Softwareentwicklung, Hotellerie, Sprachmittlung und im Wertpapierbereich.',
    place: "Ort",
    field: "Bereich",
    position: "Position",
    places: ["Graz, Österreich", "Moskau, Russland", "Novosibirsk, Russland", "Irkutsk, Russland"],
    fields: ["Wertpapier", "Allgemeinmedizinische Erst- und Grundversorgung", "Hotellerie und Tourismus", "Berufspraxis im Rahmen der dualen Ausbildung"]
  },
  EN: {
    title: 'Work experience',
    intro: 'My experience in software development, hospitality, interpreting and securities.',
    place: "Location",
    field: "Sector",
    position: "Position",
    places: ["Graz, Austria", "Moscow, Russia", "Novosibirsk, Russia", "Irkutsk, Russia"],
    fields: ["Securities", "General medical first-contact and primary care", "Hospitality and tourism", "Practical placement as part of dual training"]
  },
  RU: {
    title: 'Опыт работы',
    intro: 'Мой опыт в разработке ПО, гостиничном деле, устном переводе и сфере ценных бумаг.',
    place: "Место",
    field: "Сфера",
    position: "Должность",
    places: ["Грац, Австрия", "Москва, Россия", "Новосибирск, Россия", "Иркутск, Россия"],
    fields: ["Ценные бумаги", "Первичная общемедицинская помощь", "Гостиничное дело и туризм", "Практика в рамках дуального обучения"]
  }
}

const languageIndex = computed(() => ({ DE: 0, EN: 1, RU: 2 })[props.language])

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
  <main class="section" aria-labelledby="experience-title">
    <header class="tile experience-heading">
      <span class="experience-code" aria-hidden="true">&lt;/&gt;</span>
      <h1 id="experience-title">{{ t.title }}</h1>
      <p>{{ t.intro }}</p>
    </header>

    <ol class="experience-list" role="list">
      <li
        v-for="(entry, position) in entries"
        :key="entry.start"
        class="tile project-card project-meta experience-entry"
        :class="{ 'experience-featured': position === entries.length - 1 }"
      >
        <div class="project-type experience-date">
          <span class="experience-index" aria-hidden="true">{{ String(position + 1).padStart(2, '0') }}</span>
          <time :datetime="entry.start">{{ formatMonth(entry.start) }}</time>
          –
          <time :datetime="entry.end">{{ formatMonth(entry.end) }}</time>
        </div>
        <h2>{{ entry.institution || entry.roles[languageIndex] }}</h2>
        <dl v-if="entry.institution || entry.place !== undefined" class="experience-details">
          <div v-if="entry.place !== undefined">
            <dt>{{ t.place }}</dt>
            <dd>{{ t.places[entry.place] }}</dd>
          </div>
          <div v-if="entry.field !== undefined">
            <dt>{{ t.field }}</dt>
            <dd>{{ t.fields[entry.field] }}</dd>
          </div>
          <div v-if="entry.institution">
            <dt>{{ t.position }}</dt>
            <dd>{{ entry.roles[languageIndex] }}</dd>
          </div>
        </dl>
        <ul v-if="entry.tasks" class="experience-tasks">
          <li v-for="task in entry.tasks[languageIndex]" :key="task">{{ task }}</li>
        </ul>
        <ul v-if="entry.institution === 'JAWA'" class="experience-stack" aria-label="Tech stack">
          <li v-for="tool in ['PHP', 'Xdebug', 'SQL', 'Jira Service Management', 'INFORUM']" :key="tool">
            {{ tool }}
          </li>
        </ul>
      </li>
    </ol>
  </main>
</template>

<style scoped>
.experience-heading {
  padding: clamp(24px, 6vw, 76px);
  isolation: isolate;
  background-color: var(--slate);
  background-image:
    linear-gradient(var(--art-ink) 1px, transparent 1px),
    linear-gradient(90deg, var(--art-ink) 1px, transparent 1px);
  background-size: 28px 28px;
}

.experience-code {
  position: absolute;
  inset-inline-end: 5%;
  bottom: 0;
  z-index: -1;
  color: var(--art-ink);
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(5rem, 17vw, 14rem);
  line-height: 1;
}

.experience-heading h1 {
  margin: 0 0 16px;
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-size: clamp(2rem, 7vw, 5.5rem);
  font-weight: 500;
  letter-spacing: -.045em;
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.experience-heading p {
  max-width: 48ch;
  margin: 0;
  line-height: 1.6;
}

.experience-list {
  display: grid;
  gap: 20px;
  margin: 28px 0 0;
  padding: 0 0 0 clamp(20px, 4vw, 44px);
  border-inline-start: 2px dashed var(--accent);
  list-style: none;
}

.experience-entry {
  overflow: visible;
  padding: clamp(18px, 3vw, 30px);
  border: 1px solid var(--line);
  background: var(--surface);
  overflow-wrap: anywhere;
}

.experience-entry::before {
  position: absolute;
  inset-inline-start: calc(-1 * clamp(20px, 4vw, 44px) - 7px);
  top: 26px;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: var(--accent);
  content: '';
}

.experience-featured {
  background: color-mix(in srgb, var(--mist) 55%, var(--surface));
}

.experience-entry h2 {
  margin: 10px 0;
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-size: 25px;
  font-weight: 500;
}

.experience-date {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px 8px;
  color: var(--ink);
}

.experience-index {
  padding: 3px 7px;
  border-radius: 4px;
  background: var(--mist);
}

.experience-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.experience-stack li {
  padding: 5px 9px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--surface);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
}

.experience-details {
  display: grid;
  gap: 6px;
  margin: 12px 0 0;
}

.experience-details div {
  display: flex;
  flex-wrap: wrap;
  gap: 0 10px;
}

.experience-details dt {
  font-weight: 600;
}

.experience-details dd {
  margin: 0;
}

.experience-tasks {
  margin: 14px 0 0;
  padding-inline-start: 20px;
  line-height: 1.7;
}
</style>
