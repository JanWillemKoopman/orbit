'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Popup voor de maandelijkse nieuwsbrief op de homepage. Verschijnt één keer per sessie, zodra de
// bezoeker 70% van de pagina heeft gescrold. Wie zich heeft aangemeld, krijgt hem niet meer te zien.
// De aanmelding gaat naar /api/nieuwsbrief, dat een melding per e-mail stuurt.
const DREMPEL = 0.7
const SESSIE_KEY = 'orbit-nieuwsbrief-getoond'
const AANGEMELD_KEY = 'orbit-nieuwsbrief-aangemeld'

const lees = (opslag: () => Storage, key: string) => {
  try {
    return opslag().getItem(key)
  } catch {
    return null
  }
}
const schrijf = (opslag: () => Storage, key: string) => {
  try {
    opslag().setItem(key, '1')
  } catch {}
}

export function NieuwsbriefPopup() {
  const ref = useRef<HTMLDialogElement>(null)
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    setMounted(true)
    if (lees(() => sessionStorage, SESSIE_KEY) || lees(() => localStorage, AANGEMELD_KEY)) return

    let frame = 0
    const check = () => {
      frame = 0
      const scrollbaar = document.documentElement.scrollHeight - window.innerHeight
      if (scrollbaar <= 0 || window.scrollY / scrollbaar < DREMPEL) return
      schrijf(() => sessionStorage, SESSIE_KEY)
      window.removeEventListener('scroll', onScroll)
      setOpen(true)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open, mounted])

  const sluit = () => setOpen(false)

  if (!mounted) return null
  return createPortal(
    <dialog
      ref={ref}
      className="nb-dialog"
      aria-labelledby="nb-titel"
      onClose={sluit}
      onClick={(e) => { if (e.target === ref.current) sluit() }}
    >
      {open && (
        <div className="nb-grid">
          <div className="nb-beeld" aria-hidden="true">
            <OrbitBeeld />
            <ul className="nb-tags">
              <li>AI Overviews</li>
              <li>Google-updates</li>
              <li>GEO</li>
            </ul>
          </div>

          <div className="nb-body">
            <button type="button" className="demo-close nb-close" aria-label="Sluiten" onClick={sluit}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>

            {status === 'sent' ? (
              <div className="nb-succes" role="status">
                <div className="nb-succes-icoon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.4l3 3 6-6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h2 id="nb-titel" className="nb-titel">Je staat op de lijst</h2>
                <p className="nb-intro">Bedankt voor je aanmelding. De eerstvolgende editie komt begin volgende maand in je inbox.</p>
                <button type="button" className="nb-nee" onClick={sluit}>Sluiten</button>
              </div>
            ) : (
              <>
                <p className="nb-eyebrow">Orbit Insights</p>
                <h2 id="nb-titel" className="nb-titel">
                  AI-search, uitgelegd.<br />
                  <span className="nb-titel-zacht">Eén keer per maand.</span>
                </h2>
                <p className="nb-intro">Wat er veranderde in Google en in AI-antwoorden, en wat je daarmee doet op je eigen site. Eén mail per maand, zonder poespas.</p>

                <form
                  className="nb-form"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setStatus('sending')
                    const data = Object.fromEntries(new FormData(e.currentTarget))
                    try {
                      const res = await fetch('/api/nieuwsbrief', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                      if (res.ok) schrijf(() => localStorage, AANGEMELD_KEY)
                      setStatus(res.ok ? 'sent' : 'error')
                    } catch {
                      setStatus('error')
                    }
                  }}
                >
                  <label htmlFor="nb-email" className="nb-label">Zakelijk e-mailadres</label>
                  <div className="nb-rij field">
                    <input id="nb-email" name="email" type="email" required autoComplete="email" placeholder="naam@bedrijf.nl" />
                    <button type="submit" className="btn btn-lg btn-invert nb-knop" disabled={status === 'sending'}>
                      {status === 'sending' ? <span className="glans">Aanmelden…</span> : 'Aanmelden'}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </div>
                  {/* Honeypot tegen spam: mensen zien dit veld niet */}
                  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="demo-honey" />
                  {status === 'error' && <p className="demo-error" role="alert">Aanmelden is niet gelukt. Probeer het later opnieuw.</p>}
                </form>

                <p className="nb-klein">Met één klik uitschrijven, altijd. We delen je e-mailadres nooit.</p>
                <div className="nb-lijn" />
                <p className="nb-klein">Van het team achter <strong>Orbit</strong>, de open source SEO- en GEO-software voor marketeers.</p>
                <button type="button" className="nb-nee" onClick={sluit}>Nee, bedankt</button>
              </>
            )}
          </div>
        </div>
      )}
    </dialog>,
    document.body,
  )
}

// Rustige lijnillustratie in de stijl van linear.app: schuine banen rond een kern, één punt in het accent.
function OrbitBeeld() {
  const banen = [
    { rx: 150, ry: 54, r: -18 },
    { rx: 118, ry: 42, r: -18 },
    { rx: 86, ry: 30, r: -18 },
    { rx: 150, ry: 54, r: 42 },
  ]
  return (
    <svg className="nb-orbit" viewBox="0 0 360 360" fill="none">
      <defs>
        <radialGradient id="nb-kern" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="180" cy="180" r="96" fill="url(#nb-kern)" />
      {banen.map((b, i) => (
        <ellipse key={i} cx="180" cy="180" rx={b.rx} ry={b.ry} transform={`rotate(${b.r} 180 180)`} stroke="#fff" strokeOpacity={i === 3 ? 0.06 : 0.12 - i * 0.02} />
      ))}
      <circle cx="180" cy="180" r="18" fill="#08090a" stroke="#fff" strokeOpacity="0.24" />
      <circle cx="180" cy="180" r="3" fill="#f7f8f8" />
      <g transform="rotate(-18 180 180)">
        <circle className="nb-satelliet" cx="270" cy="207" r="4" fill="#bcff2f" />
        <circle cx="39" cy="162" r="2.5" fill="#fff" fillOpacity="0.5" />
        <circle cx="223" cy="154" r="2" fill="#fff" fillOpacity="0.35" />
      </g>
    </svg>
  )
}
