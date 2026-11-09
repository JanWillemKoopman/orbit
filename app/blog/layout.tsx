import type { Viewport } from 'next'

// De blog en de blogartikelen staan in het lichte thema van linear.app/now; de rest van de site blijft donker.
// De klasse `licht-thema` zet via `:root:has(.licht-thema)` in globals.css de lichte tokens op de hele pagina,
// dus ook op header, footer en dialogen die buiten deze layout staan.
export const viewport: Viewport = { themeColor: '#ffffff', colorScheme: 'light' }

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="licht-thema">{children}</div>
}
