<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { projectGalleries } from '../data/projectGalleries'
import { todoDemoUrl, unoWebDemoUrl } from '../data/portfolioData'

defineProps<{ homeHref: string }>()

const { t } = useI18n({ useScope: 'global' })

const privacyPath = '/Datenschutz'


const galleryProject = ref<keyof typeof projectGalleries>('hotelverwaltung')
const activeGallery = computed(() => {
    const gallery = projectGalleries[galleryProject.value]
    return {
        ...gallery,
        title: t(`projectTitles.${galleryProject.value}`)
    }
    })

const hotelGallery = ref<HTMLDialogElement | null>(null)
const galleryVideo = ref<HTMLVideoElement | null>(null)
const hotelSlideIndex = ref(0)
type DemoChoice = 'allow' | 'deny'
const demoChoice = ref<DemoChoice | null>(null)
const demoSettings = ref<HTMLDialogElement | null>(null)
const demoConsentKey = 'portfolio-demo-consent-v1'
const unoDemoOrigin = new URL(unoWebDemoUrl, window.location.origin).origin
const demoConsentScope = unoDemoOrigin + '|'
const demoHosts = [new URL(todoDemoUrl).hostname, new URL(unoDemoOrigin).hostname].join(', ')

function readDemoChoice(value: string | null) {
        if (value === demoConsentScope + 'allow') return 'allow'
        if (value === demoConsentScope + 'deny') return 'deny'
        return null
    }

function syncDemoChoice(event: StorageEvent) {
    if (event.key === demoConsentKey || event.key === null) {
        demoChoice.value = readDemoChoice(event.newValue)
    }
    }

onMounted(() => {
    try {
        demoChoice.value = readDemoChoice(localStorage.getItem(demoConsentKey))
    } catch {
        // The choice can still be used until the page is closed.
    }
    window.addEventListener('storage', syncDemoChoice)
    })

onUnmounted(() => window.removeEventListener('storage', syncDemoChoice))

function setDemoChoice(choice: DemoChoice) {
    demoChoice.value = choice
    try {
        localStorage.setItem(demoConsentKey, demoConsentScope + choice)
    } catch {
        // Keep the choice in memory when browser storage is unavailable.
    }
    demoSettings.value?.close()
    }
const hotelSlide = computed(() => activeGallery.value.slides[hotelSlideIndex.value] ?? activeGallery.value.slides[0])
    watch(hotelSlide, (slide) => {
    if ('embed' in slide && hotelGallery.value?.open && demoChoice.value === null) {
        demoSettings.value?.showModal()
    }
    })

const hotelSlideCaption = computed(() => t(`galleryCaptions.${hotelSlide.value.captionKey}`))

function openProjectGallery(project: keyof typeof projectGalleries, startAt = 0) {
    galleryProject.value = project
    hotelSlideIndex.value = startAt
    hotelGallery.value?.showModal()
    }

function changeHotelSlide(direction: number) {
    const count = activeGallery.value.slides.length
    if (count > 1) hotelSlideIndex.value = (hotelSlideIndex.value + direction + count) % count
    }

function openDemoSettings() {
    demoSettings.value?.showModal()
    }

defineExpose({ //defineExpose() bedeutet: Die übergeordnete Komponente App.vue darf diese beiden Funktionen der Galerie aufrufen.
    openProjectGallery,
    openDemoSettings
    })
</script>

