import React from 'react'
import Reveal from './Reveal.jsx'
import SplitText, { toWords } from './SplitText.jsx'

export default function MidCta() {
  return (
    <section data-page-motion className="border-t border-white/5 bg-ink py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-lime/30 bg-white/[0.03] px-5 py-8 sm:rounded-3xl sm:px-8 sm:py-10 md:px-14 md:py-12">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/20 blur-3xl animate-pulseGlow" />
            <div className="relative mx-auto grid max-w-4xl justify-items-center gap-6 text-center md:mx-0 md:justify-items-start md:text-left md:gap-8">
              <div>
                <span className="text-[10px] font-bold tracking-[0.16em] text-lime sm:text-xs sm:tracking-[0.2em]">THE HEDGESCIENCE DIFFERENCE</span>
                <SplitText as="h2" words={toWords('THE MARKET REWARDS PREPARATION, NOT JUST PARTICIPATION.', 5)} className="mt-3 font-display text-xl leading-tight text-white min-[380px]:text-2xl sm:text-3xl" />
                <p className="copy-emphasis mt-4 max-w-xl text-sm leading-relaxed text-muted"><strong>Knowledge before execution.</strong> <strong>Analysis before decisions.</strong> <strong>Risk before reward.</strong> <strong>Process before profits.</strong> <strong>Discipline before emotions.</strong></p>
              </div>
              <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row md:justify-start">
                <a href="#program" className="focus-ring button-primary w-full px-4 text-xs sm:w-auto sm:text-sm">EXPLORE THE LEARNING JOURNEY <span aria-hidden="true" className="button-arrow">&rarr;</span></a>
                <a href="#learn" className="focus-ring button-secondary w-full border-white/25 bg-transparent px-4 text-xs text-white hover:border-lime hover:bg-lime/10 hover:text-lime sm:w-auto sm:text-sm">VIEW CURRICULUM <span aria-hidden="true" className="button-arrow">&darr;</span></a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
