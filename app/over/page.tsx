import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Over' }

export default function Page() {
  return (
    <div className="container">
      <div className="blog-hero">
        <h1 className="page-title">Over</h1>
        <p className="page-intro">Hier komt binnenkort meer informatie over de maker van Orbit.</p>
      </div>
    </div>
  )
}
