'use client'
import { useEffect, useRef, useState } from 'react'

const CalendarIcon = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 2v3M14 2v3M3.5 7.5h13M5 4h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/></svg>
const ArrowUpRight = () => <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M5 13 13 5M7 5h6v6"/></svg>
const links: Array<[string, string]> = [['Product', '/product'], ['Prijs', '/prijs'], ['Nieuws', '/nieuws'], ['Over ons', '/over-ons']]
const demo = 'mailto:hello@outerorbit.nl?subject=Gratis%20demo%20plannen'

type LenisLike = { stop: () => void; start: () => void }

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  /* lock page scroll (native and Lenis) while the menu is open, close on Escape,
     and close automatically when the viewport grows back to desktop */
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: LenisLike }).lenis
    document.documentElement.classList.toggle('menu-open', open)
    if (open) { lenis?.stop(); panel.current?.querySelector<HTMLElement>('a')?.focus() }
    else lenis?.start()
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() } }
    const desktop = window.matchMedia('(min-width: 901px)')
    const onResize = () => { if (desktop.matches) setOpen(false) }
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => { window.removeEventListener('keydown', onKey); desktop.removeEventListener('change', onResize) }
  }, [open])

  return <header className={`site-header${open ? ' is-open' : ''}`}>
    <div className="site-header__inner">
      <a href="/" className="brand" aria-label="ORBIT ENGINE home"><span className="brand-mark">◒</span><span>ORBIT ENGINE</span></a>
      <nav className="site-nav" aria-label="Hoofdnavigatie">{links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <a className="header-cta" href={demo}><CalendarIcon/><span>Plan een gratis demo</span></a>
      <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Menu sluiten' : 'Menu openen'} onClick={() => setOpen(value => !value)}>
        <span aria-hidden="true" /><span aria-hidden="true" />
      </button>
    </div>
    <div id="mobile-menu" ref={panel} className="mobile-menu" hidden={!open}>
      <nav aria-label="Mobiele navigatie">{links.map(([label, href], index) => <a href={href} key={href} style={{ ['--i' as string]: index }} onClick={() => setOpen(false)}>{label}<ArrowUpRight/></a>)}</nav>
      <a className="mobile-menu__cta" href={demo} onClick={() => setOpen(false)}><CalendarIcon/>Plan een gratis demo</a>
      <p className="mobile-menu__note">Autonome groei in Google én AI-antwoorden.</p>
    </div>
  </header>
}
