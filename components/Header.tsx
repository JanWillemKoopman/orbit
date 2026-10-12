'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { mainNav, mobileNav, site } from '@/lib/site'
import { DemoDialog } from './DemoDialog'
import { Logo } from './Logo'
import { NavMenu } from './NavMenu'

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className="site-header" data-menu-open={open}>
        <div className="container">
          <Link href="/" className="logo-link" aria-label={`${site.name} – home`}>
            <Logo name={site.name} />
          </Link>

          <nav className="header-right" aria-label="Hoofdmenu">
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
            <div className="nav-divider" />
            <div className="header-actions">
              <a href={site.loginUrl} className="nav-link header-contact">Inloggen</a>
              <button type="button" className="btn btn-sm btn-invert header-demo" onClick={() => setDemoOpen(true)}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 6.75h12M5.25 1.75v2.5M10.75 1.75v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Plan een gratis demo
              </button>
              <button className="menu-toggle" aria-label={open ? 'Menu sluiten' : 'Menu openen'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  {open ? (
                    <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  ) : (
                    <path d="M2 5.25h12M2 10.75h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>
      <DemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Buiten de header: de backdrop-filter van de header zou dit fixed menu anders insluiten */}
      <nav className="mobile-menu" data-open={open} aria-label="Mobiel menu" hidden={!open}>
        {mobileNav.map((group) => (
          <div key={group.title} className="mobile-menu-group">
            <p className="mobile-menu-title">{group.title}</p>
            <ul>
              {group.links.map((item) => (
                <li key={item.href}>
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
