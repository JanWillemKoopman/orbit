import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 8: hero met ASCII-video', robots: { index: false, follow: false } }

export default function Test8Page() {
  return (
    <HeroTest
      actief="/test8"
      video="hero-test8"
      eyebrow="Test 8 · Stroomveld"
      titel={['Volg wat', 'er beweegt']}
      beschrijving="Meet elke maand opnieuw en zie wat er verandert."
    />
  )
}
