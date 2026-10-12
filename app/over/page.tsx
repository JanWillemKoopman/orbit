import type { Metadata } from 'next'
import { Prefooter } from '@/components/Prefooter'
import { foto, hero, verhaal } from '@/content/over'
import './over.css'

export const metadata: Metadata = {
  title: 'Over',
  description: hero.description,
  alternates: { canonical: '/over' },
}

export default function Page() {
  return (
    <>
      <div className="home">
        <section className="container ov-hero" aria-labelledby="ov-titel">
          <h1 id="ov-titel" className="ov-title">
            {hero.title.map((regel) => <span key={regel}>{regel}</span>)}
          </h1>
          <p className="ov-description">{hero.description}</p>
        </section>

        <div className="container ov-foto">
          <div className="ov-foto-frame">
            {foto.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={foto.src} alt={foto.alt} />
            ) : (
              <div className="ov-foto-placeholder" role="img" aria-label="Plaats voor een foto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="9" cy="10" r="1.75" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 17.5l4.5-4.5 3.5 3.5 3-3 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Hier komt een foto
              </div>
            )}
          </div>
        </div>

        <section className="container ov-verhaal" aria-labelledby="ov-verhaal">
          <h2 id="ov-verhaal">
            {verhaal.title.map((regel) => <span key={regel}>{regel}</span>)}
          </h2>
          <div className="ov-tekst">
            <p className="ov-lead">{verhaal.lead}</p>
            {verhaal.paragrafen.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>
      </div>
      <Prefooter />
    </>
  )
}
