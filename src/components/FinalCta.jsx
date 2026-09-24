import React from 'react'

export default function FinalCta() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-page">
        <div className="rounded-xl border-2 border-line bg-white px-8 py-14 text-center sm:px-16">
          <span className="eyebrow">Market Mindset Mastery</span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Stop guessing. Start understanding the market.
          </h2>
          <p className="mx-auto mt-4 max-w-prose font-normal leading-relaxed text-body">
            Join the M3 Stock Market Foundation Program and build a process
            you can trust — chart by chart, decision by decision.
          </p>
          <a
            href="#program"
            className="focus-ring mt-8 inline-block rounded-md border-2 border-amber-500 bg-amber-500 px-8 py-3.5 text-sm font-bold text-ink-900 transition-colors hover:bg-amber-400"
          >
            Enroll in the program
          </a>
        </div>
      </div>
    </section>
  )
}
