import type { Metadata, Viewport } from 'next'
import './globals.css'
import './responsive.css'

export const metadata: Metadata = { title: 'ORBIT ENGINE — Zichtbaar in Google én AI', description: 'ORBIT ENGINE onderzoekt kansen, maakt en verbetert content en volgt je zichtbaarheid in Google en AI-antwoorden — persoonlijk begeleid.' }
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#000000' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="nl" suppressHydrationWarning><body>{children}</body></html>
}
