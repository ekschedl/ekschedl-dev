<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '../data/portfolioData'
import { projectGalleries, yogaSlides } from '../data/projectGalleries'

const { locale, t } = useI18n({ useScope: 'global' })
const emit = defineEmits<{
  'open-gallery': [project: keyof typeof projectGalleries, startAt?: number]
}>()

const projectAreas = ['mobile', 'desktop', 'web', 'backend'] as const
type ProjectArea = typeof projectAreas[number]
type ProjectFilterMode = 'area' | 'technology'
const projectFilterMode = ref<ProjectFilterMode>('area')
const selectedAreas = ref<ProjectArea[]>([])
const projectSort = ref<'newest' | 'oldest'>('newest')
const selectedTechnologies = ref<string[]>([])

const projectTechnologies = [...new Set(projects.flatMap(({ stack }) => stack.split(' · ')))]
  .sort((first, second) => first.localeCompare(second))

const technologyAreas = new Map(projectTechnologies.map((technology) => {
  const areas = new Set(projects
    .filter((project) => project.stack.split(' · ').includes(technology))
    .map((project) => project.area))

  return [technology, areas.size === 1 ? [...areas][0] : undefined] as const
}))


const visibleProjects = computed(() => {
  return projects
    .map(project => ({
      ...project,
      title: t(`projectTitles.${project.id}`),
      description: t(`projectDescriptions.${project.id}`)
    }))
    .filter((project) => {
      const stack = project.stack.split(' · ')
      const matchesTechnology = selectedTechnologies.value.length === 0
        || selectedTechnologies.value.some((item) => stack.includes(item))
      const matchesArea = !selectedAreas.value.length
        || selectedAreas.value.includes(project.area)

      return matchesArea && matchesTechnology
    })
    .sort((first, second) => {
      if (!first.createdAt || !second.createdAt) {
        return Number(!first.createdAt) - Number(!second.createdAt)
      }

      const order = first.createdAt.localeCompare(second.createdAt)
      return projectSort.value === 'newest' ? -order : order
    })
})


const projectDateFormatter = computed(() =>
  new Intl.DateTimeFormat(locale.value === 'de' ? 'de-AT' : locale.value, {
    month: 'long',
    year: 'numeric'
  })
)

function formatProjectDate(month: string) {
  return projectDateFormatter.value.format(new Date(month + '-01T00:00:00'))
}

const hasProjectFilters = computed(() => selectedAreas.value.length > 0 || selectedTechnologies.value.length > 0)
const projectCount = computed(() => t('projectCount', {
  visible: visibleProjects.value.length,
  total: projects.length
}))

function switchProjectFilterMode(mode: ProjectFilterMode) {
  if (mode === projectFilterMode.value) return
  resetProjectFilters()
  projectFilterMode.value = mode
}

function toggleProjectArea(area: ProjectArea | '') {
  if (!area) {
    selectedAreas.value = []
    selectedTechnologies.value = []
    return
  }

  const selected = selectedAreas.value
  selectedAreas.value = selected.includes(area)
    ? selected.filter((item) => item !== area)
    : [...selected, area]
  selectedTechnologies.value = []
}

function toggleTechnology(option: string) {
  if (!option) {
    selectedTechnologies.value = []
    return
  }

  selectedAreas.value = []
  const selected = selectedTechnologies.value
  selectedTechnologies.value = selected.includes(option)
    ? selected.filter((item) => item !== option)
    : [...selected, option]
}

function resetProjectFilters() {
  selectedAreas.value = []
  selectedTechnologies.value = []
}

function isProjectVisible(id: string) {
  return visibleProjects.value.some((project) => project.id === id)
}

defineExpose({ isProjectVisible, resetProjectFilters })
</script>

