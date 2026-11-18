<!-- Rechtliche Seiten. Zeigt je nach Aufruf das Impressum oder die Datenschutzerklärung. -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ContactEmail from '../components/ContactEmail.vue'

defineProps<{ page: 'imprint' | 'privacy' }>()

const { t } = useI18n()
const aiPilotEnabled = import.meta.env.VITE_PIXEL_AI_PILOT === 'true'
const contactFormConfigured = Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim())
</script>

<template>
  <main class="section legal-page">
    <div class="section-head">
      <h1>{{ t(`legal.${page}`) }}</h1>
    </div>
    <p>{{ t(page === 'imprint' ? 'legal.owner' : 'legal.controller') }}<br />
      Ekaterina Schedlberger<br />
      Graz, {{ t('legal.austria') }}<br />
      <ContactEmail class="legal-email" />
    </p>
    <p v-if="page === 'imprint'">{{ t('legal.purpose') }}</p>
    <template v-else>
      <p>{{ t('legal.privacyIntro') }}</p>
      <section>
        <h2>{{ t('legal.hostingTitle') }}</h2>
        <!-- Vor Veröffentlichung die Speicherdauer oder Löschkriterien der tatsächlich aktiven Cloudflare-Protokolle ergänzen. -->
        <p>{{ t('legal.hosting') }} <a href="https://www.cloudflare.com/cloudflare-customer-dpa/">Cloudflare DPA</a></p>
      </section>
      <section>
        <h2>Cloudflare Web Analytics</h2>
        <p>{{ t('legal.analytics') }}
          <a href="https://developers.cloudflare.com/speed/observatory/rum-beacon/#privacy-information">Cloudflare Web Analytics</a>
        </p>
      </section>
      <section>
        <h2>{{ t('legal.storageTitle') }}</h2>
        <p>{{ t('legal.storage') }}</p>
      </section>
      <section id="projekt-demos">
        <h2>{{ t('legal.demosTitle') }}</h2>
        <p>{{ t('legal.demos') }}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub</a> ·
          <a href="https://render.com/privacy">Render</a>
        </p>
        <p>{{ t('legal.shopData') }}</p>
      </section>
      <section v-if="aiPilotEnabled" id="pixel-ki">
        <h2>Pixel · Workers AI</h2>
        <p>{{ t('assistant.aiPrivacy') }}
          <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare</a>
        </p>
      </section>
      <section id="kontakt">
        <h2>{{ t('legal.contactTitle') }}</h2>
        <p>{{ t('legal.contact') }}</p>
        <p v-if="contactFormConfigured">{{ t('legal.form') }}
          <a href="https://www.cloudflare.com/turnstile-privacy-policy/">Cloudflare Turnstile</a> ·
          <a href="https://resend.com/legal/dpa">Resend DPA</a> ·
          <a href="https://resend.com/security/gdpr">Resend GDPR</a>
        </p>
      </section>
      <section>
        <h2>{{ t('legal.objectionTitle') }}</h2>
        <p>{{ t('legal.objection') }}</p>
      </section>
      <section>
        <h2>{{ t('legal.rightsTitle') }}</h2>
        <p>{{ t('legal.rights') }} {{ t('legal.authority') }}.</p>
      </section>
    </template>
  </main>
</template>

<style scoped>
.legal-page {
  max-width: 76ch;
  line-height: 1.65;
  overflow-wrap: break-word;
}

.legal-page h1 {
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.15;
}

.legal-page h2 {
  margin-block: 1.5em .35em;
  font-size: 1.2rem;
}

button.legal-email {
  padding: 0;
  background: none;
  font: inherit;
}

.legal-page a,
.legal-email {
  color: var(--accent);
  text-decoration: underline;
}
</style>
