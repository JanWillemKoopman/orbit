'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll(){
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
  const lenis=new Lenis({duration:1.15,easing:(time)=>1-Math.pow(1-time,4),smoothWheel:true,wheelMultiplier:.85,syncTouch:false})
  let frame=0
  const update=(time:number)=>{lenis.raf(time);frame=requestAnimationFrame(update)}
  frame=requestAnimationFrame(update)
  return()=>{cancelAnimationFrame(frame);lenis.destroy()}
 },[])
 return null
}
