import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactForm, ContactFormUitAdres } from './ContactForm'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Contact', description: `Neem contact op met ${site.name}.` }

export default function ContactPage() {
  return (
    <div className="container">
      <div className="blog-hero">
        <h1 className="page-title">Contact</h1>
        <p className="page-intro">Een demo aanvragen, een vraag stellen of een samenwerking bespreken? Laat een bericht achter, dan reageren we binnen één werkdag.</p>
      </div>
      <div className="contact-layout">
        <aside className="contact-aside">
          <dl>
            <div>
              <dt>E-mail</dt>
              <dd><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></dd>
            </div>
            <div>
              <dt>Pers</dt>
              <dd>Voor interviews en persvragen kun je hetzelfde formulier gebruiken. Kies dan “Pers” als onderwerp.</dd>
            </div>
            <div>
              <dt>Reactietijd</dt>
              <dd>Op werkdagen binnen 24 uur.</dd>
            </div>
          </dl>
        </aside>
        {/* De knoppen "Demo aanvragen" op /product sturen hierheen met ?onderwerp=demo. */}
        <Suspense fallback={<ContactForm email={site.contactEmail} />}>
          <ContactFormUitAdres email={site.contactEmail} />
        </Suspense>
      </div>
    </div>
  )
}
