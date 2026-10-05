'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { formatShortDate } from '@/lib/format'

export type SearchItem = { slug: string; title: string; description: string; byline: string; date: string; category: string }

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export function SearchButton({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable
      if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button className="search-button" onClick={() => setOpen(true)} aria-label="Zoeken">
        <SearchIcon />
        <span className="search-label">Zoeken…</span>
        <kbd>/</kbd>
      </button>
      {open && <SearchDialog items={items} onClose={() => setOpen(false)} />}
    </>
  )
}

function SearchDialog({ items, onClose }: { items: SearchItem[]; onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return items.slice(0, 8)
    const words = q.split(/\s+/)
    return items
      .map((it) => {
        const title = normalize(it.title)
        const hay = `${title} ${normalize(it.description)} ${normalize(it.byline)} ${normalize(it.category)}`
        if (!words.every((w) => hay.includes(w))) return null
        return { it, score: words.reduce((s, w) => s + (title.includes(w) ? 2 : 1), 0) }
      })
      .filter((x): x is { it: SearchItem; score: number } => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map((x) => x.it)
  }, [items, query])

  useEffect(() => {
    inputRef.current?.focus()
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = prev }
  }, [])
  useEffect(() => setActive(0), [query])

  const go = (slug: string) => {
    onClose()
    router.push(`/blog/${slug}`)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter' && results[active]) go(results[active].slug)
  }

  return (
    <div className="search-overlay" onMouseDown={onClose}>
      <div className="search-dialog" role="dialog" aria-modal="true" aria-label="Artikelen zoeken" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKeyDown}>
        <div className="search-input-row">
          <SearchIcon />
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoek in artikelen…" aria-label="Zoekterm" />
          <span className="search-esc">esc</span>
        </div>
        {results.length ? (
          <ul className="search-results">
            {results.map((r, i) => (
              <li key={r.slug}>
                <a href={`/blog/${r.slug}`} data-active={i === active} onMouseEnter={() => setActive(i)} onClick={(e) => { e.preventDefault(); go(r.slug) }}>
                  <span className="r-title">{r.title}</span>
                  <span className="r-meta">{r.byline} · {formatShortDate(r.date)}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="search-empty">Geen artikelen gevonden voor “{query}”.</div>
        )}
      </div>
    </div>
  )
}
