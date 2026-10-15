'use client'

import Link from 'next/link'
import { createContext, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { NavMenuItem } from '@/lib/site'

// Uitklapmenu's in de header, nagebouwd naar "Product" op linear.app: de knoppen zelf zijn geen
// pagina en openen bij aanwijzen of klikken een zwevend paneel. Daarin een kaart met een kolom per
// pagina (titel met omschrijving eronder). Vier pagina's staan in twee rijen van twee.
//
// Alle menu's delen één paneel. Ga je met de muis van het ene menu naar het andere, dan vervormt
// het paneel in 0,22 s naar de maat van het nieuwe menu en fadet de inhoud over, zoals op linear.app.

const SLUIT_NA = 120
const VERVORM = { duration: 220, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' } // ease-out-quad

type Menu = { label: string; items: NavMenuItem[] }
type Staat = {
  open: Menu | null
  paneelId: string
  openNu: (menu: Menu) => void
  wissel: (menu: Menu) => void
  sluitStraks: () => void
  sluit: () => void
}

const MenuStaat = createContext<Staat | null>(null)
const useMenuStaat = () => {
  const staat = useContext(MenuStaat)
  if (!staat) throw new Error('NavMenu staat buiten NavMenus')
  return staat
}

// Omhult de navigatie: houdt bij welk menu open is en toont het gedeelde paneel.
export function NavMenus({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<Menu | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const paneelId = useId()

  const stopTimer = () => { if (timer.current) clearTimeout(timer.current) }
  const openNu = (menu: Menu) => { stopTimer(); setOpen(menu) }
  const wissel = (menu: Menu) => { stopTimer(); setOpen((o) => (o?.label === menu.label ? null : menu)) }
  // Een korte vertraging, zodat de muis van de knop naar het paneel kan zonder dat het sluit.
  const sluitStraks = () => { stopTimer(); timer.current = setTimeout(() => setOpen(null), SLUIT_NA) }
  const sluit = () => { stopTimer(); setOpen(null) }

  useEffect(() => {
    if (!open) return
    const opKlik = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(null) }
    const opToets = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(null)
      root.current?.querySelector<HTMLButtonElement>('.nav-menu-trigger[aria-expanded="true"]')?.focus()
    }
    document.addEventListener('pointerdown', opKlik)
    document.addEventListener('keydown', opToets)
    return () => { document.removeEventListener('pointerdown', opKlik); document.removeEventListener('keydown', opToets) }
  }, [open])

  useEffect(() => stopTimer, [])

  return (
    <MenuStaat.Provider value={{ open, paneelId, openNu, wissel, sluitStraks, sluit }}>
      <div
        ref={root}
        className="nav-menus"
        onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node)) setOpen(null) }}
      >
        {children}
        <NavPaneel />
      </div>
    </MenuStaat.Provider>
  )
}

// Eén knop in de navigatiebalk.
export function NavMenu({ label, items, actief }: { label: string; items: NavMenuItem[]; actief: boolean }) {
  const { open, paneelId, openNu, wissel, sluitStraks } = useMenuStaat()
  const aanwijzer = useRef<string>('')
  const menu = { label, items }

  return (
    <li
      className="nav-menu"
      onPointerEnter={(e) => e.pointerType === 'mouse' && openNu(menu)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && sluitStraks()}
    >
      <button
        type="button"
        className="nav-link nav-menu-trigger"
        aria-expanded={open?.label === label}
        aria-controls={paneelId}
        data-actief={actief || undefined}
        onPointerDown={(e) => { aanwijzer.current = e.pointerType }}
        // Met een muis is het menu al open door het aanwijzen; een klik houdt het dan open. Met aanraken
        // of het toetsenbord opent en sluit een klik het menu.
        onClick={() => { if (aanwijzer.current === 'mouse') openNu(menu); else wissel(menu); aanwijzer.current = '' }}
      >
        {label}
      </button>
    </li>
  )
}

function NavPaneel() {
  const { open, paneelId, openNu, sluitStraks, sluit } = useMenuStaat()
  const paneel = useRef<HTMLDivElement>(null)
  const vorigeMaat = useRef<{ w: number; h: number } | null>(null)
  const vorigLabel = useRef<string | null>(null)

  // Wisselt het paneel van menu terwijl het open is, dan vervormt het van de oude naar de nieuwe maat.
  useLayoutEffect(() => {
    const el = paneel.current
    if (!el || !open) {
      vorigeMaat.current = null
      vorigLabel.current = null
      return
    }
    const nieuw = { w: el.offsetWidth, h: el.offsetHeight }
    const oud = vorigeMaat.current
    const gewisseld = vorigLabel.current !== null && vorigLabel.current !== open.label
    if (oud && gewisseld && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.animate([{ width: `${oud.w}px`, height: `${oud.h}px` }, { width: `${nieuw.w}px`, height: `${nieuw.h}px` }], VERVORM)
      el.querySelector('.nav-menu-content')?.animate([{ opacity: 0.25 }, { opacity: 1 }], { duration: 220, easing: VERVORM.easing })
    }
    vorigeMaat.current = nieuw
    vorigLabel.current = open.label
  }, [open])

  const items = open?.items ?? []
  return (
    <div
      ref={paneel}
      id={paneelId}
      className="nav-menu-popup"
      data-open={open ? '' : undefined}
      hidden={!open}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse' && open) openNu(open) }}
      onPointerLeave={(e) => e.pointerType === 'mouse' && sluitStraks()}
    >
      <div className="nav-menu-content">
        <ul className="nav-menu-grid" data-raster={items.length === 4 || undefined}>
          {items.map((item) => (
            <li key={item.href} className="nav-menu-column">
              <Link href={item.href} className="nav-menu-link" onClick={sluit}>
                <span className="nav-menu-title">{item.label}</span>
                <span className="nav-menu-description">
                  {item.description.map((regel, i) => (
                    <span key={regel}>{i > 0 && <br />}{regel}</span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
