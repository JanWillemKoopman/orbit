import type { Metadata } from 'next'
import { AiPagina } from '../ai/AiPagina'

export const metadata: Metadata = { title: 'AI 1: hero met video', robots: { index: false, follow: false } }

export default function Ai1Page() {
  return <AiPagina actief="/ai1" video="hero-ai1" />
}
