'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './Footer'
import { Header } from './Header'

// Pagina's zonder header en footer (volledig gecentreerde schermen).
const kaal = ['/demo']

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (kaal.includes(pathname)) return <main>{children}</main>
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
