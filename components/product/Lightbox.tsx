'use client'

import { useEffect, useRef, useState } from 'react'

type Open = { src: string; alt: string; width: number; height: number }

/**
 * Eén beeldviewer voor de hele pagina. Elke knop met `data-zoom-src` opent hem. Het is een native
 * `<dialog>`: Escape sluit hem, de focus blijft erin, en na het sluiten gaat de focus terug naar
 * de knop waarmee hij geopend werd.
 */
export function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null)
  const terug = useRef<HTMLElement | null>(null)
  const [open, setOpen] = useState<Open | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const knop = (e.target as HTMLElement).closest<HTMLElement>('[data-zoom-src]')
      if (!knop) return
      e.preventDefault()
      terug.current = knop
      setOpen({
        src: knop.dataset.zoomSrc!,
        alt: knop.dataset.zoomAlt ?? '',
        width: Number(knop.dataset.zoomWidth),
        height: Number(knop.dataset.zoomHeight),
      })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const d = dialog.current
    if (open && d && !d.open) d.showModal()
  }, [open])

  const sluit = () => dialog.current?.close()

  return (
    <dialog
      ref={dialog}
      className="pd-lightbox"
      aria-label="Screenshot op ware grootte"
      onClose={() => {
        setOpen(null)
        terug.current?.focus()
      }}
      onClick={(e) => {
        // Klik naast het beeld sluit, net als Escape.
        if (e.target === e.currentTarget) sluit()
      }}
    >
      {open && (
        <div className="pd-lightbox-inner">
          <button type="button" className="pd-lightbox-close btn btn-sm btn-secondary" onClick={sluit} autoFocus>
            Sluiten
            <span aria-hidden="true">Esc</span>
          </button>
          <img src={open.src} alt={open.alt} width={open.width / 2} height={open.height / 2} />
        </div>
      )}
    </dialog>
  )
}
