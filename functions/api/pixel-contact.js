// Server-Schnittstelle für Kontaktanfragen. Prüft den Turnstile-Nachweis und versendet die Nachricht über Resend.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_BODY_BYTES = 16000

function response(/** @type {number} */ status) {
  return Response.json({ ok: status === 200 }, {
    status,
    headers: { 'Cache-Control': 'no-store' }
  })
}

/**
 * @param {{request: Request, env: {
 *   RESEND_API_KEY?: string,
 *   PIXEL_CONTACT_TO?: string,
 *   PIXEL_CONTACT_FROM?: string,
 *   TURNSTILE_SECRET_KEY?: string
 * }}} context
 */
export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin')
  const url = new URL(request.url)
  if (origin !== url.origin) return response(403)
  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') {
    return response(415)
  }

  const reader = request.body?.getReader()
  if (!reader) return response(400)
  const decoder = new TextDecoder()
  let size = 0
  let body = ''
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        await reader.cancel()
        return response(413)
      }
      body += decoder.decode(value, { stream: true })
    }
    body += decoder.decode()
  } catch {
    return response(400)
  } finally {
    reader.releaseLock()
  }

  let form
  try {
    form = JSON.parse(body)
  } catch {
    return response(400)
  }

  if (!form || typeof form !== 'object') return response(400)
  if (form.website) return response(400)

  const replyTo = typeof form.email === 'string' ? form.email.trim() : ''
  const message = typeof form.message === 'string' ? form.message.trim() : ''
  const requestId = form.requestId
  if (replyTo.length > 254 || !EMAIL_PATTERN.test(replyTo) ||
      !message || message.length > 3000 ||
      typeof requestId !== 'string' || !/^[\da-f-]{36}$/i.test(requestId)) {
    return response(400)
  }

  if (!env.RESEND_API_KEY || !env.PIXEL_CONTACT_TO || !env.TURNSTILE_SECRET_KEY) return response(503)

  const token = form.turnstileToken
  if (typeof token !== 'string' || !token || token.length > 2048) return response(422)
  const challenge = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token })
  const clientIp = request.headers.get('CF-Connecting-IP')
  if (clientIp) challenge.set('remoteip', clientIp)
  try {
    const verified = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: challenge,
      signal: AbortSignal.timeout(8000)
    })
    if (!verified.ok) return response(503)
    const result = await verified.json()
    if (result.success !== true || result.hostname !== url.hostname || result.action !== 'pixel_contact') {
      return response(422)
    }
  } catch {
    return response(503)
  }

  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `pixel-contact/${requestId}`
      },
      body: JSON.stringify({
        from: env.PIXEL_CONTACT_FROM || 'Pixel <onboarding@resend.dev>',
        to: [env.PIXEL_CONTACT_TO],
        reply_to: replyTo,
        subject: 'Neue Nachricht über Pixel',
        text: `Antwortadresse: ${replyTo}\n\n${message}`
      }),
      signal: AbortSignal.timeout(10000)
    })
    if (!sent.ok) return response(502)
    const result = await sent.json()
    return response(typeof result?.id === 'string' && result.id ? 200 : 502)
  } catch {
    return response(502)
  }
}
