import React, { useEffect, useState } from 'react'
import SplitText, { toWords } from './SplitText.jsx'
import FloatingOrbs from './FloatingOrbs.jsx'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])
  const enter = 'transition-all duration-700 ease-out motion-reduce:transition-none ' + (mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')
  return (
    <section className="hero-section relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="hero-section-backdrop absolute inset-0"><img src="/backgorundimage.png" alt="" /></div>
      <div aria-hidden="true" className="hero-section-overlay absolute inset-0" />
      <div aria-hidden="true" className="relative h-[2px] w-full overflow-hidden bg-lime/70"><div className="absolute inset-y-0 left-0 h-full w-1/4 animate-navGlint motion-reduce:hidden" style={{ background: 'linear-gradient(90deg, transparent, #dbeafe, transparent)', boxShadow: '0 0 10px 2px rgba(219,234,254,0.8)' }} /></div>

      {/* UPDATED: pb-0 (no bottom padding) + md:items-stretch so the portrait column reaches the bottom edge */}
      <div className="hero-stage relative grid w-full grid-cols-1 items-center gap-2 px-4 pb-0 pt-7 sm:gap-10 sm:px-8 sm:pt-8 md:grid-cols-2 md:items-stretch md:gap-8 md:px-10 md:pt-16 lg:px-[max(3rem,calc((100vw-1440px)/2))]">

        {/* UPDATED: added pb-6 / md:pb-8 and md:self-center (the spacing moved here from the grid) */}
        <div className="relative z-10 pb-0 text-center md:self-center md:pb-8 md:text-left">
          <span className={'inline-block max-w-full rounded-full border border-lime/40 px-3 py-1.5 text-[9px] font-semibold tracking-[0.14em] text-lime sm:px-4 sm:text-[11px] sm:tracking-[0.2em] ' + enter}>PREMIUM STOCK MARKET EDUCATION</span>
          <p className={'mt-5 text-xs font-semibold tracking-[0.16em] text-white/70 sm:mt-6 sm:text-sm sm:tracking-[0.2em] ' + enter}>LEARN. ANALYZE. MANAGE RISK.</p>
          <SplitText as="h1" eager staggerMs={55} startDelayMs={200} words={toWords('THE SCIENCE OF MARKETS. THE ART OF TRADING.', 5)} className="mx-auto mt-4 max-w-4xl font-display text-4xl leading-[1.02] text-white [text-wrap:balance] sm:text-5xl md:mx-0 md:text-6xl lg:text-7xl" />
          <p className={'copy-emphasis mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg md:mx-0 ' + enter}>From market basics to advanced strategies, learn the science behind the stock market. <strong>Build knowledge, analyze opportunities, manage risk</strong> and develop a disciplined approach to trading and investing.</p>
          <div className={'mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center md:justify-start ' + enter}>
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('open-enrollment'))} className="focus-ring button-primary w-full px-4 text-xs sm:w-auto sm:px-7">START YOUR LEARNING JOURNEY <span aria-hidden="true" className="button-arrow">&rarr;</span></button>
            <a href="#learn" className="focus-ring button-secondary w-full px-4 text-xs sm:w-auto sm:px-7">EXPLORE OUR COURSES <span aria-hidden="true" className="button-arrow">&darr;</span></a>
          </div>
          <p className={'mt-7 text-xs tracking-wide text-white/60 ' + enter}><strong>Education first.</strong> Risk awareness always. No unrealistic return promises.</p>
          <div className={'mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 md:justify-start ' + enter} aria-label="Curriculum highlights">
            {['Market basics', 'Technical analysis', 'Risk management'].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/65"><span className="mr-2 text-lime">&#8226;</span>{item}</span>)}
          </div>
        </div>

        <div className="hero-portrait-stage relative flex max-sm:!min-h-[380px] min-h-[420px] items-end justify-center sm:min-h-[560px] lg:min-h-[680px]">
          <div aria-hidden="true" className="absolute h-56 w-56 rounded-full bg-lime/20 blur-3xl animate-pulseGlow sm:h-72 sm:w-72 md:h-96 md:w-96" />
          <FloatingOrbs className="hidden sm:block" />
          {/* RESTORED: bull/bear image behind the client. -inset-x-4 makes it touch both screen edges on mobile */}
          <div aria-hidden="true" className="mobile-bull-backdrop absolute inset-y-0 -inset-x-4 z-0 sm:inset-x-0" />
          <div aria-hidden="true" className="market-grid absolute inset-0 z-[1] opacity-30" />
          <div aria-hidden="true" className="market-ticker market-ticker-up z-[2]">▲ 2.84%</div>
          <div aria-hidden="true" className="market-ticker market-ticker-down z-[2]">▼ 1.26%</div>
          <svg aria-hidden="true" className="market-trend absolute inset-x-0 bottom-5 z-[2] h-32 w-full" viewBox="0 0 700 160" preserveAspectRatio="none"><path d="M0 132 C90 120 100 85 175 100 S260 54 330 72 S425 28 490 47 S590 16 700 4" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeDasharray="8 10" /></svg>
          <div className="client-portrait pointer-events-none absolute inset-x-0 bottom-[-1px] z-10 mx-auto h-full w-full max-w-lg sm:max-w-xl lg:max-w-none">
            <img src="/Client.png" alt="HedgeScience client" className="client-photo absolute inset-x-0 bottom-0 mx-auto h-full w-full object-contain object-bottom drop-shadow-[0_18px_32px_rgba(0,0,0,.45)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