<template>
  <section id="projects" class="section projects-section">
    <div class="section-head">
      <div class="portfolio-heading-meta">
        <span class="section-number">{{ t('sectionPortfolio') }}</span>
        <span class="portfolio-status">{{ t('portfolioStatus') }}</span>
      </div>
      <h2>{{ t('projectsTitle') }}</h2>
      <p>{{ t('projectsIntro') }}</p>
    </div>

    <div class="project-controls" role="group" :aria-label="t('filterOptions')">
      <div class="project-filter-header">
        <div class="project-filter-mode" role="group" :aria-label="t('filterOptions')">
          <button type="button" :aria-pressed="projectFilterMode === 'area'" @click="switchProjectFilterMode('area')">
            {{ t('areaMode') }}
          </button>
          <button type="button" :aria-pressed="projectFilterMode === 'technology'" @click="switchProjectFilterMode('technology')">
            {{ t('technologyMode') }}
          </button>
        </div>
        <div class="project-filter-summary">
          <span role="status">{{ hasProjectFilters ? projectCount : '' }}</span>
          <button v-if="hasProjectFilters" class="reset-filters" type="button" @click="resetProjectFilters">
            {{ t('reset') }}
          </button>
        </div>
        <div class="project-sort" role="group" :aria-label="t('sortLabel')">
          <button
            type="button"
            :aria-label="t('newest')"
            :aria-pressed="projectSort === 'newest'"
            :title="t('newest')"
            @click="projectSort = 'newest'"
          >↓</button>
          <button
            type="button"
            :aria-label="t('oldest')"
            :aria-pressed="projectSort === 'oldest'"
            :title="t('oldest')"
            @click="projectSort = 'oldest'"
          >↑</button>
        </div>
      </div>
      <fieldset v-if="projectFilterMode === 'area'" class="project-technology-filters">
        <legend>{{ t('areaFilter') }}</legend>
        <div class="project-filter-buttons">
          <button
            v-for="area in (['', ...projectAreas] as const)"
            :key="area"
            type="button"
            :data-area="area"
            :aria-pressed="area ? selectedAreas.includes(area) : !selectedAreas.length"
            @click="toggleProjectArea(area)"
          >
            {{ area ? t(`areas.${area}`) : t('allAreas') }}
          </button>
        </div>
      </fieldset>

      <fieldset v-else class="project-technology-filters">
        <legend>{{ t('filter') }}</legend>
        <div class="project-filter-buttons">
          <button
            v-for="option in ['', ...projectTechnologies]"
            :key="option"
            type="button"
            :data-area="technologyAreas.get(option)"
            :aria-pressed="option ? selectedTechnologies.includes(option) : !selectedTechnologies.length"
            @click="toggleTechnology(option)"
          >
            {{ option || t('allTechnologies') }}
          </button>
        </div>
      </fieldset>
    </div>

    <div role="status">
      <p v-if="!visibleProjects.length" class="project-empty">{{ t('noResults') }}</p>
    </div>
    <div v-if="visibleProjects.length" class="projects-grid">
      <article
        v-for="project in visibleProjects"
        :id="project.id"
        :key="project.id"
        class="project-card"
      >
        <button class="project-visual project-cover" :data-area="project.area"
          type="button" aria-haspopup="dialog" :aria-label="project.title + ' · ' + t(project.id === 'portfolio' ? 'portfolioDetails.open' : 'galleryControls.open')"
          @click="emit('open-gallery', project.id)">
          <span class="project-cover-frame">
            <img :src="project.image" alt="" loading="lazy" />
          </span>
          <span class="project-cover-expand" aria-hidden="true">↗</span>
        </button>

        <div class="project-meta">
          <div class="project-details">
            <span class="project-type project-area" :data-area="project.area">{{ t(`areas.${project.area}`) }}</span>
            <div class="project-title-row">
              <h3>{{ project.title }}</h3>
              <a v-if="'url' in project" class="project-repository-link" :href="project.url" :aria-label="t('projectLink')" target="_blank" rel="noopener noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p v-if="project.createdAt" class="project-created">{{ t('created') }} · {{ formatProjectDate(project.createdAt) }}</p>
            <p>{{ project.description }}</p>
          </div>
          <span class="project-stack">{{ project.stack }}</span>
          <div v-if="'demoUrl' in project" class="project-card-actions">
            <button type="button" aria-haspopup="dialog"
              @click="emit('open-gallery', project.id, projectGalleries[project.id].slides.length - 1)">
              {{ t('inlineDemo') }}
            </button>
            <a :href="project.demoUrl" target="_blank" rel="noopener noreferrer">
              {{ t('liveDemo') }} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div v-else class="project-card-actions">
            <button type="button" aria-haspopup="dialog"
              @click="emit('open-gallery', project.id, project.id === 'yoganow' ? yogaSlides.length - 1 : 0)">
              {{ project.id === 'portfolio' ? t('portfolioDetails.open') : project.id === 'yoganow' ? t('yogaDemo.action') : t('galleryControls.open') }}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.portfolio-heading-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 14px;
}

