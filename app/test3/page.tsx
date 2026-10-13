import type { Metadata } from 'next'
import { HeroTest } from '../test/HeroTest'

export const metadata: Metadata = { title: 'Test 3: hero met video', robots: { index: false, follow: false } }

export default function Test3Page() {
  return (
    <HeroTest
      actief="/test3"
      video="hero-test3"
      eyebrow="Contentplan"
      titel={['Van gemiste vraag', 'naar live pagina']}
      beschrijving="Een contentplan voor twaalf maanden, met per pagina de stappen vragen, schrijven, goedkeuren, live en effect."
    />
  )
}
