import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 4: hero met video', robots: { index: false, follow: false } }

export default function Test4Page() {
  return (
    <HeroTest
      actief="/test4"
      video="hero-test4"
      eyebrow="Schrijven"
      titel={['Teksten zonder', 'verzinsels']}
      beschrijving="Een onzekere zin wordt geel gemarkeerd. Eén vraag aan het bedrijf en de tekst staat vast."
    />
  )
}
