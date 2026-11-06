import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { prefooter } from '@/content/home'

export const metadata: Metadata = { title: 'Afsluiter in lime', robots: { index: false, follow: false } }

// Testpagina: de afsluiter van de homepage, gelijk van opbouw, maar limegroen met donkere stippen en knoppen.
export default function CtaMobielPage() {
  return (
    <section className="home-prefooter container">
      <CtaAchtergrond lime />
      <h2>{prefooter.title}</h2>
      <div className="home-prefooter-actions">
        <PrefooterKnoppen />
      </div>
    </section>
  )
}
