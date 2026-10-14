'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Item = { slug: string; title: string; description: string }

const PAGE_DESKTOP = 15
const PAGE_MOBILE = 9

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

// Kop, zoekbalk en artikelen van /kennisbank. De zoekbalk filtert alleen de kennisbankartikelen.
export function KennisbankOverzicht({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('')
  const [pages, setPages] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_DESKTOP)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setPageSize(mq.matches ? PAGE_MOBILE : PAGE_DESKTOP)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean)
  const shown = words.length ? items.filter((it) => words.every((w) => normalize(`${it.title} ${it.description}`).includes(w))) : items

  const visible = shown.slice(0, pageSize * pages)

  return (
    <div className="kb">
      <div className="kb-hero">
        <h1>Kennisbank</h1>
        <p>Hoe kunnen we helpen?</p>
        <form className="kb-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setPages(1) }} placeholder="Zoeken" aria-label="Zoeken in de kennisbank" />
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </form>
      </div>

      <h2 className="kb-title">Helponderwerpen</h2>
      {shown.length ? (
        <ul className="kb-grid">
          {visible.map((it) => (
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
      {visible.length < shown.length && (
        <div className="kb-more">
          <button type="button" className="btn btn-secondary btn-lg" onClick={() => setPages((n) => n + 1)}>
            Meer kennis
          </button>
        </div>
      )}
    </div>
  )
}
