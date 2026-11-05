
<script setup lang="ts">
import { computed, ref } from 'vue'

type Language = 'DE' | 'EN' | 'RU'

const language = ref<Language>('DE')
const menuOpen = ref(false)

const translations = {
  DE: {
    nav: ['Home', 'Projekte', 'Expertise', 'Über mich'],
    contact: 'KONTAKT',
    role: 'Softwareentwicklerin',
    location: 'Graz, Österreich',
    about: 'Über mich',
    aboutShort: 'Mein Weg, meine Erfahrungen und was mich antreibt.',
    aboutText:
      'Ich habe den akademischen Lehrgang Software-Entwicklung an der FH CAMPUS 02 abgeschlossen und bei JAWA praktische Erfahrung in der Webentwicklung gesammelt. Ich entwickle gerne Software, verstehe Zusammenhänge und lerne kontinuierlich dazu.',
    expertise: 'Expertise',
    projectsTitle: 'Ausgewählte Projekte',
    contactTitle: 'Lass uns zusammenarbeiten.',
    contactText:
      'Ich freue mich über interessante Projekte und Möglichkeiten in der Softwareentwicklung.',
    viewProjects: 'Projekte ansehen',
    viewAbout: 'Mehr über mich',
    projectDescriptions: [
      'iOS-App mit Swift, SwiftUI und Supabase',
      'Kartenspiel mit Java und JavaScript',
      'Webprojekt mit HTML, CSS und JavaScript'
    ]
  },
  EN: {
    nav: ['Home', 'Projects', 'Expertise', 'About me'],
    contact: "LET'S TALK",
    role: 'Software Developer',
    location: 'Graz, Austria',
    about: 'About me',
    aboutShort: 'My journey, my experience and what motivates me.',
    aboutText:
      'I completed an academic Software Development programme at FH CAMPUS 02 and gained practical experience in web development at JAWA. I enjoy developing software, understanding how things work and continuously learning.',
    expertise: 'Expertise',
    projectsTitle: 'Selected Projects',
    contactTitle: "Let's work together.",
    contactText:
      'I am open to interesting projects and opportunities in software development.',
    viewProjects: 'View projects',
    viewAbout: 'About me',
    projectDescriptions: [
      'iOS app with Swift, SwiftUI and Supabase',
      'Card game with Java and JavaScript',
      'Web project with HTML, CSS and JavaScript'
    ]
  },
  RU: {
    nav: ['Главная', 'Проекты', 'Навыки', 'Обо мне'],
    contact: 'КОНТАКТ',
    role: 'Разработчик ПО',
    location: 'Грац, Австрия',
    about: 'Обо мне',
    aboutShort: 'Мой путь, опыт и то, что меня вдохновляет.',
    aboutText:
      'Я окончила академическую программу Software Development в FH CAMPUS 02 и получила практический опыт веб-разработки в JAWA. Мне нравится создавать программы, разбираться в их устройстве и постоянно учиться.',
    expertise: 'Навыки',
    projectsTitle: 'Избранные проекты',
    contactTitle: 'Давайте работать вместе.',
    contactText:
      'Я открыта к интересным проектам и возможностям в разработке программного обеспечения.',
    viewProjects: 'Смотреть проекты',
    viewAbout: 'Обо мне',
    projectDescriptions: [
      'iOS-приложение на Swift, SwiftUI и Supabase',
      'Карточная игра на Java и JavaScript',
      'Веб-проект на HTML, CSS и JavaScript'
    ]
  }
}

const t = computed(() => translations[language.value])

