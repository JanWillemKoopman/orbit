import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 10: hero met isometrische video', robots: { index: false, follow: false } }

export default function Test10Page() {
  return (
    <HeroTest
      actief="/test10"
      video="hero-test10"
      eyebrow="Test 10 · Kringloop"
      titel={['Eén kringloop,', 'vijf stappen']}
      beschrijving="Meten, plannen, schrijven, publiceren en hermeten, steeds opnieuw."
    />
  )
}
