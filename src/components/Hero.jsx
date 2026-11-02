import React, { useEffect, useState } from 'react'
import SplitText, { toWords } from './SplitText.jsx'
import FloatingOrbs from './FloatingOrbs.jsx'

const candles = [
  [48, 222, 12, 32, 0], [73, 208, 18, 38, 0], [98, 216, 11, 28, 1], [123, 188, 20, 42, 0],
  [148, 176, 14, 35, 0], [173, 190, 18, 32, 1], [198, 166, 22, 48, 0], [223, 148, 14, 36, 0],
  [248, 160, 18, 30, 1], [273, 138, 20, 45, 0], [298, 116, 16, 38, 0], [323, 129, 18, 32, 1],
  [348, 108, 22, 44, 0], [373, 96, 14, 31, 0], [398, 107, 18, 37, 1], [423, 81, 22, 46, 0],
  [448, 91, 16, 33, 1], [473, 67, 20, 43, 0], [498, 77, 14, 32, 1], [523, 52, 22, 48, 0],
  [548, 63, 16, 36, 0], [573, 43, 20, 42, 0], [598, 54, 14, 31, 1], [623, 28, 22, 45, 0],
  [648, 37, 16, 34, 1], [673, 18, 20, 39, 0], [698, 29, 14, 30, 1], [723, 10, 20, 43, 0],
]

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
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-4 pb-12 pt-7 sm:gap-10 sm:px-8 sm:pb-14 sm:pt-8 md:grid-cols-2 md:gap-8 md:px-10 md:pb-24 md:pt-16 lg:px-12">
        <div className="relative z-10 text-center md:text-left">
          <span className={'inline-block max-w-full rounded-full border border-lime/40 px-3 py-1.5 text-[9px] font-semibold tracking-[0.14em] text-lime sm:px-4 sm:text-[11px] sm:tracking-[0.2em] ' + enter}>PREMIUM STOCK MARKET EDUCATION</span>
          <p className={'mt-5 text-xs font-semibold tracking-[0.16em] text-white/70 sm:mt-6 sm:text-sm sm:tracking-[0.2em] ' + enter}>LEARN. ANALYZE. MANAGE RISK.</p>
          <SplitText as="h1" eager staggerMs={55} startDelayMs={200} words={toWords('THE SCIENCE OF MARKETS. THE ART OF TRADING.', 5)} className="mx-auto mt-4 max-w-4xl font-display text-4xl leading-[1.02] text-white [text-wrap:balance] sm:text-5xl md:mx-0 md:text-6xl lg:text-7xl" />
          <p className={'copy-emphasis mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg md:mx-0 ' + enter}>From market basics to advanced strategies, learn the science behind the stock market. <strong>Build knowledge, analyze opportunities, manage risk</strong> and develop a disciplined approach to trading and investing.</p>
          <div className={'mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center md:justify-start ' + enter}>
            <a href="#enroll" className="focus-ring button-primary w-full px-4 text-xs sm:w-auto sm:px-7">START YOUR LEARNING JOURNEY <span aria-hidden="true" className="button-arrow">&rarr;</span></a>
            <a href="#learn" className="focus-ring button-secondary w-full px-4 text-xs sm:w-auto sm:px-7">EXPLORE OUR COURSES <span aria-hidden="true" className="button-arrow">&darr;</span></a>
          </div>
          <p className={'mt-7 text-xs tracking-wide text-white/60 ' + enter}><strong>Education first.</strong> Risk awareness always. No unrealistic return promises.</p>
          <div className={'mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 md:justify-start ' + enter} aria-label="Curriculum highlights">
            {['Market basics', 'Technical analysis', 'Risk management'].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/65"><span className="mr-2 text-lime">&#8226;</span>{item}</span>)}
          </div>
        </div>
          <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[460px] lg:min-h-[540px]">
          <div aria-hidden="true" className="absolute h-56 w-56 rounded-full bg-lime/20 blur-3xl animate-pulseGlow sm:h-72 sm:w-72 md:h-96 md:w-96" />
          <FloatingOrbs className="hidden sm:block" />
          <div className="relative w-full max-w-xl transition-transform duration-300 ease-out hover:-translate-y-1">
            <div className="animate-floatSlow overflow-hidden rounded-3xl border border-sky-300/25 bg-[#171b22] shadow-[0_24px_90px_rgba(56,189,248,0.2)] motion-reduce:animate-none">
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#20242b] px-4 py-3"><span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /><span className="ml-3 flex-1 truncate rounded-full border border-white/10 bg-black/10 px-3 py-1 text-[11px] text-muted">hedgescience.com/learn</span><span className="hidden text-[10px] font-semibold tracking-wider text-lime sm:inline">LEARNING HUB</span></div>
              <div className="relative overflow-hidden bg-[#0b1420]">
                <svg viewBox="0 0 800 300" role="img" aria-label="Animated illustrative candlestick chart with volume bars" className="h-72 w-full sm:h-96 lg:h-[26rem]">
                  <defs><linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#38bdf8" stopOpacity=".2"/><stop offset="1" stopColor="#38bdf8" stopOpacity="0"/></linearGradient><linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#38bdf8" stopOpacity=".22"/><stop offset="1" stopColor="#38bdf8" stopOpacity="0"/></linearGradient></defs>
                  <rect width="800" height="300" fill="#0b1420" /><rect width="800" height="170" fill="url(#chartGlow)" />
                  <g stroke="#94a3b8" strokeOpacity=".13" strokeWidth="1">{[45, 95, 145, 195, 245].map(y => <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} />)}{[80, 180, 280, 380, 480, 580, 680, 780].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" />)}</g>
                  <path d="M0 245 C95 238 100 220 160 218 S245 180 300 184 S380 145 430 152 S510 112 560 119 S660 52 800 30 L800 260 L0 260Z" fill="url(#chartArea)" />
                  <path d="M0 245 C95 238 100 220 160 218 S245 180 300 184 S380 145 430 152 S510 112 560 119 S660 52 800 30" fill="none" stroke="#7dd3fc" strokeOpacity=".55" strokeWidth="2" />
                  <g>{candles.map(([x, y, body, wick, down], i) => <g key={x} className="hero-candle" style={{ animationDelay: `${i * 38}ms` }}><g className="hero-candle-live" style={{ animationDelay: `${(i % 8) * 110}ms` }}><line x1={x + 7} y1={y - wick / 2} x2={x + 7} y2={y + body + wick / 2} stroke={down ? '#fb7185' : '#34d399'} strokeWidth="2"/><rect x={x} y={y} width="14" height={body} rx="2" fill={down ? '#fb7185' : '#34d399'} /></g></g>)}</g>
                  <path d="M0 263 C120 250 180 228 260 231 S400 186 480 194 S620 122 800 99" fill="none" stroke="#fbbf24" strokeOpacity=".8" strokeWidth="2" strokeDasharray="7 8" className="hero-chart-line" />
                  <g opacity=".72">{candles.map(([x, , , , down], i) => <rect key={`vol${x}`} x={x} y={278 - ((i * 17 + 21) % 28)} width="14" height={((i * 17 + 21) % 28)} rx="2" fill={down ? '#fb7185' : '#34d399'} opacity=".65" />)}</g>
                  <line x1="0" y1="265" x2="800" y2="265" stroke="#cbd5e1" strokeOpacity=".16" />
                  <circle cx="724" cy="36" r="7" fill="#7dd3fc" className="hero-chart-pulse" />
                </svg>
                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-white/10 bg-[#0b1420]/80 px-2.5 py-1.5 backdrop-blur sm:left-4 sm:top-4"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"/><span className="text-[9px] font-bold tracking-[0.14em] text-white/85 sm:text-[10px]">MARKET CHART</span><span className="border-l border-white/15 pl-2 text-[9px] text-white/45">SAMPLE</span></div>
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/90 to-transparent" /><div className="absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-xl border border-white/10 bg-ink/90 px-2.5 py-2 backdrop-blur sm:bottom-4 sm:left-4 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime/10 text-lime sm:h-9 sm:w-9" aria-hidden="true"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 16.5 9 12l3 2 7-8"/><path d="M15 6h4v4"/></svg></span><div className="min-w-0"><p className="text-[9px] leading-none tracking-[0.12em] text-muted sm:text-[10px] sm:tracking-[0.15em]">OUR APPROACH</p><p className="mt-1 truncate font-display text-xs leading-tight text-white sm:text-sm">Knowledge before execution</p></div></div><span className="absolute right-3 top-3 rounded-full border border-white/15 bg-ink/75 px-2.5 py-1.5 text-[9px] font-semibold tracking-wider text-white/80 backdrop-blur sm:right-4 sm:top-4 sm:px-3 sm:text-[10px]">MARKET INSIGHT <span className="ml-1 text-lime">LIVE</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
