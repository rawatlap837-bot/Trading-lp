import React, { useEffect, useState } from 'react'
import SplitText, { toWords } from './SplitText.jsx'
import FloatingOrbs from './FloatingOrbs.jsx'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1634542984003-e0fb8e200e91?auto=format&fit=crop&w=1200&q=80'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])
  const enter = 'transition-all duration-700 ease-out motion-reduce:transition-none ' + (mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')
  return (
    <section className="relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="relative h-[2px] w-full overflow-hidden bg-lime/70"><div className="absolute inset-y-0 left-0 h-full w-1/4 animate-navGlint motion-reduce:hidden" style={{ background: 'linear-gradient(90deg, transparent, #dbeafe, transparent)', boxShadow: '0 0 10px 2px rgba(219,234,254,0.8)' }} /></div>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 pb-14 pt-8 sm:px-8 md:grid-cols-2 md:gap-8 md:px-10 md:pb-24 md:pt-16 lg:px-12">
        <div className="relative z-10">
          <span className={'inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime ' + enter}>PREMIUM STOCK MARKET EDUCATION</span>
          <p className={'mt-6 text-sm font-semibold tracking-[0.2em] text-white/70 ' + enter}>LEARN. ANALYZE. MANAGE RISK.</p>
          <SplitText as="h1" eager staggerMs={55} startDelayMs={200} words={toWords('THE SCIENCE OF MARKETS. THE ART OF TRADING.', 5)} className="mt-4 font-display text-4xl leading-[1.02] text-white [text-wrap:balance] sm:text-5xl lg:text-6xl" />
          <p className={'mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg ' + enter}>From market basics to advanced strategies, learn the science behind the stock market. Build knowledge, analyze opportunities, manage risk and develop a disciplined approach to trading and investing.</p>
          <div className={'mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ' + enter}>
            <a href="#enroll" className="focus-ring rounded-full bg-lime px-8 py-4 text-center text-sm font-bold tracking-wide text-ink transition-transform hover:scale-105">START YOUR LEARNING JOURNEY</a>
            <a href="#learn" className="focus-ring rounded-full border border-lime/60 px-8 py-4 text-center text-sm font-bold tracking-wide text-lime transition-colors hover:bg-lime/10">EXPLORE OUR COURSES</a>
          </div>
          <p className={'mt-7 text-xs tracking-wide text-white/60 ' + enter}>Education first. Risk awareness always. No unrealistic return promises.</p>
        </div>
        <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[380px] lg:min-h-[500px]">
          <div aria-hidden="true" className="absolute h-56 w-56 rounded-full bg-lime/20 blur-3xl animate-pulseGlow sm:h-72 sm:w-72 md:h-96 md:w-96" />
          <FloatingOrbs className="hidden sm:block" />
          <div className="relative w-full max-w-lg transition-transform duration-300 ease-out hover:-translate-y-1">
            <div className="animate-floatSlow overflow-hidden rounded-3xl border border-white/10 bg-[#232428] shadow-[0_0_60px_rgba(59,130,246,0.22)] motion-reduce:animate-none">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3"><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-lime" /><span className="ml-3 flex-1 truncate rounded-full border border-white/10 px-3 py-1 text-[11px] text-muted">hedgescience.com/learn</span></div>
              <div className="relative"><img src={HERO_IMAGE} alt="Stock market charts and candlestick data" className="h-72 w-full object-cover sm:h-80" loading="eager" /><div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink/90 px-4 py-3 backdrop-blur"><span className="text-lime" aria-hidden="true">✦</span><div><p className="text-[10px] leading-none tracking-[0.15em] text-muted">OUR APPROACH</p><p className="mt-1 font-display text-sm leading-tight text-white">Knowledge before execution</p></div></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
