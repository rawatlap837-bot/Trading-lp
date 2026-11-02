import React from 'react'
import Reveal from './Reveal.jsx'

const pillars = [
  ['Knowledge', 'Understand the market before participating.'],
  ['Analysis', 'Make decisions based on structured analysis.'],
  ['Risk management', 'Respect risk and protect capital.'],
  ['Psychology', 'Understand emotions and behavioural biases.'],
  ['Discipline', 'Follow a process instead of chasing market movements.'],
]

export default function WhyM3() {
  return (
    <section id="why" className="border-t border-white/5 bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <span className="inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime">OUR PHILOSOPHY</span>
          <h2 className="mt-5 max-w-4xl font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">We don't just teach you what to do. <span className="text-lime">We teach you how to think.</span></h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">Market knowledge alone is not enough. A strong understanding of risk, discipline and psychology matters just as much. HedgeScience combines fundamental knowledge, technical analysis and strategic thinking to help learners understand markets from every angle.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map(([title, desc], i) => <Reveal key={title} delay={i * 60}><div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5"><span className="font-display text-xs tracking-[0.15em] text-lime">0{i + 1}</span><h3 className="mt-4 font-display text-base text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  )
}
