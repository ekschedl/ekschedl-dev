<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import EducationPage from './EducationPage.vue'
import ExperiencePage from './ExperiencePage.vue'
import { useI18n } from 'vue-i18n'
import Assistant from './Assistant.vue'
import LegalPage from './LegalPage.vue'
import { cvPath, hotelConsoleImage, projects, shopDemoUrl, skillGroups, todoDemoUrl, unoWebCover, unoWebDemoUrl } from './portfolioData'

const { locale, t, tm, rt } = useI18n({ useScope: 'global' })

type Language = 'DE' | 'EN' | 'RU'

const languages: Language[] = ['DE', 'EN', 'RU']
const language = computed(() => locale.value.toUpperCase())

const educationPath = '/Ausbildung'
const imprintPath = '/Impressum'
const privacyPath = '/Datenschutz'
const legalPage = /^\/impressum\/?$/i.test(window.location.pathname) ? 'imprint'
  : /^\/datenschutz\/?$/i.test(window.location.pathname) ? 'privacy' : null
const experiencePath = '/Berufserfahrung'
const isExperience = /^\/berufserfahrung\/?$/i.test(window.location.pathname)
const isEducation = /^\/ausbildung\/?$/i.test(window.location.pathname)
const portfolioName = computed(() => t('portfolioName'))

function homeLink(hash: string) {
  return isEducation || isExperience || legalPage ? '/' + hash : hash
}

function updatePageLanguage() {
  document.documentElement.lang = locale.value
  const pageTitle = legalPage ? `legal.${legalPage}` : isEducation ? 'educationPage.title' : isExperience ? 'experiencePage.title' : null
  document.title = pageTitle ? t(pageTitle) + ' | ' + portfolioName.value : t('homePageTitle', { separator: '|' })
}
const menuOpen = ref(false)

const projectAreas = ['mobile', 'desktop', 'web', 'backend'] as const
type ProjectArea = typeof projectAreas[number]
type ProjectFilterMode = 'area' | 'technology'
const projectFilterMode = ref<ProjectFilterMode>('area')
const selectedAreas = ref<ProjectArea[]>([])
const projectSort = ref<'newest' | 'oldest'>('newest')
const selectedTechnologies = ref<string[]>([])
const darkMode = ref(false)

onMounted(() => {
  try {
    darkMode.value = localStorage.getItem('portfolio-theme') === 'dark'
    const savedLanguage = languages.find((item) => item === localStorage.getItem('portfolio-language'))
    if (savedLanguage) locale.value = savedLanguage.toLowerCase()
  } catch {
    // Language and theme switching also work when storage is unavailable.
  }
})

watch(locale, updatePageLanguage, { immediate: true })

watch(darkMode, (enabled) => {
  const theme = enabled ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
})

function toggleTheme() {
  darkMode.value = !darkMode.value
  try {
    localStorage.setItem('portfolio-theme', darkMode.value ? 'dark' : 'light')
  } catch {
    // Keep the selected theme for this visit.
  }
}


const aboutSections = computed(() => tm('aboutSections'))

const hotelSlides = [

  {
    image: hotelConsoleImage,
    captionKey: 'hotelOverview'
  },
  {
    image: '/images/hotelverwaltung-zimmerpreise.png',
    captionKey: 'hotelPrices'
  },
  {
    image: '/images/hotelverwaltung-buchungsdemo.png',
    captionKey: 'hotelBooking'
  },
  { image: '/images/hotelverwaltung-modell.svg', captionKey: 'hotelModel' },
  { image: '/images/hotelverwaltung-buchung.svg', captionKey: 'hotelProcess' },
  { image: '/images/hotelverwaltung-architektur.svg', captionKey: 'hotelArchitecture' },
  { image: '/images/hotelverwaltung-uml.png', captionKey: 'hotelUml' }
] as const
const yogaSlides = [
  { image: '/images/yoganow-overview.png', captionKey: 'yogaHome' },
  { image: '/images/yoganow-slide-09.png', captionKey: 'yogaLibrary' },
  { image: '/images/yoganow-slide-10.png', captionKey: 'yogaBooking' },
  { video: '/videos/yoganow-demo.mp4', poster: '/images/yoganow-video-poster.jpg', captionKey: 'yogaVideo' }
] as const


const fetaSlides = [
  { image: '/images/feta-ueber-uns.png', captionKey: 'fetaHome' },
  { image: '/images/feta-katalog.png', captionKey: 'fetaCatalog' },
  { image: '/images/feta-zutaten.png', captionKey: 'fetaIngredients' },
  { image: '/images/feta-mobil.png', captionKey: 'fetaMobile' },
  { image: '/images/feta-kontakt.png', captionKey: 'fetaContact' }
] as const

