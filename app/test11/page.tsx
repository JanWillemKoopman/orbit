import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 11: hero met isometrische video', robots: { index: false, follow: false } }

export default function Test11Page() {
  return (
    <HeroTest
      actief="/test11"
      video="hero-test11"
      eyebrow="Test 11 · Stroom"
      titel={['Van losse signalen', 'naar één beeld']}
      beschrijving="Meetgegevens van AI-assistenten en Google Search Console komen samen op één plek."
    />
  )
}
