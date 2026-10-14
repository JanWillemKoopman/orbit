import type { Metadata } from 'next'
import { AiPagina } from '../ai/AiPagina'

export const metadata: Metadata = { title: 'AI 3: hero met video', robots: { index: false, follow: false } }

export default function Ai3Page() {
  return <AiPagina actief="/ai3" video="hero-ai3" />
}
