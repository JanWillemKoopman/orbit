import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/inter/opsz.css'
import '@fontsource-variable/inter/opsz-italic.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { site } from '@/lib/site'
import './globals.css'
import './article.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.blogTitle} – ${site.name}`, template: `%s – ${site.name}` },
  description: site.description,
  alternates: { types: { 'application/rss+xml': '/rss.xml' } },
  openGraph: { siteName: site.name, type: 'website', locale: 'nl_NL' },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#08090a', colorScheme: 'dark' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" data-theme="dark">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
