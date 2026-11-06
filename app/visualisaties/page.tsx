import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { prefooter } from '@/content/home'
import type { SceneNaam } from '@/components/dots/scenes'
import './visualisaties.css'

export const metadata: Metadata = { title: 'Nieuwe visualisaties afsluiter', robots: { index: false, follow: false } }

const NIEUW: { scene: SceneNaam; label: string; uitleg: string }[] = [
  { scene: 'golven', label: 'Golven', uitleg: 'Lijnen van stippen die als een signaal op en neer golven.' },
  { scene: 'stelsel', label: 'Stelsel', uitleg: 'Een draaiend sterrenstelsel met twee spiraalarmen.' },
  { scene: 'wereldbol', label: 'Wereldbol', uitleg: 'Een draaiende bol waarop signalen oplichten, met een satelliet in een baan.' },
  { scene: 'halftoon', label: 'Halftoon', uitleg: 'Een raster waarin stippen groeien en krimpen met een drijvende wolk.' },
]

// Testpagina: vier nieuwe achtergronden voor de afsluiter onder elkaar, elk vast in één scène.
export default function VisualisatiesPage() {
  return (
    <div className="vis">
      {NIEUW.map((v, i) => (
        <div key={v.scene}>
          <p className="container vis-kop"><b>{i + 1}. {v.label}</b> {v.uitleg}</p>
          <section className="home-prefooter container">
            <CtaAchtergrond scene={v.scene} />
            <h2>{prefooter.title}</h2>
            <div className="home-prefooter-actions">
              <PrefooterKnoppen />
            </div>
          </section>
        </div>
      ))}
    </div>
  )
}
