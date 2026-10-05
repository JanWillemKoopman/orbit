import type { Metadata } from 'next'
import { press } from '@/content/press'
import { BlogHero } from '@/components/BlogHero'
import { Prefooter } from '@/components/Prefooter'
import { PressCard } from '@/components/PressCard'

export const metadata: Metadata = { title: 'Pers' }

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