.portfolio-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  padding: 4px 9px;
  border: 1px solid color-mix(in srgb, var(--accent) 27%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 10%, var(--surface));
  color: var(--accent);
  font-size: .75rem;
  font-weight: 650;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.portfolio-status::before {
  content: '';
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: currentColor;
}

.project-filter-header,
.project-filter-summary,
.project-filter-mode {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.project-filter-header {
  flex: 1 1 100%;
  justify-content: flex-start;
  gap: 12px;
}

.project-filter-mode {
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.project-filter-mode button {
  padding: 7px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--ink);
}

.project-filter-mode button[aria-pressed='true'] {
  background: var(--ink);
  color: var(--on-ink);
}

.project-sort {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.project-sort button {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font-size: 20px;
}

.project-sort button[aria-pressed='true'] {
  border-color: var(--accent);
  background: var(--mist);
}

.project-filter-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 13px;
}

.project-technology-filters {
  flex: 1 1 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.project-technology-filters legend {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.project-filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-filter-buttons button {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--area-color, var(--surface));
  color: var(--ink);
}

.project-filter-buttons button:hover {
  border-color: var(--ink);
}

.project-filter-buttons button[aria-pressed='true'] {
  background: var(--area-color, var(--surface));
  box-shadow: inset 0 0 0 2px var(--ink);
}

[data-area='mobile'] {
  --area-color: var(--mist);
}

[data-area='web'] {
  --area-color: var(--slate);
}

[data-area='backend'] {
  --area-color: var(--project-backend-color);
}

[data-area='desktop'] {
  --area-color: var(--lilac);
}

.project-visual[data-area],
.project-area[data-area] {
  background: var(--area-color);
}

.project-area {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--ink);
}

.projects-grid .project-card {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid;
  row-gap: 0;
}

.project-card .project-meta {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
  row-gap: 0;
  min-width: 0;
}

.project-card .project-stack {
  align-self: start;
}

.project-card-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.project-card-actions :is(button, a) {
  max-width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--accent);
  font: inherit;
  font-weight: 600;
  text-align: start;
  overflow-wrap: anywhere;
}

.project-cover[data-area] {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  place-items: center;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  padding: clamp(10px, 2.5vw, 28px);
  border: 0;
  color: var(--ink);
}

/* Alle Karten zeigen denselben Bildausschnitt-Rahmen. Vollbilder bleiben in der Galerie. */
.project-cover-frame {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.project-cover .project-cover-frame > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Das Pixel-Icon bleibt klein und mittig im gemeinsamen Kartenrahmen. */
#portfolio .project-cover-frame {
  display: grid;
  place-items: center;
}

#portfolio .project-cover-frame > img {
  width: min(35%, 96px);
  height: auto;
  object-fit: contain;
}

.project-cover-expand {
  position: absolute;
  inset-block-start: 6px;
  inset-inline-end: 6px;
  padding: 3px 7px;
  border-radius: 6px;
  background: var(--surface);
}

.project-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.project-title-row h3 {
  min-width: 0;
  overflow-wrap: anywhere;
}

.project-repository-link {
  display: flex;
  flex-shrink: 0;
  white-space: nowrap;
  align-items: center;
  gap: 7px;
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
  text-underline-offset: 4px;
}

.project-repository-link:hover {
  text-decoration: underline;
}
</style>