<template>
    <dialog ref="hotelGallery" class="hotel-gallery" :class="{
      'hotel-gallery--hotel': galleryProject === 'hotelverwaltung',
      'hotel-gallery--portfolio': galleryProject === 'portfolio',
      'hotel-gallery-video': 'video' in hotelSlide,
      'hotel-gallery-video-wide': galleryProject === 'uno' && 'video' in hotelSlide
    }" :aria-label="activeGallery.title"
      @click.self="hotelGallery?.close()"
      @close="galleryVideo?.pause(); if ('embed' in hotelSlide) hotelSlideIndex = 0"
      @keydown.left.prevent="changeHotelSlide(-1)" @keydown.right.prevent="changeHotelSlide(1)">
      <div class="hotel-gallery-header">
        <strong>{{ activeGallery.title }}</strong>
        <button v-if="'embed' in hotelSlide && demoChoice === 'allow'" type="button"
          class="demo-settings-shortcut" @click="demoSettings?.showModal()">
          {{ t('legal.demoSettings') }}
        </button>
        <button type="button" autofocus :aria-label="t('galleryControls.close')" @click="hotelGallery?.close()">×</button>
      </div>
      <div v-if="galleryProject === 'portfolio'" class="portfolio-details">
        <p>{{ t('portfolioDetails.intro') }}</p>
        <dl>
          <div>
            <dt>Vue · TypeScript</dt>
            <dd>{{ t('portfolioDetails.interface') }}</dd>
          </div>
          <div>
            <dt>Vue I18n</dt>
            <dd>{{ t('portfolioDetails.languages') }}</dd>
          </div>
          <div>
            <dt>Cloudflare Pages Functions · Workers AI</dt>
            <dd>{{ t('portfolioDetails.ai') }}</dd>
          </div>
          <div>
            <dt>Turnstile · Resend</dt>
            <dd>{{ t('portfolioDetails.contact') }}</dd>
          </div>
        </dl>
        <p>{{ t('portfolioDetails.development') }}</p>
        <p>{{ t('portfolioDetails.exploreHint') }}</p>
            <a class="primary-link" :href="homeHref" @click="hotelGallery?.close()">
              {{ t('portfolioDetails.explore') }} ↗
        </a>
      </div>
      <template v-else>
      <figure aria-live="polite" @click.self="hotelGallery?.close()">
        <video v-if="'video' in hotelSlide" ref="galleryVideo" :src="hotelSlide.video"
          :poster="hotelSlide.poster"
          :aria-label="hotelSlideCaption" controls muted playsinline preload="none" @keydown.left.stop @keydown.right.stop />
        <template v-else-if="'embed' in hotelSlide">
          <iframe v-if="demoChoice === 'allow'" class="todo-demo-frame" :src="hotelSlide.embed"
          :title="activeGallery.title" referrerpolicy="no-referrer"
          :sandbox="galleryProject === 'uno-web'
            ? 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox'
            : 'allow-scripts allow-same-origin'" />
          <div v-else class="demo-placeholder">
            <p>{{ t('legal.demoInactive') }}</p>
            <button type="button" @click="demoSettings?.showModal()">{{ t('legal.demoSettings') }}</button>
          </div>
        </template>
        <button v-else-if="activeGallery.slides.length > 1" type="button" class="hotel-gallery-image"
          :aria-label="t('galleryControls.next')" @click="changeHotelSlide(1)">
          <img :src="hotelSlide.image" alt="" />
        </button>
        <img v-else :src="hotelSlide.image" :alt="hotelSlideCaption" />

      <figcaption>{{ hotelSlideCaption }}</figcaption>
      </figure>
      <div v-if="activeGallery.slides.length > 1" class="hotel-gallery-controls">
        <button type="button" :aria-label="t('galleryControls.prev')" @click="changeHotelSlide(-1)">←</button>
        <span>{{ hotelSlideIndex + 1 }} / {{ activeGallery.slides.length }}</span>
        <button v-if="'embed' in (activeGallery.slides[hotelSlideIndex + 1] ?? {})"
          type="button" @click="changeHotelSlide(1)">{{ t('inlineDemo') }} →</button>
        <button v-else type="button" :aria-label="t('galleryControls.next')" @click="changeHotelSlide(1)">→</button>
      </div>
      <a v-if="'image' in hotelSlide" :href="hotelSlide.image" target="_blank" rel="noopener">{{ t('galleryControls.full') }} ↗</a>
      <p v-if="galleryProject === 'yoganow'" class="yoga-gallery-access">{{ t('yogaDemo.access') }}</p>
      </template>
    </dialog>

    <dialog ref="demoSettings" class="hotel-gallery demo-settings" aria-labelledby="demo-settings-title">
      <div class="hotel-gallery-header">
        <h2 id="demo-settings-title">{{ t('legal.demoSettings') }}</h2>
        <button type="button" autofocus :aria-label="t('galleryControls.close')" @click="demoSettings?.close()">×</button>
      </div>
      <p>{{ t('legal.demoNotice', { hosts: demoHosts }) }}</p>
      <p>
        {{ t('legal.demoDetails') }}
        <a :href="privacyPath + '#projekt-demos'" target="_blank" rel="noopener">{{ t('legal.demosTitle') }}</a>.
      </p>
      <div class="demo-settings-actions">
        <button type="button" :aria-pressed="demoChoice === 'allow'" @click="setDemoChoice('allow')">
          {{ t('legal.allowDemos') }}
        </button>
        <button type="button" :aria-pressed="demoChoice === 'deny'" @click="setDemoChoice('deny')">
          {{ t('legal.denyDemos') }}
        </button>
      </div>
    </dialog>
