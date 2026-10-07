import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Product' }

export default function Page() {
  return (
    <div className="container">
      <div className="blog-hero">
        <h1 className="page-title">Product</h1>
        <p className="page-intro">Hier komt binnenkort een overzicht van alle mogelijkheden van Orbit.</p>
      </div>
    </div>
  )
}
