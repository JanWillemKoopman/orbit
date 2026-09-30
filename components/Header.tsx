'use client'
import { useEffect, useState } from 'react'
export default function Header(){
 const [dark,setDark]=useState(true)
 useEffect(()=>{ const saved=localStorage.getItem('orbit-theme'); const next=saved ? saved==='dark' : !window.matchMedia('(prefers-color-scheme: light)').matches; setDark(next); document.documentElement.dataset.theme=next?'dark':'light' },[])
 function toggle(){ const next=!dark; setDark(next); localStorage.setItem('orbit-theme',next?'dark':'light'); document.documentElement.dataset.theme=next?'dark':'light' }
 return <header className="sticky top-0 z-50 border-b border-white/[.13] bg-black/85 backdrop-blur-md"><div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between px-5"><a href="#top" className="flex items-center gap-2 text-[11px] font-semibold tracking-[.13em]"><span className="grid h-4 w-4 place-items-center rounded-full border border-accent text-[8px] text-accent">O</span>ORBIT ENGINE</a><nav className="hidden gap-6 text-[11px] text-zinc-400 sm:flex"><a href="#artikel">Artikel</a><a href="#werking">Werking</a><a href="#slot">Conclusie</a></nav><button onClick={toggle} className="group flex items-center gap-2 rounded-full border border-white/15 px-2.5 py-1.5 text-[10px] text-zinc-300" aria-label="Wissel kleurthema"><span className="h-2 w-2 rounded-full bg-accent transition-transform group-hover:scale-125" />{dark?'DARK':'LIGHT'}</button></div></header>
}
