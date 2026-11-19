
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '../data/portfolioData'

const { t } = useI18n({ useScope: 'global' })

const portfolioName = computed(() => t('portfolioName'))

const latestProjects = computed(() =>
  [...projects]
    .sort((first, second) =>
      second.createdAt.localeCompare(first.createdAt)
    )
    .slice(0, 3)
    .map(project => ({
      ...project,
      title: t(`projectTitles.${project.id}`)
    }))
)

const emit = defineEmits<{
  (e: 'open-project', event: MouseEvent, id: string): void
}>()
</script>

<template>
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

        <!-- Auf dem Handy führt ein kompakter Portfolio-Block zur vollständigen Projektübersicht. -->
        <a href="#projects" class="tile mobile-portfolio-link">
          <span class="tile-type">{{ t('allProjectsLink') }}</span>
          <h3>{{ t('nav.1') }}</h3>
          <span class="tile-corner-arrow" aria-hidden="true">↗</span>
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
              @click="emit('open-project', $event, project.id)"
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
</template>

<style scoped>

.project-tile[data-area='mobile'] {
  --area-color: var(--mist);
}

.project-tile[data-area='web'] {
  --area-color: var(--slate);
}

.project-tile[data-area='backend'] {
  --area-color: #efb58f;
}

.project-tile[data-area='desktop'] {
  --area-color: var(--lilac);
}

:global(:root[data-theme='dark']) .project-tile[data-area='backend'] {
  --area-color: var(--blue);
}

.project-tile[data-area] {
  background: var(--area-color);
}

</style>
