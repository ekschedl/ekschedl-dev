<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import EducationPage from './EducationPage.vue'
import ExperiencePage from './ExperiencePage.vue'

type Language = 'DE' | 'EN' | 'RU'

const languages: Language[] = ['DE', 'EN', 'RU']
const language = ref<Language>('DE')
const educationPath = '/Ausbildung'
const experiencePath = '/Berufserfahrung'
const isExperience = /^\/berufserfahrung\/?$/i.test(window.location.pathname)
const experienceLabels = { DE: 'Berufserfahrung', EN: 'Work experience', RU: 'Опыт работы' }
const isEducation = /^\/ausbildung\/?$/i.test(window.location.pathname)
const educationLabels = { DE: 'Ausbildung', EN: 'Education', RU: 'Образование' }

function homeLink(hash: string) {
  return isEducation || isExperience ? '/' + hash : hash
}

function updatePageLanguage() {
  document.documentElement.lang = language.value.toLowerCase()
  if (isEducation) {
    document.title = educationLabels[language.value] + ' | Ekaterina Schedlberger'
  } else if (isExperience) {
    document.title = experienceLabels[language.value] + ' | Ekaterina Schedlberger'
  }
}
const menuOpen = ref(false)
const projectAreas = ['mobile', 'game', 'web'] as const
type ProjectArea = typeof projectAreas[number]
const selectedArea = ref<ProjectArea | ''>('')
const selectedTechnologies = ref<string[]>([])
const darkMode = ref(false)

onMounted(() => {
  try {
    darkMode.value = localStorage.getItem('portfolio-theme') === 'dark'
    const savedLanguage = languages.find((item) => item === localStorage.getItem('portfolio-language'))
    if (savedLanguage) language.value = savedLanguage
  } catch {
    // Language and theme switching also work when storage is unavailable.
  }
  updatePageLanguage()
})

watch(darkMode, (enabled) => {
  const theme = enabled ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem('portfolio-theme', theme)
  } catch {
    // Keep the selected theme for this visit.
  }
})

