import Link from 'next/link'
import { Fragment } from 'react'
import './ai.css'

type Props = { video: string; actief: string }

const varianten = ['/ai1', '/ai2']

// Bovenkant van linear.app/ai: hero met achtergrondvideo, daarna de introsectie met titel links en tekst rechts.
export function AiPagina({ video, actief }: Props) {
  const titel = ['Agents that follow work', 'from conversation to code']
  return (
    <>
      <section className="ai-hero">
        <div className="ai-media" aria-hidden="true" style={{ '--poster': `url(/video/${video}-poster.jpg)` } as React.CSSProperties}>
          <video className="ai-video" autoPlay muted loop playsInline disablePictureInPicture disableRemotePlayback preload="auto" poster={`/video/${video}-poster.jpg`} tabIndex={-1} {...{ inert: true }}>
            <source src={`/video/${video}.av1.mp4`} type="video/mp4; codecs=av01.0.05M.08" />
            <source src={`/video/${video}.vp9.webm`} type="video/webm; codecs=vp9" />
            <source src={`/video/${video}.h264.mp4`} type="video/mp4" />
          </video>
          <svg className="ai-mask" viewBox="0 0 1920 1080" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ai-top" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#08090a" />
                <stop offset="40%" stopColor="#08090a" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="ai-bottom" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#08090a" />
                <stop offset="50%" stopColor="#08090a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="1920" height="1080" fill="url(#ai-top)" />
            <rect width="1920" height="1080" fill="url(#ai-bottom)" />
          </svg>
        </div>

        <div className="container ai-hero-inner">
          <p className="ai-eyebrow blur-in" style={{ '--i': 0 } as React.CSSProperties}>AI and automations</p>
          <h1 className="ai-title">
            {titel.map((regel, i) => (
              <Fragment key={regel}>
                {i > 0 && <br className="ai-br" />}
                <span className="blur-in" style={{ '--i': i + 1 } as React.CSSProperties}>{regel}</span>
              </Fragment>
            ))}
          </h1>
        </div>
      </section>

      <section className="container ai-intro" aria-labelledby="ai-intro-titel">
        <div className="ai-intro-kop">
          <div className="ai-intro-titel">
            <p className="ai-intro-label">Linear Agent</p>
            <h2 id="ai-intro-titel">Artificial colleagues.<br />Natural collaboration.</h2>
          </div>
          <div className="ai-intro-tekst">
            <p>Linear Agent understands your projects, issues, customer requests, docs, and code, so every decision is grounded with full context.</p>
            <button type="button" className="ai-intro-actie">
              <span>Linear Agent</span>
              <span className="ai-intro-plus" aria-hidden="true">+</span>
            </button>
          </div>
        </div>
      </section>

      <nav className="container ai-switch" aria-label="Videovarianten">
        {varianten.map((href) => (
          <Link key={href} href={href} className="ai-switch-link" aria-current={href === actief ? 'page' : undefined}>{href.slice(1)}</Link>
        ))}
      </nav>
    </>
  )
}
