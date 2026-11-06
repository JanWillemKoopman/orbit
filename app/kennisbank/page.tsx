import type { Metadata } from 'next'
import { KennisbankOverzicht } from '@/components/KennisbankOverzicht'
import { Prefooter } from '@/components/Prefooter'
import { getKennisbankMetas } from '@/lib/posts'

export const metadata: Metadata = { title: 'Kennisbank', description: 'Antwoorden en achtergronden van het Orbit-team.', alternates: { canonical: '/kennisbank' }, robots: { index: false, follow: false } }

export default function KennisbankPage() {
  const items = getKennisbankMetas().map((p) => ({ slug: p.slug, title: p.title, description: p.description }))
  return (
    <>
      <div className="container">
        <KennisbankOverzicht items={items} />
      </div>
      <Prefooter />
    </>
  )
}
