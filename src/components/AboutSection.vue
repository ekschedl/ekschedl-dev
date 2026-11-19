
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n({ useScope: 'global' })

const aboutSections = computed(() => tm('aboutSections'))

const values = [
  { symbol: '⌘' },
  { symbol: '↗' },
  { symbol: '♡' },
  { symbol: '⟳' }
]
</script>

<template>
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
</template>