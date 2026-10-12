import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Contact opnemen', description: `Neem contact op met ${site.name}.` }

const punten = ['Stel ons een vraag', 'Ontdek mogelijke samenwerking', 'Plan een gesprek in']

export default function ContactPage() {
  return (
    <div className="container">
      <div className="contact-page">
        <div className="contact-intro">
          <h1>Contact opnemen</h1>
          <ul>
            {punten.map((p) => (
              <li key={p}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="8" fill="currentColor" />
                  <path d="M4.6 8.2l2.3 2.3 4.5-4.7" stroke="var(--bg-primary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <p className="contact-support">Technische problemen of productvragen? <a href={`mailto:${site.contactEmail}`}>Neem contact op met support</a></p>
        </div>
        <div className="contact-panel">
          <h2>Vertel hoe we je kunnen helpen</h2>
          <ContactForm email={site.contactEmail} />
        </div>
      </div>
    </div>
  )
}
