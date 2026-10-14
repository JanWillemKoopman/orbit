import type { Metadata } from 'next'
import { AiPagina } from '../ai/AiPagina'

export const metadata: Metadata = { title: 'AI 4: hero met video', robots: { index: false, follow: false } }

export default function Ai4Page() {
  return <AiPagina actief="/ai4" video="hero-ai4" />
}
