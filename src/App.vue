
<script setup lang="ts">
import { computed, ref } from 'vue'

type Language = 'DE' | 'EN' | 'RU'

const language = ref<Language>('DE')
const menuOpen = ref(false)

const translations = {
  DE: {
    nav: ['Home', 'Projekte', 'Expertise', 'Über mich'],
    contact: 'Kontakt',
    role: 'Softwareentwicklerin',
    location: 'Graz, Österreich',
    description:
      'Ich entwickle Webanwendungen und Softwareprojekte mit Neugier, analytischem Denken und Liebe zum Detail.',
    viewProjects: 'Meine Projekte ansehen',
    viewAbout: 'Mehr über mich',
    projectIntro: 'Ausgewählte Projekte',
    allProjects: 'Meine Arbeiten',
    expertise: 'Meine Expertise',
    about: 'Über mich',
    aboutText:
      'Ich habe den akademischen Lehrgang Software-Entwicklung an der FH CAMPUS 02 abgeschlossen und bei JAWA praktische Erfahrung in der Webentwicklung gesammelt. Mich begeistert es, Zusammenhänge zu verstehen, Lösungen zu entwickeln und kontinuierlich Neues zu lernen.',
    contactTitle: 'Lass uns zusammenarbeiten.',
    contactText:
      'Ich freue mich über interessante Projekte und berufliche Möglichkeiten in der Softwareentwicklung.',
    projectDescriptions: [
      'iOS-App für Yoga und Achtsamkeit',
      'Kartenspiel mit Java und JavaScript',
      'Website für ein Kaffeehaus'
    ]
  },
  EN: {
    nav: ['Home', 'Projects', 'Expertise', 'About me'],
    contact: 'Contact',
    role: 'Software Developer',
    location: 'Graz, Austria',
    description:
      'I develop web applications and software projects with curiosity, analytical thinking and attention to detail.',
    viewProjects: 'Explore my projects',
    viewAbout: 'About me',
    projectIntro: 'Selected Projects',
    allProjects: 'My Work',
    expertise: 'My Expertise',
    about: 'About me',
    aboutText:
      'I completed an academic Software Development programme at FH CAMPUS 02 and gained practical experience in web development at JAWA. I enjoy understanding how things work, developing solutions and continuously learning.',
    contactTitle: "Let's work together.",
    contactText:
      'I am open to interesting projects and career opportunities in software development.',
    projectDescriptions: [
      'iOS app for yoga and mindfulness',
      'Card game built with Java and JavaScript',
      'Website for a coffee shop'
    ]
  },
  RU: {
    nav: ['Главная', 'Проекты', 'Навыки', 'Обо мне'],
    contact: 'Контакт',
    role: 'Разработчик ПО',
    location: 'Грац, Австрия',
    description:
      'Я разрабатываю веб-приложения и программные проекты, сочетая любознательность, аналитическое мышление и внимание к деталям.',
    viewProjects: 'Мои проекты',
    viewAbout: 'Обо мне',
    projectIntro: 'Избранные проекты',
    allProjects: 'Мои работы',
    expertise: 'Мои навыки',
    about: 'Обо мне',
    aboutText:
      'Я окончила академическую программу Software Development в FH CAMPUS 02 и получила практический опыт веб-разработки в JAWA. Мне нравится разбираться в сложных задачах, находить решения и постоянно изучать новое.',
    contactTitle: 'Давайте работать вместе.',
    contactText:
      'Я открыта к интересным проектам и профессиональным возможностям в разработке программного обеспечения.',
    projectDescriptions: [
      'iOS-приложение для йоги и осознанности',
      'Карточная игра на Java и JavaScript',
      'Сайт для кофейни'
    ]
  }
}

const t = computed(() => translations[language.value])

const projects = [
  {
    id: 'yoganow',
    number: '01',
    title: 'YogaNow Studio',
    stack: ['Swift', 'SwiftUI', 'Supabase'],
    image: '/images/yoganow.jpg'
  },
  {
    id: 'uno',
    number: '02',
    title: 'UNO',
    stack: ['Java', 'JavaScript'],
    image: '/images/uno.jpg'
  },
  {
    id: 'kaffeehaus',
    number: '03',
    title: 'Kaffeehaus',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/kaffeehaus.jpg'
  }
]

const skills = [
  'Vue.js',
  'TypeScript',
  'JavaScript',
  'PHP',
  'SQL',
  'Docker',
  'Git',
  'Swift / SwiftUI'
]

