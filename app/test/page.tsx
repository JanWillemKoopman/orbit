import type { Metadata } from 'next'
import { HeroTest } from './HeroTest'

export const metadata: Metadata = { title: 'Test: hero met video', robots: { index: false, follow: false } }

export default function TestPage() {
  return (
    <HeroTest
      actief="/test"
      video="hero-test"
      eyebrow="Taken en integraties"
      titel={['Maak je SEO en GEO', 'zelfsturend']}
      beschrijving="Zet zoekopdrachten, content en technische bevindingen automatisch om in taken die direct bij het juiste team terechtkomen."
    />
  )
}