const projectGalleries = {
  geschenkeverwaltung: {
    slides: [
      { image: '/images/geschenkeverwaltung-vorschau.png', captionKey: 'giftsOverview' },
      { image: '/images/geschenkeverwaltung-startfenster.png', captionKey: 'giftsMenu' },
      { image: '/images/geschenkeverwaltung-rechner.png', captionKey: 'giftsCalculator' }
    ]
  },
  todo: {
    slides: [
      { image: '/images/todo-start.jpg', captionKey: 'todoHome' },
      { image: '/images/todo-aufgaben.jpg', captionKey: 'todoTasks' },
      { embed: `${todoDemoUrl}?v=91f0b77`, captionKey: 'todoDemo' }
    ]
  },
  shopplatzi: {
    slides: [
      { image: '/images/todo-shopplatzi.jpg', captionKey: 'shopOverview' },
      { embed: `${shopDemoUrl}?v=91f0b77`, captionKey: 'shopDemo' }
    ]
  },
  feta: { slides: fetaSlides },
  hotelverwaltung: { slides: hotelSlides },
  yoganow: { slides: yogaSlides },
  uno: {
    slides: [
      { image: projects[1].image, captionKey: 'unoStart' },
      { image: '/images/uno_spiel.png', captionKey: 'unoCards' },
      { image: '/images/uno_sieger.png', captionKey: 'unoWinner' },
      { video: '/videos/uno-console.mp4', poster: projects[1].image, captionKey: 'unoVideo' }
    ]
  },
  'uno-web': {
    slides: [
      { image: '/images/uno-web.png', captionKey: 'unoWebStart' },
      { image: unoWebCover, captionKey: 'unoWebWinter' },
      { image: '/images/campus02-farbwahl.png', captionKey: 'unoWebColor' },
      { image: '/images/campus02-rundensieg.png', captionKey: 'unoWebRound' },
      { image: '/images/campus02-partiesieg.png', captionKey: 'unoWebWinner' },
      {
        embed: unoWebDemoUrl,
        captionKey: 'unoWebDemo'
      }
    ]
  },
  kaffeehaus: {
    slides: [
      { image: '/images/mokka-start.png', captionKey: 'coffeeHome' },
      { image: '/images/mokka-menu.png', captionKey: 'coffeeMenu' },
      { image: '/images/mokka-galerie-detail.png', captionKey: 'coffeeGallery' }
    ]
  }
}
const galleryProject = ref<keyof typeof projectGalleries>('hotelverwaltung')

const activeGallery = computed(() => {
  const gallery = projectGalleries[galleryProject.value]

  return {
    ...gallery,
    title: t(`projectTitles.${galleryProject.value}`)
  }
})

const hotelGallery = ref<HTMLDialogElement | null>(null)
const galleryVideo = ref<HTMLVideoElement | null>(null)
const hotelSlideIndex = ref(0)
type DemoChoice = 'allow' | 'deny'
const demoChoice = ref<DemoChoice | null>(null)
const demoSettings = ref<HTMLDialogElement | null>(null)
const demoConsentKey = 'portfolio-demo-consent-v1'
const unoDemoOrigin = new URL(unoWebDemoUrl, window.location.origin).origin
const demoConsentScope = unoDemoOrigin + '|'
const demoHosts = [new URL(todoDemoUrl).hostname, new URL(unoDemoOrigin).hostname].join(', ')

function readDemoChoice(value: string | null) {
  if (value === demoConsentScope + 'allow') return 'allow'
  if (value === demoConsentScope + 'deny') return 'deny'
  return null
}

function syncDemoChoice(event: StorageEvent) {
  if (event.key === demoConsentKey || event.key === null) {
    demoChoice.value = readDemoChoice(event.newValue)
  }
}

onMounted(() => {
  try {
    demoChoice.value = readDemoChoice(localStorage.getItem(demoConsentKey))
  } catch {
    // The choice can still be used until the page is closed.
  }
  window.addEventListener('storage', syncDemoChoice)
})

onUnmounted(() => window.removeEventListener('storage', syncDemoChoice))

function setDemoChoice(choice: DemoChoice) {
  demoChoice.value = choice
  try {
    localStorage.setItem(demoConsentKey, demoConsentScope + choice)
  } catch {
    // Keep the choice in memory when browser storage is unavailable.
  }
  demoSettings.value?.close()
}
const hotelSlide = computed(() => activeGallery.value.slides[hotelSlideIndex.value] ?? activeGallery.value.slides[0])
watch(hotelSlide, (slide) => {
  if ('embed' in slide && hotelGallery.value?.open && demoChoice.value === null) {
    demoSettings.value?.showModal()
  }
})

const hotelSlideCaption = computed(() => t(`galleryCaptions.${hotelSlide.value.captionKey}`))

function openProjectGallery(project: keyof typeof projectGalleries, startAt = 0) {
  galleryProject.value = project
  hotelSlideIndex.value = startAt
  hotelGallery.value?.showModal()
}

function changeHotelSlide(direction: number) {
  const count = activeGallery.value.slides.length
  if (count > 1) hotelSlideIndex.value = (hotelSlideIndex.value + direction + count) % count
}

const latestProjects = computed(() => [...projects]
  .sort((first, second) => second.createdAt.localeCompare(first.createdAt))
  .slice(0, 3)
  .map(project => ({ ...project, title: t(`projectTitles.${project.id}`) }))
)

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

async function openProject(event: MouseEvent, id: string) {
  if (isEducation || isExperience) return
  if (visibleProjects.value.some((project) => project.id === id)) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  event.preventDefault()
  resetProjectFilters()
  await nextTick()

  const hash = '#' + id
  if (window.location.hash === hash) {
    document.getElementById(id)?.scrollIntoView()
  } else {
    window.location.hash = hash
  }
}

type SkillGroupKey = 'programming' | 'apps' | 'tools' | 'ai' | 'study'
const selectedSkillGroups = ref<SkillGroupKey[]>([])
const filterableSkillGroupKeys: SkillGroupKey[] = ['programming', 'apps', 'tools', 'ai']
function toggleSkillGroup(key?: SkillGroupKey) {
  if (!key) {
    selectedSkillGroups.value = []
    return
  }

  selectedSkillGroups.value = selectedSkillGroups.value.includes(key)
    ? selectedSkillGroups.value.filter((selected) => selected !== key)
    : [...selectedSkillGroups.value, key]
}

const visibleSkillGroups = computed(() => skillGroups.filter((group) =>
  group.key === 'study' || selectedSkillGroups.value.length === 0 || selectedSkillGroups.value.includes(group.key as SkillGroupKey)
))

