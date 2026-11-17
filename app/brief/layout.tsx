import type { Viewport } from 'next'

// De brief staat in hetzelfde lichte thema als de blog (zie app/blog/layout.tsx en :root:has(.licht-thema) in globals.css).
export const viewport: Viewport = { themeColor: '#ffffff', colorScheme: 'light' }

export default function BriefLayout({ children }: { children: React.ReactNode }) {
  return <div className="licht-thema">{children}</div>
}
