import type { Metadata } from 'next'

// Zolang hier nog niets staat, hoort de pagina niet in de zoekresultaten.
export const metadata: Metadata = { title: 'Installatiegids', alternates: { canonical: '/installatiegids' }, robots: { index: false, follow: false } }

export default function Page() {
  return (
    <div className="container">
      <div className="blog-hero">
        <h1 className="page-title">Installatiegids</h1>
        <p className="page-intro">Hier komt binnenkort een beschrijving van hoe je Orbit installeert.</p>
      </div>
    </div>
  )
}
