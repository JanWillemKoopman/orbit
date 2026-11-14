import type { Metadata } from 'next'

// Zolang hier nog niets staat, hoort de pagina niet in de zoekresultaten.
export const metadata: Metadata = { title: 'Documentatie', alternates: { canonical: '/documentatie' }, robots: { index: false, follow: false } }

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