function handleSkillIconLoad(event: Event) {
  const image = event.currentTarget as HTMLImageElement
  image.parentElement?.classList.add('has-icon')
}

function handleSkillIconError(event: Event) {
  (event.currentTarget as HTMLImageElement).hidden = true
}

const values = [
  { symbol: '⌘' },
  { symbol: '↗' },
  { symbol: '♡' },
  { symbol: '⟳' }
]

const githubUrl = 'https://github.com/ekschedl'
const linkedinUrl = 'https://www.linkedin.com/in/ekaterina-schedlberger-05162630b/'
const emailAddress = 'ek.schedl@gmail.com'

function changeLanguage(next: Language) {
  locale.value = next.toLowerCase()
  try {
    localStorage.setItem('portfolio-language', next)
  } catch {
    // Keep the selected language for this page.
  }
  menuOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="page">
    <header class="header">
      <a href="/#home" class="logo" :aria-label="t('logoHome')" @click="closeMenu">
        ek<span>.</span>
      </a>

      <nav
        id="main-navigation"
        class="navigation"
        :class="{ open: menuOpen }"
        :aria-label="t('navigationLabel')"
      >
        <a :href="homeLink('#home')" @click="closeMenu">{{ t('nav.0') }}</a>
        <a :href="homeLink('#projects')" @click="closeMenu">{{ t('nav.1') }}</a>
        <a :href="homeLink('#technologies')" @click="closeMenu">{{ t('nav.2') }}</a>
        <a :href="homeLink('#about')" @click="closeMenu">{{ t('nav.3') }}</a>
        <a :href="educationPath" :aria-current="isEducation ? 'page' : undefined" @click="closeMenu">
            {{ t('education') }}        </a>
        <a :href="experiencePath" :aria-current="isExperience ? 'page' : undefined" @click="closeMenu">
          {{ t('experiencePage.title') }}
        </a>
      </nav>

      <div class="header-actions">
        <div class="languages" role="group" :aria-label="t('languageLabel')">
          <button
            v-for="lang in languages"
            :key="lang"
            type="button"
            :class="{ active: language === lang }"
            :aria-pressed="language === lang"
            @click="changeLanguage(lang)"
          >
            {{ lang }}
          </button>
        </div>

        <button
          class="theme-button"
          type="button"
          :aria-label="darkMode ? t('switchToLight') : t('switchToDark')"
          :aria-pressed="darkMode"
          :title="darkMode ? t('switchToLight') : t('switchToDark')"
          @click="toggleTheme"
        >
          <span aria-hidden="true">{{ darkMode ? '☼' : '☾' }}</span>
        </button>

        <div class="header-ctas">
          <a
            class="header-cv"
            :class="{ 'header-cv-compact-label': language !== 'RU' }"
            :href="cvPath"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="t('cvDownload')"
            :title="t('cvDownload')"
          >
            <span class="cv-label-full">{{ t('cvDownload') }}</span>
            <span class="cv-label-short">{{ t('cvShort') }}</span>
            <svg class="cv-arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 19h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
          <a class="header-contact" :href="homeLink('#contact')">
            {{ t('contact') }} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          class="menu-button"
          type="button"
          :aria-label="menuOpen ? t('menuClose') : t('menuOpen')"
          aria-controls="main-navigation"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          {{ menuOpen ? '✕' : '☰' }}
        </button>
      </div>
    </header>

    <EducationPage v-if="isEducation" />
    <ExperiencePage v-else-if="isExperience" />
    <LegalPage v-else-if="legalPage" :page="legalPage" />
    <main v-else class="portfolio-home">
      <a class="education-milestone" :href="educationPath">
        <div class="education-milestone-headline">
          <span class="education-milestone-news">{{ t('educationNews') }}</span>
          <span class="education-milestone-focus">{{ t('educationFocus') }}</span>
        </div>
        <div class="education-milestone-copy">
          <strong class="education-milestone-heading">{{ t('educationHeading') }}</strong>
          <span class="education-milestone-detail">FH CAMPUS 02</span>
          <span class="education-milestone-detail">{{ t('educationMilestone') }}</span>
        </div>
        <div class="education-milestone-next">
          <strong class="education-milestone-label">{{ t('educationNext') }}</strong>
          <span>{{ t('educationNextCourse') }}</span>
        </div>
      </a>

      <!-- HERO BENTO -->
      <section id="home" class="hero-grid">
        <div class="tile portrait-tile">
          <div class="portrait-orbit orbit-one"></div>
          <div class="portrait-orbit orbit-two"></div>
          <span class="portrait-spark" aria-hidden="true">✳</span>

          <img
            src="/images/ekaterina-cutout.png"
            :alt="portfolioName"
            class="portrait-image"
            fetchpriority="high"
          />
        </div>

        <a href="#projects" class="tile intro-tile" :aria-label="t('nav.1')">
          <div>
            <span class="eyebrow">{{ t('heroGreeting') }}</span>
            <h1>{{ t('heroName') }}<span>.</span></h1>
            <h2>{{ t('role') }}</h2>
            <p class="location">{{ t('location') }}</p>
          </div>

          <div class="intro-bottom">
            <p>{{ t('heroNote') }}</p>
            <span class="round-arrow" aria-hidden="true">↗</span>
          </div>
        </a>

        <section class="latest-projects" aria-labelledby="latest-projects-heading">
          <div class="latest-projects-header">
            <h2 id="latest-projects-heading" class="eyebrow">{{ t('latestProjects') }}</h2>
            <a class="latest-projects-link" href="#projects">
              {{ t('allProjectsLink') }} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div class="latest-projects-grid">
            <a
              v-for="project in latestProjects"
              :key="project.id"
              :href="'#' + project.id"
              @click="openProject($event, project.id)"
              class="tile project-tile"
              :data-area="project.area"
            >
              <span class="tile-type tile-type-full">{{ t(`projectTypes.${project.area}`) }}</span>
              <span class="tile-type tile-type-compact">{{ t(`projectTypesShort.${project.area}`) }}</span>

              <div class="tile-project-image">
                <img v-if="project.image" :src="project.image" :alt="project.title" loading="lazy" />
              </div>

              <div class="tile-bottom">
                <h3>{{ project.title }}</h3>
                <span aria-hidden="true">↗</span>
              </div>
            </a>
          </div>
        </section>

        <a href="#technologies" class="tile expertise-tile">
          <span class="tile-type">{{ t('whatIUse') }}</span>
          <h3>{{ t('nav.2') }}</h3>
          <div class="expertise-preview">
            <span>Vue </span>
            <span>TypeScript</span>
            <span>PHP</span>
            <span>{{ t('more') }}</span>
          </div>
          <span class="tile-corner-arrow" aria-hidden="true">↗</span>
        </a>

        <a href="#about" class="tile about-tile">
          <span class="tile-type">{{ t('aboutTile') }}</span>
          <h3>{{ t('about') }}</h3>
          <p>{{ t('aboutShort') }}</p>
          <span class="tile-corner-arrow" aria-hidden="true">↗</span>
        </a>
      </section>

      <!-- 01 / PORTFOLIO -->
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
              type="button" aria-haspopup="dialog" :aria-label="(project.title) + ' · ' + t('galleryControls.open')"
              @click="openProjectGallery(project.id)">
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
                  @click="openProjectGallery(project.id, projectGalleries[project.id].slides.length - 1)">
                  {{ t('inlineDemo') }}
                </button>
                <a :href="project.demoUrl" target="_blank" rel="noopener noreferrer">
                  {{ t('liveDemo') }} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div v-else class="project-card-actions">
                <button type="button" aria-haspopup="dialog"
                  @click="openProjectGallery(project.id, project.id === 'yoganow' ? yogaSlides.length - 1 : 0)">
                  {{ project.id === 'yoganow' ? t('yogaDemo.action') : t('galleryControls.open') }}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 02 / TECHNOLOGIES -->
      <section id="technologies" class="section technologies-section">
        <div class="section-head">
          <span class="section-number">{{ t('sectionTechnologies') }}</span>
          <h2>{{ t('technologiesTitle') }}</h2>
          <p>{{ t('technologiesIntro') }}</p>
        </div>

        <div class="tech-group-filters" role="group" :aria-label="t('technologiesTitle')">
          <button type="button" :aria-pressed="!selectedSkillGroups.length" @click="toggleSkillGroup()">{{ t('techFilterAll') }}</button>
          <button
            v-for="(key, index) in filterableSkillGroupKeys"
            :key="key"
            type="button"
            :class="'tech-filter-' + key"
            :aria-pressed="selectedSkillGroups.includes(key)"
            @click="toggleSkillGroup(key)"
          >{{ t(`techFilterGroups.${index}`) }}</button>
          <button
            v-if="selectedSkillGroups.length"
            type="button"
            class="tech-filter-reset"
            @click="toggleSkillGroup()"
          >{{ t('techFilterReset') }}</button>
        </div>
        <div class="tech-groups">
          <section v-for="group in visibleSkillGroups" :key="group.key" class="tech-group" :class="['tech-group-' + group.key, { 'tech-group-study': group.textKey }]">
            <h3>{{ t(`techGroups.${group.key === 'study' ? 4 : filterableSkillGroupKeys.indexOf(group.key as SkillGroupKey)}`) }}</h3>
            <p v-if="group.textKey" class="tech-study">{{ t('studyTopics') }}</p>
            <div v-else class="tech-list">
              <div
                v-for="skill in group.skills"
                :key="skill.name"
                class="tech-item"
                :style="{ '--skill-color': '#' + skill.color }"
              >
                <span class="tech-icon" aria-hidden="true">
                  <img
                    v-if="skill.icon"
                    :src="`/icons/${skill.icon}-${skill.color}.svg`"
                    alt=""
                    loading="lazy"
                    @load="handleSkillIconLoad"
                    @error="handleSkillIconError"
                  />
                  <span class="tech-icon-fallback">{{ skill.name.slice(0, 2) }}</span>
                </span>
                <span>{{ skill.name }}</span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <!-- 03 / ABOUT ME -->
      <section id="about" class="section about-section">
        <div class="about-layout">
          <div class="section-head">
            <span class="section-number">{{ t('sectionAbout') }}</span>
            <h2>{{ t('aboutTitle') }}</h2>
          </div>

          <div class="about-content">
            <div class="about-topics">
              <div v-for="(topic, index) in aboutSections" :key="index" class="about-topic">
                <h3>{{ rt(topic.heading) }}</h3>
                <p>{{ rt(topic.before) }}<strong>{{ rt(topic.emphasis) }}</strong>{{ rt(topic.after) }}</p>
              </div>
            </div>

            <div class="values-line">
              <div
                v-for="(value, index) in values"
                :key="value.symbol"
                class="value-item"
              >
                <span aria-hidden="true">{{ value.symbol }}</span>
                <strong>{{ t(`valueLabels.${index}`) }}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 / SAY HELLO -->
      <section id="contact" class="section contact-section">
        <div class="contact-copy">
          <span class="section-number">{{ t('sectionContact') }}</span>
          <h2>{{ t('helloTitle') }}</h2>
          <p>{{ t('helloText') }}</p>

          <div class="contact-actions">
            <a
              v-if="emailAddress"
              :href="`mailto:${emailAddress}`"
              class="primary-link"
            >
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              {{ emailAddress }} <span aria-hidden="true">↗</span>
            </a>

            <a
              :href="githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="secondary-link"
            >
              <svg class="contact-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.22.48-2.69-.94-2.69-.94-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.82 1.23.82.71 1.23 1.87.87 2.33.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.19c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
              </svg>
              {{ t('github') }} <span aria-hidden="true">↗</span>
            </a>

            <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer" class="secondary-link">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <rect x="2" y="2" width="20" height="20" rx="2.5" stroke="currentColor" stroke-width="1.75" />
                <circle cx="7.4" cy="7.4" r="1.2" fill="currentColor" />
                <path d="M7.4 11v6m4-6v6m0-3.7c0-1.45 1-2.3 2.4-2.3 1.5 0 2.4 1 2.4 2.6V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div class="contact-art" aria-hidden="true">
          <span class="art-code">&lt;/&gt;</span>
          <span class="art-star">✳</span>
        </div>
      </section>
    </main>

    <dialog ref="hotelGallery" class="hotel-gallery" :class="{
      'hotel-gallery--hotel': galleryProject === 'hotelverwaltung',
      'hotel-gallery-video': 'video' in hotelSlide,
      'hotel-gallery-video-wide': galleryProject === 'uno' && 'video' in hotelSlide
    }" :aria-label="activeGallery.title"
      @click.self="hotelGallery?.close()"
      @close="galleryVideo?.pause(); if ('embed' in hotelSlide) hotelSlideIndex = 0"
      @keydown.left.prevent="changeHotelSlide(-1)" @keydown.right.prevent="changeHotelSlide(1)">
      <div class="hotel-gallery-header">
        <strong>{{ activeGallery.title }}</strong>
        <button v-if="'embed' in hotelSlide && demoChoice === 'allow'" type="button"
          class="demo-settings-shortcut" @click="demoSettings?.showModal()">
          {{ t('legal.demoSettings') }}
        </button>
        <button type="button" autofocus :aria-label="t('galleryControls.close')" @click="hotelGallery?.close()">×</button>
      </div>
      <figure aria-live="polite" @click.self="hotelGallery?.close()">
        <video v-if="'video' in hotelSlide" ref="galleryVideo" :src="hotelSlide.video"
          :poster="hotelSlide.poster"
          :aria-label="hotelSlideCaption" controls muted playsinline preload="none" @keydown.left.stop @keydown.right.stop />
        <template v-else-if="'embed' in hotelSlide">
          <iframe v-if="demoChoice === 'allow'" class="todo-demo-frame" :src="hotelSlide.embed"
          :title="activeGallery.title" referrerpolicy="no-referrer"
          :sandbox="galleryProject === 'uno-web'
            ? 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox'
            : 'allow-scripts allow-same-origin'" />
          <div v-else class="demo-placeholder">
            <p>{{ t('legal.demoInactive') }}</p>
            <button type="button" @click="demoSettings?.showModal()">{{ t('legal.demoSettings') }}</button>
          </div>
        </template>
        <button v-else-if="activeGallery.slides.length > 1" type="button" class="hotel-gallery-image"
          :aria-label="t('galleryControls.next')" @click="changeHotelSlide(1)">
          <img :src="hotelSlide.image" alt="" />
        </button>
        <img v-else :src="hotelSlide.image" :alt="hotelSlideCaption" />

      <figcaption>{{ hotelSlideCaption }}</figcaption>
      </figure>
      <div v-if="activeGallery.slides.length > 1" class="hotel-gallery-controls">
        <button type="button" :aria-label="t('galleryControls.prev')" @click="changeHotelSlide(-1)">←</button>
        <span>{{ hotelSlideIndex + 1 }} / {{ activeGallery.slides.length }}</span>
        <button v-if="'embed' in (activeGallery.slides[hotelSlideIndex + 1] ?? {})"
          type="button" @click="changeHotelSlide(1)">{{ t('inlineDemo') }} →</button>
        <button v-else type="button" :aria-label="t('galleryControls.next')" @click="changeHotelSlide(1)">→</button>
      </div>
      <a v-if="'image' in hotelSlide" :href="hotelSlide.image" target="_blank" rel="noopener">{{ t('galleryControls.full') }} ↗</a>
      <p v-if="galleryProject === 'yoganow'" class="yoga-gallery-access">{{ t('yogaDemo.access') }}</p>
    </dialog>

    <dialog ref="demoSettings" class="hotel-gallery demo-settings" aria-labelledby="demo-settings-title">
      <div class="hotel-gallery-header">
        <h2 id="demo-settings-title">{{ t('legal.demoSettings') }}</h2>
        <button type="button" autofocus :aria-label="t('galleryControls.close')" @click="demoSettings?.close()">×</button>
      </div>
      <p>{{ t('legal.demoNotice', { hosts: demoHosts }) }}</p>
      <p>
        {{ t('legal.demoDetails') }}
        <a :href="privacyPath + '#projekt-demos'" target="_blank" rel="noopener">{{ t('legal.demosTitle') }}</a>.
      </p>
      <div class="demo-settings-actions">
        <button type="button" :aria-pressed="demoChoice === 'allow'" @click="setDemoChoice('allow')">
          {{ t('legal.allowDemos') }}
        </button>
        <button type="button" :aria-pressed="demoChoice === 'deny'" @click="setDemoChoice('deny')">
          {{ t('legal.denyDemos') }}
        </button>
      </div>
    </dialog>

    <footer class="footer">
      <span>{{ t('footerCopyright') }}</span>
      <span>{{ t('footerMade') }}</span>
      <nav class="footer-legal" :aria-label="t('legal.navigation')">
        <a :href="imprintPath" :aria-current="legalPage === 'imprint' ? 'page' : undefined">{{ t('legal.imprint') }}</a>
        <a :href="privacyPath" :aria-current="legalPage === 'privacy' ? 'page' : undefined">{{ t('legal.privacy') }}</a>
        <button type="button" @click="demoSettings?.showModal()">{{ t('legal.demoSettings') }}</button>
      </nav>
    </footer>

    <Assistant @open-project="openProject" />

    <button class="back-to-top" type="button" :aria-label="t('backToTop')" :title="t('backToTop')" @click="scrollToTop">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="M12 20V4m0 0 7 7m-7-7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.contact-icon {
  width: 1.125rem;
  height: 1.125rem;
  flex: 0 0 auto;
}

