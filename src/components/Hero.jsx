import React from 'react'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1634542984003-e0fb8e200e91?auto=format&fit=crop&w=1200&q=80'

export default function Hero() {
  return (
    <section id="top" className="bg-cream">
      <div className="container-page grid items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        <div>
          <span className="eyebrow">M3 Stock Market Foundation Program</span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-heading sm:text-5xl lg:text-[3.2rem]">
            Learn the stock market with clarity, confidence and discipline
          </h1>
          <p className="mt-6 max-w-prose text-lg font-normal leading-relaxed text-body">
            A practical stock-market learning program by M3 — Market Mindset Mastery,
            built to take beginners from confusion to a structured understanding of
            charts, risk, strategy and market psychology — step by step.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#enroll"
              className="focus-ring rounded-md border-2 border-amber-500 bg-amber-500 px-7 py-3.5 text-center text-sm font-bold text-ink-900 transition-colors hover:bg-amber-400"
            >
              Join the program
            </a>
            <a
              href="#program"
              className="focus-ring rounded-md border-2 border-line bg-white px-7 py-3.5 text-center text-sm font-bold text-heading transition-colors hover:border-amber-500 hover:text-amber-700"
            >
              See what's included
            </a>
          </div>

          <p className="mt-6 font-mono text-xs text-body/70">
            No prior experience needed · Live classes · Community &amp; mentorship
          </p>
        </div>

        {/* Browser-frame mockup showcasing a live chart, echoing a real product screen */}
        <div className="overflow-hidden rounded-xl border-2 border-line bg-white shadow-[0_20px_50px_-25px_rgba(31,27,18,0.35)]">
          <div className="flex items-center gap-2 border-b border-line bg-sand px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-fall/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-rise/70" />
            <span className="ml-3 flex-1 truncate rounded-md border border-line bg-white px-3 py-1 font-mono text-[11px] text-body/60">
              app.m3mindset.com/dashboard
            </span>
          </div>
          <div className="relative">
            <img
              src={HERO_IMAGE}
              alt="A live stock chart and candlestick data displayed on a trading dashboard"
              className="h-72 w-full object-cover sm:h-80 md:h-72"
              loading="eager"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-lg border-2 border-line bg-white px-4 py-3 shadow-md">
              <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
                <path
                  d="M3 18 L9 12 L13 15 L23 4"
                  stroke="#2F9E63"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M17 4 H23 V10" stroke="#2F9E63" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div>
                <p className="font-mono text-[11px] leading-none text-body/60">Sample module</p>
                <p className="font-mono text-sm font-medium leading-tight text-heading">Reading trend structure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
