import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { HeroMaand } from '@/components/product/Visuals'
import { afsluiting, foto, intro, klant, meta, meten, vakkennis, type Sectie } from '@/content/over'
import { paginaMeta } from '@/lib/seo'
import '../werkwijze/werkwijze.css'
import './over.css'

export const metadata: Metadata = paginaMeta({ titel: meta.zoektitel, omschrijving: meta.description, pad: '/over' })

// Een persoonlijke pagina, redactioneel opgebouwd zoals linear.app/about: eerst de introductie met portret,
// daarna tekstsecties met de kop links en de tekst rechts op leesbreedte, gescheiden door een dunne lijn.
// Eén compact productbeeld bij het meten, een iets lichter vlak voor de rol van de marketeer en de
// limegroene afsluiter met een eigen tekst en de knoppen Gratis uitproberen en Contact opnemen.

function TekstSectie({ s, vlak = false, children }: { s: Sectie; vlak?: boolean; children?: React.ReactNode }) {
  return (
    <section className={`ov-sectie${vlak ? ' ov-vlak' : ''}`} aria-labelledby={s.id}>
      <h2 id={s.id} className="ov-h2">{s.titel}</h2>
      <div className="ov-tekst">
        {s.alineas.map((p) => <p key={p}>{p}</p>)}
        {s.link && (
          <Link href={s.link.href} className="home-link ov-link">
            {s.link.label} <span className="feature-plus" aria-hidden="true">→</span>
          </Link>
        )}
        {children}
      </div>
    </section>
  )
}

export default function OverPage() {
  return (
    <div className="home ov">
      <section className={`container ov-intro${foto.src ? '' : ' ov-intro-zonder-foto'}`} aria-labelledby="ov-titel">
        <div className="ov-intro-tekst">
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

      <div className="container ov-secties">
        <TekstSectie s={klant} />
        <TekstSectie s={meten}>
          <div className="ov-beeld" role="img" aria-label={meten.beeldAlt}>
            <div className="ov-beeld-inner" aria-hidden="true"><HeroMaand /></div>
          </div>
        </TekstSectie>
        <TekstSectie s={vakkennis} vlak />
      </div>

      <section className="home-prefooter container pd-afsluiter ov-afsluiter" aria-labelledby="ov-afsluiter-titel">
        <CtaAchtergrond />
        <h2 id="ov-afsluiter-titel">{afsluiting.titel}</h2>
        <p>{afsluiting.tekst}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}
