'use client'

import Link from 'next/link'
import { useState } from 'react'

type Item = { slug: string; title: string; description: string }

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

// Kop, zoekbalk en artikelen van /kennisbank. De zoekbalk filtert alleen de kennisbankartikelen.
export function KennisbankOverzicht({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('')
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean)
  const shown = words.length ? items.filter((it) => words.every((w) => normalize(`${it.title} ${it.description}`).includes(w))) : items

  return (
    <div className="kb">
      <div className="kb-hero">
        <h1>Kennisbank</h1>
        <p>Hoe kunnen we helpen?</p>
        <form className="kb-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoeken" aria-label="Zoeken in de kennisbank" />
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </form>
      </div>

      <h2 className="kb-title">Helponderwerpen</h2>
      {shown.length ? (
        <ul className="kb-grid">
          {shown.map((it) => (
            <li key={it.slug}>
              <Link href={`/kennisbank/${it.slug}`} className="kb-card">
                <h3>{it.title}</h3>
                <p>{it.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="kb-empty">Geen artikelen gevonden voor “{query}”.</p>
      )}
    </div>
  )
}
