import type { Metadata } from 'next'
import { AiPagina } from '../ai/AiPagina'

export const metadata: Metadata = { title: 'AI 5: hero met video', robots: { index: false, follow: false } }

export default function Ai5Page() {
  return <AiPagina actief="/ai5" video="hero-ai5" />
}
