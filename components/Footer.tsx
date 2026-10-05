import Link from 'next/link'
import { footerNav, legalNav, site } from '@/lib/site'
import { LogoMark } from './Logo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label={site.name}>
            <LogoMark size={20} />
          </Link>
        </div>
        {footerNav.map((col) => (
          <div className="footer-col" key={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith('http') ? (
                    <a className="dimmed" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  ) : (
                    <Link className="dimmed" href={l.href}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-legal">
        <span>© {new Date().getFullYear()} {site.name}</span>
        {legalNav.map((l) => (
          <Link key={l.label} href={l.href}>{l.label}</Link>
        ))}
      </div>
    </footer>
  )
}
