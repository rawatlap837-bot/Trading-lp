import React from 'react'
import Reveal from './Reveal.jsx'

export default function FinalCta() {
  return (
    <section data-page-motion className="border-t border-white/5 bg-ink py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-lime px-5 py-8 text-center sm:gap-8 sm:rounded-3xl sm:px-8 sm:py-10 md:px-12 md:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-[10px] font-bold tracking-[0.16em] text-ink/60 sm:text-xs sm:tracking-[0.2em]">HEDGESCIENCE</span>
              <h2 className="mx-auto mt-2 max-w-5xl font-display text-2xl leading-tight text-ink [text-wrap:balance] sm:text-3xl md:text-4xl">Your Financial Market Education Starts Here.</h2>
              <p className="copy-emphasis mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink/70"><strong>Learn the concepts. Understand the risks. Develop your edge.</strong> Take the next step towards becoming a more informed and disciplined market participant.</p>
            </div>
            <a href="#program" className="focus-ring button-dark w-full shrink-0 px-5 text-xs sm:w-auto sm:px-8 sm:text-sm">ENROL NOW <span aria-hidden="true" className="button-arrow">&rarr;</span></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
