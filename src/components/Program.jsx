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
    <section id="program" data-page-motion className="scroll-mt-20 border-t border-white/5 bg-[#20242b] py-14 sm:py-16 md:py-24">
      <div id="enroll" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 sm:px-6 md:px-12">
        <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/[0.05] px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-lime"><span className="h-1.5 w-1.5 rounded-full bg-lime" />YOUR LEARNING JOURNEY</span>
            <SplitText as="h2" words={toWords('ONE LEARNING JOURNEY. FROM BEGINNER TO ADVANCED.', 4)} className="mx-auto mt-5 font-display text-2xl leading-tight text-white sm:text-3xl md:mx-0 md:text-4xl" />
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base md:mx-0">Build your understanding step by step, from market basics to advanced concepts in derivatives and hedging.</p>
          </div>
          <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/65">4 progressive levels</span>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-2 sm:mt-10 sm:gap-4" aria-label="Four progressive learning levels">
          {levels.map((item) => <div key={item.level} className="min-w-0"><div className="h-1 rounded-full bg-lime/50" /><p className="mt-2 truncate text-[8px] font-bold tracking-[0.08em] text-white/55 min-[380px]:text-[9px] sm:mt-3 sm:text-[10px] sm:tracking-[0.18em]">{item.level} <span className="hidden sm:inline">/</span> {item.tag}</p></div>)}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 sm:mt-6 sm:gap-4">
          {levels.map((item, i) => <Reveal key={item.level} delay={i * 70}><article className="group relative h-full overflow-hidden rounded-2xl border border-white/25 bg-[#272b32] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime/50 hover:shadow-[0_18px_45px_rgba(0,0,0,0.2)] sm:p-8"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-lime/70 via-lime/10 to-transparent opacity-70 transition-opacity group-hover:opacity-100" /><div className="flex items-start justify-between gap-3"><div className="min-w-0"><span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-lime sm:text-xs sm:tracking-[0.2em]"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime/10 text-[10px]">{item.level}</span>LEVEL</span><h3 className="mt-3 break-words font-display text-lg text-white sm:text-2xl">{item.name}</h3></div><span className="max-w-[45%] rounded-full border border-lime/30 bg-lime/[0.04] px-2.5 py-1 text-center text-[9px] font-semibold uppercase tracking-wide text-lime sm:px-3 sm:text-[10px] sm:tracking-wider">{item.tag}</span></div><ul className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">{item.topics.map((topic) => <li key={topic} className="flex gap-2.5 text-sm leading-relaxed text-white/80 sm:gap-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime/10 text-[10px] text-lime">&#10003;</span>{topic}</li>)}</ul></article></Reveal>)}
        </div>
        <div className="mt-8 flex justify-center sm:mt-10 md:justify-start"><a href="#faq" className="focus-ring button-primary w-full px-4 text-xs sm:w-fit sm:px-7 sm:text-sm">BEGIN YOUR LEARNING JOURNEY <span aria-hidden="true" className="button-arrow">&rarr;</span></a></div>
      </div>
    </section>
  )
}
