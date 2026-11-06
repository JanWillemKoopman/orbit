import type { Metadata } from 'next'
import { DotsTest } from '@/components/dots/DotsTest'

export const metadata: Metadata = { title: 'Dots 7: achtergrond afsluiter', robots: { index: false, follow: false } }

export default function Dots7Page() {
  return <DotsTest actief="/dots7" />
}