const projects = [
  {
    id: 'yoganow',
    title: 'YogaNow Studio',
    subtitle: 'iOS App',
    stack: 'Swift · SwiftUI · Supabase',
    image: '/images/yoganow.jpg'
  },
  {
    id: 'uno',
    title: 'UNO',
    subtitle: 'Card Game',
    stack: 'Java · JavaScript',
    image: '/images/uno.jpg'
  },
  {
    id: 'kaffeehaus',
    title: 'Kaffeehaus',
    subtitle: 'Website',
    stack: 'HTML · CSS · JavaScript',
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
      <a href="#home" class="logo" @click="closeMenu">
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
          type="button"
          class="menu-button"
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
      <!-- BENTO STARTSEITE -->
      <section id="home" class="bento-grid">
        <!-- PORTRÄT LINKS -->
        <div class="bento portrait-card">
          <div class="portrait-decoration portrait-decoration-one"></div>
          <div class="portrait-decoration portrait-decoration-two"></div>

          <img
            src="/images/ekaterina-cutout.png"
            alt="Ekaterina Schedlberger"
            class="portrait"
          />
        </div>

        <!-- NAME RECHTS OBEN -->
        <div class="bento intro-card">
          <div class="intro-content">
            <h1>EKATERINA<span>.</span></h1>
            <h2>{{ t.role }}</h2>
            <p>{{ t.location }}</p>
          </div>

          <a
            href="#projects"
            class="circle-arrow"
            :aria-label="t.viewProjects"
          >
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <!-- DREI PROJEKTKACHELN -->
        <a
          v-for="project in projects"
          :key="project.id"
          :href="'#' + project.id"
          class="bento mini-project"
          :class="'mini-' + project.id"
        >
          <div class="mini-project-image">
            <img :src="project.image" :alt="project.title" />
          </div>

          <h3>{{ project.title }}</h3>
        </a>

        <!-- EXPERTISE -->
        <a href="#expertise" class="bento expertise-card">
          <h2>{{ t.expertise }}</h2>

          <div class="skill-preview">
            <span>Vue.js</span>
            <span>TypeScript</span>
            <span>Docker</span>
            <span>•••</span>
          </div>
        </a>

        <!-- ÜBER MICH -->
        <a href="#about" class="bento about-card">
          <h2>{{ t.about }}</h2>

          <p>{{ t.aboutShort }}</p>

          <span class="about-arrow" aria-hidden="true">→</span>
        </a>
      </section>

      <!-- PROJEKTE -->
      <section id="projects" class="content-section">
        <div class="section-heading">
          <span>01 / PORTFOLIO</span>
          <h2>{{ t.projectsTitle }}</h2>
        </div>

        <div class="project-grid">
          <article
            v-for="(project, index) in projects"
            :id="project.id"
            :key="project.id"
            class="project-detail"
          >
            <div class="project-image">
              <img
                :src="project.image"
                :alt="project.title"
                loading="lazy"
              />
            </div>

            <div class="project-info">
              <span>{{ project.subtitle }}</span>

              <h3>{{ project.title }}</h3>

              <p>{{ t.projectDescriptions[index] }}</p>

              <div class="project-stack">
                {{ project.stack }}
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- EXPERTISE -->
      <section id="expertise" class="content-section skills-section">
        <div class="section-heading">
          <span>02 / TECHNOLOGIES</span>
          <h2>{{ t.expertise }}</h2>
        </div>

        <div class="skills">
          <span v-for="skill in skills" :key="skill">
            {{ skill }}
          </span>
        </div>
      </section>

      <!-- ÜBER MICH -->
      <section id="about" class="content-section about-section">
        <div class="section-heading">
          <span>03 / MY JOURNEY</span>
          <h2>{{ t.about }}</h2>
        </div>

        <p class="about-description">
          {{ t.aboutText }}
        </p>
      </section>

      <!-- KONTAKT -->
      <section id="contact" class="content-section contact-section">
        <h2>{{ t.contactTitle }}</h2>

        <p>{{ t.contactText }}</p>

        <a
          href="https://github.com/ekschedl"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-link"
        >
          GitHub ↗
        </a>
      </section>
    </main>

    <footer>
      <span>© 2026 Ekaterina Schedlberger</span>
      <span>Vue 3 · TypeScript</span>
    </footer>
  </div>
</template>
