import type { Metadata } from 'next'
import { AanmeldForm } from '@/components/AanmeldForm'
import { LogoMark } from '@/components/Logo'
import { aanmelden } from '@/content/aanmelden'
import { paginaMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata: Metadata = paginaMeta({
  titel: 'Probeer Orbit gratis – Orbit',
  omschrijving: 'Meld je bureau aan en probeer Orbit gratis: onboard je eerste klant en voer een zichtbaarheidsmeting uit.',
  pad: '/aanmelden',
})

// Losse pagina met het aanmeldformulier, voor links vanuit artikelen, e-mails en advertenties.
// Op de site zelf opent de knop "Gratis uitproberen" hetzelfde formulier in een popup.
export default function AanmeldenPage() {
  return (
    <div className="signup">
      <div className="signup-card">
        <div className="logo-mark-lg"><LogoMark size={44} /></div>
        <h1>{aanmelden.titel}</h1>
        <p>{aanmelden.intro}</p>
        <AanmeldForm />
        <a href={site.loginUrl} className="signup-login">Naar inloggen</a>
      </div>
    </div>
  )
}
