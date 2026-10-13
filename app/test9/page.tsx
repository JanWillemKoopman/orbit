import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 9: hero met isometrische video', robots: { index: false, follow: false } }

export default function Test9Page() {
  return (
    <HeroTest
      actief="/test9"
      video="hero-test9"
      eyebrow="Test 9 · Blokken"
      titel={['Zie het patroon', 'in de ruis']}
      beschrijving="Zichtbaarheid in AI verandert per vraag, per assistent en per maand. Zie waar je merk stijgt."
    />
  )
}
