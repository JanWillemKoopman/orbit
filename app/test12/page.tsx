import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 12: hero met isometrische video', robots: { index: false, follow: false } }

export default function Test12Page() {
  return (
    <HeroTest
      actief="/test12"
      video="hero-test12"
      eyebrow="Test 12 · Lagen"
      titel={['Bouw laag voor laag', 'aan je zichtbaarheid']}
      beschrijving="Van onderzoek naar contentplan, van tekst naar bewezen effect."
    />
  )
}
