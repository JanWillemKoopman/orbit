'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { mainNav, mobileNav, site } from '@/lib/site'
import { DemoDialog } from './DemoDialog'
import { Logo } from './Logo'
import { NavMenu, NavMenus } from './NavMenu'

// Zo lang duurt het uitfaden van het mobiele menu; daarna gaat het echt dicht (hidden).
const SLUIT_DUUR = 160

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

// Volgnummer van een kopje (l = 0) of link (l > 0) over alle groepen heen.
const stapVoor = (groep: number, l: number) =>
  mobileNav.slice(0, groep).reduce((n, g) => n + g.links.length + 1, 0) + l

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  // Het menu blijft na het sluiten nog even staan, zodat het kan uitfaden.
  const [zichtbaar, setZichtbaar] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (open) {
      setZichtbaar(true)
      return
    }
    const timer = setTimeout(() => setZichtbaar(false), SLUIT_DUUR)
    return () => clearTimeout(timer)
  }, [open])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className="site-header" data-menu-open={open}>
        <div className="container">
          <Link href="/" className="logo-link" aria-label={`${site.name} – home`}>
            <Logo />
          </Link>

          <nav className="header-right" aria-label="Hoofdmenu">
            <NavMenus>
              <ul className="nav-list">
                {mainNav.map((item) =>
                  'items' in item ? (
                    <NavMenu key={item.label} label={item.label} items={item.items} actief={item.items.some((i) => isActive(pathname, i.href))} />
                  ) : (
                    <li key={item.label}>
                      <Link href={item.href} className="nav-link" aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </NavMenus>
            <div className="nav-divider" />
            <div className="header-actions">
              <a href={site.loginUrl} className="nav-link header-contact">Log in</a>
              <button type="button" className="btn btn-sm btn-invert header-demo" onClick={() => setDemoOpen(true)}>
                Gratis demo
              </button>
              <button className="menu-toggle" aria-label={open ? 'Menu sluiten' : 'Menu openen'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
                {/* Twee lijnen die bij openen naar het midden schuiven en tot een kruis draaien */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path className="menu-toggle-lijn" d="M2 5.25h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path className="menu-toggle-lijn" d="M2 10.75h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>
      <DemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Buiten de header: de backdrop-filter van de header zou dit fixed menu anders insluiten */}
      <nav className="mobile-menu" data-open={zichtbaar} data-sluit={(zichtbaar && !open) || undefined} aria-label="Mobiel menu" hidden={!zichtbaar}>
        {mobileNav.map((group, g) => (
          <div key={group.title} className="mobile-menu-group">
            {/* --i is de volgorde van binnenkomen: kopjes en links schuiven na elkaar op hun plek */}
            <p className="mobile-menu-title" style={{ '--i': stapVoor(g, 0) } as CSSProperties}>{group.title}</p>
            <ul>
              {group.links.map((item, l) => (
                <li key={item.href} style={{ '--i': stapVoor(g, l + 1) } as CSSProperties}>
                  <Link href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </>
  )
}
