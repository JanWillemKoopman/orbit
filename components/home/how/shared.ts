'use client'
import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../gsap'

export type ScreenProps = { active: boolean; market: number }

/* Runs `tick` on an interval while the screen is the active one, the tab is visible
   and the visitor has not asked for reduced motion. */
export function useScreenLoop(active: boolean, tick: () => void, interval: number, kickoff: number[] = []) {
  const saved = useRef(tick)
  saved.current = tick
  useEffect(() => {
    if (!active || prefersReducedMotion()) return
    const run = () => { if (!document.hidden) saved.current() }
    const timers = kickoff.map(delay => window.setTimeout(run, delay))
    const id = window.setInterval(run, interval)
    return () => { window.clearInterval(id); timers.forEach(window.clearTimeout) }
    // kickoff is a static list per screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, interval])
}

export const center = (el: Element, box: Element) => {
  const r = el.getBoundingClientRect(), b = box.getBoundingClientRect()
  return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 }
}
