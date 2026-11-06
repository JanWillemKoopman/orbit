import type { Metadata } from 'next'
import { DotsTest } from '@/components/dots/DotsTest'

export const metadata: Metadata = { title: 'Dots 5: achtergrond afsluiter', robots: { index: false, follow: false } }

export default function Dots5Page() {
  return <DotsTest actief="/dots5" />
}
