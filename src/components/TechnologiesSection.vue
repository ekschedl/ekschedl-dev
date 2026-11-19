<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { skillGroups } from '../data/portfolioData'

const { t } = useI18n({ useScope: 'global' })

type SkillGroupKey =
  | 'programming'
  | 'apps'
  | 'tools'
  | 'ai'
  | 'study'

const selectedSkillGroups = ref<SkillGroupKey[]>([])

const filterableSkillGroupKeys: SkillGroupKey[] = [
  'programming',
  'apps',
  'tools',
  'ai'
]

function toggleSkillGroup(key?: SkillGroupKey) {
  if (!key) {
    selectedSkillGroups.value = []
    return
  }

  selectedSkillGroups.value =
    selectedSkillGroups.value.includes(key)
      ? selectedSkillGroups.value.filter(
          selected => selected !== key
        )
      : [...selectedSkillGroups.value, key]
}

const visibleSkillGroups = computed(() =>
  skillGroups.filter(group =>
    group.key === 'study' ||
    selectedSkillGroups.value.length === 0 ||
    selectedSkillGroups.value.includes(
      group.key as SkillGroupKey
    )
  )
)

function handleSkillIconLoad(event: Event) {
  const image = event.currentTarget as HTMLImageElement
  image.parentElement?.classList.add('has-icon')
}

function handleSkillIconError(event: Event) {
  (event.currentTarget as HTMLImageElement).hidden = true
}
</script>

<template>

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
</template>

<style scoped>
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

</style>