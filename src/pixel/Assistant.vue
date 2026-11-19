<!-- Pixel-Fenster und Bedienung. Verarbeitet Fragen, zeigt Antworten und bietet das Kontaktformular an. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// Erkennt das Thema einer Frage und sucht passende Antworten im FAQ-Katalog.
import {
  findKnowledgeTopics,
  findEmployerFaqAnswer,
  getEmployerFaqQuestions,
  type FollowUpKind
} from './questionMatching'
// Erkennt DE/EN/RU aus der Frage. Die Sprache der Website wird dabei nicht umgestellt.
import { detectAssistantLanguage } from './language'
import { cvPath, unoWebDemoUrl } from '../data/portfolioData'

// i18n liefert die gewählte Website-Sprache und die übersetzten Texte.
const { locale, t } = useI18n({ useScope: 'global' })
// Meldet der übergeordneten Seite, dass ein Projekt geöffnet werden soll.
const emit = defineEmits<{ openProject: [event: MouseEvent, projectId: string] }>()

// Dialog, aktuelle Eingabe und zuletzt abgeschickte Frage für die Anzeige.
const assistantDialog = ref<HTMLDialogElement | null>(null)
const assistantScroll = ref<HTMLDivElement | null>(null)
const questionBubble = ref<HTMLParagraphElement | null>(null)
const assistantQuestion = ref('')
const submittedQuestion = ref('')
const replyExpanded = ref(false)

// Enthält eine direkte Antwort aus den 350 Arbeitgeberfragen der erkannten Sprache.
const employerFaqReply = ref<string | null>(null)
const employerFaqLinksToPortfolio = ref(false)
const employerFaqDemoUrl = ref<string | null>(null)

// Dieser Build-Schalter aktiviert KI-Anfragen. Auch der Server muss den Pilot freigeben.
const aiPilotEnabled = import.meta.env.VITE_PIXEL_AI_PILOT === 'true'
const aiReply = ref('')
const aiPending = ref(false)
let aiRequest: AbortController | undefined
let questionSequence = 0
// Eigenständiges Kontaktformular. Die Nachricht geht über die Server-Schnittstelle an Resend.
const contactOpen = ref(false)
const contactTrigger = ref<HTMLButtonElement | null>(null)
const contactBack = ref<HTMLButtonElement | null>(null)
const contactEmail = ref('')
const contactMessage = ref('')
// Für Besucher unsichtbares Feld zum Erkennen automatisch ausgefüllter Spam-Nachrichten.
const contactWebsite = ref('')
const contactState = ref<'idle' | 'sending' | 'sent' | 'error' | 'unavailable'>('idle')
// Gleicher Inhalt behält beim Wiederholen dieselbe Kennung, damit Resend Doppelversand vermeiden kann.
let contactAttempt: { body: string; requestId: string } | undefined

// Turnstile prüft das Kontaktformular vor dem Versand. Der Token wird mit der Nachricht gesendet.
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

// Lädt das Turnstile-Skript bei Bedarf und teilt einen laufenden Ladevorgang zwischen Aufrufen.
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

async function showContact() {
  contactOpen.value = true
  await nextTick()
  contactBack.value?.focus({ preventScroll: true })
  void prepareContactVerification()
}

async function returnToChat() {
  contactOpen.value = false
  await nextTick()
  contactTrigger.value?.focus({ preventScroll: true })
}

