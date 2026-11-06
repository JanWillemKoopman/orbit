import type { Metadata } from 'next'
import { DotsTest } from '@/components/dots/DotsTest'

export const metadata: Metadata = { title: 'Dots 3: achtergrond afsluiter', robots: { index: false, follow: false } }

export default function Dots3Page() {
  return <DotsTest actief="/dots3" />
}
