import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import * as P from '@/components/product/Visuals'
import * as A from '@/components/agency/Visuals'
import * as K from '@/components/kennis/Visuals'
import * as I from '@/components/ai/Visuals'
import '../../werkwijze/werkwijze.css'
import '../../beheer/beheer.css'
import '../../kwaliteit/kwaliteit.css'
import '../../ai/ai-pagina.css'
import '../herovideo.css'
import { Regie } from '../regie'

// Scène waaruit de hero-video's van de vier productpagina's worden opgenomen (tools/hero-video).
// Niet voor bezoekers: de pagina is noindex en staat niet in de sitemap.
export const metadata: Metadata = { title: 'Hero-video scène', robots: { index: false, follow: false } }

type Venster = { x: number; y: number; s: number; w: number; children: React.ReactNode }

// Elke pagina heeft een hoofdvenster in macro en een tweede venster dat er schuin achter of naast
// staat, zoals het invoerveld naast de code op linear.app/ai. Coördinaten zijn in het vlak (px) en
// per formaat apart gekozen, omdat een liggend en een staand beeld elk een eigen compositie nodig hebben.
const SCENES: Record<string, Record<string, Venster[]>> = {
  werkwijze: {
    desktop: [
      { x: -980, y: -250, s: 1.6, w: 1120, children: <P.OpenstaandeTaken /> },
      { x: 830, y: 110, s: 1.4, w: 520, children: <P.Hermeting /> },
    ],
    mobiel: [
      { x: -700, y: -60, s: 1.1, w: 1120, children: <P.OpenstaandeTaken /> },
    ],
  },
  kwaliteit: {
    desktop: [
      { x: -640, y: -250, s: 1.6, w: 1120, children: <K.WatWordtGeel /> },
      { x: -40, y: 250, s: 1.25, w: 480, children: <K.GoedkeurenGeblokkeerd /> },
    ],
    mobiel: [
      { x: -200, y: -20, s: 1.3, w: 600, children: <K.WatWordtGeel /> },
    ],
  },
  beheer: {
    desktop: [
      { x: -620, y: -190, s: 1.28, w: 1180, children: <A.HeroWerkoverzicht /> },
      { x: 170, y: 170, s: 1.2, w: 460, children: <A.MaandStarten /> },
    ],
    mobiel: [
      { x: -135, y: -110, s: 1.15, w: 1180, children: <A.HeroWerkoverzicht /> },
    ],
  },
  ai: {
    desktop: [
      { x: -700, y: -110, s: 1.2, w: 1120, children: <I.WieDoetWat /> },
      { x: 700, y: 60, s: 1.05, w: 480, children: <I.BriefVoorPagina /> },
    ],
    mobiel: [
      { x: -150, y: 70, s: 1.2, w: 1120, children: <I.WieDoetWat /> },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(SCENES).map((pagina) => ({ pagina }))
}

export default async function HeroVideoScene({ params, searchParams }: { params: Promise<{ pagina: string }>; searchParams: Promise<{ f?: string }> }) {
  const { pagina } = await params
  const { f } = await searchParams
  const formaat = f === 'mobiel' ? 'mobiel' : 'desktop'
  const vensters = SCENES[pagina]?.[formaat]
  if (!vensters) notFound()
  return (
    <div className="hv-root" data-formaat={formaat}>
      <div className="hv-cam">
        <div className="hv-plane">
          {vensters.map((v, i) => (
            <div key={i} className="hv-win" data-x={v.x} data-y={v.y} data-s={v.s} style={{ width: v.w, transform: `translate3d(${v.x}px, ${v.y}px, 0) scale(${v.s})` }}>
              {v.children}
              <span className="hv-sheen" aria-hidden="true" />
            </div>
          ))}
          <Regie pagina={pagina} />
        </div>
      </div>
      <div className="hv-blur hv-blur-top" />
      <div className="hv-blur hv-blur-edge" />
      <div className="hv-shade" />
      <div className="hv-grain" />
    </div>
  )
}
