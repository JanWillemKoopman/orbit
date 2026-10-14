import type { Metadata } from 'next'
import '../product/product.css'

export const metadata: Metadata = {
  title: 'AI',
  alternates: { canonical: '/ai' },
  // De pagina is nog leeg; pas indexeren als er inhoud staat.
  robots: { index: false, follow: true },
}

// Nog leeg. De inhoud volgt; tot die tijd alleen de titel, in dezelfde hero als /product.
export default function AiPage() {
  return (
    <div className="home pd">
      <section className="container pd-hero" aria-labelledby="pd-titel">
        <h1 id="pd-titel" className="home-title pd-title">AI</h1>
      </section>
    </div>
  )
}
