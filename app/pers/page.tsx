import type { Metadata } from 'next'
import { press } from '@/content/press'
import { paginaMeta } from '@/lib/seo'
import { BlogHero } from '@/components/BlogHero'
import { Prefooter } from '@/components/Prefooter'
import { PressCard } from '@/components/PressCard'

export const metadata: Metadata = paginaMeta({
  titel: 'Orbit in de pers: nieuws, interviews en podcasts',
  omschrijving:
    'Wat er over Orbit wordt geschreven en gezegd: artikelen, interviews en podcasts over zichtbaarheid in AI en de toekomst van zoeken.',
  pad: '/pers',
})

export default function PressPage() {
  return (
    <>
      <div className="container">
        <BlogHero active="/pers" />
        <div className="press-grid">
          {press.map((item) => <PressCard key={item.title} item={item} />)}
        </div>
      </div>
      <Prefooter />
    </>
  )
}
