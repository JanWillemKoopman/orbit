'use client'
import { useId, type CSSProperties } from 'react'

/* ORBIT core: a still, monochrome sphere with a thin tilted orbit ring. The back
   half of the ring is drawn behind the sphere and the front half in front of it. */
export function OrbitCore({ className = '', ring = true, style }: { className?: string; ring?: boolean; style?: CSSProperties }) {
  const id = useId().replace(/:/g, '')
  const layer = (half: 'back' | 'front') => (
    <svg className={`oc-ring oc-ring--${half}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs><clipPath id={`${id}-${half}`} clipPathUnits="userSpaceOnUse"><rect x="-20" y={half === 'back' ? -20 : 100} width="240" height="120" /></clipPath></defs>
      <g transform="rotate(-16 100 100)"><g clipPath={`url(#${id}-${half})`}><ellipse cx="100" cy="100" rx="92" ry="26" /></g></g>
    </svg>
  )
  return <span className={`orbit-core ${className}`} style={style} aria-hidden="true">
    {ring && layer('back')}
    <span className="oc-sphere" />
    {ring && layer('front')}
  </span>
}
