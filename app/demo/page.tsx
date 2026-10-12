import type { Metadata } from 'next'
import { DemoForm } from '@/components/DemoForm'
import { LogoMark } from '@/components/Logo'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Plan een gratis demo', description: `Plan een gratis demo van ${site.name}.` }

export default function DemoPage() {
  return (
    <div className="signup">
      <div className="signup-card">
        <div className="logo-mark-lg"><LogoMark size={44} /></div>
        <h1>Plan een gratis demo</h1>
        <p>Laat je gegevens achter en we plannen samen een sessie van 15 of 45 minuten, wanneer het jou uitkomt.</p>
        <DemoForm />
        <a href={site.loginUrl} className="signup-login">Naar inloggen</a>
      </div>
    </div>
  )
}
