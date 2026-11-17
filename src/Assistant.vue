
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { findKnowledgeTopics, type FollowUpKind } from './assistantKnowledge'
import { detectAssistantLanguage } from './assistantLanguage'
import { cvPath } from './portfolioData'

const { locale, t } = useI18n({ useScope: 'global' })
const emit = defineEmits<{ openProject: [event: MouseEvent, projectId: string] }>()

const assistantDialog = ref<HTMLDialogElement | null>(null)
const assistantQuestion = ref('')
const submittedQuestion = ref('')
const aiPilotEnabled = import.meta.env.VITE_PIXEL_AI_PILOT === 'true'
const aiReply = ref('')
let aiRequest: AbortController | undefined

const contactEmail = ref('')
const contactMessage = ref('')
const contactWebsite = ref('')
const contactState = ref<'idle' | 'sending' | 'sent' | 'error' | 'unavailable'>('idle')
let contactAttempt: { body: string; requestId: string } | undefined

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim()
const turnstileContainer = ref<HTMLDivElement | null>(null)
const turnstileToken = ref('')
const turnstileFailed = ref(false)
let turnstileScript: Promise<void> | undefined
let turnstileWidget: string | undefined
let disposed = false

type Turnstile = {
  render: (container: HTMLElement, options: {
    sitekey: string
    action: string
    size: 'flexible'
    callback: (token: string) => void
    'expired-callback': () => void
    'error-callback': () => void
  }) => string | undefined
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

function turnstileApi() {
  return (window as Window & { turnstile?: Turnstile }).turnstile
}

function loadTurnstile() {
  if (turnstileApi()) return Promise.resolve()

  turnstileScript ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      script.remove()
      turnstileScript = undefined
      reject(new Error('Turnstile could not be loaded'))
    }
    document.head.append(script)
  })

  return turnstileScript
}

async function prepareContactVerification(event: Event) {
  if (
    !(event.currentTarget instanceof HTMLDetailsElement) ||
    !event.currentTarget.open ||
    !turnstileSiteKey ||
    turnstileWidget !== undefined
  ) return

  turnstileFailed.value = false

  try {
    await loadTurnstile()

    if (
      disposed ||
      !turnstileContainer.value ||
      turnstileWidget !== undefined
    ) return

    const api = turnstileApi()
    if (!api) throw new Error('Turnstile unavailable')

    turnstileWidget = api.render(turnstileContainer.value, {
      sitekey: turnstileSiteKey,
      action: 'pixel_contact',
      size: 'flexible',

      callback(token) {
        turnstileToken.value = token
        turnstileFailed.value = false
      },

      'expired-callback'() {
        turnstileToken.value = ''
      },

      'error-callback'() {
        turnstileToken.value = ''
        turnstileFailed.value = true
      }
    })

    if (turnstileWidget === undefined) {
      turnstileFailed.value = true
    }
  } catch {
    turnstileFailed.value = true
  }
}

onBeforeUnmount(() => {
  disposed = true
  aiRequest?.abort()

  if (turnstileWidget !== undefined) {
    turnstileApi()?.remove(turnstileWidget)
  }
})

type AssistantTopic = ReturnType<typeof findKnowledgeTopics>[number]

const projectReference =
  /(?<!\p{L})(?:dies(?:es|em|en) Projekt|(?:this|that) project|этот проект|этом проекте|этого проекта)(?!\p{L})/iu

const lastTopic = ref<AssistantTopic | null>(null)
const currentTopics = ref<AssistantTopic[]>([])
const followUp = ref<FollowUpKind | 'unknown' | null>(null)

const followUpPhrases: Record<FollowUpKind, RegExp> = {
  interest: /gemocht|gefallen|mochte|spaß|motiviert|gern|\b(like|liked|enjoy|enjoyed)\b|нрав|нарв|понрав|любил/iu,
  technology: /technolog|werkzeug|tech stack|\btools?\b|технолог|инструмент/iu,
  duration: /wie lange|welcher zeitraum|von wann|bis wann|how long|when did|как долго|сколько времени|когда/iu,
  tasks: /was .*gemacht|aufgaben|tätigkeit|what .*do|responsibilit|что .*делал|чем .*занимал|задач/iu
}

