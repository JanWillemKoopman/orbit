import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 1: hero met video', robots: { index: false, follow: false } }

export default function Test1Page() {
  return (
    <HeroTest
      actief="/test1"
      video="hero-test1"
      eyebrow="Werkoverzicht"
      titel={['Al je bedrijven', 'in één overzicht']}
      beschrijving="Zie per bedrijf de zichtbaarheid in AI, wat er wacht en wat het kost. Start de maand voor meerdere bedrijven met één klik."
    />
  )
}
