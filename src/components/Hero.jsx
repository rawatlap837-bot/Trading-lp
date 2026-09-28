import React, { useEffect, useRef, useState } from 'react'
import SplitText, { toWords } from './SplitText.jsx'
import FloatingOrbs from './FloatingOrbs.jsx'

// Image from the original M3 landing page (kept as-is)
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1634542984003-e0fb8e200e91?auto=format&fit=crop&w=1200&q=80'

const points = ['No prior experience needed', 'Live classes', 'Community & mentorship']

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const tiltRef = useRef(null)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const enterClass =
    'transition-all duration-700 ease-out motion-reduce:transition-none ' +
    (mounted ? 'opacity-100 translate-y-0 ' : 'opacity-0 translate-y-6 ')
  const enterStyle = (ms) => ({ transitionDelay: mounted ? `${ms}ms` : '0ms' })

  function onMove(e) {
    const el = tiltRef.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) / r.width
    const y = (e.clientY - r.top - r.height / 2) / r.height
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translate3d(${x * 14}px, ${y * 14}px, 0)`
  }
  function onLeave() {
    if (tiltRef.current) tiltRef.current.style.transform = ''
  }

  return (
    <section className="relative overflow-hidden bg-ink" onMouseMove={onMove} onMouseLeave={onLeave}>
      {/* Lime separator with traveling glint */}
      <div aria-hidden="true" className="relative h-[2px] w-full overflow-hidden bg-lime/70">
        <div
          className="absolute inset-y-0 left-0 h-full w-1/4 animate-navGlint motion-reduce:hidden"
          style={{
            background: 'linear-gradient(90deg, transparent, #f3ffcf, transparent)',
            boxShadow: '0 0 10px 2px rgba(243,255,207,0.8)',
          }}
        />
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-10 md:grid-cols-2 md:gap-8 md:px-10 md:pb-24 md:pt-16 lg:px-12">
        <div className="relative z-10">
          <span
            className={
              'inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime ' +
              enterClass
            }
            style={enterStyle(80)}
          >
            M3 STOCK MARKET FOUNDATION PROGRAM
          </span>

          <SplitText
            as="h1"
            eager
            staggerMs={55}
            startDelayMs={200}
            words={toWords('LEARN THE STOCK MARKET WITH CLARITY, CONFIDENCE AND DISCIPLINE', 5)}
            className="mt-6 font-display text-4xl leading-[1.02] text-white [text-wrap:balance] sm:text-5xl lg:text-6xl"
          />

          <p
            className={'mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg ' + enterClass}
            style={enterStyle(700)}
          >
            A practical stock-market learning program by M3 — Market Mindset Mastery, built to take
            beginners from confusion to a structured understanding of charts, risk, strategy and
            market psychology — step by step.
          </p>

          <div className={'mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ' + enterClass} style={enterStyle(780)}>
            <a
              href="#enroll"
              className="focus-ring rounded-full bg-lime px-8 py-4 text-center text-sm font-bold tracking-wide text-ink transition-transform hover:scale-105"
            >
              JOIN THE PROGRAM
            </a>
            <a
              href="#program"
              className="focus-ring rounded-full border border-lime/60 px-8 py-4 text-center text-sm font-bold tracking-wide text-lime transition-colors hover:bg-lime/10"
            >
              SEE WHAT'S INCLUDED
            </a>
          </div>

          <div
            className={'mt-10 grid grid-cols-3 divide-x divide-white/15 ' + enterClass}
            style={enterStyle(860)}
          >
            {points.map((p) => (
              <div key={p} className="px-2 first:pl-0 sm:px-4">
                <span className="mb-2 block h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
                <p className="text-[10px] font-medium leading-tight tracking-wide text-white/80 sm:text-xs">
                  {p.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: M3's own hero image, framed, floating with glow, orbs and hover tilt */}
        <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[380px] lg:min-h-[500px]">
          <div
            aria-hidden="true"
            className="absolute h-56 w-56 rounded-full bg-lime/25 blur-3xl animate-pulseGlow sm:h-72 sm:w-72 md:h-96 md:w-96"
          />
          <FloatingOrbs className="hidden sm:block" />

          <div ref={tiltRef} className="relative w-full max-w-lg transition-transform duration-300 ease-out will-change-transform">
            <div className="animate-floatSlow overflow-hidden rounded-3xl border border-white/10 bg-[#232428] shadow-[0_0_60px_rgba(203,254,28,0.18)] motion-reduce:animate-none">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime" />
                <span className="ml-3 flex-1 truncate rounded-full border border-white/10 px-3 py-1 text-[11px] text-muted">
                  app.m3mindset.com/dashboard
                </span>
              </div>
              <div className="relative">
                <img
                  src={HERO_IMAGE}
                  alt="A live stock chart and candlestick data displayed on a trading dashboard"
                  className="h-72 w-full object-cover sm:h-80"
                  loading="eager"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink/90 px-4 py-3 backdrop-blur">
                  <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
                    <path d="M3 18 L9 12 L13 15 L23 4" stroke="#cbfe1c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 4 H23 V10" stroke="#cbfe1c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <div>
                    <p className="text-[10px] leading-none tracking-[0.15em] text-muted">SAMPLE MODULE</p>
                    <p className="mt-1 font-display text-sm leading-tight text-white">Reading trend structure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#top"
        aria-label="back to top"
        className="fixed bottom-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-md bg-lime text-ink shadow-lg transition-transform hover:scale-105 sm:bottom-6 sm:right-6 sm:h-11 sm:w-11"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.5] sm:h-5 sm:w-5">
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}