const suggestedQuestions = [
  'projects',
  'teamwork',
  'workplace'
] as const

const answerLanguage = computed(
  () => detectAssistantLanguage(submittedQuestion.value) ?? locale.value
)

function replyText(
  key: string,
  params: Record<string, string> = {}
) {
  return t(key, params, { locale: answerLanguage.value })
}

function followUpText(
  topic: AssistantTopic,
  kind: FollowUpKind | 'unknown'
) {
  const key =
    kind === 'unknown' ? undefined : topic.followUps?.[kind]

  if (key) return replyText(key)

  if (kind === 'technology' && topic.stack) {
    return replyText('assistant.followUp.projectTechnology', {
      stack: topic.stack
    })
  }

  return replyText(
    kind === 'interest'
      ? 'assistant.followUp.interestUnknown'
      : 'assistant.followUp.detailUnknown'
  )
}

// Entfernt automatische Altersangaben aus Projektbeschreibungen.
// Das Erstellungsdatum bleibt erhalten.
function withoutProjectAge(text: string): string {
  return text
    .replace(
      /\s+und ist somit etwa \d+ Jahr(?:e)? und \d+ Monat(?:e)? alt\.?/gi,
      '.'
    )
    .replace(
      /\s+und ist somit etwa \d+ (?:Jahr(?:e)?|Monat(?:e)?) alt\.?/gi,
      '.'
    )
    .replace(
      /\s+and is (?:therefore |thus )?(?:about |approximately )?\d+ years?(?: and \d+ months?)? old\.?/gi,
      '.'
    )
    .replace(
      /\s+и (?:поэтому |таким образом )?(?:ему |ей )?(?:около |примерно )?\d+ (?:год|года|лет)(?: и \d+ месяц(?:а|ев)?)?\.?/giu,
      '.'
    )
    .replace(/\.{2,}/g, '.')
}

const answers = computed(() =>
  currentTopics.value.map(topic => {
    const titleKey = topic.replyTitleKey ?? topic.titleKey

    return {
      title: titleKey ? replyText(titleKey) : undefined,
      stack: followUp.value ? undefined : topic.stack,
      detailsPath: topic.detailsPath,
      detailsLabel: replyText(
        topic.detailsLabelKey ?? 'assistant.detailsLink'
      ),
      detailsNewTab: topic.detailsNewTab,
      project: topic.project,
      demoUrl:
        topic.project && 'demoUrl' in topic.project
          ? topic.project.demoUrl
          : undefined,

      text: topic.project
        ? withoutProjectAge(
            followUp.value
              ? followUpText(topic, followUp.value)
              : replyText(topic.answerKey)
          )
        : followUp.value
          ? followUpText(topic, followUp.value)
          : replyText(topic.answerKey)
    }
  })
)

function openAnswerLink(
  event: MouseEvent,
  projectId?: string
) {
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) return

  const link = event.currentTarget

  if (
    link instanceof HTMLAnchorElement &&
    link.target === '_blank'
  ) return

  assistantDialog.value?.close()

  if (projectId) {
    emit('openProject', event, projectId)
  }
}

async function requestPilotAnswer(
  question: string,
  topics: string[]
) {
  const request = new AbortController()
  aiRequest = request

  const timeout = window.setTimeout(
    () => request.abort(),
    12000
  )

  aiReply.value = replyText('assistant.aiLoading')

  try {
    const response = await fetch('/api/pixel-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question,
        topics,
        language: answerLanguage.value
      }),
      signal: request.signal
    })

    if (!response.ok) {
      throw new Error('Pixel AI unavailable')
    }

    const { answer } = await response.json()

    if (aiRequest === request) {
      aiReply.value =
        typeof answer === 'string'
          ? topics.some(topic =>
              topic.startsWith('assistant.projectReplies.')
            )
            ? withoutProjectAge(answer)
            : answer
          : replyText('assistant.aiUnknown')
    }
  } catch {
    if (aiRequest === request && !disposed) {
      aiReply.value = replyText('assistant.aiUnavailable')
    }
  } finally {
    window.clearTimeout(timeout)

    if (aiRequest === request) {
      aiRequest = undefined
    }
  }
}