.portfolio-home {
  --hero-section-gap: clamp(16px, 2vw, 26px);
}

.portfolio-home > .projects-section {
  padding-block-start: calc(var(--hero-section-gap) + 12px);
}

.education-milestone {
  --education-python-color: #f6bb9d;
  --education-news-color: #ffc0a7;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  align-items: center;
  gap: 14px clamp(10px, 1.6vw, 22px);
  margin-bottom: var(--hero-section-gap);
  padding-block: clamp(18px, 2.4vw, 30px);
  border-radius: 12px;
  background: var(--surface);
  color: var(--ink);
}

:global(:root[data-theme='dark']) .education-milestone {
  --education-python-color: #78433c;
}

.education-milestone-copy,
.education-milestone-next {
  display: grid;
  gap: 5px;
  min-width: 0;
  overflow-wrap: anywhere;
  align-self: stretch;
  align-content: center;
  padding: clamp(14px, 1.7vw, 22px);
  border: 1px solid color-mix(in srgb, var(--ink) 10%, transparent);
  border-radius: 8px;
}

.education-milestone-copy {
  background: linear-gradient(115deg, var(--blue), var(--slate));
}

.education-milestone-heading {
  font-size: clamp(1.25rem, 2.15vw, 2rem);
  line-height: 1.15;
  letter-spacing: -.025em;
  font-weight: 600;
}

