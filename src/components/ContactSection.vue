<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ContactEmail from './ContactEmail.vue'

const { t } = useI18n({ useScope: 'global' })

const githubUrl = 'https://github.com/ekschedl'
const linkedinUrl =
  'https://www.linkedin.com/in/ekaterina-schedlberger-05162630b/'
</script>

<template>

          <section id="contact" class="section contact-section">
        <div class="contact-copy">
          <span class="section-number">{{ t('sectionContact') }}</span>
          <h2>{{ t('helloTitle') }}</h2>
          <p>{{ t('helloText') }}</p>

          <div class="contact-actions">
            <ContactEmail class="primary-link">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <span>{{ t('email') }}</span> <span aria-hidden="true">↗</span>
            </ContactEmail>

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
</template>

<style scoped>
.contact-icon {
  width: 1.125rem;
  height: 1.125rem;
  flex: 0 0 auto;
}
</style>