function sendAssistantQuestion(input: string) {
  const question = input.trim()

  if (!question || question.length > 500) return

  aiRequest?.abort()
  aiRequest = undefined
  aiReply.value = ''

  const matches = findKnowledgeTopics(question)
  const refersToProject = projectReference.test(question)

  const refersBack =
    refersToProject ||
    /(?<!\p{L})(dort|dabei|there|там)(?!\p{L})/iu.test(question)

  const previous = lastTopic.value

  if (
    refersBack &&
    previous &&
    (!refersToProject || previous.project) &&
    matches.every(
      topic =>
        topic.overview ||
        topic.answerKey === previous.answerKey
    )
  ) {
    currentTopics.value = [previous]

    const kinds = Object.keys(
      followUpPhrases
    ) as FollowUpKind[]

    followUp.value =
      kinds.find(kind =>
        followUpPhrases[kind].test(question)
      ) ?? 'unknown'
  } else {
    followUp.value = null

    currentTopics.value =
      refersToProject &&
      matches.every(topic => topic.overview)
        ? []
        : matches

    const [topic] = currentTopics.value

    lastTopic.value =
      currentTopics.value.length === 1 &&
      topic &&
      !topic.overview
        ? topic
        : null
  }

  submittedQuestion.value = question
  assistantQuestion.value = ''

  const topics = currentTopics.value.map(
    topic => topic.answerKey
  )

  const kind = followUp.value

  const usePreparedFollowUp =
    kind === 'interest' ||
    (
      kind &&
      kind !== 'unknown' &&
      currentTopics.value.some(
        topic => topic.followUps?.[kind]
      )
    )

  if (
    aiPilotEnabled &&
    topics.length >= 1 &&
    topics.length <= 3 &&
    !usePreparedFollowUp &&
    topics.every(key =>
      /^(assistant\.(projectReplies|educationReplies|experienceReplies)\.|assistant\.educationAnswer$|assistant\.overview\.experience$)/.test(key)
    )
  ) {
    void requestPilotAnswer(question, topics)
  }
}

async function sendContactMessage() {
  if (
    contactState.value === 'sending' ||
    !turnstileToken.value
  ) return

  const email = contactEmail.value.trim()
  const message = contactMessage.value.trim()

  if (!email || !message) {
    contactState.value = 'error'
    return
  }

  const fields = {
    email,
    message,
    website: contactWebsite.value
  }

  const body = JSON.stringify(fields)

  if (contactAttempt?.body !== body) {
    contactAttempt = {
      body,
      requestId: crypto.randomUUID()
    }
  }

  contactState.value = 'sending'

  try {
    const response = await fetch('/api/pixel-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...fields,
        requestId: contactAttempt.requestId,
        turnstileToken: turnstileToken.value
      })
    })

    if (
      response.status === 503 ||
      response.status === 404 ||
      !response.headers
        .get('Content-Type')
        ?.includes('application/json')
    ) {
      contactState.value = 'unavailable'
      return
    }

    const result = await response.json()

    if (!response.ok || result?.ok !== true) {
      contactState.value = 'error'
      return
    }

    contactEmail.value = ''
    contactMessage.value = ''
    contactWebsite.value = ''
    contactAttempt = undefined
    contactState.value = 'sent'
  } catch {
    contactState.value = 'error'
  } finally {
    turnstileToken.value = ''

    if (turnstileWidget !== undefined) {
      turnstileApi()?.reset(turnstileWidget)
    }
  }
}
</script>

