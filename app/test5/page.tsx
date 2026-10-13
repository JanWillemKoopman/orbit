import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 5: hero met ASCII-video', robots: { index: false, follow: false } }

export default function Test5Page() {
  return (
    <HeroTest
      actief="/test5"
      video="hero-test5"
      eyebrow="Test 5 · Golven"
      titel={['Zichtbaarheid in AI,', 'in beeld gebracht']}
      beschrijving="Meet hoe vaak AI-assistenten een merk noemen en zie wat je eraan kunt doen."
    />
  )
}
