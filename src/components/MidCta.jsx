import React from 'react'
import Reveal from './Reveal.jsx'
import SplitText, { toWords } from './SplitText.jsx'

export default function MidCta() {
  return (
    <section className="border-t border-white/5 bg-ink py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-lime/30 bg-white/[0.03] px-8 py-12 sm:px-14">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/20 blur-3xl animate-pulseGlow" />
            <div className="relative grid items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-lime">READY WHEN YOU ARE</span>
                <SplitText
                  as="h2"
                  words={toWords("LET'S BUILD YOUR MARKET FOUNDATION — ONE STRUCTURED SESSION AT A TIME", 3, 6)}
                  className="mt-3 font-display text-2xl leading-tight text-white sm:text-3xl"
                />
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  Join the M3 Stock Market Foundation Program and learn charts, risk and strategy the
                  right way, with live support whenever you need it.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <a
                  href="#program"
                  className="focus-ring rounded-full bg-lime px-6 py-4 text-center text-sm font-bold tracking-wide text-ink transition-transform hover:scale-105"
                >
                  VIEW PROGRAM DETAILS
                </a>
                <a
                  href="#faq"
                  className="focus-ring rounded-full border border-white/25 px-6 py-4 text-center text-sm font-bold tracking-wide text-white transition-colors hover:border-lime hover:text-lime"
                >
                  READ THE FAQS
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
