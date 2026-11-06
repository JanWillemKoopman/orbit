'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { DemoDialog } from '../DemoDialog'
import { prefooter } from '@/content/home'

// Drie voorstellen voor de afsluiter op mobiel (testpagina /cta-mobiel). Elk voorstel valt meer op dan
// het stippenblok, zonder een limegroen vlak: het accent blijft klein (een stip, een markering).

function Kalender() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6.75h12M5.25 1.75v2.5M10.75 1.75v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function Pijl() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DemoKnop({ className, children }: { className: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>{children}</button>
      <DemoDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}

/* Voorstel 1: een licht vlak. Op een bijna zwarte pagina is het enige lichte blok meteen het
   zwaartepunt; de knop draait om naar donker. */
export function CtaLicht() {
  return (
    <section className="cm cm-licht" aria-labelledby="cm-licht-titel">
      <svg className="cm-licht-ringen" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="200" cy="200" r="90" />
        <circle cx="200" cy="200" r="140" />
        <circle cx="200" cy="200" r="190" />
        <circle cx="321" cy="130" r="14" className="cm-licht-ping" />
        <circle cx="321" cy="130" r="6" className="cm-licht-stip" />
      </svg>
      <p className="cm-label">Demo · 15 of 45 minuten</p>
      <h2 id="cm-licht-titel" className="cm-titel">{prefooter.title}</h2>
      <p className="cm-tekst">Zie in één sessie hoe Orbit meet hoe vaak AI-assistenten jouw bedrijven noemen.</p>
      <div className="cm-knoppen">
        <DemoKnop className="btn btn-lg cm-knop-donker"><Kalender />Plan een gratis demo</DemoKnop>
        <Link href="/contact" className="cm-link-donker">Contact opnemen <Pijl /></Link>
      </div>
    </section>
  )
}

/* Voorstel 2: het product als haak. Een AI-antwoord typt zichzelf uit en noemt "jouw bureau", met
   een kleine lime markering; daaronder de vraag om een demo. */
export function CtaProduct() {
  return (
    <section className="cm cm-product" aria-labelledby="cm-product-titel">
      <div className="cm-chat" aria-hidden="true">
        <div className="cm-vraag">Welk bureau helpt ons zichtbaar te worden in AI-antwoorden?</div>
        <div className="cm-antwoord">
          <span className="cm-ai"><span /></span>
          <p>
            <span className="cm-regel cm-regel-1">Voor zichtbaarheid in AI-assistenten</span>
            <span className="cm-regel cm-regel-2">raad ik <mark>jouw bureau</mark> aan. Zij meten</span>
            <span className="cm-regel cm-regel-3">wat ChatGPT over een merk zegt.</span>
          </p>
        </div>
        <div className="cm-status"><span className="cm-status-stip" />Jouw merk genoemd</div>
      </div>
      <h2 id="cm-product-titel" className="cm-titel">{prefooter.title}</h2>
      <div className="cm-knoppen">
        <DemoKnop className="btn btn-lg btn-invert cm-vol"><Kalender />Plan een gratis demo</DemoKnop>
        <Link href="/contact" className="btn btn-lg btn-secondary cm-vol">Contact opnemen</Link>
      </div>
    </section>
  )
}

/* Voorstel 3: een horizon. Over de volle breedte, met de rand van een planeet die oplicht onder de kop
   en één satelliet in een baan. Geen kaart, maar een moment waar de pagina naartoe werkt. */
export function CtaHorizon() {
  return (
    <section className="cm cm-horizon" aria-labelledby="cm-horizon-titel">
      <div className="cm-horizon-lucht" aria-hidden="true">
        <svg className="cm-horizon-banen" viewBox="0 0 400 400">
          <ellipse cx="200" cy="200" rx="185" ry="70" />
          <ellipse cx="200" cy="200" rx="135" ry="50" />
          <circle className="cm-horizon-sat" cx="0" cy="0" r="3.5" />
        </svg>
      </div>
      <div className="cm-planeet" aria-hidden="true" />
      <div className="cm-horizon-inhoud">
        <p className="cm-label">Gratis demo</p>
        <h2 id="cm-horizon-titel" className="cm-titel">{prefooter.title}</h2>
        <p className="cm-tekst">Een sessie van 15 of 45 minuten, wanneer het jou uitkomt.</p>
        <div className="cm-knoppen">
          <DemoKnop className="btn btn-lg btn-invert cm-vol"><Kalender />Plan een gratis demo</DemoKnop>
          <Link href="/contact" className="btn btn-lg btn-secondary cm-vol">Contact opnemen</Link>
        </div>
      </div>
    </section>
  )
}