.education-milestone-headline {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  min-width: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
  background: linear-gradient(90deg, var(--blue), var(--lilac), var(--education-news-color)) bottom / 100% 2px no-repeat;
}

.education-milestone-focus {
  min-width: 0;
  overflow-wrap: anywhere;
}

.education-milestone-news {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 9px;
  border-radius: 5px;
  background: var(--education-news-color);
  color: #4a2729;
  font: 500 .75rem 'IBM Plex Mono', ui-monospace, monospace;
  letter-spacing: .035em;
}

.education-milestone-news::before {
  content: '';
  width: 6px;
  height: 6px;
  flex: 0 0 6px;
  border-radius: 50%;
  background: currentColor;
}

@media (prefers-reduced-motion: no-preference) {
  .education-milestone-news::before {
    animation: education-news-pulse 1.3s ease-out 2;
  }
}

@keyframes education-news-pulse {
  from { box-shadow: 0 0 0 0 currentColor; }
  to { box-shadow: 0 0 0 5px transparent; }
}

.education-milestone-focus,
.education-milestone-label {
  color: var(--accent);
  font-size: .875rem;
  font-weight: 600;
}

.education-milestone-detail {
  color: var(--muted);
}

.education-milestone-next {
  background: linear-gradient(115deg, var(--education-python-color), var(--lilac));
}

