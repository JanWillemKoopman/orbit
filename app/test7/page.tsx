import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 7: hero met ASCII-video', robots: { index: false, follow: false } }

export default function Test7Page() {
  return (
    <HeroTest
      actief="/test7"
      video="hero-test7"
      eyebrow="Test 7 · Planeet"
      titel={['Breng je merk', 'in de baan']}
      beschrijving="Van meting naar bewezen effect, in één kringloop van vijf stappen."
    />
  )
}
