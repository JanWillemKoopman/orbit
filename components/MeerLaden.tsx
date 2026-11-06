'use client'

import { Children, useState, type ReactNode } from 'react'

// Toont de eerste `stap` items; "Meer artikelen" laadt er steeds `stap` bij.
// De items zelf worden op de server gerenderd en als children meegegeven.
export function MeerLaden({ children, stap = 6, label = 'Meer artikelen', className = 'card-grid' }: { children: ReactNode; stap?: number; label?: string; className?: string }) {
  const items = Children.toArray(children)
  const [count, setCount] = useState(stap)
  return (
    <>
      <div className={className}>{items.slice(0, count)}</div>
      {count < items.length && (
        <div className="load-more">
          <button type="button" className="btn btn-secondary" onClick={() => setCount((c) => c + stap)}>{label}</button>
        </div>
      )}
    </>
  )
}
