import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 6: hero met ASCII-video', robots: { index: false, follow: false } }

export default function Test6Page() {
  return (
    <HeroTest
      actief="/test6"
      video="hero-test6"
      eyebrow="Test 6 · Bergruggen"
      titel={['Zie het landschap', 'van je markt']}
      beschrijving="Welke concurrenten winnen de antwoorden, en welke vragen mist je merk?"
    />
  )
}
