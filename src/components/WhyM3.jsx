import React from 'react'
import Reveal from './Reveal.jsx'

// Image from the original M3 landing page (kept as-is)
const WHY_IMAGE =
  'https://images.unsplash.com/photo-1744782211816-c5224434614f?auto=format&fit=crop&w=1000&q=80'

export default function WhyM3() {
  return (
    <section id="why" className="border-t border-white/5 bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <span className="inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime">
              WHY M3
            </span>
            <p className="mt-5 font-display text-2xl leading-snug text-white sm:text-3xl">
              We don't teach shortcuts. We teach the process —{' '}
              <span className="text-lime">
                how the market actually works, how to manage risk, and how to think clearly when money
                is on the line.
              </span>
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Market Mindset Mastery exists because most beginners lose money chasing tips, not
              because they lack intelligence. M3 focuses on education, risk awareness and the
              discipline needed to make better decisions — session after session.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-lime/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#232428]">
                <img
                  src={WHY_IMAGE}
                  alt="Candlestick charts displayed across multiple trading screens"
                  className="h-72 w-full object-cover transition-transform duration-500 hover:scale-[1.03] sm:h-96"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
