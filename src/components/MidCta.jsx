import React from 'react'
import Reveal from './Reveal.jsx'
import SplitText, { toWords } from './SplitText.jsx'

export default function MidCta() {
  return (
    <section className="border-t border-white/5 bg-ink py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal><div className="relative overflow-hidden rounded-3xl border border-lime/30 bg-white/[0.03] px-8 py-12 sm:px-14"><div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/20 blur-3xl animate-pulseGlow" /><div className="relative grid items-center gap-8 md:grid-cols-[1.3fr_0.7fr]"><div><span className="text-xs font-bold tracking-[0.2em] text-lime">THE HEDGESCIENCE DIFFERENCE</span><SplitText as="h2" words={toWords('THE MARKET REWARDS PREPARATION, NOT JUST PARTICIPATION.', 5)} className="mt-3 font-display text-2xl leading-tight text-white sm:text-3xl" /><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">Knowledge before execution. Analysis before decisions. Risk before reward. Process before profits. Discipline before emotions.</p></div><div className="flex flex-col gap-3"><a href="#program" className="focus-ring rounded-full bg-lime px-6 py-4 text-center text-sm font-bold tracking-wide text-ink transition-transform hover:scale-105">EXPLORE THE LEARNING JOURNEY</a><a href="#learn" className="focus-ring rounded-full border border-white/25 px-6 py-4 text-center text-sm font-bold tracking-wide text-white transition-colors hover:border-lime hover:text-lime">VIEW CURRICULUM</a></div></div></div></Reveal>
      </div>
    </section>
  )
}
