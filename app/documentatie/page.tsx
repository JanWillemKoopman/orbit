import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Documentatie' }

export default function Page() {
  return (
    <div className="container">
      <div className="blog-hero">
        <h1 className="page-title">Documentatie</h1>
        <p className="page-intro">Hier komt binnenkort de volledige documentatie van de app.</p>
      </div>
    </div>
  )
}
