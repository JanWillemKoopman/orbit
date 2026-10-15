import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { hero as ai } from '@/content/ai'
import { hero as werkwijze } from '@/content/werkwijze'
import { hero as kwaliteit } from '@/content/kwaliteit'
import { hero as beheer } from '@/content/beheer'
import '../../herovideo.css'

// Scène waaruit de deel-afbeeldingen (1200 x 630) van de vier productpagina's worden opgenomen
// (tools/hero-video/og.mjs). Niet voor bezoekers: de pagina is noindex.
export const metadata: Metadata = { title: 'Deel-afbeelding scène', robots: { index: false, follow: false } }

const PAGINAS = { ai, werkwijze, kwaliteit, beheer } as const

export function generateStaticParams() {
  return Object.keys(PAGINAS).map((pagina) => ({ pagina }))
}

export default async function OgScene({ params }: { params: Promise<{ pagina: string }> }) {
  const { pagina } = await params
  const h = PAGINAS[pagina as keyof typeof PAGINAS]
  if (!h) notFound()
  return (
    <div className="og-root" style={{ '--poster': `url(/video/hero-${pagina}-desktop-poster.jpg)` } as React.CSSProperties}>
      <div className="og-shade" />
      <div className="og-logo"><Logo /></div>
      <div className="og-tekst">
        <p>{h.eyebrow}</p>
        <h1>{h.title}</h1>
      </div>
    </div>
  )
}
