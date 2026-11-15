<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n({ useScope: 'global' })

const categories = ['all', 'degree', 'it', 'language', 'hospitality'] as const
type Category = typeof categories[number]
const selectedCategory = ref<Category>('all')
const sortOrder = ref<'newest' | 'oldest'>('newest')

const entries = [
  { id: 'softwareEngineering', category: 'degree', start: '2025-02', end: '2026-10', institutionNote: 'campus', place: 0 },
  { id: 'vue', category: 'it', start: '2025-01', end: '2025-03', institutionNote: 'glo', place: 1 },
  { id: 'javascript', category: 'it', start: '2024-03', end: '2024-05', institutionNote: 'glo', place: 1 },
  { id: 'webDevelopment', category: 'it', start: '2022-11', end: '2023-03', institutionNote: 'wifi', place: 0, hasPeriod: true },
  { id: 'reception', category: 'hospitality', start: '2019-10', end: '2019-12', institutionNote: 'wifi', place: 0, hasPeriod: true },
  { id: 'englishB1', category: 'language', start: '2019-10', end: '2020-01', place: 0 },
  { id: 'englishA2B1', category: 'language', start: '2016-11', end: '2017-07', place: 0 },
  { id: 'transculturalCommunication', category: 'degree', additionalCategories: ['language'], start: '2010-09', end: '2015-09', institutionNote: 'graz', place: 0 },
  { id: 'germanC1', category: 'language', start: '2009-09', end: '2010-07', place: 0 },
  { id: 'economics', category: 'degree', start: '2002-09', end: '2006-12', place: 2, hasRecognition: true, hasRecognitionNote: true },
  { id: 'banking', category: 'degree', start: '2000-09', end: '2002-07', place: 2, hasRecognition: true },
  { id: 'school', category: 'degree', start: '1990-09', end: '2000-07', place: 3 }
] as const

const indexedEntries = entries.map((entry, index) => ({ ...entry, index }))
const visibleEntries = computed(() => indexedEntries
  .filter((entry) => selectedCategory.value === 'all' || entry.category === selectedCategory.value || ('additionalCategories' in entry && entry.additionalCategories.some(category => category === selectedCategory.value)))
  .sort((first, second) => {
    const order = first.start.localeCompare(second.start)
    return sortOrder.value === 'newest' ? -order : order
  })
)

function resetEducationControls() {
  selectedCategory.value = 'all'
  sortOrder.value = 'newest'
}

const formatter = computed(() => new Intl.DateTimeFormat(
  locale.value === 'de' ? 'de-AT' : locale.value === 'en' ? 'en-GB' : 'ru-RU',
  { month: 'long', year: 'numeric', timeZone: 'UTC' }
))

function formatMonth(value: string) {
  return formatter.value.format(new Date(value + '-01T00:00:00Z'))
}
</script>

<template>
  <main class="section" aria-labelledby="education-title">
    <header class="tile education-heading">
      <span class="eyebrow">{{ t('educationPage.label') }}</span>
      <h1 id="education-title">{{ t('educationPage.title') }}</h1>
      <p>{{ t('educationPage.intro') }}</p>
    </header>
    <div class="education-filters" role="group" :aria-label="t('educationPage.filter')">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        :data-category="category"
        :aria-pressed="selectedCategory === category"
        @click="selectedCategory = category"
      >
        {{ t(`educationPage.categories.${category}`) }}
      </button>
    </div>

    <div class="education-toolbar">
      <div class="education-sort" role="group" :aria-label="t('educationPage.sortLabel')">
        <button
          type="button"
          :aria-label="t('educationPage.newest')"
          :aria-pressed="sortOrder === 'newest'"
          :title="t('educationPage.newest')"
          @click="sortOrder = 'newest'"
        >↓</button>
        <button
          type="button"
          :aria-label="t('educationPage.oldest')"
          :aria-pressed="sortOrder === 'oldest'"
          :title="t('educationPage.oldest')"
          @click="sortOrder = 'oldest'"
        >↑</button>
      </div>
      <button
        v-if="selectedCategory !== 'all' || sortOrder !== 'newest'"
        class="education-reset"
        type="button"
        @click="resetEducationControls"
      >
        {{ t('educationPage.reset') }}
      </button>
    </div>
    <ol class="projects-grid education-list" role="list">
      <li
        v-for="entry in visibleEntries"
        :key="entry.start + '-' + entry.index"
        :data-category="entry.category"
        class="tile project-card project-meta education-entry"
        :class="{ 'education-entry-featured': entry.index === 0 }"
      >
        <div class="project-type education-dates">
          <span class="education-category-list">
            <span
              v-for="category in [entry.category, ...('additionalCategories' in entry ? entry.additionalCategories : [])]"
              :key="category"
              class="education-category"
              :data-category="category"
            >{{ t(`educationPage.categories.${category}`) }}</span>
          </span>
          <span v-if="'hasPeriod' in entry">{{ t(`educationPage.entries.${entry.id}.period`) }}</span>
          <template v-else>
            <time :datetime="entry.start">{{ formatMonth(entry.start) }}</time>
            –
            <time :datetime="entry.end">{{ formatMonth(entry.end) }}</time>
          </template>
        </div>
        <h3>{{ t(`educationPage.entries.${entry.id}.title`) }}</h3>
        <div v-if="entry.index === 0" class="project-stack education-completed">
          <span class="education-completed-check" aria-hidden="true">✓</span>
          {{ t('educationPage.completed') }}
        </div>
        <dl class="education-details">
          <div>
            <dt>{{ t('educationPage.institution') }}</dt>
            <dd>{{ t(`educationPage.entries.${entry.id}.institution`) }}<template v-if="'institutionNote' in entry && t(`educationPage.institutionNotes.${entry.institutionNote}`)"> — {{ t(`educationPage.institutionNotes.${entry.institutionNote}`) }}</template></dd>
          </div>
          <div>
            <dt>{{ t('educationPage.location') }}</dt>
            <dd>{{ t(`educationPage.places.${entry.place}`) }}</dd>
          </div>
          <div v-if="'hasRecognition' in entry">
            <dt>{{ t('educationPage.recognition') }}</dt>
            <dd>{{ t(`educationPage.entries.${entry.id}.recognition`) }}<template v-if="'hasRecognitionNote' in entry && t(`educationPage.entries.${entry.id}.recognitionNote`)"> — {{ t(`educationPage.entries.${entry.id}.recognitionNote`) }}</template></dd>
          </div>
        </dl>
        <template v-if="entry.index === 0">
          <div class="education-notes">
            <div>
              <h4>{{ t('educationPage.focus') }}</h4>
              <p>{{ t('educationPage.topics') }}</p>
            </div>
            <div>
              <h4>{{ t('educationPage.practice') }}</h4>
              <p>{{ t('educationPage.project') }}</p>
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
  font-size: clamp(15px, 1.2vw, 18px);
  font-weight: 600;
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
  border: 1px solid var(--line);
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

[data-category='hospitality'] {
  --category-color: var(--surface);
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
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 6px;
  background: var(--surface);
  color: var(--ink);
  line-height: 1.5;
}

.education-completed-check {
  flex: 0 0 auto;
  color: #278447;
  font-size: 1.1em;
  font-weight: 800;
  line-height: 1;
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
