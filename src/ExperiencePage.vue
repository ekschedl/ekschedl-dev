<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { pixelFacts } from './pixelKnowledge'

const { locale, t, tm, rt } = useI18n({ useScope: 'global' })

const categories = ['all', 'it', 'finance', 'hospitality', 'interpreting', 'break'] as const
type Category = typeof categories[number]
const selectedCategory = ref<Category>('all')
const sortOrder = ref<'newest' | 'oldest'>('newest')

const entries = [
  {
    category: "finance" as const,
    start: "2002-09",
    end: "2004-05",
    institution: "Stock Manadzer AG",
    place: 3,
    field: 0,
    hasTasks: true,
  },
  {
    category: "finance" as const,
    start: "2004-05",
    end: "2007-02",
    institution: "Edinstvo AG Investmentfirma",
    place: 3,
    field: 0,
    hasTasks: true,
  },
  {
    category: "finance" as const,
    start: "2007-03",
    end: "2008-09",
    institution: "Alfa Broker Kapital GmbH",
    place: 2,
    field: 0,
    hasTasks: true,
  },
  {
    category: "break" as const,
    start: "2008-10",
    end: "2009-01",
    place: 1,
  },
  {
    category: "finance" as const,
    start: "2009-02",
    end: "2009-06",
    institution: "Delta Kapital AG",
    place: 1,
    field: 0,
    hasTasks: true,
  },
  {
    category: "break" as const,
    start: "2012-07",
    end: "2014-01",
  },
  {
    category: "interpreting" as const,
    start: "2014-04",
    end: "2015-10",
    institution: "Ambulatorium Caritas Marienambulanz",
    place: 0,
    field: 1,
  },
  {
    category: "break" as const,
    start: "2015-12",
    end: "2020-01",
  },
  {
    category: "hospitality" as const,
    start: "2020-08",
    end: "2024-07",
    institution: "Boutiquehotel Dom – Rooms & Suites",
    place: 0,
    field: 2,
  },
  {
    category: "it" as const,
    start: "2025-09",
    end: "2026-10",
    institution: "JAWA Management Software GmbH",
    hasInstitutionNote: true,
    place: 0,
    field: 3,
    hasTasks: true,
  },
]

const numberedEntries = entries.map((entry, index) => ({ ...entry, number: index + 1 }))
const visibleEntries = computed(() => numberedEntries
  .filter((entry) => selectedCategory.value === 'all' || entry.category === selectedCategory.value)
  .sort((first, second) => {
    const order = first.start.localeCompare(second.start)
    return sortOrder.value === 'newest' ? -order : order
  })
  .map((entry, index) => ({ ...entry, number: index + 1 }))
)

const formatter = computed(() => new Intl.DateTimeFormat(
  locale.value === 'de' ? 'de-AT' : locale.value === 'en' ? 'en-GB' : 'ru-RU',
  { month: 'long', year: 'numeric', timeZone: 'UTC' }
))

function formatMonth(value: string) {
  return formatter.value.format(new Date(value + '-01T00:00:00Z'))
}
</script>

