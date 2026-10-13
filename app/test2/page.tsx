import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 2: hero met video', robots: { index: false, follow: false } }

export default function Test2Page() {
  return (
    <HeroTest
      actief="/test2"
      video="hero-test2"
      eyebrow="Zichtbaarheid in AI"
      titel={['Zie hoe vaak AI-assistenten', 'je merk noemen']}
      beschrijving="Een cijfer per onderwerp voor ChatGPT, Gemini en Google AI Overview, met een eerlijke marge en de concurrenten die de antwoorden winnen."
    />
  )
}