@media (max-width: 800px) {
  .education-milestone {
    grid-template-columns: minmax(0, 1fr);
  }
}

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
  --area-color: #efb58f;
}

:global(:root[data-theme='dark']) [data-area='backend'] {
  --area-color: var(--blue);
}

[data-area='desktop'] {
  --area-color: var(--lilac);
}

.project-tile[data-area],
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

.todo-demo-frame {
  display: block;
  width: 100%;
  height: clamp(360px, 70dvh, 680px);
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--surface);
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

.project-cover-expand {
  position: absolute;
  inset-block-start: 6px;
  inset-inline-end: 6px;
  padding: 3px 7px;
  border-radius: 6px;
  background: var(--surface);
}

.yoga-gallery-access {
  margin: 10px 0 0;
  color: var(--muted);
}

.hotel-gallery {
  width: min(96vw, 1180px);
  max-width: none;
  max-height: 94vh;
  padding: clamp(8px, 2vw, 20px);
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
  color: var(--ink);
  text-align: center;
  overflow-wrap: anywhere;
}

.hotel-gallery::backdrop { background: #000b; }

.hotel-gallery-header,
.hotel-gallery-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.hotel-gallery-controls {
  justify-content: center;
  margin: 12px 0 8px;
}

.hotel-gallery button:not(.hotel-gallery-image) {
  min-width: 40px;
  min-height: 40px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--paper);
  color: var(--ink);
}

.hotel-gallery figure { margin: 12px 0 0; }
.hotel-gallery img {
  display: block;
  max-width: 100%;
  max-height: min(65dvh, 680px);
  width: auto;
  height: auto;
  margin-inline: auto;
  border-radius: 8px;
}

.hotel-gallery-image {
  display: inline-block;
  max-width: 100%;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  vertical-align: top;
}

.hotel-gallery-image:has(img[src$=".svg"]) {
  width: min(100%, 840px);
}

.hotel-gallery-image img[src$=".svg"] {
  width: 100%;
  object-fit: contain;
}

.hotel-gallery--hotel {
  --hotel-image-height: min(58dvh, 72vw, 640px);
}

.hotel-gallery--hotel figure {
  display: grid;
  grid-template-rows: var(--hotel-image-height) auto;
  justify-items: center;
  align-items: center;
}

.hotel-gallery--hotel .hotel-gallery-image img {
  max-height: var(--hotel-image-height);
}

