import type { Metadata } from 'next'
import { DotsTest } from '@/components/dots/DotsTest'

export const metadata: Metadata = { title: 'Dots 1: achtergrond afsluiter', robots: { index: false, follow: false } }

export default function Dots1Page() {
  return <DotsTest actief="/dots1" />
}
