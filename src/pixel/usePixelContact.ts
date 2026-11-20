import { nextTick, onBeforeUnmount, ref } from 'vue'

export function usePixelContact() {
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
      size: 'flexible' | 'compact'
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
        size: turnstileContainer.value.clientWidth < 300 ? 'compact' : 'flexible',

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

  // Turnstile beim Entfernen des Formulars aufräumen.
  onBeforeUnmount(() => {
    disposed = true

    if (turnstileWidget !== undefined) {
      turnstileApi()?.remove(turnstileWidget)
    }
  })

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

  return {
    contactOpen, contactTrigger, contactBack,
    contactEmail, contactMessage, contactWebsite, contactState,
    turnstileSiteKey, turnstileContainer, turnstileToken, turnstileFailed,
    showContact, returnToChat, sendContactMessage
  }
}
