import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import type { SceneNaam } from '@/components/dots/scenes'
import '../visualisaties/visualisaties.css'

export const metadata: Metadata = { title: 'Visualisaties limegroene afsluiter', robots: { index: false, follow: false } }

const NIEUW: { scene: SceneNaam; label: string; uitleg: string }[] = [
  { scene: 'horizon', label: 'Horizon', uitleg: 'Een zwart gat met een draaiende schijf die door de zwaartekracht over de schaduw heen buigt.' },
  { scene: 'metamorfose', label: 'Metamorfose', uitleg: 'Een draaiende 3D-wolk die steeds van vorm wisselt: bol, torus, knoop, helix, kubus.' },
  { scene: 'warp', label: 'Warp', uitleg: 'Een kronkelende tunnel van stippen waar je doorheen schiet.' },
  { scene: 'moire', label: 'Moiré', uitleg: 'Twee stippenrasters over elkaar; één draait langzaam, en daaruit ontstaan bewegende patronen.' },
  { scene: 'magneet', label: 'Magneet', uitleg: 'Een raster dat op je muis reageert. Beweeg eroverheen, of klik voor een schokgolf.' },
]

// Testpagina: vijf nieuwe achtergronden voor de limegroene afsluiter onder elkaar, elk vast in één scène.
export default function CtaVisualisatiesPage() {
  return (
    <div className="vis">
      {NIEUW.map((v, i) => (
        <div key={v.scene}>
          <p className="container vis-kop"><b>{i + 1}. {v.label}</b> {v.uitleg}</p>
          <section className="home-prefooter container">
            <CtaAchtergrond scene={v.scene} lime />
            <h2>Built for the future.<br />Available today.</h2>
            <div className="home-prefooter-actions">
              <PrefooterKnoppen />
            </div>
          </section>
        </div>
      ))}
    </div>
  )
}
