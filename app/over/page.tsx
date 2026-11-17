import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { AfsluitingKnoppen } from '@/components/over/AfsluitingKnoppen'
import { HeroMaand } from '@/components/product/Visuals'
import { aanleiding, afsluiting, bureaus, foto, intro, keuzes, meta, watOrbitDoet } from '@/content/over'
import { paginaMeta } from '@/lib/seo'
import '../werkwijze/werkwijze.css'
import './over.css'

export const metadata: Metadata = paginaMeta({ titel: meta.zoektitel, omschrijving: meta.description, pad: '/over' })

// Een persoonlijke productpagina, redactioneel opgebouwd zoals linear.app/about: eerst de introductie met
// portret, daarna tekstsecties met de kop links en de tekst rechts op leesbreedte, gescheiden door een dunne
// lijn. Eén compact productbeeld bij "wat Orbit doet", een iets lichter vlak voor het deel over bureaus en de
// limegroene afsluiter met een eigen tekst en twee acties in plaats van de algemene afsluiter.

function TekstLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className="home-link ov-link">
      {label} <span className="feature-plus" aria-hidden="true">→</span>
    </Link>
  )
}

export default function OverPage() {
  return (
    <div className="home ov">
      <section className={`container ov-intro${foto.src ? '' : ' ov-intro-zonder-foto'}`} aria-labelledby="ov-titel">
        <div className="ov-intro-tekst">
          <p className="ov-label">{intro.label}</p>
          <h1 id="ov-titel" className="ov-titel">{intro.titel}</h1>
          {intro.alineas.map((p) => <p key={p} className="ov-intro-alinea">{p}</p>)}
        </div>
        {foto.src && (
          <figure className="ov-portret">
            <div className="ov-portret-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={foto.src} alt={foto.alt} width={foto.breedte} height={foto.hoogte} decoding="async" fetchPriority="high" />
            </div>
            <figcaption>{foto.onderschrift}</figcaption>
          </figure>
        )}
      </section>

      <section className="container ov-sectie" aria-labelledby="ov-aanleiding">
        <h2 id="ov-aanleiding" className="ov-h2">{aanleiding.titel}</h2>
        <div className="ov-tekst">
          {aanleiding.alineas.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className="container ov-sectie" aria-labelledby="ov-wat">
        <h2 id="ov-wat" className="ov-h2">{watOrbitDoet.titel}</h2>
        <div className="ov-tekst">
          {watOrbitDoet.alineas.map((p) => <p key={p}>{p}</p>)}
          <TekstLink {...watOrbitDoet.link} />
          <div className="ov-beeld" role="img" aria-label={watOrbitDoet.beeldAlt}>
            <div className="ov-beeld-inner" aria-hidden="true"><HeroMaand /></div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="ov-sectie ov-vlak" aria-labelledby="ov-bureaus">
          <h2 id="ov-bureaus" className="ov-h2">{bureaus.titel}</h2>
          <div className="ov-tekst">
            {bureaus.alineas.map((p) => <p key={p}>{p}</p>)}
            <TekstLink {...bureaus.link} />
          </div>
        </section>
      </div>

      <section className="container ov-sectie ov-keuzes" aria-labelledby="ov-keuzes">
        <h2 id="ov-keuzes" className="ov-h2">{keuzes.titel}</h2>
        <ul className="ov-tekst ov-keuzelijst">
          {keuzes.onderdelen.map((k) => (
            <li key={k.titel}>
              <h3>{k.titel}</h3>
              <p>{k.tekst}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-prefooter container pd-afsluiter ov-afsluiter" aria-labelledby="ov-afsluiter-titel">
        <CtaAchtergrond />
        <h2 id="ov-afsluiter-titel">{afsluiting.titel}</h2>
        {afsluiting.alineas.map((p) => <p key={p}>{p}</p>)}
        <div className="home-prefooter-actions">
          <AfsluitingKnoppen knop={afsluiting.knop} mail={afsluiting.mail} />
        </div>
      </section>
    </div>
  )
}
