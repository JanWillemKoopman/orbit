import type { Metadata } from 'next'
import { DotsTest } from '@/components/dots/DotsTest'

export const metadata: Metadata = { title: 'Dots: huidige nevel', robots: { index: false, follow: false } }

export default function DotsPage() {
  return <DotsTest actief="/dots" />
}