function changeLanguage(lang: Language) {
  language.value = lang
  document.documentElement.lang = lang.toLowerCase()
  menuOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <div class="page">
    <!-- HEADER -->
    <header class="header">
      <a class="logo" href="#home" @click="closeMenu">
        EK<span>.</span>
      </a>

      <nav
        id="main-navigation"
        :class="['navigation', { open: menuOpen }]"
        aria-label="Main navigation"
      >
        <a href="#home" @click="closeMenu">
          {{ t.nav[0] }}
        </a>
        <a href="#projects" @click="closeMenu">
          {{ t.nav[1] }}
        </a>
        <a href="#expertise" @click="closeMenu">
          {{ t.nav[2] }}
        </a>
        <a href="#about" @click="closeMenu">
          {{ t.nav[3] }}
        </a>
      </nav>

      <div class="header-actions">
        <div class="languages" aria-label="Language">
          <button
            v-for="lang in (['DE', 'EN', 'RU'] as const)"
            :key="lang"
            type="button"
            :class="{ active: language === lang }"
            :aria-pressed="language === lang"
            @click="changeLanguage(lang)"
          >
            {{ lang }}
          </button>
        </div>

        <a class="contact-button" href="#contact">
          {{ t.contact }}
          <span aria-hidden="true">↗</span>
        </a>

        <button
          class="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-controls="main-navigation"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          {{ menuOpen ? '✕' : '☰' }}
        </button>
      </div>
    </header>

    <main>
      <!-- HERO -->
      <section id="home" class="hero">
        <div class="hero-portrait">
          <div class="portrait-shape"></div>

          <img
            src="/images/ekaterina-cutout.png"
            alt="Ekaterina Schedlberger"
            class="portrait"
          />
        </div>

        <div class="hero-content">
          <div class="hero-eyebrow">
            <span class="eyebrow-line"></span>
            {{ t.role }} / {{ t.location }}
          </div>

          <h1>
            Ekaterina<br />
            Schedlberger<span>.</span>
          </h1>

          <p class="hero-description">
            {{ t.description }}
          </p>

          <div class="hero-buttons">
            <a href="#projects" class="primary-button">
              {{ t.viewProjects }}
              <span aria-hidden="true">↗</span>
            </a>

            <a href="#about" class="secondary-button">
              {{ t.viewAbout }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div class="hero-expertise">
          <div class="expertise-item">
            <span class="expertise-icon">&lt;/&gt;</span>
            <div>
              <strong>Web Development</strong>
              <small>Vue · TypeScript · PHP</small>
            </div>
          </div>

          <div class="expertise-item">
            <span class="expertise-icon">▤</span>
            <div>
              <strong>Backend & Datenbanken</strong>
              <small>PHP · SQL · REST</small>
            </div>
          </div>

          <div class="expertise-item">
            <span class="expertise-icon">◇</span>
            <div>
              <strong>App Development</strong>
              <small>Swift · SwiftUI</small>
            </div>
          </div>
        </div>
      </section>

      <!-- PROJECTS -->
      <section id="projects" class="projects-section">
        <div class="section-top">
          <div>
            <span class="section-kicker">01 / PORTFOLIO</span>
            <h2>{{ t.projectIntro }}</h2>
          </div>

          <span class="section-count">2026 / 03</span>
        </div>

        <div class="project-grid">
          <article
            v-for="(project, index) in projects"
            :id="project.id"
            :key="project.id"
            class="project-card"
            :class="'project-' + project.id"
          >
            <div class="project-visual">
              <img
                :src="project.image"
                :alt="project.title"
                loading="lazy"
              />
            </div>

            <div class="project-body">
              <div class="project-meta">
                <span>PROJECT / {{ project.number }}</span>
                <span class="project-arrow" aria-hidden="true">↗</span>
              </div>

              <h3>{{ project.title }}</h3>

              <p>{{ t.projectDescriptions[index] }}</p>

              <div class="project-tags">
                <span
                  v-for="technology in project.stack"
                  :key="technology"
                >
                  {{ technology }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- EXPERTISE -->
      <section id="expertise" class="expertise-section">
        <div class="section-top">
          <div>
            <span class="section-kicker">02 / TECHNOLOGIES</span>
            <h2>{{ t.expertise }}</h2>
          </div>
        </div>

        <div class="skills">
          <span v-for="skill in skills" :key="skill">
            {{ skill }}
          </span>
        </div>
      </section>

      <!-- ABOUT -->
      <section id="about" class="about-section">
        <div class="about-heading">
          <span class="section-kicker">03 / MY JOURNEY</span>
          <h2>{{ t.about }}</h2>
        </div>

        <div class="about-content">
          <p>{{ t.aboutText }}</p>
          <a href="#contact" class="text-link">
            {{ t.contact }} ↗
          </a>
        </div>
      </section>

      <!-- CONTACT -->
      <section id="contact" class="contact-section">
        <span class="section-kicker">04 / CONTACT</span>

        <h2>{{ t.contactTitle }}</h2>
        <p>{{ t.contactText }}</p>

        <a
          href="https://github.com/ekschedl"
          target="_blank"
          rel="noopener noreferrer"
          class="primary-button"
        >
          GitHub ↗
        </a>
      </section>
    </main>

    <footer class="footer">
      <span>© 2026 Ekaterina Schedlberger</span>
      <span>Vue 3 · TypeScript</span>
      <a href="#home">↑ TOP</a>
    </footer>
  </div>
</template>
