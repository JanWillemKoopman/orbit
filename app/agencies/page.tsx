import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agencies',
  alternates: { canonical: '/agencies' },
}

// De inhoud van deze pagina volgt nog; de header en footer komen uit de layout.
export default function Page() {
  return <div className="container" />
}