</template>

<style scoped>
.todo-demo-frame {
  display: block;
  width: 100%;
  height: clamp(360px, 70dvh, 680px);
  border: 1px solid var(--control-line);
  border-radius: 8px;
  background: var(--surface);
}


.yoga-gallery-access {
  margin: 10px 0 0;
  color: var(--muted);
}

.hotel-gallery {
  width: min(96vw, 1180px);
  max-width: none;
  max-height: 94vh;
  padding: clamp(8px, 2vw, 20px);
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
  color: var(--ink);
  text-align: center;
  overflow-wrap: anywhere;
}

.hotel-gallery::backdrop { background: #000b; }

.hotel-gallery-header,
.hotel-gallery-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.hotel-gallery-controls {
  justify-content: center;
  margin: 12px 0 8px;
}

.hotel-gallery button:not(.hotel-gallery-image) {
  min-width: 40px;
  min-height: 40px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--paper);
  color: var(--ink);
}

.hotel-gallery figure { margin: 12px 0 0; }
.hotel-gallery img {
  display: block;
  max-width: 100%;
  max-height: min(65dvh, 680px);
  width: auto;
  height: auto;
  margin-inline: auto;
  border-radius: 8px;
}

.hotel-gallery--portfolio {
  width: min(92vw, 720px);
  text-align: start;
}

.portfolio-details p {
  line-height: 1.6;
}

.portfolio-details dl {
  margin: 20px 0;
}

.portfolio-details dl > div {
  display: grid;
  grid-template-columns: minmax(130px, 1fr) 2fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.portfolio-details dt {
  font-weight: 600;
}

.portfolio-details dd {
  margin: 0;
  line-height: 1.5;
  color: var(--muted);
}

@media (max-width: 520px) {
  .portfolio-details dl > div {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}

.hotel-gallery-image {
  display: inline-block;
  max-width: 100%;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  vertical-align: top;
}

.hotel-gallery-image:has(img[src$=".svg"]) {
  width: min(100%, 840px);
}

.hotel-gallery-image img[src$=".svg"] {
  width: 100%;
  object-fit: contain;
}

.hotel-gallery--hotel {
  --hotel-image-height: min(58dvh, 72vw, 640px);
}

.hotel-gallery--hotel figure {
  display: grid;
  grid-template-rows: var(--hotel-image-height) auto;
  justify-items: center;
  align-items: center;
}

.hotel-gallery--hotel .hotel-gallery-image img {
  max-height: var(--hotel-image-height);
}

.hotel-gallery--hotel figcaption {
  align-self: start;
  min-height: 2lh;
}

@media (max-width: 600px) {
  .hotel-gallery--hotel figcaption {
    min-height: 3lh;
  }
}

.hotel-gallery.hotel-gallery-video {
  width: min(96vw, 560px);
}

.hotel-gallery-video video {
  display: block;
  width: min(100%, 41dvh, 420px);
  height: auto;
  aspect-ratio: 2 / 3;
  margin-inline: auto;
  border-radius: 8px;
  background: #171717;
  object-fit: contain;
}

.hotel-gallery.hotel-gallery-video-wide {
  width: min(96vw, 1040px);
}

.hotel-gallery-video-wide video {
  width: min(100%, 100dvh);
  aspect-ratio: 1440 / 934;
}

.hotel-gallery figcaption { margin-top: 8px; }
.hotel-gallery a { text-decoration: underline; }



.hotel-gallery button.demo-settings-shortcut {
  margin-inline-start: auto;
  padding-inline: 8px;
  border-color: transparent;
  background: none;
  color: var(--accent);
  text-decoration: underline;
}

.demo-settings {
  width: min(92vw, 560px);
  text-align: start;
}

.demo-settings h2 {
  margin: 0;
  font-size: 1.25rem;
}

.demo-settings-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.demo-settings-actions button,
.demo-placeholder button {
  padding-inline: 12px;
  cursor: pointer;
}

.demo-settings-actions button[aria-pressed='true'] {
  border-color: var(--accent);
}

</style>