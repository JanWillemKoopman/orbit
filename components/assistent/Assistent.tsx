'use client'

import { useEffect, useRef, useState } from 'react'
import { DemoDialog } from '../DemoDialog'
import { DotBol } from './DotBol'

// De assistent rechtsonder op elke pagina. Dicht is het een knop: op desktop een pil met de bol, het label
// Orbit en "Vragen? Vraag het ons.", op mobiel alleen de ronde bol. Open is het een chatvenster: op desktop
// een paneel rechtsonder, op mobiel over het hele scherm. De AI-agent en de live chat bestaan nog niet;
// het venster zegt dat eerlijk en verwijst naar de demo, die wel werkt.
export function Assistent() {
  const [open, setOpen] = useState(false)
  const [demo, setDemo] = useState(false)
  const knopRef = useRef<HTMLButtonElement>(null)
  const sluitRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const [voorbijDrempel, setVoorbijDrempel] = useState(false)

  // Op mobiel verschijnt de bol pas als de bezoeker zo'n twee schermhoogtes naar beneden heeft gescrold,
  // en verdwijnt hij weer als die terug naar boven gaat. Op desktop is hij er altijd (zie de CSS).
  useEffect(() => {
    const controleer = () => setVoorbijDrempel(window.scrollY >= window.innerHeight * 2)
    controleer()
    window.addEventListener('scroll', controleer, { passive: true })
    window.addEventListener('resize', controleer)
    return () => {
      window.removeEventListener('scroll', controleer)
      window.removeEventListener('resize', controleer)
    }
  }, [])

  // Focus naar het venster bij openen, en terug naar de knop bij sluiten.
  useEffect(() => {
    if (open) sluitRef.current?.focus()
    else if (wasOpen.current && !demo) knopRef.current?.focus()
    wasOpen.current = open
  }, [open, demo])

  // Escape sluit het venster.
  useEffect(() => {
    if (!open) return
    const toets = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', toets)
    return () => document.removeEventListener('keydown', toets)
  }, [open])

  // Op mobiel bedekt het venster het scherm: dan scrolt de pagina eronder niet mee.
  useEffect(() => {
    if (!open || !window.matchMedia('(max-width: 640px)').matches) return
    const vorige = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = vorige }
  }, [open])

  const planDemo = () => {
    setOpen(false)
    setDemo(true)
  }

  return (
    <>
      <button
        ref={knopRef}
        type="button"
        className="as-knop"
        aria-expanded={open}
        aria-controls="as-venster"
        aria-label="Vragen? Vraag het ons."
        hidden={open}
        data-zichtbaar={voorbijDrempel || undefined}
        onClick={() => setOpen(true)}
      >
        <span className="as-knop-bol"><DotBol maat={44} /></span>
        <span className="as-knop-tekst" aria-hidden="true">
          <span className="as-knop-label">Orbit</span>
          <span className="as-knop-vraag">Vragen? Vraag het ons.</span>
        </span>
      </button>

      {open && (
        <div id="as-venster" className="as-venster" role="dialog" aria-labelledby="as-titel">
          <div className="as-kop">
            <span className="as-kop-bol"><DotBol maat={48} /></span>
            <div className="as-kop-tekst">
              <div className="as-kop-regel">
                <h2 id="as-titel">Orbit-assistent</h2>
                <span className="as-badge as-badge-accent">In ontwikkeling</span>
              </div>
              <p>Plan een gratis demo met ons team</p>
            </div>
            <button ref={sluitRef} type="button" className="as-sluit" aria-label="Sluiten" onClick={() => setOpen(false)}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>

          <div className="as-inhoud">
            <p className="as-bericht">Hoi, welkom bij Orbit.</p>
            <p className="as-bericht">
              Een AI-agent en live chat komen binnenkort. Tot die tijd krijg je het snelst antwoord op je vragen in een
              gratis demo: 15 of 45 minuten, wanneer het jou uitkomt.
            </p>
            <button type="button" className="btn btn-lg btn-invert as-demo" onClick={planDemo}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 6.75h12M5.25 1.75v2.5M10.75 1.75v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Plan een gratis demo
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <p className="as-sectie">Binnenkort</p>
            <ul className="as-opties">
              <li className="as-optie" aria-disabled="true">
                <span className="as-optie-icoon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.75l1.4 3.85L13.25 7 9.4 8.4 8 12.25 6.6 8.4 2.75 7 6.6 5.6 8 1.75zM12.5 11l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
                </span>
                <span className="as-optie-tekst">
                  <span className="as-optie-titel">Praat met onze AI-agent</span>
                  <span className="as-optie-uitleg">Direct antwoord over zichtbaarheid in AI-assistenten en Orbit</span>
                </span>
                <span className="as-badge">Binnenkort</span>
              </li>
              <li className="as-optie" aria-disabled="true">
                <span className="as-optie-icoon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.75" stroke="currentColor" strokeWidth="1.3" /><path d="M2.75 14c.6-2.6 2.7-4 5.25-4s4.65 1.4 5.25 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                </span>
                <span className="as-optie-tekst">
                  <span className="as-optie-titel">Chat met een specialist</span>
                  <span className="as-optie-uitleg">Live antwoord van ons team</span>
                </span>
                <span className="as-badge">Binnenkort</span>
              </li>
            </ul>
          </div>

          <p className="as-voet">Gratis en vrijblijvend.</p>
        </div>
      )}

      <DemoDialog open={demo} onClose={() => setDemo(false)} />
    </>
  )
}
