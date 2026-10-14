'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import type { NavMenuItem } from '@/lib/site'

// Uitklapmenu in de header, nagebouwd naar "Product" op linear.app: de knop zelf is geen pagina en
// opent bij aanwijzen of klikken een zwevend paneel. Daarin een kaart met een kolom per pagina
// (titel met omschrijving eronder). Vier pagina's staan in twee rijen van twee.

const SLUIT_NA = 120

export function NavMenu({ label, items, actief }: { label: string; items: NavMenuItem[]; actief: boolean }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLLIElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const aanwijzer = useRef<string>('')
  const id = useId()

  const stopTimer = () => { if (timer.current) clearTimeout(timer.current) }
  const openNu = () => { stopTimer(); setOpen(true) }
  // Een korte vertraging, zodat de muis van de knop naar het paneel kan zonder dat het sluit.
  const sluitStraks = () => { stopTimer(); timer.current = setTimeout(() => setOpen(false), SLUIT_NA) }

  useEffect(() => {
    if (!open) return
    const opKlik = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    const opToets = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      root.current?.querySelector<HTMLButtonElement>('button')?.focus()
    }
    document.addEventListener('pointerdown', opKlik)
    document.addEventListener('keydown', opToets)
    return () => { document.removeEventListener('pointerdown', opKlik); document.removeEventListener('keydown', opToets) }
  }, [open])

  useEffect(() => stopTimer, [])

  return (
    <li
      ref={root}
      className="nav-menu"
      onPointerEnter={(e) => e.pointerType === 'mouse' && openNu()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && sluitStraks()}
      onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node)) setOpen(false) }}
    >
      <button
        type="button"
        className="nav-link nav-menu-trigger"
        aria-expanded={open}
        aria-controls={id}
        data-actief={actief || undefined}
        onPointerDown={(e) => { aanwijzer.current = e.pointerType }}
        // Met een muis is het menu al open door het aanwijzen; een klik houdt het dan open. Met aanraken
        // of het toetsenbord opent en sluit een klik het menu.
        onClick={() => { if (aanwijzer.current === 'mouse') openNu(); else setOpen((o) => !o); aanwijzer.current = '' }}
      >
        {label}
      </button>
      <div id={id} className="nav-menu-popup" data-open={open || undefined} hidden={!open}>
        <div className="nav-menu-content">
          <ul className="nav-menu-grid" data-raster={items.length === 4 || undefined}>
            {items.map((item) => (
              <li key={item.href} className="nav-menu-column">
                <Link href={item.href} className="nav-menu-link" onClick={() => setOpen(false)}>
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
    </li>
  )
}
