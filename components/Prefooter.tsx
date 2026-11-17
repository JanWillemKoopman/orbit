import { afsluiter } from '@/content/aanmelden'
import { CtaAchtergrond } from './CtaAchtergrond'
import { PrefooterKnoppen } from './PrefooterKnoppen'

// De afsluiter onderaan elke pagina: het limegroene blok met een kop, een zin en de knop Gratis uitproberen.
// De tekst staat in content/aanmelden.ts en is op alle pagina's dezelfde, tenzij een pagina een eigen
// kop en zin meegeeft (zoals /werkwijze).
export function Prefooter({ tekst = afsluiter }: { tekst?: { title: string; description: string } }) {
  return (
    <section className="home-prefooter container pd-afsluiter" aria-labelledby="afsluiter-titel">
      <CtaAchtergrond />
      <h2 id="afsluiter-titel">{tekst.title}</h2>
      <p>{tekst.description}</p>
      <div className="home-prefooter-actions">
        <PrefooterKnoppen contact={false} />
      </div>
    </section>
  )
}
