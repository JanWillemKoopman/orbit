import Link from 'next/link'
import { Fragment } from 'react'
import './test.css'

type Props = { video: string; eyebrow: string; titel: string[]; beschrijving: string; actief: string }

const varianten = [
  { href: '/test', label: 'test' },
  { href: '/test1', label: 'test1' },
  { href: '/test2', label: 'test2' },
  { href: '/test3', label: 'test3' },
  { href: '/test4', label: 'test4' },
  { href: '/test5', label: 'test5' },
  { href: '/test6', label: 'test6' },
  { href: '/test7', label: 'test7' },
  { href: '/test8', label: 'test8' },
]

// Hero met achtergrondvideo, opgebouwd zoals de bovenkant van linear.app/intake:
// een stille, herhalende <video> achter de header, met een SVG-verloop dat naar de paginakleur vervaagt.
export function HeroTest({ video, eyebrow, titel, beschrijving, actief }: Props) {
  return (
    <section className="tv-hero">
      <div className="tv-media" aria-hidden="true" style={{ backgroundImage: `url(/video/${video}-poster.jpg)` }}>
        <video className="tv-video" autoPlay muted loop playsInline disablePictureInPicture disableRemotePlayback preload="auto" poster={`/video/${video}-poster.jpg`} tabIndex={-1} {...{ inert: true }}>
          <source src={`/video/${video}.av1.mp4`} type="video/mp4; codecs=av01.0.05M.08" />
          <source src={`/video/${video}.vp9.webm`} type="video/webm; codecs=vp9" />
          <source src={`/video/${video}.h264.mp4`} type="video/mp4" />
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
        <p className="tv-eyebrow blur-in" style={{ '--i': 0 } as React.CSSProperties}>{eyebrow}</p>
        <h1 className="tv-title">
          {titel.map((regel, i) => (
            <Fragment key={regel}>
              {i > 0 && <br className="tv-br" />}
              <span className="blur-in" style={{ '--i': i + 1 } as React.CSSProperties}>{regel}</span>
            </Fragment>
          ))}
        </h1>
        <p className="tv-description blur-in" style={{ '--i': 3 } as React.CSSProperties}>{beschrijving}</p>
        <div className="tv-actions blur-in" style={{ '--i': 4 } as React.CSSProperties}>
          <a href="/demo" className="btn btn-lg btn-invert">Gratis demo</a>
          <a href="/product" className="btn btn-lg btn-secondary">Bekijk het product</a>
        </div>
        <nav className="tv-switch blur-in" style={{ '--i': 5 } as React.CSSProperties} aria-label="Testvarianten">
          {varianten.map((v) => (
            <Link key={v.href} href={v.href} className="tv-switch-link" aria-current={v.href === actief ? 'page' : undefined}>{v.label}</Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
