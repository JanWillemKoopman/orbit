import type { Metadata } from 'next'
import { DemoForm } from '@/components/DemoForm'
import { LogoMark } from '@/components/Logo'
import { paginaMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata: Metadata = paginaMeta({
  titel: 'Plan een gratis demo voor je bureau – Orbit',
  omschrijving:
    'Zie in 15 of 45 minuten hoe je bureau met Orbit AI-zichtbaarheid als vaste dienst verkoopt. Gratis, en op een moment dat jou uitkomt.',
  pad: '/demo',
})

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