const translations = {
  DE: {
    areaFilter: 'Projektbereich',
    filterOptions: 'Projektfilter',
    allAreas: 'Alle Bereiche',
    areas: { mobile: 'Mobile App', game: 'Spiel', web: 'Webentwicklung' },
    filter: 'Technologie filtern',
    allTechnologies: 'Alle Technologien',
    noResults: 'Keine passenden Projekte gefunden.',
    reset: 'Alle Filter zurücksetzen',
    filterOr: 'oder',
    darkMode: 'Dunkelmodus',
    navigationLabel: 'Hauptnavigation',
    languageLabel: 'Sprache',
    nav: ['Start', 'Projekte', 'Technologien', 'Über mich'],
    contact: 'KONTAKT',
    role: 'Softwareentwicklerin',
    location: 'Graz, Österreich',
    heroNote: 'Ideen verstehen. Lösungen entwickeln. Neues lernen.',
    projectsTitle: 'Dinge, die ich entwickle.',
    projectsIntro: 'Eine Auswahl meiner Projekte und Ideen.',
    technologiesTitle: 'Mein Tech-Stack.',
    technologiesIntro: 'Technologien, mit denen ich arbeite und weiterlerne.',
    about: 'Über mich',
    aboutShort: 'Mein Weg und was mich antreibt.',
    aboutTitle: 'Neugierig bleiben. Neues schaffen.',
    aboutText:
      'Ich habe den akademischen Lehrgang Software-Entwicklung an der FH CAMPUS 02 abgeschlossen und bei JAWA praktische Erfahrung in der Webentwicklung gesammelt. Ich mag es, Zusammenhänge zu verstehen, Lösungen zu finden und Neues auszuprobieren.',
    helloTitle: 'Lass uns etwas bewegen.',
    helloText:
      'Ich freue mich über interessante Projekte, neue Herausforderungen und berufliche Möglichkeiten in der Softwareentwicklung.',
    github: 'Mein GitHub',
    email: 'E-Mail schreiben',
    projectDescriptions: [
      'Eine iOS-App mit SwiftUI und Supabase.',
      'UNO als Konsolenspiel.',
      'Ein Webprojekt mit HTML, CSS und JavaScript.'
    ],
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen'
  },
  EN: {
    areaFilter: 'Project area',
    filterOptions: 'Project filters',
    allAreas: 'All areas',
    areas: { mobile: 'Mobile app', game: 'Game', web: 'Web development' },
    filter: 'Filter by technology',
    allTechnologies: 'All technologies',
    noResults: 'No matching projects found.',
    reset: 'Reset all filters',
    filterOr: 'or',
    darkMode: 'Dark mode',
    navigationLabel: 'Main navigation',
    languageLabel: 'Language',
    nav: ['Home', 'Projects', 'Technologies', 'About'],
    contact: "LET'S TALK",
    role: 'Software Developer',
    location: 'Graz, Austria',
    heroNote: 'Explore ideas. Build solutions. Keep learning.',
    projectsTitle: 'Things I build.',
    projectsIntro: 'A selection of my projects and ideas.',
    technologiesTitle: 'My tech stack.',
    technologiesIntro: 'Technologies I use and continue to explore.',
    about: 'About me',
    aboutShort: 'My journey and what motivates me.',
    aboutTitle: 'Stay curious. Keep creating.',
    aboutText:
      'I completed an academic Software Development programme at FH CAMPUS 02 and gained practical web development experience at JAWA. I enjoy understanding how things work, finding solutions and exploring new ideas.',
    helloTitle: "Let's make something happen.",
    helloText:
      'I am open to interesting projects, new challenges and career opportunities in software development.',
    github: 'My GitHub',
    email: 'Send an email',
    projectDescriptions: [
      'An iOS app built with SwiftUI and Supabase.',
      'UNO as a console game.',
      'A web project with HTML, CSS and JavaScript.'
    ],
    menuOpen: 'Open menu',
    menuClose: 'Close menu'
  },
  RU: {
    areaFilter: 'Тип проекта',
    filterOptions: 'Фильтры проектов',
    allAreas: 'Все типы',
    areas: { mobile: 'Мобильное приложение', game: 'Игра', web: 'Веб-разработка' },
    filter: 'Фильтр по технологии',
    allTechnologies: 'Все технологии',
    noResults: 'Подходящих проектов нет.',
    reset: 'Сбросить все фильтры',
    filterOr: 'или',
    darkMode: 'Тёмная тема',
    navigationLabel: 'Основная навигация',
    languageLabel: 'Язык',
    nav: ['Главная', 'Проекты', 'Технологии', 'Обо мне'],
    contact: 'КОНТАКТ',
    role: 'Разработчик ПО',
    location: 'Грац, Австрия',
    heroNote: 'Исследовать идеи. Находить решения. Учиться новому.',
    projectsTitle: 'То, что я создаю.',
    projectsIntro: 'Некоторые из моих проектов и идей.',
    technologiesTitle: 'Мой стек технологий.',
    technologiesIntro: 'Технологии, с которыми я работаю и продолжаю развиваться.',
    about: 'Обо мне',
    aboutShort: 'Мой путь и то, что меня вдохновляет.',
    aboutTitle: 'Оставаться любознательной. Создавать новое.',
    aboutText:
      'Я окончила академическую программу Software Development в FH CAMPUS 02 и получила практический опыт веб-разработки в JAWA. Мне нравится разбираться в программном обеспечении, находить решения и пробовать что-то новое.',
    helloTitle: 'Давайте создавать вместе.',
    helloText:
      'Я открыта к интересным проектам, новым задачам и профессиональным возможностям в разработке программного обеспечения.',
    github: 'Мой GitHub',
    email: 'Написать письмо',
    projectDescriptions: [
      'iOS-приложение на SwiftUI и Supabase.',
      'UNO в консольной версии.',
      'Веб-проект на HTML, CSS и JavaScript.'
    ],
    menuOpen: 'Открыть меню',
    menuClose: 'Закрыть меню'
  }
}

const t = computed(() => translations[language.value])