<template>
  <main class="section" aria-labelledby="experience-title">
    <header class="tile experience-heading">
      <span class="eyebrow">{{ t('experiencePage.label') }}</span>
      <h1 id="experience-title">{{ t('experiencePage.title') }}</h1>
      <p>{{ t('experiencePage.intro') }}</p>
    </header>

    <div class="experience-controls">
      <div class="experience-filters" role="group" :aria-label="t('experiencePage.filter')">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          :data-category="category"
          :aria-pressed="selectedCategory === category"
          @click="selectedCategory = category"
        >
          {{ t(`experiencePage.categories.${category}`) }}
        </button>
      </div>
      <div class="experience-sort" role="group" :aria-label="t('experiencePage.sortLabel')">
        <button type="button" :aria-label="t('experiencePage.newest')" :aria-pressed="sortOrder === 'newest'" :title="t('experiencePage.newest')" @click="sortOrder = 'newest'">↓</button>
        <button type="button" :aria-label="t('experiencePage.oldest')" :aria-pressed="sortOrder === 'oldest'" :title="t('experiencePage.oldest')" @click="sortOrder = 'oldest'">↑</button>
      </div>
    </div>
    <ol class="experience-list" role="list">
      <li
        v-for="entry in visibleEntries"
        :key="entry.start"
        :data-category="entry.category"
        class="tile project-card project-meta experience-entry"
        :class="{ 'experience-featured': entry.category === 'it' }"
      >
        <div class="project-type experience-date">
          <span class="experience-index" aria-hidden="true">{{ String(entry.number).padStart(2, '0') }}</span>
          <time :datetime="entry.start">{{ formatMonth(entry.start) }}</time>
          –
          <time :datetime="entry.end">{{ formatMonth(entry.end) }}</time>
        </div>
        <span class="experience-category project-type">{{ t(`experiencePage.categories.${entry.category}`) }}</span>
        <h2>
          <a v-if="entry.institution === 'JAWA Management Software GmbH'" href="https://jawa.at/en/" target="_blank" rel="noreferrer">{{ entry.institution }}</a>
          <template v-else>{{ entry.institution || t(`experiencePage.entries.${entry.start}.role`) }}</template>
          <span v-if="'hasInstitutionNote' in entry && t(`experiencePage.entries.${entry.start}.institutionNote`)" class="experience-company-translation"> — {{ t(`experiencePage.entries.${entry.start}.institutionNote`) }}</span>
        </h2>
        <dl v-if="entry.institution || entry.place !== undefined" class="experience-details">
          <div v-if="entry.place !== undefined">
            <dt>{{ t('experiencePage.place') }}</dt>
            <dd>{{ t(`experiencePage.places.${entry.place}`) }}</dd>
          </div>
          <div v-if="entry.field !== undefined">
            <dt>{{ t('experiencePage.field') }}</dt>
            <dd>{{ t(`experiencePage.fields.${entry.field}`) }}</dd>
          </div>
          <div v-if="entry.institution">
            <dt>{{ t('experiencePage.position') }}</dt>
            <dd>{{ t(`experiencePage.entries.${entry.start}.role`) }}</dd>
          </div>
        </dl>
        <ul v-if="entry.hasTasks" class="experience-tasks">
          <li v-for="(task, index) in tm(`experiencePage.entries.${entry.start}.tasks`)" :key="index">{{ rt(task) }}</li>
        </ul>
        <ul v-if="entry.institution === 'JAWA Management Software GmbH'" class="experience-stack" :aria-label="t('experiencePage.techStack')">
          <li v-for="tool in [...pixelFacts.jawa.technologies, 'INFORUM']" :key="tool">
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
  background: var(--slate);
}

.experience-heading .eyebrow {
  color: var(--ink);
  font-size: clamp(15px, 1.2vw, 18px);
  font-weight: 600;
}

.experience-heading h1 {
  margin: 10px 0 16px;
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
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
}

[data-category='it'] {
  --category-color: var(--mist);
}

[data-category='finance'] {
  --category-color: var(--slate);
}

[data-category='hospitality'] {
  --category-color: var(--lilac);
}

[data-category='interpreting'] {
  --category-color: var(--blue);
}

[data-category='break'] {
  --category-color: var(--surface);
}

.experience-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin-top: 0;
}

.experience-controls {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 12px;
  margin-top: 24px;
}

.experience-filters button {
  padding: 8px 12px;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--category-color, var(--surface));
  color: var(--ink);
}

.experience-filters button[aria-pressed='true'] {
  box-shadow: inset 0 0 0 2px var(--ink);
}

.experience-category {
  display: block;
  margin-top: 8px;
  color: var(--ink);
}

.experience-sort {
  display: flex;
  gap: 4px;
  flex: 0 0 auto;
}

.experience-sort button {
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

.experience-sort button[aria-pressed='true'] {
  border-color: var(--accent);
  background: var(--mist);
}

.experience-list {
  display: grid;
  gap: 20px;
  margin: 20px 0 0;
  padding: 0 0 0 clamp(20px, 4vw, 44px);
  border-inline-start: 2px dashed var(--accent);
  list-style: none;
}

.experience-entry {
  overflow: visible;
  padding: clamp(18px, 3vw, 30px);
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--category-color) 45%, var(--surface));
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

.experience-entry h2 a {
  color: inherit;
  text-decoration-color: color-mix(in srgb, currentColor 35%, transparent);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.12em;
}

.experience-entry h2 a:hover {
  text-decoration-color: currentColor;
}

.experience-company-translation {
  font-size: 0.78em;
  font-weight: 400;
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
  background: var(--category-color);
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

@media (max-width: 380px) {
  .experience-heading {
    padding: 18px 14px;
  }

  .experience-heading h1 {
    font-size: clamp(24px, 8vw, 32px);
  }

  .experience-heading p {
    font-size: 14px;
    overflow-wrap: anywhere;
  }

  .experience-list {
    padding-inline-start: 18px;
  }

  .experience-entry {
    padding: 18px 14px;
  }

  .experience-entry h2 {
    font-size: 20px;
    overflow-wrap: anywhere;
  }

  .experience-filters button,
  .experience-entry,
  .experience-details dd,
  .experience-tasks li {
    overflow-wrap: anywhere;
  }

  .experience-filters button {
    max-width: 100%;
  }
}
</style>
