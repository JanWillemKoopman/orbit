import type { ReactElement, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>
const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export const ArrowRight = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2" aria-hidden="true" {...p}><path d="M4 12h16M13 5l7 7-7 7" /></svg>
export const ArrowUpRight = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.4" aria-hidden="true" {...p}><path d="M7 7h10v10M7 17 17 7" /></svg>
export const Search = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2" aria-hidden="true" {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
export const ChevronDown = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2" aria-hidden="true" {...p}><path d="M6 9l6 6 6-6" /></svg>
export const User = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2" aria-hidden="true" {...p}><circle cx="12" cy="8.4" r="3.4" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>
export const LinkIcon = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true" {...p}><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg>
export const Mic = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true" {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v3" /></svg>
export const Doc = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
export const ImageIcon = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.6" aria-hidden="true" {...p}><rect x="3" y="4" width="18" height="16" rx="2.5" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-9 9" /></svg>
export const Check = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="3.2" aria-hidden="true" {...p}><path d="M20 6 9 17l-5-5" /></svg>
export const Sparkle = (p: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="m12 3 1.9 4.3L18 9l-4.1 1.7L12 15l-1.9-4.3L6 9l4.1-1.7Z" /></svg>
export const Refresh = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2" aria-hidden="true" {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" /></svg>
export const Lock = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2" aria-hidden="true" {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
export const Wave = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.4" aria-hidden="true" {...p}><path d="M5 10v4M9 7v10M13 9v6M17 5v14M21 10v4" /></svg>
export const Target = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true" {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></svg>
export const Route = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true" {...p}><circle cx="5" cy="6" r="2.2" /><circle cx="19" cy="18" r="2.2" /><path d="M7 6h8a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h8" /></svg>
export const Grid = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true" {...p}><rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" /></svg>
export const Chart = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true" {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>
export const Calendar = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true" {...p}><path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></svg>
export const Fingerprint = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true" {...p}><path d="M12 11v3a8 8 0 0 1-2 5M8 11a4 4 0 0 1 8 0v2a12 12 0 0 1-1 5M5 13v-2a7 7 0 0 1 12-5M19 11v1a16 16 0 0 1-.6 4" /></svg>

/* market icons */
export const Shoe = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true" {...p}><path d="M3 16v-1.2c0-.8.5-1.5 1.2-1.8L8.5 11l1.9-3.3a1 1 0 0 1 1.5-.3c1.8 1.4 3.5 2 5.6 2.4 1.9.4 3.5 1.8 3.5 3.7V16H3z" /><path d="M3 19h18M9.5 11.5l1.6 1.6M12.4 10.2l1.6 1.6" /></svg>
export const Roller = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true" {...p}><path d="M12 21v-6M12 15c-4 0-6-3-6-6 3 0 6 2 6 6Zm0 0c4 0 6-3 6-6-3 0-6 2-6 6ZM12 9V3M9 5l3-2 3 2" /></svg>
export const Shield = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.9" aria-hidden="true" {...p}><path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.6-7 9.8-4.1-2.2-7-5.5-7-9.8V5.8z" /><path d="M9 12l2 2 4-4" /></svg>
export const marketIcons = [Shoe, Roller, Shield]

/* brand-coloured Google mark, only used inside the search bar */
export const GoogleColor = (p: IconProps) => <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" /></svg>

/* monochrome engine marks for the floating engine rows */
const GoogleMono = (p: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M21.6 10H12v4.1h5.5c-.5 2.6-2.7 4.3-5.5 4.3a6.4 6.4 0 0 1 0-12.8c1.6 0 3 .6 4.1 1.6l3-3A10.6 10.6 0 0 0 12 1.4a10.6 10.6 0 1 0 0 21.2c6.1 0 10.1-4.3 10.1-10.3 0-.8-.2-1.6-.5-2.3Z" /></svg>
const Bing = (p: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M5 2l4.3 1.5v13.6l5.9-3.4-2.9-1.4-1.8-4.5 9.3 3.3v4.8L9.3 22 5 19.6z" /></svg>
const Yahoo = (p: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M2 7h4.2l2.6 6.4L11.5 7h4.1l-6 13.5H5.5l1.4-3.1zM17 3h4.5l-3.9 9.5h-3.4zM14.5 14.4a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4Z" /></svg>
export const ChatGPT = (p: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M12 3.1a4.45 4.45 0 0 1 7.6 3.15 4.46 4.46 0 0 1 1.08 8.08 4.45 4.45 0 0 1-6.52 5.52 4.46 4.46 0 0 1-7.84-2.58A4.45 4.45 0 0 1 4.4 9.72 4.46 4.46 0 0 1 12 3.1Zm0 3.05-4.96 2.86v5.73L12 17.6l4.96-2.86V9.01L12 6.15Zm0 2.07 3.17 1.83v3.66L12 15.54l-3.17-1.83v-3.66L12 8.22Z" /></svg>
const Gemini = (p: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M12 2c.6 5.2 4.8 9.4 10 10-5.2.6-9.4 4.8-10 10-.6-5.2-4.8-9.4-10-10 5.2-.6 9.4-4.8 10-10Z" /></svg>
const Perplexity = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.8" aria-hidden="true" {...p}><path d="M12 2v20M5 5.5l7 6 7-6M5 5.5V9h14V5.5M5 9v8l7-5 7 5V9" /></svg>
const Claude = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.3" aria-hidden="true" {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" /></svg>
const Mistral = (p: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M3 4h4v4H3zM17 4h4v4h-4zM3 8h8v4H3zM13 8h8v4h-8zM3 12h18v4H3zM3 16h4v4H3zM10 16h4v4h-4zM17 16h4v4h-4z" /></svg>
const DeepSeek = (p: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M22 6.5c-.6 1.6-1.5 2.4-2.6 2.6.6 5.2-3.4 10-9 10-4 0-7.4-2.6-8.4-6.5 2.3 1.6 5.5 1.9 8 .6-3-1.1-5-3.6-5.4-6.7 2.4 2.2 6.2 3.3 9.7 2.6.8-2.1 2.9-3.4 5-3 .9.2 1.8.3 2.7.4Z" /></svg>
const Llama = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2" aria-hidden="true" {...p}><path d="M3 12c0-3 1.6-5 3.6-5C10.4 7 13.6 17 17.4 17c2 0 3.6-2 3.6-5s-1.6-5-3.6-5C13.6 7 10.4 17 6.6 17 4.6 17 3 15 3 12Z" /></svg>
const Grok = (p: IconProps) => <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2" aria-hidden="true" {...p}><path d="M4 20 20 4M9.5 5.2A7.5 7.5 0 0 1 18.8 14.5M5.2 9.5a7.5 7.5 0 0 0 5.1 9.1" /></svg>

export const searchEngines: Array<[string, (p: IconProps) => ReactElement]> = [['Google', GoogleMono], ['Bing', Bing], ['Yahoo', Yahoo]]
export const aiEngines: Array<[string, (p: IconProps) => ReactElement]> = [['ChatGPT', ChatGPT], ['Gemini', Gemini], ['Perplexity', Perplexity], ['Claude', Claude], ['Mistral', Mistral], ['DeepSeek', DeepSeek], ['Llama', Llama], ['Grok', Grok]]
