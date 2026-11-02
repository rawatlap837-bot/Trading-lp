import React from 'react'
import Reveal from './Reveal.jsx'
import SplitText, { toWords } from './SplitText.jsx'

export default function FinalCta() {
  return (
    <section className="border-t border-white/5 bg-ink py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal><div className="flex flex-col items-center gap-8 rounded-3xl bg-lime px-8 py-12 text-center md:flex-row md:justify-between md:text-left"><div><span className="text-xs font-bold tracking-[0.2em] text-ink/60">HEDGESCIENCE</span><SplitText as="h2" words={toWords('YOUR FINANCIAL MARKET EDUCATION STARTS HERE.', 4)} className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl" /><p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">Learn the concepts. Understand the risks. Develop your edge. Take the next step towards becoming a more informed and disciplined market participant.</p></div><a href="#program" className="focus-ring shrink-0 rounded-full bg-ink px-8 py-4 text-sm font-bold tracking-wide text-lime transition-transform hover:scale-105">ENROL NOW</a></div></Reveal>
      </div>
    </section>
  )
}
