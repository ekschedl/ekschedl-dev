
<script setup lang="ts">
import { computed, ref } from 'vue'

type Language = 'DE' | 'EN' | 'RU'

const language = ref<Language>('DE')
const menuOpen = ref(false)

const translations = {
  DE: {
    nav: ['Start', 'Projekte', 'Skills', 'Über mich'],
    contact: 'Kontakt',
    available: 'Offen für neue Möglichkeiten',
    eyebrow: 'HELLO, WORLD! / PORTFOLIO 2026',
    role: 'Softwareentwicklerin',
    location: 'Graz, Österreich',
    intro:
      'Ich liebe es, Ideen in funktionierende Software zu verwandeln. Mit Neugier, Kreativität und Freude am Code entwickle ich digitale Lösungen, die Menschen gerne nutzen.',
    projectsButton: 'Projekte entdecken',
    aboutButton: 'Mehr über mich',
    selectedProjects: 'Projekte, die ich gebaut habe',
    projectLabel: 'SELECTED WORK',
    viewProject: 'Projekt ansehen',
    expertise: 'Mein Tech-Stack',
    expertiseIntro:
      'Technologien, mit denen ich arbeite, experimentiere und mich weiterentwickle.',
    about: 'Neugier treibt mich an.',
    aboutText:
      'Ich habe den akademischen Lehrgang Software-Entwicklung an der FH CAMPUS 02 abgeschlossen und bei JAWA praktische Erfahrung in der Webentwicklung gesammelt. Ich möchte verstehen, wie Software funktioniert – vom ersten Konzept bis zum fertigen Produkt. Besonders gerne verbinde ich logisches Denken mit kreativem Gestalten.',
    contactTitle: 'Eine Idee? Lass uns reden.',
    contactText:
      'Ich freue mich über neue Projekte, spannende Teams und Möglichkeiten, gemeinsam gute Software zu entwickeln.',
    projectsDetail: 'Ein Blick in meine Projekte',
    descriptions: [
      'Eine iOS-App für Yoga und Achtsamkeit.',
      'Das bekannte Kartenspiel als Programmierprojekt.',
      'Eine Website für ein Kaffeehaus.'
    ],
    learning: 'Immer neugierig. Immer am Lernen.',
    top: 'Nach oben',
    menu: 'Navigation öffnen',
    closeMenu: 'Navigation schließen'
  },

  EN: {
    nav: ['Home', 'Projects', 'Skills', 'About'],
    contact: 'Contact',
    available: 'Open to opportunities',
    eyebrow: 'HELLO, WORLD! / PORTFOLIO 2026',
    role: 'Software Developer',
    location: 'Graz, Austria',
    intro:
      'I love turning ideas into working software. With curiosity, creativity and a passion for coding, I build digital solutions that people enjoy using.',
    projectsButton: 'Explore projects',
    aboutButton: 'About me',
    selectedProjects: 'Things I have built',
    projectLabel: 'SELECTED WORK',
    viewProject: 'View project',
    expertise: 'My tech stack',
    expertiseIntro:
      'Technologies I work with, experiment with and continue to learn.',
    about: 'Driven by curiosity.',
    aboutText:
      'I completed an academic Software Development programme at FH CAMPUS 02 and gained practical web development experience at JAWA. I want to understand how software works, from the first concept to the finished product. I especially enjoy combining logical thinking with creative design.',
    contactTitle: "Have an idea? Let's talk.",
    contactText:
      'I am interested in new projects, inspiring teams and opportunities to build great software together.',
    projectsDetail: 'Inside my projects',
    descriptions: [
      'An iOS app for yoga and mindfulness.',
      'The classic card game as a programming project.',
      'A website for a coffee shop.'
    ],
    learning: 'Always curious. Always learning.',
    top: 'Back to top',
    menu: 'Open navigation',
    closeMenu: 'Close navigation'
  },

  RU: {
    nav: ['Главная', 'Проекты', 'Навыки', 'Обо мне'],
    contact: 'Контакт',
    available: 'Открыта к новым возможностям',
    eyebrow: 'HELLO, WORLD! / PORTFOLIO 2026',
    role: 'Разработчик ПО',
    location: 'Грац, Австрия',
    intro:
      'Мне нравится превращать идеи в работающие программы. С любознательностью, творческим подходом и любовью к коду я создаю цифровые решения, которыми приятно пользоваться.',
    projectsButton: 'Посмотреть проекты',
    aboutButton: 'Обо мне',
    selectedProjects: 'Проекты, которые я создала',
    projectLabel: 'SELECTED WORK',
    viewProject: 'Посмотреть проект',
    expertise: 'Мой стек технологий',
    expertiseIntro:
      'Технологии, с которыми я работаю, экспериментирую и продолжаю учиться.',
    about: 'Меня вдохновляет любознательность.',
    aboutText:
      'Я окончила академическую программу Software Development в FH CAMPUS 02 и получила практический опыт веб-разработки в JAWA. Мне интересно понимать, как работает программное обеспечение — от первой идеи до готового продукта. Особенно мне нравится сочетать логическое мышление и творческий подход.',
    contactTitle: 'Есть идея? Давайте обсудим.',
    contactText:
      'Я открыта к новым проектам, интересным командам и возможностям вместе создавать качественное программное обеспечение.',
    projectsDetail: 'Подробнее о проектах',
    descriptions: [
      'iOS-приложение для йоги и осознанности.',
      'Классическая карточная игра как учебный проект.',
      'Веб-сайт для кофейни.'
    ],
    learning: 'Всегда любознательна. Всегда учусь.',
    top: 'Наверх',
    menu: 'Открыть навигацию',
    closeMenu: 'Закрыть навигацию'
  }
}

