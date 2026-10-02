'use client'
import { useEffect, useRef } from 'react'

const line = 'M0 157 C35 143 52 151 78 134 S125 143 158 119 S205 128 238 105 S282 121 315 91 S365 103 401 78 S447 91 485 67 S536 77 574 52 S622 68 660 44 S709 54 750 35 S800 48 840 25 S887 37 930 21 S978 31 1018 12 S1068 24 1109 5 S1152 18 1190 -2 S1240 10 1280 -11 S1332 1 1380 -18'

export default function GrowthChart({ active }: { active: boolean }) {
  const svgRef=useRef<SVGSVGElement>(null), pathRef=useRef<SVGPathElement>(null), dotRef=useRef<SVGCircleElement>(null), maskRef=useRef<SVGRectElement>(null)
  useEffect(()=>{if(!active||!pathRef.current||!svgRef.current)return
    const path=pathRef.current, svg=svgRef.current, dot=dotRef.current, mask=maskRef.current
    const length=path.getTotalLength(), reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame=0, start=0
    const render=(time:number)=>{if(!start)start=time;const progress=reduced?1:Math.min((time-start)/52000,1);const visible=.76+progress*.24;const point=path.getPointAtLength(length*visible);const windowX=Math.max(0,point.x-690)
      svg.setAttribute('viewBox',`${windowX} 0 760 180`);dot?.setAttribute('cx',String(point.x));dot?.setAttribute('cy',String(point.y));mask?.setAttribute('width',String(point.x+8));path.style.strokeDasharray=String(length);path.style.strokeDashoffset=String(length*(1-visible));if(progress<1&&!reduced)frame=requestAnimationFrame(render)}
    frame=requestAnimationFrame(render);return()=>cancelAnimationFrame(frame)
  },[active])
  return <svg ref={svgRef} viewBox="0 0 760 180" preserveAspectRatio="none" role="img" aria-label="Continu stijgende organische en AI-zichtbaarheid"><defs><linearGradient id="growth-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#bcff2f" stopOpacity=".2"/><stop offset="1" stopColor="#bcff2f" stopOpacity="0"/></linearGradient><clipPath id="growth-reveal"><rect ref={maskRef} x="0" y="-30" width="1040" height="230"/></clipPath></defs><g clipPath="url(#growth-reveal)"><path className="chart-area" d={`${line} L1380 180 H0Z`}/><path ref={pathRef} className="chart-line" d={line}/></g><circle ref={dotRef} className="chart-dot" cx="1018" cy="12" r="4"/></svg>
}
