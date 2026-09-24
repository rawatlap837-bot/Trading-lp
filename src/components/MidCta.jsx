import React from 'react'
import { useReveal } from '../hooks/useReveal.js'

export default function MidCta() {
  const [ref, visible] = useReveal()

  return (
    <section className="bg-cream px-6 md:px-10">
      <div
        ref={ref}
        className={`container-page rounded-2xl bg-ink-900 px-8 py-14 transition-all duration-700 sm:px-14 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="font-mono text-xs font-medium tracking-tight text-amber-400">Ready when you are</p>
            <h2 className="mt-3 font-display text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl">
              Let's build your market foundation — one structured session at a time
            </h2>
            <p className="mt-3 max-w-md text-sm font-normal leading-relaxed text-white/70">
              Join the M3 Stock Market Foundation Program and learn charts, risk
              and strategy the right way, with live support whenever you need it.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a
              href="#program"
              className="focus-ring rounded-md border-2 border-amber-500 bg-amber-500 px-6 py-3.5 text-center text-sm font-bold text-ink-900 transition-colors hover:bg-amber-400"
            >
              View program details
            </a>
            <a
              href="#faq"
              className="focus-ring rounded-md border-2 border-white/20 px-6 py-3.5 text-center text-sm font-bold text-white transition-colors hover:border-white/50"
            >
              Read the FAQs
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