.hotel-gallery--hotel figcaption {
  align-self: start;
  min-height: 2lh;
}

@media (max-width: 600px) {
  .hotel-gallery--hotel figcaption {
    min-height: 3lh;
  }
}

.hotel-gallery.hotel-gallery-video {
  width: min(96vw, 560px);
}

.hotel-gallery-video video {
  display: block;
  width: min(100%, 41dvh, 420px);
  height: auto;
  aspect-ratio: 2 / 3;
  margin-inline: auto;
  border-radius: 8px;
  background: #171717;
  object-fit: contain;
}

.hotel-gallery.hotel-gallery-video-wide {
  width: min(96vw, 1040px);
}

.hotel-gallery-video-wide video {
  width: min(100%, 100dvh);
  aspect-ratio: 1440 / 934;
}

.hotel-gallery figcaption { margin-top: 8px; }
.hotel-gallery a { text-decoration: underline; }

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

.tech-group-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
}

.tech-group-filters button {
  padding: 10px 15px;
  border: 1px solid var(--control-line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--ink);
  font: inherit;
  font-size: 15px;
  transition: background .18s ease, border-color .18s ease, transform .18s ease;
}

/* Filter und zugehöriger Block verwenden dieselbe Hintergrundfarbe. */
.tech-group-filters button[class^='tech-filter-']:not(.tech-filter-reset) {
  background: color-mix(in srgb, var(--tech-group-color, var(--surface)) 78%, var(--surface));
}

.tech-group-filters button[aria-pressed='true'] {
  border-color: var(--ink);
  box-shadow: inset 0 0 0 2px var(--ink);
}

.tech-group-filters button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.tech-filter-programming,
.tech-group-programming { --tech-group-color: var(--mist); }
.tech-filter-apps,
.tech-group-apps { --tech-group-color: var(--slate); }
.tech-filter-tools,
.tech-group-tools { --tech-group-color: var(--lilac); }
.tech-filter-ai,
.tech-group-ai { --tech-group-color: color-mix(in srgb, var(--accent) 22%, var(--paper)); }

.tech-group-filters button:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

.tech-group-filters .tech-filter-reset {
  border-color: transparent;
  background: transparent;
  color: var(--muted);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.tech-groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.tech-group {
  min-width: 0;
  padding: clamp(18px, 2.2vw, 28px);
  border: 1px solid var(--line);
  border-radius: 16px;
  background: color-mix(in srgb, var(--tech-group-color, var(--surface)) 78%, var(--surface));
}

.tech-group-study {
  grid-column: 1 / -1;
  background: color-mix(in srgb, var(--mist) 38%, var(--surface));
}

.tech-group h3 {
  margin: 0;
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-size: clamp(19px, 1.6vw, 23px);
  font-weight: 600;
}

.tech-group .tech-list {
  margin-top: 18px;
}

.tech-study {
  margin: 16px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 16px;
  line-height: 1.75;
}

@media (max-width: 680px) {
  .tech-groups {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }

  .tech-group-study {
    grid-column: auto;
  }

  .tech-group-filters button {
    padding: 9px 13px;
    font-size: 14px;
  }
}

.menu-button {
  box-sizing: border-box;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font-size: 22px;
}

.header-actions {
  flex: 0 0 auto;
  flex-wrap: nowrap;
  gap: 14px;
}

.header-ctas {
  display: flex;
  flex: 0 0 auto;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
}

.header-ctas > a {
  flex: 0 0 auto;
}

.header-contact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 44px;
  padding: 0 20px;
}

.theme-button {
  box-sizing: border-box;
  width: 44px;
  height: 44px;
}

.header-cv {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  height: 44px;
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid var(--accent);
  border-radius: 10px;
  background: var(--accent);
  color: var(--on-ink);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}

.header-cv:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 14px var(--art-accent);
}

.cv-arrow {
  display: block;
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  transition: transform .18s ease;
}

.header-cv:hover .cv-arrow {
  transform: translateY(2px);
}

.cv-label-short {
  display: none;
}

.header-cv-compact-label .cv-label-full {
  display: none;
}

.header-cv-compact-label .cv-label-short {
  display: inline;
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
}

.footer-legal a,
.footer-legal button {
  text-decoration: underline;
}

.footer-legal button {
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

@media (max-width: 920px) {
  .footer {
    padding-block-end: calc(64px + clamp(10px, 2vw, 24px) + env(safe-area-inset-bottom, 0px));
  }

  .footer-legal :is(a, button) {
    display: inline-flex;
    align-items: center;
    min-block-size: 44px;
  }
}

.hotel-gallery button.demo-settings-shortcut {
  margin-inline-start: auto;
  padding-inline: 8px;
  border-color: transparent;
  background: none;
  color: var(--accent);
  text-decoration: underline;
}

.demo-settings {
  width: min(92vw, 560px);
  text-align: start;
}

.demo-settings h2 {
  margin: 0;
  font-size: 1.25rem;
}

.demo-settings-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.demo-settings-actions button,
.demo-placeholder button {
  padding-inline: 12px;
  cursor: pointer;
}

.demo-settings-actions button[aria-pressed='true'] {
  border-color: var(--accent);
}

.back-to-top {
  position: fixed;
  z-index: 40;
  right: clamp(10px, 2vw, 24px);
  bottom: clamp(10px, 2vw, 24px);
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  padding: 0;
  border: 1px solid var(--accent);
  border-radius: 50%;
  background: var(--surface);
  color: var(--accent);
  cursor: pointer;
  transition: background-color .18s ease, transform .18s ease;
}

.back-to-top:hover {
  background: var(--paper);
  transform: translateY(-2px);
}

.back-to-top svg {
  display: block;
  width: 26px;
  height: 26px;
}

.back-to-top:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.languages {
  box-sizing: border-box;
  flex: 0 0 auto;
  height: 44px;
  gap: 1px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.languages button {
  position: relative;
  display: grid;
  min-width: 34px;
  min-height: 34px;
  place-items: center;
  padding: 5px 7px;
  border-radius: 0;
  font-size: 11px;
}

.languages button.active {
  background: transparent;
  color: var(--accent);
  box-shadow: none;
}

.languages button.active::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--accent);
  content: '';
}