// Startet die Sicherheitsprüfung beim Öffnen der Kontaktansicht.
async function prepareContactVerification() {
  if (!contactOpen.value || !turnstileSiteKey || turnstileWidget !== undefined) return

  turnstileFailed.value = false

  try {
    await loadTurnstile()

    if (
      disposed ||
      !contactOpen.value ||
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

// Beim Entfernen des Vue-Bausteins laufende KI-Anfragen abbrechen und Turnstile aufräumen.
onBeforeUnmount(() => {
  disposed = true
  aiRequest?.abort()

  if (turnstileWidget !== undefined) {
    turnstileApi()?.remove(turnstileWidget)
  }
})

type AssistantTopic = ReturnType<typeof findKnowledgeTopics>[number]

// Erkennt Rückverweise wie „dieses Projekt“ für Anschlussfragen.
const projectReference =
  /(?<!\p{L})(?:dies(?:es|em|en) Projekt|(?:this|that) project|этот проект|этом проекте|этого проекта)(?!\p{L})/iu

// Merkt sich das letzte eindeutige Thema und die Themen der aktuellen Antwort.
const lastTopic = ref<AssistantTopic | null>(null)
const currentTopics = ref<AssistantTopic[]>([])
const followUp = ref<FollowUpKind | 'unknown' | null>(null)

function isPortfolioTopic(topic: AssistantTopic) {
  return Boolean(topic.project) || topic.answerKey === 'assistant.overview.projects'
}

const answerLinksToPortfolio = computed(() =>
  aiReply.value
    ? currentTopics.value.length === 1 && currentTopics.value.some(isPortfolioTopic)
    : employerFaqLinksToPortfolio.value
)

// Unterscheidet Anschlussfragen nach Interesse, Technologien, Zeitraum und Aufgaben.
const followUpPhrases: Record<FollowUpKind, RegExp> = {
  interest: /gemocht|gefallen|mochte|spaß|motiviert|gern|\b(like|liked|enjoy|enjoyed)\b|нрав|нарв|понрав|любил/iu,
  technology: /technolog|werkzeug|tech stack|\btools?\b|технолог|инструмент/iu,
  duration: /wie lange|welcher zeitraum|von wann|bis wann|how long|when did|как долго|сколько времени|когда/iu,
  tasks: /was .*gemacht|aufgaben|tätigkeit|what .*do|responsibilit|что .*делал|чем .*занимал|задач/iu
}

// Die Beispielfragen verwenden die übersetzten Einträge aus dem FAQ-Katalog.
const suggestionCategories = {
  projects: [81, 108, 93, 86],
  education: [31, 34, 32],
  experience: [41, 46, 63],
  collaboration: [13, 140, 144]
} as const

const suggestedCategories = computed(() =>
  Object.entries(suggestionCategories).map(([category, ids]) => ({
    category,
    questions: getEmployerFaqQuestions(ids, locale.value)
  }))
)

// Hier zusätzliche Themen für den KI-Pilot freigeben. Die Einträge sind i18n-Antwortschlüssel.
// Einzelne Projekte, Ausbildungen und Berufsstationen werden zusätzlich weiter unten freigegeben.
const aiAnswerTopics = new Set([
  'assistant.educationAnswer', // Ausbildung im Überblick
  'assistant.learningAnswer', // Inhalte der Ausbildung
  'assistant.overview.experience', // Beruflicher Werdegang
  'assistant.overview.technologies', // Fähigkeiten und Technologien
  'assistant.personalReplies.softwareExperience.answer', // Praktische Entwicklungserfahrung
  'assistant.personalReplies.languages.answer', // Gesprochene Sprachen
  'assistant.personalReplies.teamwork.answer', // Zusammenarbeit
  'assistant.personalReplies.hours.answer', // Gewünschte Wochenstunden
  'assistant.personalReplies.workplace.answer' // Büro, Hybrid oder Remote
])

// Die Frage bestimmt die Antwortsprache. Ohne Sprachhinweis gilt die Website-Sprache.
const answerLanguage = computed(
  () => detectAssistantLanguage(submittedQuestion.value) ?? locale.value
)

// Holt einen Text per i18n-Schlüssel aus de.ts, en.ts oder ru.ts in der ermittelten Antwortsprache.
function replyText(
  key: string,
  params: Record<string, string> = {}
) {
  return t(key, params, { locale: answerLanguage.value })
}

// Wählt eine hinterlegte Antwort zur Anschlussfrage oder einen Hinweis auf fehlende Angaben.
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

// Baut aus den gefundenen Themen die sichtbaren Antworten mit Überschrift, Text und Links.
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

// Schließt Pixel beim normalen Öffnen eines Links und meldet Projektlinks an die übergeordnete Seite.
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

// Zeigt den Beginn der aktuellen Frage und lässt lange Antworten ab ihrem Anfang lesbar.
function scrollToCurrentQuestion(sequence: number) {
  void nextTick(() => {
    const scroll = assistantScroll.value
    const question = questionBubble.value
    if (sequence !== questionSequence || !replyExpanded.value || contactOpen.value || !assistantDialog.value?.open || !scroll || !question) return

    scroll.scrollTop += question.getBoundingClientRect().top - scroll.getBoundingClientRect().top - 12
  })
}

// Sendet Frage, Themenkennungen und Sprache an /api/pixel-chat.
// Der Server holt dazu die hinterlegten Fakten und ruft Cloudflare Workers AI auf.
async function requestPilotAnswer(
  question: string,
  topics: string[],
  sequence: number
) {
  const request = new AbortController()
  aiRequest = request
  aiPending.value = true

  const timeout = window.setTimeout(() => request.abort(), 12000)
  const cancelled = new Promise<null>(resolve => {
    request.signal.addEventListener('abort', () => resolve(null), { once: true })
  })

  try {
    const response = await Promise.race([
      fetch('/api/pixel-chat', {
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
      }).then(response => response.ok ? response.json() : null),
      cancelled
    ])

    if (disposed || sequence !== questionSequence || request.signal.aborted) return

    const answer = response?.answer
    if (typeof answer === 'string') {
      aiReply.value = (topics.some(topic => topic.startsWith('assistant.projectReplies.'))
        ? withoutProjectAge(answer)
        : answer).trim()
    }
  } catch {
    // Die vorbereitete lokale Antwort wird nach dem Ladezustand angezeigt.
  } finally {
    window.clearTimeout(timeout)

    if (!disposed && sequence === questionSequence) {
      aiRequest = undefined
      aiPending.value = false
      scrollToCurrentQuestion(sequence)
    }
  }
}

function toggleCurrentReply() {
  replyExpanded.value = !replyExpanded.value
  if (replyExpanded.value) scrollToCurrentQuestion(questionSequence)
}

function collapseReplyOnClick(event: MouseEvent) {
  const target = event.target
  if (
    !(target instanceof Element) ||
    !target.closest('.assistant-reply') ||
    target.closest('a, button') ||
    window.getSelection()?.isCollapsed === false
  ) return

  replyExpanded.value = false
}

function toggleSuggestedQuestion(question: string, portfolioExample: boolean) {
  if (submittedQuestion.value === question) {
    toggleCurrentReply()
    return
  }

  sendAssistantQuestion(question, portfolioExample)
}

// Hauptablauf für eigene Fragen und Vorschlagsbuttons.
function sendAssistantQuestion(input: string, portfolioExample = false) {
  const question = input.trim()

  if (!question || question.length > 500) return

  const sequence = ++questionSequence
  aiRequest?.abort()
  aiRequest = undefined

  aiPending.value = false
  aiReply.value = ''
  employerFaqReply.value = null
  employerFaqLinksToPortfolio.value = false
  employerFaqDemoUrl.value = null

  submittedQuestion.value = question
  replyExpanded.value = true
  assistantQuestion.value = ''
  scrollToCurrentQuestion(sequence)

  // Zuerst in den FAQ der erkannten Sprache suchen. Ohne Sprachhinweis gilt die Website-Sprache.
  const detectedLanguage = detectAssistantLanguage(question)
  const employerAnswer = findEmployerFaqAnswer(question, detectedLanguage ?? locale.value)

  if (employerAnswer) {
    employerFaqReply.value = employerAnswer
    const faqTopics = findKnowledgeTopics(question)
    employerFaqLinksToPortfolio.value = portfolioExample || faqTopics.some(isPortfolioTopic)
    if (faqTopics.some(topic => topic.project?.id === 'uno-web')) {
      employerFaqDemoUrl.value = unoWebDemoUrl
    }
    currentTopics.value = []
    followUp.value = null
    lastTopic.value = null
    return
  }

  // Ohne FAQ-Treffer passende Themen über Wörter und Muster in questionMatching.ts suchen.
  const matches = findKnowledgeTopics(question)

  const refersToProject = projectReference.test(question)

  // Wörter wie „dort“ oder „dabei“ können sich auf das zuletzt erkannte Thema beziehen.
  const refersBack =
    refersToProject ||
    /(?<!\p{L})(dort|dabei|there|там)(?!\p{L})/iu.test(question)

  // Das vorherige Thema nur übernehmen, wenn kein neues konkretes Thema dagegen spricht.
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

  // Die KI erhält die Kennungen der erkannten Themen. Daraus wählt der Server seine Quellen.
  const topics = currentTopics.value.map(
    topic => topic.answerKey
  )

  const kind = followUp.value

  // Vorbereitete Anschlussantworten haben bei diesen Rückfragen Vorrang vor der KI.
  const usePreparedFollowUp =
    kind === 'interest' ||
    (
      kind &&
      kind !== 'unknown' &&
      currentTopics.value.some(
        topic => topic.followUps?.[kind]
      )
    )

  // KI nur bei aktivem Pilot und ein bis fünf freigegebenen Themen aufrufen.
  // Bei fehlender Themenerkennung wird die KI hier nicht gestartet.
  if (
    aiPilotEnabled &&
    topics.length >= 1 &&
    topics.length <= 5 &&
    !usePreparedFollowUp &&
    topics.every(key =>
      aiAnswerTopics.has(key) ||
      /^assistant\.(projectReplies|educationReplies|experienceReplies)\./.test(key)
    )
  ) {
    void requestPilotAnswer(question, topics, sequence)
  }
}


// Prüft die Kontaktdaten und sendet Nachricht, Turnstile-Token und Versandkennung an den Server.
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
    // Für einen weiteren Versand muss Turnstile einen neuen Token ausstellen.
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

      <!-- Header -->
      <header class="assistant-header">
        <div class="assistant-identity">
          <img
            class="assistant-avatar"
            src="/images/pixel-avatar.png"
            alt=""
            width="56"
            height="56"
          />
          <div class="assistant-heading">
            <h2 id="assistant-title">{{ t('assistant.name') }}</h2>
            <p class="assistant-message">{{ t('assistant.greeting') }}</p>
            <p class="assistant-header-status">
              <strong>{{ t('assistant.status') }}</strong>
              <span>{{ t('assistant.statusNote') }}</span>
            </p>
          </div>
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

      <div v-show="!contactOpen" ref="assistantScroll" class="assistant-scroll">
        <!-- Abschnittsüberschrift -->
        <h3 id="assistant-suggestion-title" class="assistant-section-title">
          {{ t('assistant.suggestionLabel') }}
        </h3>

        <div
          class="assistant-suggestion-categories"
          role="group"
          aria-labelledby="assistant-suggestion-title"
        >
          <details
            v-for="{ category, questions } in suggestedCategories"
            :key="category"
            name="pixel-suggestion-category"
            class="assistant-suggestion-category"
          >
            <summary>
              <span>{{ t(`assistant.suggestionCategories.${category}`) }}</span>
            </summary>
            <div class="assistant-suggestions">
              <button
                v-for="{ id, question } in questions"
                :key="id"
                type="button"
                :aria-expanded="submittedQuestion === question && replyExpanded"
                aria-controls="pixel-current-reply"
                @click="toggleSuggestedQuestion(question, category === 'projects')"
              >
                {{ question }}
              </button>
            </div>
          </details>
        </div>

        <!-- Frage des Besuchers -->
        <p
          v-if="submittedQuestion"
          ref="questionBubble"
          class="assistant-question"
        >
          {{ submittedQuestion }}
        </p>

        <button
          v-if="submittedQuestion && !replyExpanded"
          class="assistant-details assistant-reopen-reply"
          type="button"
          aria-controls="pixel-current-reply"
          @click="toggleCurrentReply"
        >
          {{ replyText('assistant.showAnswer') }}
        </button>

        <!-- Antworten -->
        <div
          id="pixel-current-reply"
          class="assistant-replies"
          aria-live="polite"
          @click="collapseReplyOnClick"
          :lang="answerLanguage"
        >
          <template v-if="submittedQuestion && replyExpanded">

            <p v-if="aiPending" class="assistant-reply">
              {{ replyText('assistant.loadingAnswer') }}
            </p>

            <article v-else-if="aiReply || employerFaqReply" class="assistant-reply">
              <p class="assistant-reply-text">{{ aiReply || employerFaqReply }}</p>
              <div v-if="answerLinksToPortfolio || employerFaqDemoUrl" class="assistant-answer-links">
                <a
                  v-if="employerFaqDemoUrl"
                  class="assistant-details"
                  :href="employerFaqDemoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ replyText('assistant.projectDemoLink') }}
                </a>
                <a
                  v-if="answerLinksToPortfolio"
                  class="assistant-details"
                  href="/#projects"
                  @click="openAnswerLink($event)"
                >
                  {{ replyText('nav.1') }}
                </a>
              </div>
            </article>

            <template v-else-if="answers.length">
              <article
                v-for="(answer, index) in answers"
                :key="index"
                class="assistant-reply"
              >
                <h3 v-if="answer.title">
                  {{ answer.title }}
                </h3>

                <p class="assistant-reply-text">{{ answer.text }}</p>

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
            </template>

            <!-- Antwort, wenn kein Thema erkannt wird -->
            <div
              v-else
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

      <section
        v-show="contactOpen"
        class="assistant-scroll assistant-contact"
        aria-labelledby="pixel-contact-title"
      >
        <button
          ref="contactBack"
          type="button"
          class="assistant-contact-back"
          @click="returnToChat"
        >
          <span aria-hidden="true">←</span>
          {{ t('assistant.contactForm.backToChat') }}
        </button>

        <h3 id="pixel-contact-title">{{ t('assistant.contactForm.open') }}</h3>
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

          <!-- Spam-Schutz -->
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
      </section>

      <div v-show="!contactOpen" class="assistant-composer">
        <!-- Eigene Frage stellen -->
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

        <details class="assistant-privacy">
          <summary>{{ t('assistant.privacySummary') }}</summary>
          <p
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
        </details>

        <button
          ref="contactTrigger"
          type="button"
          class="assistant-contact-trigger"
          @click="showContact"
        >
          <span class="assistant-contact-icon" aria-hidden="true">✉</span>
          <span>{{ t('assistant.contactForm.open') }}</span>
          <span class="assistant-contact-arrow" aria-hidden="true">→</span>
        </button>
      </div>

    </div>
  </dialog>
</template>

<style scoped>
/* ==========================================
   PIXEL DESIGN CE
   Einheitliche Typografie und klare Bereiche
   ========================================== */

/* Pixel öffnen */

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

/* Hauptfenster */

.assistant-dialog {
  --assistant-inset: clamp(17px, 4vw, 32px);
  --assistant-line: color-mix(
    in srgb,
    var(--ink) 18%,
    var(--surface)
  );
  --assistant-tint: color-mix(
    in srgb,
    var(--accent) 7%,
    var(--surface)
  );
  --assistant-accent-ink: #fff;
  --assistant-subtle: color-mix(in srgb, var(--ink) 4%, var(--surface));
  --assistant-category-green: light-dark(color-mix(in srgb, var(--slate) 55%, var(--surface)), #435e46);
  --assistant-mint: light-dark(var(--slate), #79a992);
  --assistant-contact-fill: color-mix(in srgb, var(--lilac) 22%, var(--surface));
  --assistant-mint-border: color-mix(in srgb, var(--assistant-mint) 49%, var(--assistant-line));
  --assistant-mint-open: light-dark(
    color-mix(in srgb, var(--assistant-mint) 29%, var(--surface)),
    color-mix(in srgb, var(--assistant-mint) 23%, var(--surface))
  );

  box-sizing: border-box;
  width: min(560px, calc(100% - 28px));
  max-height: min(810px, calc(100dvh - 28px));

  overflow: hidden;
  padding: 0;

  border: 1px solid var(--assistant-mint-border);
  border-radius: 20px;
  background: var(--surface);
  color: var(--ink);

  font-family: inherit;
  font-size: 1rem;

  box-shadow: 0 26px 80px rgb(25 42 36 / 30%);
}

/* Dunkelmodus */

:global(:root[data-theme='dark']) .assistant-dialog {
  --assistant-accent-ink: var(--paper);
}

/* Hintergrund hinter Pixel */

.assistant-dialog::backdrop {
  background: rgb(20 36 30 / 43%);
  backdrop-filter: blur(3px);
}

/* Innere Abstände */

.assistant-content {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  max-height: min(808px, calc(100dvh - 30px));
}

.assistant-scroll {
  display: grid;
  align-content: start;
  gap: 17px;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  padding: 17px var(--assistant-inset);
}

/* Kopfbereich */

.assistant-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 16px var(--assistant-inset);

  background: var(--surface);
  color: var(--ink);
}

.assistant-identity {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Pixel-Avatar */

.assistant-avatar {
  display: block;
  flex: 0 0 auto;
  object-fit: contain;
}

.assistant-identity .assistant-avatar {
  padding: 6px;
  border: 1px solid var(--assistant-mint-border);
  border-radius: 14px;
  background: color-mix(in srgb, var(--slate) 34%, var(--surface));
}

/* Pixel-Überschrift */

.assistant-header h2 {
  margin: 0;
  font-size: clamp(1.05rem, 3.8vw, 1.35rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

/* Schließen */

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


/* Pixel-Name und Entwicklungsstatus */

.assistant-heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.assistant-identity {
  min-width: 0;
}

.assistant-header-status {
  margin: 0;
  color: inherit;
  font-size: 0.75rem;
  line-height: 1.4;
}

.assistant-header-status strong {
  color: var(--accent);
  font-weight: 650;
  margin-inline-end: 5px;
}

.assistant-header-status span {
  opacity: 0.85;
}

.assistant-message {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.35;
}

/* Überschrift vor den Fragen */

.assistant-section-title {
  margin: 2px 0 -7px;

  color: var(--ink);

  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

/* Fragevorschläge */

.assistant-suggestion-categories {
  display: grid;
  counter-reset: pixel-category;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 8px;
  padding: 6px;
  border-radius: 14px;
  background: var(--surface);
}

.assistant-suggestion-category {
  counter-increment: pixel-category;
  min-width: 0;
  border-radius: 8px;
}

.assistant-suggestion-category[open] {
  grid-column: 1 / -1;
  background: var(--assistant-mint-open);
}

.assistant-suggestion-category > summary {
  display: grid;
  grid-template-columns: 2ch minmax(0, 1fr);
  align-items: baseline;
  gap: 8px;
  box-sizing: border-box;
  min-height: 54px;
  padding: 10px 8px;
  border-radius: 7px;
  color: var(--ink);
  font-weight: 650;
  overflow-wrap: anywhere;
  line-height: 1.4;
  cursor: pointer;
}

.assistant-suggestion-category > summary::-webkit-details-marker {
  display: none;
}

.assistant-suggestion-category > summary::before {
  content: counter(pixel-category, decimal-leading-zero);
  color: var(--accent);
  font-size: 0.8em;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.assistant-suggestion-category > summary > span {
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--accent) 45%, transparent);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

.assistant-suggestion-category[open] > summary > span {
  color: var(--accent);
}

@media (hover: hover) {
  .assistant-suggestion-category > summary:hover {
    background: var(--assistant-category-green);
  }
}

.assistant-suggestions {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0;
  margin: 0 8px 8px;
  padding: 2px 0;
  border-radius: 7px;
  background: color-mix(in srgb, var(--assistant-mint) 8%, var(--surface));
}

.assistant-suggestions > button {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 44px;
  padding: 7px 10px;

  border: 0;
  background: transparent;
  color: var(--ink);

  font: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  text-align: start;

  cursor: pointer;
  transition: background-color 0.2s ease;
}

@media (hover: hover) {
  .assistant-suggestions > button:hover {
    background-color: var(--assistant-category-green);
    color: var(--accent);
  }
}

.assistant-suggestions > button[aria-expanded='true'] {
  color: var(--accent);
  font-weight: 700;
}

.assistant-suggestions > button:focus-visible {
  outline-offset: -2px;
}

.assistant-contact > p {
  margin: 0;
  line-height: 1.55;
}

/* Kontaktformular */

.assistant-contact-form {
  display: grid;
  gap: 8px;
  margin-top: 12px;
}

.assistant-contact-form label,
.assistant-question-form label {
  font-size: 0.9rem;
  font-weight: 650;
}

.assistant-contact-form textarea {
  resize: vertical;
}

/* Eingabefelder */

.assistant-contact-form :is(input, textarea),
.assistant-question-form input {
  width: 100%;
  min-width: 0;
  min-height: 44px;
  padding: 9px 12px;

  border: 1px solid var(--assistant-line);
  border-radius: 12px;
  background: var(--surface);
  color: var(--ink);

  font: inherit;
}

/* Eigene Frage */

.assistant-question-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px 10px;
  align-items: end;

}

.assistant-composer {
  display: grid;
  gap: 10px;
  padding: 12px var(--assistant-inset) max(12px, env(safe-area-inset-bottom));
  border-top: 1px solid var(--assistant-line);
  background: var(--surface);
}

.assistant-question-form label {
  grid-column: 1 / -1;
  color: var(--ink);
  font-weight: 700;
}

.assistant-question-form input {
  background: color-mix(in srgb, var(--assistant-mint) 9%, var(--surface));
  border-color: color-mix(
    in srgb,
    var(--accent) 40%,
    var(--surface)
  );
}

/* Senden-Buttons */

.assistant-contact-form button,
.assistant-question-form button {
  justify-self: start;
  min-height: 44px;
  padding: 8px 15px;

  border: 1px solid var(--accent);
  border-radius: 13px;
  background: var(--accent);
  color: var(--assistant-accent-ink);

  font: inherit;
  font-weight: 650;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.assistant-question-form button:hover,
.assistant-contact-form button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgb(30 70 50 / 15%);
}

.assistant-contact-form button:disabled {
  opacity: 0.56;
  cursor: not-allowed;
}

/* Frage des Besuchers */

.assistant-question {
  justify-self: end;
  max-width: 92%;
  margin: 4px 0 0;
  padding: 9px 14px;

  border: 1px solid var(--assistant-line);
  border-radius: 18px 18px 5px 18px;

  background: var(--assistant-subtle);

  color: var(--ink);
  font: inherit;
  text-align: start;
  overflow-wrap: anywhere;
}

.assistant-reopen-reply {
  justify-self: start;
  min-height: 44px;
  background: var(--surface);
}

.assistant-privacy summary {
  display: list-item;
  width: fit-content;
  margin-block: -2px;
  padding: 4px 0;
  color: var(--accent);
  font-size: 0.8125rem;
  cursor: pointer;
}

.assistant-privacy[open] .assistant-status {
  margin-top: 6px;
}

.assistant-status {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.45;
}

.assistant-status a {
  text-decoration: underline;
}

/* Antworten von Pixel */

.assistant-replies {
  display: grid;
  gap: 10px;
}

.assistant-replies:empty {
  display: none;
}

.assistant-reply {
  cursor: pointer;
  margin: 0;
  padding: 14px 16px;

  border: 1px solid var(--assistant-line);
  border-inline-start: 4px solid var(--accent);
  border-radius: 18px 18px 18px 5px;

  background: var(--assistant-subtle);

  line-height: 1.6;
  overflow-wrap: anywhere;
}

.assistant-reply h3,
.assistant-reply p {
  margin: 0;
}

.assistant-reply-text {
  white-space: pre-line;
}

.assistant-reply h3 {
  color: var(--accent);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
}

.assistant-reply > * + * {
  margin-top: 10px;
}

/* Antwort-Links */

.assistant-answer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

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
  font-size: 0.86rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.assistant-dialog :is(
  .assistant-header button,
  .assistant-details
):hover {
  background: var(--assistant-tint);
}

/* Fallback-Antworten */

.assistant-fallback ul {
  padding-inline-start: 20px;
  margin-bottom: 0;
}

.assistant-fallback a {
  color: var(--accent);
}

/* Tastaturbedienung */

.assistant-trigger:focus-visible,
.assistant-dialog :focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Kleine Smartphones */

@media (max-width: 340px) {
  .assistant-question-form {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Reduzierte Animation */

@media (prefers-reduced-motion: reduce) {
  .assistant-dialog button {
    transition: none;
  }

  .assistant-dialog button:hover {
    transform: none;
  }
}


/* Kontakt */

.assistant-contact-trigger {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 6px 12px;
  border: 0;
  border-radius: 12px;
  background: var(--assistant-contact-fill);
  color: var(--ink);
  font: inherit;
  font-size: 0.9rem;
  font-weight: 650;
  text-align: start;
  cursor: pointer;
}

.assistant-contact-trigger:hover {
  background: color-mix(in srgb, var(--assistant-contact-fill) 88%, var(--ink));
}

.assistant-contact-icon {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 8px;
  color: var(--accent);
  background: var(--assistant-subtle);
}

.assistant-contact-arrow {
  font-size: 1.1rem;
}

.assistant-contact {
  grid-row: 2 / -1;
  gap: 12px;
}

.assistant-contact h3 {
  margin: 0;
  font-size: 1.25rem;
}

.assistant-contact-back {
  justify-self: start;
  min-height: 44px;
  padding: 6px 10px;
  border: 1px solid var(--assistant-line);
  border-radius: 10px;
  background: var(--surface);
  color: var(--accent);
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
}

.assistant-contact-back span {
  margin-inline-end: 4px;
}
</style>