const projects = [
  {
    id: 'yoganow',
    title: 'YogaNow Studio',
    type: 'iOS APP',
    area: 'mobile',
    image: '/images/yoganow.jpg',
    stack: 'Swift · SwiftUI · Supabase'
  },
  {
    id: 'uno',
    title: 'UNO',
    type: 'CARD GAME',
    area: 'game',
    image: '/images/uno.jpg',
    stack: 'Java · JavaScript'
  },
  {
    id: 'kaffeehaus',
    title: 'Kaffeehaus',
    type: 'WEB PROJECT',
    area: 'web',
    image: '/images/kaffeehaus.jpg',
    stack: 'HTML · CSS · JavaScript'
  }
] as const

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
    .map((project, index) => ({ ...project, description: t.value.projectDescriptions[index] }))
    .filter((project) => {
      const stack = project.stack.split(' · ')
      const matchesTechnology = selectedTechnologies.value.length === 0
        || selectedTechnologies.value.some((item) => stack.includes(item))
      const matchesArea = !selectedArea.value || project.area === selectedArea.value
      return matchesArea && matchesTechnology
    })
})

function selectProjectArea(area: ProjectArea | '') {
  selectedArea.value = area
  if (area) selectedTechnologies.value = []
}

function toggleTechnology(option: string) {
  if (!option) {
    selectedTechnologies.value = []
    return
  }

  selectedArea.value = ''
  const selected = selectedTechnologies.value
  selectedTechnologies.value = selected.includes(option)
    ? selected.filter((item) => item !== option)
    : [...selected, option]
}

function resetProjectFilters() {
  selectedArea.value = ''
  selectedTechnologies.value = []
}

