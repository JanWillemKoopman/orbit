'use client'
import { useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Count a number up from 0 with GSAP. The final value is already server-rendered,
   so crawlers and no-JS visitors read the real figure (same choice inspace made). */
export function countTo(el: Element, to: number, { duration = 1.1, delay = 0, prefix = '', suffix = '', format = (n: number) => Math.round(n).toLocaleString('nl-NL') } = {}) {
  const state = { v: 0 }
  el.textContent = prefix + format(0) + suffix
  return gsap.to(state, { v: to, duration, delay, ease: 'power2.out', onUpdate: () => { el.textContent = prefix + format(state.v) + suffix } })
}
