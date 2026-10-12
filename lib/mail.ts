// Stuurt een melding per e-mail via Resend. Instellen als omgevingsvariabelen (Vercel):
//   RESEND_API_KEY  (verplicht)
//   DEMO_NOTIFY_TO  (optioneel, standaard koopman.janwillem@gmail.com)
//   DEMO_MAIL_FROM  (optioneel, standaard het testadres van Resend; gebruik een eigen geverifieerd domein voor productie)
const TO = process.env.DEMO_NOTIFY_TO ?? 'koopman.janwillem@gmail.com'
const FROM = process.env.DEMO_MAIL_FROM ?? 'Orbit <onboarding@resend.dev>'

export const tekst = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function stuurMelding({ replyTo, subject, text }: { replyTo: string; subject: string; text: string }): Promise<'ok' | 'niet-ingesteld' | 'mislukt'> {
  const key = process.env.RESEND_API_KEY
  if (!key) return 'niet-ingesteld'
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: replyTo, subject, text }),
  })
  return res.ok ? 'ok' : 'mislukt'
}
