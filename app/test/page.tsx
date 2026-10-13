import type { Metadata } from 'next'
import { Fragment } from 'react'
import './test.css'

export const metadata: Metadata = {
  title: 'Test: hero met video',
  robots: { index: false, follow: false },
}

const titel = ['Maak je SEO en GEO', 'zelfsturend']

// Testpagina voor de achtergrondvideo, opgebouwd zoals de bovenkant van linear.app/intake:
// een stille, herhalende <video> achter de header, met een SVG-verloop dat naar de paginakleur vervaagt.
export default function TestPage() {
  return (
    <section className="tv-hero">
      <div className="tv-media" aria-hidden="true">
        <video className="tv-video" autoPlay muted loop playsInline disablePictureInPicture disableRemotePlayback preload="auto" poster="/video/hero-test-poster.jpg" tabIndex={-1} {...{ inert: true }}>
          <source src="/video/hero-test.av1.mp4" type="video/mp4; codecs=av01.0.05M.08" />
          <source src="/video/hero-test.vp9.webm" type="video/webm; codecs=vp9" />
          <source src="/video/hero-test.h264.mp4" type="video/mp4" />
        </video>
        <svg className="tv-mask" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tv-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#08090a" />
              <stop offset="40%" stopColor="#08090a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="tv-bottom" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#08090a" />
              <stop offset="50%" stopColor="#08090a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#tv-top)" />
          <rect width="1920" height="1080" fill="url(#tv-bottom)" />
        </svg>
      </div>

      <div className="container tv-content">
        <p className="tv-eyebrow blur-in" style={{ '--i': 0 } as React.CSSProperties}>Taken en integraties</p>
        <h1 className="tv-title">
          {titel.map((regel, i) => (
            <Fragment key={regel}>
              {i > 0 && <br className="tv-br" />}
              <span className="blur-in" style={{ '--i': i + 1 } as React.CSSProperties}>{regel}</span>
            </Fragment>
          ))}
        </h1>
        <p className="tv-description blur-in" style={{ '--i': 3 } as React.CSSProperties}>
          Zet zoekopdrachten, content en technische bevindingen automatisch om in taken die direct bij het juiste team terechtkomen.
        </p>
        <div className="tv-actions blur-in" style={{ '--i': 4 } as React.CSSProperties}>
          <a href="/demo" className="btn btn-lg btn-invert">Gratis demo</a>
          <a href="/product" className="btn btn-lg btn-secondary">Bekijk het product</a>
        </div>
      </div>
    </section>
  )
}
