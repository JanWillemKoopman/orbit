import type { Metadata } from 'next'
import { AanmeldForm } from './AanmeldForm'
import { LogoMark } from '@/components/Logo'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Aanmelden', description: `Vraag een account aan bij ${site.name}.` }

export default function AanmeldenPage() {
  return (
    <div className="signup">
      <div className="signup-card">
        <div className="logo-mark-lg"><LogoMark size={44} /></div>
        <h1>Account aanvragen</h1>
        <p>Vraag kostenloos een account aan.</p>
        <AanmeldForm email={site.contactEmail} />
        <a href="https://www.nogoptegevenurl.nl" className="signup-login">Naar inloggen</a>
      </div>
    </div>
  )
}