.theme-button,
.menu-button,
.header-cv {
  transition: border-radius .18s ease, background-color .18s ease, transform .18s ease, box-shadow .18s ease;
}

.languages button {
  transition: color .18s ease, box-shadow .18s ease;
}

.theme-button:hover,
.menu-button:hover {
  border-radius: 8px;
}

.header-cv:hover {
  border-radius: 14px;
}


@media (min-width: 1301px) and (max-width: 1650px) {
  .header {
    gap: 14px;
  }

  .navigation {
    gap: 15px;
  }

  .navigation a {
    font-size: 16px;
  }

  .header-actions {
    gap: 10px;
  }

  .header-ctas {
    gap: 8px;
  }

  .cv-label-full {
    display: none;
  }

  .cv-label-short {
    display: inline;
  }
}

@media (max-width: 1300px) {
  .navigation {
    display: none;
    position: absolute;
    z-index: 30;
    top: 75px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 15px;
    border-radius: 12px;
    background: var(--paper);
    box-shadow: 0 15px 35px rgba(0,0,0,.08);
  }

  .navigation.open {
    display: flex;
  }

  .navigation a {
    padding: 12px 14px;
    font-size: 18px;
  }

  .menu-button {
    display: block;
  }
}

@media (max-width: 920px) {
  .header-contact {
    display: none;
  }

  .cv-label-full {
    display: none;
  }

  .cv-label-short {
    display: inline;
  }

  .header-cv {
    min-height: 36px;
    padding: 0 11px;
    font-size: 11px;
  }
}

@media (max-width: 520px) {
  .logo {
    flex: 0 0 auto;
    margin-right: 8px;
  }

  .header {
    flex-wrap: nowrap;
    min-height: 0;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
  }

  .header-actions {
    flex: 0 1 auto;
    width: auto;
    min-width: 0;
    justify-content: space-between;
    gap: 4px;
  }

  .header-contact {
    display: none;
  }

  .navigation {
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    max-width: 100%;
    box-sizing: border-box;
    padding: 8px;
  }

  .cv-label-full {
    display: none;
  }

  .cv-label-short {
    display: none;
  }

  .header-contact,
  .theme-button,
  .menu-button,
  .header-cv {
    height: 40px;
    min-height: 40px;
  }

  .header-cv {
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    padding: 0 6px;
    gap: 0;
    border: 0;
    border-radius: 10px;
    font-size: 11px;
  }

  .cv-arrow {
    display: block;
    width: 18px;
    height: 18px;
  }

  .theme-button,
  .menu-button {
    width: 40px;
    min-width: 40px;
    border: 1px solid var(--control-line);
    border-radius: 8px;
    background: var(--surface);
    color: var(--ink);
  }

  .languages {
    box-sizing: border-box;
    height: 40px;
    gap: 0;
    padding: 2px;
    border: 0;
    border-radius: 0;
    background: transparent;
  }

  .languages button {
    width: 30px;
    min-width: 30px;
    height: 34px;
    min-height: 34px;
    padding: 0;
    border-radius: 0;
    font-size: 10px;
  }

  .header-ctas {
    gap: 6px;
  }

  .menu-button {
    font-size: 20px;
  }
}

@media (max-width: 680px) {
  .cv-label-full,
  .cv-label-short,
  .header-cv-compact-label .cv-label-short {
    display: none;
  }

  .header-cv {
    width: 40px;
    min-width: 40px;
    height: 40px;
    min-height: 40px;
    padding: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .header-cv,
  .cv-arrow,
  .back-to-top {
    transition: none;
  }
}

@media (max-width: 340px) {
  .header-actions {
    gap: 3px;
  }

  .header {
    gap: 4px;
  }

  .theme-button {
    display: grid;
    width: 30px;
    min-width: 30px;
    height: 32px;
    min-height: 32px;
  }

  .languages button {
    width: 24px;
    min-width: 24px;
    padding: 0;
  }

  .header-cv {
    width: 30px;
    min-width: 30px;
    height: 32px;
    min-height: 32px;
    padding: 0;
  }

  .menu-button {
    width: 30px;
    min-width: 30px;
    height: 32px;
    min-height: 32px;
  }
}

@media (max-width: 260px) {
  .logo {
    font-size: 30px;
    margin-right: 4px;
  }

  .header {
    gap: 2px;
  }

  .header-actions {
    gap: 2px;
  }

  .languages button {
    width: 20px;
    min-width: 20px;
  }

  .theme-button {
    width: 34px;
    min-width: 34px;
    height: 32px;
    min-height: 32px;
  }

  .header-cv,
  .menu-button {
    width: 34px;
    min-width: 34px;
    height: 32px;
    min-height: 32px;
  }
}

@media (max-width: 220px) {
  .logo {
    font-size: 24px;
    margin-right: 3px;
  }

  .languages button {
    width: 20px;
    min-width: 20px;
    font-size: 10px;
  }

  .header-actions {
    gap: 1px;
  }

  .header {
    gap: 2px;
  }

  .theme-button {
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-height: 30px;
  }

  .header-cv {
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-height: 30px;
  }

  .menu-button {
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-height: 30px;
  }
}
</style>
