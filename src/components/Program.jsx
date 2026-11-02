import React from 'react'
import Reveal from './Reveal.jsx'
import SplitText, { toWords } from './SplitText.jsx'

const levels = [
  { level: '01', name: 'Foundation', tag: 'Beginner', topics: ['Introduction to financial markets', 'Stock market terminology', 'Equity, indices and exchanges', 'Basic investment concepts'] },
  { level: '02', name: 'Analytical Skills', tag: 'Intermediate', topics: ['Technical analysis', 'Fundamental analysis', 'Chart reading and price action', 'Market trends and indicators'] },
  { level: '03', name: 'Trading Framework', tag: 'Advanced', topics: ['Trading strategies', 'Risk and reward', 'Money management', 'Psychology and discipline'] },
  { level: '04', name: 'Advanced Market Concepts', tag: 'Expert concepts', topics: ['Futures and options', 'Option Greeks and volatility', 'Derivatives strategies', 'Hedging and portfolio protection'] },
]

export default function Program() {
  return (
    <section id="program" className="border-t border-white/5 bg-[#20242b] py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime">YOUR LEARNING JOURNEY</span>
          <SplitText as="h2" words={toWords('ONE LEARNING JOURNEY. FROM BEGINNER TO ADVANCED.', 4)} className="mt-5 font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl" />
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">Build your understanding step by step, from market basics to advanced concepts in derivatives and hedging.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {levels.map((item, i) => <Reveal key={item.level} delay={i * 70}><article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-lime/50 sm:p-8"><div className="flex items-start justify-between gap-4"><div><span className="text-xs font-bold tracking-[0.2em] text-lime">LEVEL {item.level}</span><h3 className="mt-2 font-display text-xl text-white sm:text-2xl">{item.name}</h3></div><span className="rounded-full border border-lime/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-lime">{item.tag}</span></div><ul className="mt-6 grid gap-3 sm:grid-cols-2">{item.topics.map((topic) => <li key={topic} className="flex gap-3 text-sm leading-relaxed text-white/80"><span className="text-lime">•</span>{topic}</li>)}</ul></article></Reveal>)}
        </div>
        <a id="enroll" href="#faq" className="focus-ring mt-10 inline-block rounded-full bg-lime px-8 py-4 text-sm font-bold tracking-wide text-ink transition-transform hover:scale-105">BEGIN YOUR LEARNING JOURNEY</a>
      </div>
    </section>
  )
}