async function openProject(event: MouseEvent, id: string) {
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

const skills = [
  { name: 'Vue 3', icon: 'vuedotjs', color: '42B883' },
  { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
  { name: 'JavaScript', icon: 'javascript', color: 'B99B00' },
  { name: 'PHP', icon: 'php', color: '777BB4' },
  { name: 'SQL', icon: 'mysql', color: '4479A1' },
  { name: 'Docker', icon: 'docker', color: '2496ED' },
  { name: 'Git', icon: 'git', color: 'F05032' },
  { name: 'SwiftUI', icon: 'swift', color: 'F05138' }
]

const values = [
  { symbol: '⌘', label: 'Code' },
  { symbol: '↗', label: 'Create' },
  { symbol: '♡', label: 'Learn' },
  { symbol: '⟳', label: 'Repeat' }
]

// Hier später deine bestätigten Kontaktdaten eintragen.
const githubUrl = 'https://github.com/ekschedl'
const emailAddress = ''

function changeLanguage(next: Language) {
  language.value = next
  updatePageLanguage()
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
</script>

<template>
  <div class="page">
    <header class="header">
      <a :href="homeLink('#home')" class="logo" @click="closeMenu">
        ek<span>.</span>
      </a>

      <nav
        id="main-navigation"
        class="navigation"
        :class="{ open: menuOpen }"
        :aria-label="t.navigationLabel"
      >
        <a :href="homeLink('#home')" @click="closeMenu">{{ t.nav[0] }}</a>
        <a :href="homeLink('#projects')" @click="closeMenu">{{ t.nav[1] }}</a>
        <a :href="homeLink('#technologies')" @click="closeMenu">{{ t.nav[2] }}</a>
        <a :href="homeLink('#about')" @click="closeMenu">{{ t.nav[3] }}</a>
        <a :href="educationPath" :aria-current="isEducation ? 'page' : undefined" @click="closeMenu">
          {{ educationLabels[language] }}
        </a>
        <a :href="experiencePath" :aria-current="isExperience ? 'page' : undefined" @click="closeMenu">
          {{ experienceLabels[language] }}
        </a>
      </nav>

      <div class="header-actions">
        <div class="languages" role="group" :aria-label="t.languageLabel">
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
          :aria-label="t.darkMode"
          :aria-pressed="darkMode"
          :title="t.darkMode"
          @click="darkMode = !darkMode"
        >
          <span aria-hidden="true">{{ darkMode ? '☾' : '☼' }}</span>
        </button>

        <a class="header-contact" :href="homeLink('#contact')">
          {{ t.contact }} <span aria-hidden="true">↗</span>
        </a>

        <button
          class="menu-button"
          type="button"
          :aria-label="menuOpen ? t.menuClose : t.menuOpen"
          aria-controls="main-navigation"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          {{ menuOpen ? '✕' : '☰' }}
        </button>
      </div>
    </header>

    <EducationPage v-if="isEducation" :language="language" />
    <ExperiencePage v-else-if="isExperience" :language="language" />
    <main v-else>
      <!-- HERO BENTO -->
      <section id="home" class="hero-grid">
        <div class="tile portrait-tile">
          <div class="portrait-orbit orbit-one"></div>
          <div class="portrait-orbit orbit-two"></div>
          <span class="portrait-spark" aria-hidden="true">✳</span>

          <img
            src="/images/ekaterina-cutout.png"
            alt="Ekaterina Schedlberger"
            class="portrait-image"
            fetchpriority="high"
          />
        </div>

        <a href="#projects" class="tile intro-tile" :aria-label="t.nav[1]">
          <div>
            <span class="eyebrow">HELLO, I'M</span>
            <h1>Ekaterina<span>.</span></h1>
            <h2>{{ t.role }}</h2>
            <p class="location">{{ t.location }}</p>
          </div>

          <div class="intro-bottom">
            <p>{{ t.heroNote }}</p>
            <span class="round-arrow" aria-hidden="true">↗</span>
          </div>
        </a>

        <a
          v-for="project in projects"
          :key="project.id"
          :href="'#' + project.id"
          @click="openProject($event, project.id)"
          class="tile project-tile"
          :data-area="project.area"
          :class="'tile-' + project.id"
        >
          <span class="tile-type">{{ project.type }}</span>

          <div class="tile-project-image">
            <img :src="project.image" :alt="project.title" loading="lazy" />
          </div>

          <div class="tile-bottom">
            <h3>{{ project.title }}</h3>
            <span aria-hidden="true">↗</span>
          </div>
        </a>

        <a href="#technologies" class="tile expertise-tile">
          <span class="tile-type">WHAT I USE</span>
          <h3>{{ t.nav[2] }}</h3>
          <div class="expertise-preview">
            <span>Vue 3</span>
            <span>TypeScript</span>
            <span>PHP</span>
            <span>+ more</span>
          </div>
          <span class="tile-corner-arrow" aria-hidden="true">↗</span>
        </a>

        <a href="#about" class="tile about-tile">
          <span class="tile-type">A LITTLE ABOUT ME</span>
          <h3>{{ t.about }}</h3>
          <p>{{ t.aboutShort }}</p>
          <span class="tile-corner-arrow" aria-hidden="true">↗</span>
        </a>
      </section>

      <!-- 01 / PORTFOLIO -->
      <section id="projects" class="section projects-section">
        <div class="section-head">
          <span class="section-number">01 / PORTFOLIO</span>
          <h2>{{ t.projectsTitle }}</h2>
          <p>{{ t.projectsIntro }}</p>
        </div>

        <div class="project-controls" role="group" :aria-label="t.filterOptions">
          <div class="project-filter-header">
            <button
              class="reset-filters"
              type="button"
              :disabled="!selectedArea && !selectedTechnologies.length"
              @click="resetProjectFilters"
            >
              {{ t.reset }}
            </button>
          </div>
          <fieldset class="project-technology-filters" :class="{ 'filter-group-active': selectedArea }">
            <legend>{{ t.areaFilter }}</legend>
            <div class="project-filter-buttons">
              <button
                v-for="area in (['', ...projectAreas] as const)"
                :key="area"
                type="button"
                :data-area="area"
                :aria-pressed="area ? selectedArea === area : !selectedArea && !selectedTechnologies.length"
                @click="selectProjectArea(area)"
              >
                {{ area ? t.areas[area] : t.allAreas }}
              </button>
            </div>
          </fieldset>

          <div class="project-filter-divider">{{ t.filterOr }}</div>

          <fieldset class="project-technology-filters" :class="{ 'filter-group-active': selectedTechnologies.length }">
            <legend>{{ t.filter }}</legend>
            <div class="project-filter-buttons">
              <button
                v-for="option in ['', ...projectTechnologies]"
                :key="option"
                type="button"
                :data-area="technologyAreas.get(option)"
                :aria-pressed="option ? selectedTechnologies.includes(option) : !selectedTechnologies.length && !selectedArea"
                @click="toggleTechnology(option)"
              >
                {{ option || t.allTechnologies }}
              </button>
            </div>
          </fieldset>
        </div>

        <div role="status">
          <p v-if="!visibleProjects.length" class="project-empty">{{ t.noResults }}</p>
        </div>
        <div v-if="visibleProjects.length" class="projects-grid">
          <article
            v-for="project in visibleProjects"
            :id="project.id"
            :key="project.id"
            class="project-card"
          >
            <div class="project-visual" :data-area="project.area">
              <img :src="project.image" :alt="project.title" loading="lazy" />
            </div>

            <div class="project-meta">
              <div>
                <span class="project-type project-area" :data-area="project.area">{{ t.areas[project.area] }}</span>
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <span class="project-stack">{{ project.stack }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 02 / TECHNOLOGIES -->
      <section id="technologies" class="section technologies-section">
        <div class="section-head">
          <span class="section-number">02 / TECHNOLOGIES</span>
          <h2>{{ t.technologiesTitle }}</h2>
          <p>{{ t.technologiesIntro }}</p>
        </div>

        <div class="tech-list">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="tech-item"
          >
            <img
              :src="`https://cdn.simpleicons.org/${skill.icon}/${skill.color}`"
              alt=""
              loading="lazy"
            />
            <span>{{ skill.name }}</span>
          </div>
        </div>
      </section>

      <!-- 03 / ABOUT ME -->
      <section id="about" class="section about-section">
        <div class="about-layout">
          <div class="section-head">
            <span class="section-number">03 / ABOUT ME</span>
            <h2>{{ t.aboutTitle }}</h2>
          </div>

          <div class="about-content">
            <p>{{ t.aboutText }}</p>

            <div class="values-line">
              <div
                v-for="value in values"
                :key="value.label"
                class="value-item"
              >
                <span aria-hidden="true">{{ value.symbol }}</span>
                <strong>{{ value.label }}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 / SAY HELLO -->
      <section id="contact" class="section contact-section">
        <div class="contact-copy">
          <span class="section-number">04 / SAY HELLO</span>
          <h2>{{ t.helloTitle }}</h2>
          <p>{{ t.helloText }}</p>

          <div class="contact-actions">
            <a
              v-if="emailAddress"
              :href="`mailto:${emailAddress}`"
              class="primary-link"
            >
              {{ t.email }} <span aria-hidden="true">↗</span>
            </a>

            <a
              :href="githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="secondary-link"
            >
              {{ t.github }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div class="contact-art" aria-hidden="true">
          <span class="art-code">&lt;/&gt;</span>
          <span class="art-star">✳</span>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span>© 2026 Ekaterina Schedlberger</span>
      <span>Made with Vue 3 + curiosity.</span>
    </footer>
  </div>
</template>

<style scoped>
.project-filter-header {
  display: flex;
  flex: 1 1 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
}

.project-filter-divider {
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  gap: 12px;
  color: var(--muted);
  font-size: 13px;
}

.project-filter-divider::before,
.project-filter-divider::after {
  flex: 1;
  border-top: 1px solid var(--line);
  content: '';
}

.project-filter-header button:disabled {
  background: var(--surface);
  color: var(--muted);
  cursor: default;
}

.project-technology-filters {
  flex: 1 1 100%;
  min-width: 0;
  margin: 0;
  padding: 8px 14px 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
}

.project-technology-filters.filter-group-active {
  border-color: var(--accent);
  background: var(--surface);
}

.project-technology-filters legend {
  padding: 0 6px;
  font-size: 14px;
  font-weight: 600;
}

.project-filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-filter-buttons button {
  padding: 8px 12px;
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

[data-area='game'] {
  --area-color: var(--lilac);
}

[data-area='web'] {
  --area-color: var(--slate);
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
</style>
