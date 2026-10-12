import type { Metadata } from 'next'
import { changelog } from '@/content/changelog'
import { Prefooter } from '@/components/Prefooter'
import { ProductUpdates } from '@/components/ProductUpdates'

export const metadata: Metadata = { title: 'Product updates', alternates: { canonical: '/product-updates' } }

export default function ProductUpdatesPage() {
  return (
    <>
      <div className="container">
        <div className="blog-hero">
          <h1 className="page-title">Product updates</h1>
        </div>
        <ProductUpdates entries={changelog} />
      </div>
      <Prefooter />
    </>
  )
}
