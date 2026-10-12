import type { Metadata } from 'next'
import { BlogHero } from '@/components/BlogHero'
import { CardGrid } from '@/components/PostCard'
import { Prefooter } from '@/components/Prefooter'
import { getPostsByCategory } from '@/lib/posts'

export const metadata: Metadata = { title: 'Kennisbank' }

// Toont de berichten van de categorie "Van het team" onder de URL /kennisbank.
export default function KennisbankPage() {
  return (
    <>
      <div className="container">
        <BlogHero active="/categorie/van-het-team" />
        <div style={{ marginTop: 40 }}>
          <CardGrid posts={getPostsByCategory('van-het-team')} priority />
        </div>
      </div>
      <Prefooter />
    </>
  )
}