const t = computed(() => translations[language.value])

const projects = [
  {
    id: 'yoganow',
    number: '01',
    title: 'YogaNow Studio',
    image: '/images/yoganow.jpg',
    category: 'iOS APPLICATION',
    stack: ['Swift', 'SwiftUI', 'Supabase'],
    symbol: '{ }'
  },
  {
    id: 'uno',
    number: '02',
    title: 'UNO',
    image: '/images/uno.jpg',
    category: 'GAME DEVELOPMENT',
    stack: ['Java', 'JavaScript'],
    symbol: '</>'
  },
  {
    id: 'kaffeehaus',
    number: '03',
    title: 'Kaffeehaus',
    image: '/images/kaffeehaus.jpg',
    category: 'WEB DEVELOPMENT',
    stack: ['HTML', 'CSS', 'JavaScript'],
    symbol: '( )'
  }
]

const skills = [
  'Vue 3',
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
  <div class="site">
    <div class="portfolio-shell">
      <!-- SIDEBAR -->
      <aside
        id="sidebar-navigation"
        class="sidebar"
        :class="{ 'sidebar-open': menuOpen }"
      >
        <a href="#home" class="sidebar-logo" @click="closeMenu">
          EK<span>.</span>
        </a>

        <div class="sidebar-line">
          <span>DESIGN</span>
          <span>+</span>
          <span>CODE</span>
        </div>

        <nav class="sidebar-nav" aria-label="Main navigation">
          <a href="#home" @click="closeMenu">
            <span class="nav-number">01</span>
            {{ t.nav[0] }}
          </a>

          <a href="#projects" @click="closeMenu">
            <span class="nav-number">02</span>
            {{ t.nav[1] }}
          </a>

          <a href="#expertise" @click="closeMenu">
            <span class="nav-number">03</span>
            {{ t.nav[2] }}
          </a>

          <a href="#about" @click="closeMenu">
            <span class="nav-number">04</span>
            {{ t.nav[3] }}
          </a>
        </nav>

        <div class="sidebar-decoration" aria-hidden="true">
          <span>&lt;code&gt;</span>
          <span>create.</span>
          <span>learn.</span>
          <span>repeat.</span>
          <span>&lt;/code&gt;</span>
        </div>

        <div class="sidebar-bottom">
          <div class="sidebar-languages" aria-label="Language">
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

          <a
            href="#contact"
            class="sidebar-contact"
            @click="closeMenu"
          >
            {{ t.contact }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </aside>

      <!-- MOBILE HEADER -->
      <header class="mobile-header">
        <a href="#home" class="mobile-logo" @click="closeMenu">
          EK<span>.</span>
        </a>

        <button
          type="button"
          class="mobile-menu-button"
          :aria-label="menuOpen ? t.closeMenu : t.menu"
          aria-controls="sidebar-navigation"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          {{ menuOpen ? '✕' : '☰' }}
        </button>
      </header>

      <!-- MAIN -->
      <div class="main-area">
        <main>
          <!-- HERO -->
          <section id="home" class="hero-section">
            <div class="hero-topline">
              <span class="hero-eyebrow">
                {{ t.eyebrow }}
              </span>

              <span class="availability">
                <span class="availability-dot"></span>
                {{ t.available }}
              </span>
            </div>

            <div class="hero-copy">
              <h1>
                Ekaterina<span>.</span>
              </h1>

              <div class="hero-role">
                <span class="role-symbol" aria-hidden="true">
                  &lt;/&gt;
                </span>

                <div>
                  <h2>{{ t.role }}</h2>
                  <p class="hero-location">
                    {{ t.location }}
                  </p>
                </div>
              </div>

              <p class="hero-description">
                {{ t.intro }}
              </p>

              <div class="hero-buttons">
                <a href="#projects" class="primary-button">
                  {{ t.projectsButton }}
                  <span aria-hidden="true">↗</span>
                </a>

                <a href="#about" class="secondary-button">
                  {{ t.aboutButton }}
                </a>
              </div>
            </div>

            <!-- SUBTLE CODE DETAIL -->
            <div class="hero-code" aria-hidden="true">
              <span>const passion = 'coding';</span>
              <span>const mindset = 'curious';</span>
              <span>buildSomethingGreat();</span>
            </div>

            <!-- PORTRAIT + PROJECTS -->
            <div id="projects" class="hero-showcase">
              <div class="portrait-card">
                <div class="portrait-circle"></div>

                <div class="portrait-code" aria-hidden="true">
                  <span>&lt;developer</span>
                  <span>&nbsp; creativity="true"</span>
                  <span>/&gt;</span>
                </div>

                <img
                  src="/images/ekaterina-cutout.png"
                  alt="Ekaterina Schedlberger"
                  class="portrait"
                  fetchpriority="high"
                />

                <span class="portrait-corner" aria-hidden="true">
                  ✳
                </span>
              </div>

              <div class="showcase-projects">
                <div class="showcase-heading">
                  <span>{{ t.projectLabel }}</span>
                  <span>01 — 03</span>
                </div>

                <a
                  v-for="project in projects"
                  :key="project.id"
                  :href="'#detail-' + project.id"
                  class="showcase-card"
                >
                  <span class="showcase-number">
                    {{ project.number }}
                  </span>

                  <div class="showcase-info">
                    <span class="showcase-category">
                      {{ project.category }}
                    </span>

                    <h3>{{ project.title }}</h3>

                    <p>{{ project.stack.join(' · ') }}</p>
                  </div>

                  <span class="showcase-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>

            <div class="hero-bottom-note">
              <span class="note-line"></span>
              <span>{{ t.learning }}</span>
              <span class="note-symbol" aria-hidden="true">
                ✳
              </span>
            </div>
          </section>

          <!-- EXPERTISE -->
          <section id="expertise" class="content-section expertise-section">
            <div class="section-heading">
              <span class="section-kicker">
                01 / TECHNOLOGIES
              </span>

              <h2>{{ t.expertise }}</h2>
              <p>{{ t.expertiseIntro }}</p>
            </div>

            <div class="skills">
              <span v-for="skill in skills" :key="skill">
                <span class="skill-dot" aria-hidden="true"></span>
                {{ skill }}
              </span>
            </div>
          </section>

          <!-- PROJECT DETAILS -->
          <section class="content-section details-section">
            <div class="section-heading">
              <span class="section-kicker">
                02 / PROJECTS
              </span>

              <h2>{{ t.projectsDetail }}</h2>
            </div>

            <div class="details-grid">
              <article
                v-for="(project, index) in projects"
                :id="'detail-' + project.id"
                :key="project.id"
                class="detail-card"
              >
                <div class="detail-image">
                  <img
                    :src="project.image"
                    :alt="project.title"
                    loading="lazy"
                  />

                  <span class="detail-image-symbol" aria-hidden="true">
                    {{ project.symbol }}
                  </span>
                </div>

                <div class="detail-content">
                  <span class="detail-number">
                    {{ project.number }} / {{ project.category }}
                  </span>

                  <h3>{{ project.title }}</h3>

                  <p>{{ t.descriptions[index] }}</p>

                  <div class="detail-tags">
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

          <!-- ABOUT -->
          <section id="about" class="content-section about-section">
            <div class="about-heading">
              <span class="section-kicker">
                03 / ABOUT ME
              </span>

              <h2>{{ t.about }}</h2>
            </div>

            <div class="about-content">
              <p>{{ t.aboutText }}</p>

              <div class="about-code" aria-hidden="true">
                <span>while (curious) {</span>
                <span>&nbsp; learn();</span>
                <span>&nbsp; create();</span>
                <span>}</span>
              </div>
            </div>
          </section>

          <!-- CONTACT -->
          <section id="contact" class="contact-section">
            <span class="section-kicker">
              04 / SAY HELLO
            </span>

            <h2>{{ t.contactTitle }}</h2>

            <p>{{ t.contactText }}</p>

            <a
              href="https://github.com/ekschedl"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-link"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>

            <span class="contact-decoration" aria-hidden="true">
              &lt;/&gt;
            </span>
          </section>
        </main>

        <footer class="footer">
          <span>© 2026 Ekaterina Schedlberger</span>
          <span>Made with curiosity & code.</span>
          <a href="#home">
            ↑ {{ t.top }}
          </a>
        </footer>
      </div>
    </div>
  </div>
</template>
