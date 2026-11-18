import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiting, citaat, inleiding, meta, secties, titel } from '@/content/over'
import { paginaMeta } from '@/lib/seo'
import './over.css'

export const metadata: Metadata = paginaMeta({ titel: meta.zoektitel, omschrijving: meta.description, pad: '/over' })

// Een persoonlijke pagina, opgemaakt als een blogartikel (zie ArticleView en article.css): een gecentreerde
// titel, daaronder de smalle tekstkolom met een grotere inleiding, een uitgelicht citaat en secties met een
// eigen kop. Onderaan het limegroene afsluitblok met één knop: Gratis uitproberen.
export default function OverPage() {
  return (
    <div className="ov">
      <article className="article article-blog ov-artikel">
        <h1 className="article-title">{titel}</h1>
        <div className="prose">
          <p>{inleiding}</p>
          <blockquote>
            <p>{citaat.tekst}</p>
            <cite>{citaat.naam}, {citaat.functie}</cite>
          </blockquote>
          {secties.map((s) => (
            <section key={s.id} className="ov-sectie" aria-labelledby={s.id}>
              <h2 id={s.id}>{s.titel}</h2>
              {s.alineas.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}
        </div>
      </article>

      <section className="home-prefooter container pd-afsluiter ov-afsluiter" aria-labelledby="ov-afsluiter-titel">
        <CtaAchtergrond />
        <h2 id="ov-afsluiter-titel">{afsluiting.titel}</h2>
        <p>{afsluiting.tekst}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen contact={false} />
        </div>
      </section>
    </div>
  )
}
