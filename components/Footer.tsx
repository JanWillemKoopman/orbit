import Link from 'next/link'
import { footerContact, footerNav, site } from '@/lib/site'
import { LogoMark } from './Logo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label={site.name}>
            <LogoMark size={22} />
          </Link>
        </div>
        {footerNav.map((col) => (
          <div className="footer-col" key={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link className="dimmed" href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer-col footer-contact">
          <h3>Contact</h3>
          <ul>
            <li><a className="dimmed" href={`mailto:${footerContact.email}`}>{footerContact.email}</a></li>
            <li><a className="dimmed" href={`tel:${footerContact.phone.replace(/[^+\d]/g, '')}`}>{footerContact.phone}</a></li>
          </ul>
        </div>
        <div className="footer-col footer-adres">
          <h3>Adres</h3>
          <address className="footer-address">
            {footerContact.address.map((regel) => (
              <span key={regel}>{regel}</span>
            ))}
          </address>
        </div>
      </div>
      <div className="container footer-legal">
        <p>© {new Date().getFullYear()} {footerContact.company}. Alle rechten voorbehouden.</p>
        <a className="dimmed" href={site.loginUrl}>Inloggen</a>
      </div>
    </footer>
  )
}
