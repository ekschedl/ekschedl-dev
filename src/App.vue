<!-- Hauptansicht der Website. Verbindet Navigation, Portfolio, Unterseiten und das Pixel-Fenster. -->
<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import EducationPage from './pages/EducationPage.vue'
import ExperiencePage from './pages/ExperiencePage.vue'
import { useI18n } from 'vue-i18n'
import Assistant from './pixel/Assistant.vue'
import LegalPage from './pages/LegalPage.vue'
import ContactSection from './components/ContactSection.vue'
import AboutSection from './components/AboutSection.vue'
import TechnologiesSection from './components/TechnologiesSection.vue'
import ProjectGallery from './components/ProjectGallery.vue'
import HeroSection from './components/HeroSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'

import { cvPath } from './data/portfolioData'
import type { projectGalleries } from './data/projectGalleries'

const { locale, t } = useI18n({ useScope: 'global' })

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

const darkMode = ref(false)
const portfolioSectionRef = ref<InstanceType<typeof PortfolioSection> | null>(null)
const projectGalleryRef = ref<InstanceType<typeof ProjectGallery> | null>(null)

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

function openProjectGallery(
  project: keyof typeof projectGalleries,
  startAt = 0
) {
  projectGalleryRef.value?.openProjectGallery(project, startAt)
}

function openDemoSettings() {
  projectGalleryRef.value?.openDemoSettings()
}

async function openProject(event: MouseEvent, id: string) {
  const portfolio = portfolioSectionRef.value
  if (!portfolio || portfolio.isProjectVisible(id)) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  event.preventDefault()
  portfolio.resetProjectFilters()
  await nextTick()

  const hash = '#' + id
  if (window.location.hash === hash) {
    document.getElementById(id)?.scrollIntoView()
  } else {
    window.location.hash = hash
  }
}

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
          <a class="header-contact" :href="homeLink('#contact')" :aria-label="t('email')" :title="t('email')">
            <span class="header-contact-label">{{ t('contact') }}</span>
            <span class="header-contact-arrow" aria-hidden="true">↗</span>
            <svg class="header-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
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
      <HeroSection @open-project="openProject" />

      <!-- 01 / PORTFOLIO -->
      <PortfolioSection ref="portfolioSectionRef" @open-gallery="openProjectGallery" />

      <!-- 02 / TECHNOLOGIES -->
      <TechnologiesSection />

      <!-- 03 / ABOUT ME -->
      <AboutSection />

      <!-- 04 / SAY HELLO   -->
       <ContactSection />
    </main>

    <ProjectGallery ref="projectGalleryRef" :home-href="homeLink('#home')" />

    <footer class="footer">
      <span>{{ t('footerCopyright') }}</span>
      <span>{{ t('footerMade') }}</span>
      <nav class="footer-legal" :aria-label="t('legal.navigation')">
        <a :href="imprintPath" :aria-current="legalPage === 'imprint' ? 'page' : undefined">{{ t('legal.imprint') }}</a>
        <a :href="privacyPath" :aria-current="legalPage === 'privacy' ? 'page' : undefined">{{ t('legal.privacy') }}</a>
        <button type="button" @click="openDemoSettings">{{ t('legal.demoSettings') }}</button>
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

.header-contact-icon {
  display: none;
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
    padding-block-end: calc(64px + var(--floating-control-bottom));
  }

  .footer-legal :is(a, button) {
    display: inline-flex;
    align-items: center;
    min-block-size: 44px;
  }
}

.back-to-top {
  position: fixed;
  z-index: 40;
  right: clamp(10px, 2vw, 24px);
  bottom: var(--floating-control-bottom);
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
  .header-contact {
    width: 40px;
    min-width: 40px;
    height: 40px;
    padding: 0;
  }

  .header-contact .header-contact-label,
  .header-contact .header-contact-arrow {
    display: none;
  }

  .header-contact-icon {
    display: block;
    width: 18px;
    height: 18px;
  }

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

  .header-contact,
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
