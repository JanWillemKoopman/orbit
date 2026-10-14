import type { Metadata } from 'next'
import { AiPagina } from '../ai/AiPagina'

export const metadata: Metadata = { title: 'AI 2: hero met video', robots: { index: false, follow: false } }

export default function Ai2Page() {
  return <AiPagina actief="/ai2" video="hero-ai2" />
}
