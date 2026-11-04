import type { Metadata } from 'next'
import { PaginaHero } from '@/components/product/Blokken'
import '../pagina.css'

const titel = 'AI software voor marketing agencys met groeiambitie'

export const metadata: Metadata = {
  title: 'Agencies',
  description: titel,
  alternates: { canonical: '/agencies' },
}

// Voorlopig alleen de hero met achtergrondvideo, opgebouwd als de productpagina's (pagina.css).
export default function Page() {
  return <PaginaHero titel={titel} video="hero-agencies" />
}
