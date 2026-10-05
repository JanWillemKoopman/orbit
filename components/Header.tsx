'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { mainNav, site } from '@/lib/site'
import { Logo } from './Logo'

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' || pathname.startsWith('/blog') : pathname.startsWith(href)

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="logo-link" aria-label={`${site.name} – home`}>
          <Logo name={site.name} />
        </Link>

        <nav className="header-right" aria-label="Hoofdmenu">
          <ul className="nav-list">
            {mainNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="nav-link" aria-current={isActive(pathname, item.href) && item.href === '/' ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-divider" />
          <div className="header-actions">
            <Link href="/contact" className="btn btn-sm btn-invert">Contact</Link>
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

      <div className="mobile-menu" data-open={open}>
        <ul>
          {mainNav.map((item) => (
            <li key={item.label}>
              <Link href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>{item.label}</Link>
            </li>
          ))}
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </header>
  )
}
