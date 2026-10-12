'use client'

import { Children, useState, type ReactNode } from 'react'

// Toont de eerste `stap` kaarten in het kaartenraster; "Meer artikelen" laadt er steeds `stap` bij.
// De kaarten zelf worden op de server gerenderd en als children meegegeven.
export function MeerLaden({ children, stap = 6, label = 'Meer artikelen' }: { children: ReactNode; stap?: number; label?: string }) {
  const items = Children.toArray(children)
  const [count, setCount] = useState(stap)
  return (
    <>
      <div className="card-grid">{items.slice(0, count)}</div>
      {count < items.length && (
        <div className="load-more">
          <button type="button" className="btn btn-secondary" onClick={() => setCount((c) => c + stap)}>{label}</button>
        </div>
      )}
    </>
  )
}
