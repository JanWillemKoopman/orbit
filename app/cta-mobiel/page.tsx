import type { Metadata } from 'next'
import { CtaHorizon, CtaLicht, CtaProduct } from '@/components/ctamobiel/CtaVarianten'
import './cta-mobiel.css'

export const metadata: Metadata = { title: 'Afsluiter op mobiel: drie voorstellen', robots: { index: false, follow: false } }

export default function CtaMobielPage() {
  return (
    <div className="cmp">
      <div className="cmp-intro">
        <h1>Afsluiter op mobiel</h1>
        <p>Drie voorstellen die meer opvallen dan het stippenblok, zonder limegroen vlak.</p>
      </div>
      <h2 className="cmp-kop"><b>Voorstel 1</b> Licht vlak</h2>
      <CtaLicht />
      <h2 className="cmp-kop"><b>Voorstel 2</b> Het product als haak</h2>
      <CtaProduct />
      <h2 className="cmp-kop"><b>Voorstel 3</b> Horizon</h2>
      <CtaHorizon />
    </div>
  )
}
