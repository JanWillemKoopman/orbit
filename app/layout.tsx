import type { Metadata } from 'next'
import { Archivo, Geist_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = { title: 'ORBIT ENGINE — Artikel', description: 'Zichtbaarheid opbouwen in AI, ronde na ronde.' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="nl" suppressHydrationWarning><body className={`${archivo.variable} ${geistMono.variable}`}><SmoothScroll/>{children}</body></html>
}