<template>
  <button
    class="assistant-trigger"
    type="button"
    aria-haspopup="dialog"
    aria-controls="portfolio-assistant"
    @click="assistantDialog?.showModal()"
  >
    <img
      class="assistant-avatar"
      src="/images/pixel-avatar.png"
      alt=""
      width="32"
      height="32"
    />
    {{ t('assistant.title') }}
  </button>

  <dialog
    id="portfolio-assistant"
    ref="assistantDialog"
    class="assistant-dialog"
    aria-labelledby="assistant-title"
    @click.self="assistantDialog?.close()"
  >
    <div class="assistant-content">
      <header class="assistant-header">
        <div class="assistant-identity">
          <img
            class="assistant-avatar"
            src="/images/pixel-avatar.png"
            alt=""
            width="56"
            height="56"
          />
          <h2 id="assistant-title">
            {{ t('assistant.name') }}
          </h2>
        </div>

        <form method="dialog">
          <button
            type="submit"
            autofocus
            :aria-label="t('galleryControls.close')"
          >
            ×
          </button>
        </form>
      </header>

      <p class="assistant-status">
        <strong>
          {{ t('assistant.status') }}
        </strong>
        <span>
          {{ t('assistant.statusNote') }}
        </span>
      </p>

      <p class="assistant-message">
        {{ t('assistant.greeting') }}
        <span aria-hidden="true">🙂</span>
      </p>

      <details
        class="assistant-contact"
        @toggle="prepareContactVerification"
      >
        <summary>
          {{ t('assistant.contactForm.open') }}
        </summary>

        <p>
          {{ t('assistant.contactForm.invitation') }}
        </p>

        <p v-if="turnstileSiteKey">
          <a
            href="/Datenschutz#kontakt"
            target="_blank"
            rel="noopener"
          >
            {{ t('legal.privacy') }}
          </a>
        </p>

        <form
          v-if="turnstileSiteKey"
          class="assistant-contact-form"
          @submit.prevent="sendContactMessage"
        >
          <label for="pixel-contact-email">
            {{ t('assistant.contactForm.email') }}
          </label>

          <input
            id="pixel-contact-email"
            v-model="contactEmail"
            type="email"
            autocomplete="email"
            maxlength="254"
            required
            :disabled="contactState === 'sending'"
          />

          <label for="pixel-contact-message">
            {{ t('assistant.contactForm.message') }}
          </label>

          <textarea
            id="pixel-contact-message"
            v-model="contactMessage"
            rows="4"
            maxlength="3000"
            required
            :disabled="contactState === 'sending'"
          ></textarea>

          <div hidden>
            <label for="pixel-contact-website">
              Website
            </label>

            <input
              id="pixel-contact-website"
              v-model="contactWebsite"
              tabindex="-1"
              autocomplete="off"
            />
          </div>

          <div ref="turnstileContainer"></div>

          <p
            v-if="turnstileFailed"
            role="status"
          >
            {{ t('assistant.contactForm.verificationError') }}
          </p>

          <button
            type="submit"
            :disabled="
              contactState === 'sending' ||
              !turnstileToken
            "
          >
            {{
              t(
                contactState === 'sending'
                  ? 'assistant.contactForm.sending'
                  : 'assistant.contactForm.send'
              )
            }}
          </button>
        </form>

        <p v-else role="status">
          {{ t('assistant.contactForm.unavailable') }}
        </p>

        <p
          v-if="
            contactState === 'sent' ||
            contactState === 'error' ||
            contactState === 'unavailable'
          "
          role="status"
        >
          {{ t(`assistant.contactForm.${contactState}`) }}
        </p>
      </details>

      <div
        class="assistant-suggestions"
        role="group"
        :aria-label="t('assistant.suggestionLabel')"
      >
        <button
          v-for="suggestion in suggestedQuestions"
          :key="suggestion"
          type="button"
          @click="
            sendAssistantQuestion(
              t(`assistant.suggestions.${suggestion}`)
            )
          "
        >
          {{ t(`assistant.suggestions.${suggestion}`) }}
        </button>
      </div>

      <p
        v-if="aiPilotEnabled"
        id="pixel-ai-notice"
        class="assistant-status"
      >
        {{ t('assistant.aiNotice') }}

        <a
          href="/Datenschutz#pixel-ki"
          target="_blank"
          rel="noopener"
        >
          {{ t('legal.privacy') }}
        </a>
      </p>

      <form
        class="assistant-question-form"
        @submit.prevent="
          sendAssistantQuestion(assistantQuestion)
        "
      >
        <label for="assistant-question">
          {{ t('assistant.questionLabel') }}
        </label>

        <input
          id="assistant-question"
          v-model="assistantQuestion"
          type="text"
          maxlength="500"
          :aria-describedby="
            aiPilotEnabled
              ? 'pixel-ai-notice'
              : undefined
          "
        />

        <button type="submit">
          {{ t('assistant.send') }}
        </button>
      </form>

      <p
        v-if="submittedQuestion"
        class="assistant-question"
      >
        {{ submittedQuestion }}
      </p>

      <div
        class="assistant-replies"
        aria-live="polite"
        :lang="answerLanguage"
      >
        <template v-if="submittedQuestion">
          <p
            v-if="aiReply && answers.length > 1"
            class="assistant-reply"
          >
            {{ aiReply }}
          </p>

          <article
            v-for="(answer, index) in answers"
            :key="index"
            class="assistant-reply"
          >
            <h3 v-if="answer.title">
              {{ answer.title }}
            </h3>

            <p
              v-if="
                !aiReply ||
                answers.length === 1
              "
            >
              {{ aiReply || answer.text }}
            </p>

            <p v-if="answer.stack">
              <strong>
                {{ replyText('experiencePage.techStack') }}
              </strong>
              · {{ answer.stack }}
            </p>

            <div
              v-if="answer.detailsPath"
              class="assistant-answer-links"
            >
              <a
                class="assistant-details"
                :href="answer.detailsPath"
                :target="
                  answer.detailsNewTab
                    ? '_blank'
                    : undefined
                "
                :rel="
                  answer.detailsNewTab
                    ? 'noopener noreferrer'
                    : undefined
                "
                @click="
                  openAnswerLink(
                    $event,
                    answer.project?.id
                  )
                "
              >
                {{ answer.detailsLabel }}
              </a>

              <a
                v-if="answer.project"
                class="assistant-details"
                :href="answer.project.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ replyText('projectLink') }}
              </a>

              <a
                v-if="answer.demoUrl"
                class="assistant-details"
                :href="answer.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ replyText('assistant.projectDemoLink') }}
              </a>
            </div>
          </article>

          <div
            v-if="!answers.length"
            class="assistant-reply assistant-fallback"
          >
            <p>
              {{
                replyText(
                  projectReference.test(submittedQuestion)
                    ? 'assistant.whichProject'
                    : 'assistant.fallbackAnswer'
                )
              }}
            </p>

            <ul>
              <li>
                <a
                  href="/#projects"
                  @click="openAnswerLink($event)"
                >
                  {{ replyText('nav.1') }}
                </a>
              </li>

              <li>
                <a
                  href="/Ausbildung"
                  @click="openAnswerLink($event)"
                >
                  {{ replyText('educationPage.title') }}
                </a>
              </li>

              <li>
                <a
                  href="/Berufserfahrung"
                  @click="openAnswerLink($event)"
                >
                  {{ replyText('experiencePage.title') }}
                </a>
              </li>

              <li>
                <a
                  :href="cvPath"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ replyText('cvDownload') }}
                </a>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.assistant-trigger {
  position: fixed;
  z-index: 40;
  inset-inline-start: clamp(10px, 2vw, 24px);
  bottom: clamp(10px, 2vw, 24px);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 5px 16px 5px 8px;
  border: 1px solid var(--accent);
  border-radius: 999px;
  background: var(--surface);
  color: var(--accent);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.assistant-trigger:hover {
  background: var(--paper);
}

.assistant-dialog {
  --assistant-inset: clamp(17px, 4vw, 32px);
  --assistant-line: color-mix(in srgb, var(--accent) 22%, var(--surface));
  --assistant-tint: color-mix(in srgb, var(--accent) 7%, var(--surface));
  --assistant-accent-ink: #fff;
  box-sizing: border-box;
  width: min(560px, calc(100% - 28px));
  max-height: min(810px, calc(100dvh - 28px));
  overflow: auto;
  overscroll-behavior: contain;
  padding: 0;
  border: 1px solid var(--assistant-line);
  border-radius: 24px;
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 24px 80px rgb(19 47 36 / 22%);
}

:global(:root[data-theme='dark']) .assistant-dialog {
  --assistant-accent-ink: var(--paper);
}

.assistant-dialog::backdrop {
  background: rgb(20 36 30 / 41%);
  backdrop-filter: blur(3px);
}

.assistant-content {
  display: grid;
  gap: 15px;
  padding: 0 var(--assistant-inset) var(--assistant-inset);
}

.assistant-header {
  position: sticky;
  z-index: 1;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-inline: calc(var(--assistant-inset) * -1);
  padding: 16px var(--assistant-inset);
  border-bottom: 1px solid var(--assistant-line);
  background: var(--surface);
}

.assistant-identity {
  display: flex;
  align-items: center;
  gap: 12px;
}

.assistant-avatar {
  display: block;
  flex: 0 0 auto;
  object-fit: contain;
}

.assistant-identity .assistant-avatar {
  padding: 5px;
  border-radius: 16px;
  background: var(--assistant-tint);
}

.assistant-header h2 {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.12;
  letter-spacing: -.025em;
}

.assistant-header button {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  padding: 0;
  border: 1px solid var(--assistant-line);
  border-radius: 50%;
  background: var(--surface);
  color: var(--accent);
  font: inherit;
  font-size: 1.4rem;
  cursor: pointer;
}

.assistant-status {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 3px 10px;
  margin: 0;
  padding: 10px 14px;
  border: 1px solid var(--assistant-line);
  border-inline-start: 3px solid var(--accent);
  border-radius: 11px;
  background: var(--assistant-tint);
  font-size: .88rem;
  line-height: 1.45;
}

.assistant-status strong {
  color: var(--accent);
}

.assistant-message,
.assistant-reply,
.assistant-contact {
  margin: 0;
  padding: 14px 16px;
  border: 1px solid var(--assistant-line);
  border-radius: 16px;
  background: var(--surface);
  line-height: 1.55;
}

.assistant-message {
  background: var(--assistant-tint);
}

.assistant-contact summary {
  width: fit-content;
  color: var(--accent);
  font-size: .93rem;
  font-weight: 650;
  cursor: pointer;
}

.assistant-contact > p {
  margin: 10px 0 0;
}

.assistant-contact-form {
  display: grid;
  gap: 8px;
  margin-top: 12px;
}

.assistant-contact-form label,
.assistant-question-form label {
  font-weight: 600;
  font-size: .875rem;
}

.assistant-contact-form textarea {
  resize: vertical;
}

.assistant-contact-form :is(input, textarea),
.assistant-question-form input {
  width: 100%;
  min-width: 0;
  min-height: 44px;
  padding: 9px 12px;
  border: 1px solid var(--assistant-line);
  border-radius: 11px;
  background: var(--assistant-tint);
  color: var(--ink);
  font: inherit;
}

.assistant-question-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 7px 9px;
  align-items: end;
}

.assistant-question-form label {
  grid-column: 1 / -1;
}

.assistant-contact-form button,
.assistant-question-form button {
  justify-self: start;
  min-height: 44px;
  padding: 8px 15px;
  border: 1px solid var(--accent);
  border-radius: 11px;
  background: var(--accent);
  color: var(--assistant-accent-ink);
  font: inherit;
  font-weight: 650;
  cursor: pointer;
}

.assistant-contact-form button:disabled {
  opacity: .56;
  cursor: not-allowed;
}

.assistant-suggestions,
.assistant-answer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.assistant-suggestions button,
.assistant-details {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-height: 36px;
  padding: 6px 11px;
  border: 1px solid var(--assistant-line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--accent);
  font: inherit;
  font-size: .86rem;
  font-weight: 550;
  text-align: start;
  text-decoration: none;
  cursor: pointer;
}

.assistant-dialog :is(
  .assistant-header button,
  .assistant-suggestions button,
  .assistant-details
):hover {
  background: var(--assistant-tint);
}

.assistant-question {
  justify-self: end;
  max-width: 92%;
  margin: 4px 0 0;
  padding: 9px 14px;
  border-radius: 15px 15px 4px 15px;
  background: var(--assistant-tint);
  color: var(--ink);
  overflow-wrap: anywhere;
}

.assistant-replies {
  display: grid;
  gap: 10px;
}

.assistant-replies:empty {
  display: none;
}

.assistant-reply {
  overflow-wrap: anywhere;
}

.assistant-reply h3,
.assistant-reply p {
  margin: 0;
}

.assistant-reply h3 {
  font-size: 1.05rem;
  line-height: 1.35;
}

.assistant-reply > * + * {
  margin-top: 10px;
}

.assistant-fallback ul {
  padding-inline-start: 20px;
  margin-bottom: 0;
}

.assistant-fallback a {
  color: var(--accent);
}

.assistant-trigger:focus-visible,
.assistant-dialog :focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media (max-width: 360px) {
  .assistant-question-form {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
