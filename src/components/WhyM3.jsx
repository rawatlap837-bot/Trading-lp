import React from 'react'
import Reveal from './Reveal.jsx'
import { IconBrain, IconChecklist, IconShield, IconTrend, IconFoundation } from './icons.jsx'

const pillars = [
  { title: 'Knowledge', desc: 'Understand the market before participating.', Icon: IconFoundation },
  { title: 'Analysis', desc: 'Make decisions based on structured analysis.', Icon: IconTrend },
  { title: 'Risk management', desc: 'Respect risk and protect capital.', Icon: IconShield },
  { title: 'Psychology', desc: 'Understand emotions and behavioural biases.', Icon: IconBrain },
  { title: 'Discipline', desc: 'Follow a process instead of chasing market movements.', Icon: IconChecklist },
]

export default function WhyM3() {
  return (
    <section id="why" data-page-motion className="relative overflow-hidden border-t border-white/5 bg-ink py-14 sm:py-20 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-lime/[0.07] blur-3xl" />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12">
        <div className="relative mx-auto grid max-w-4xl justify-items-center gap-5 text-center sm:gap-7 md:mx-0 md:justify-items-start md:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/[0.06] px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-lime"><span className="h-1.5 w-1.5 rounded-full bg-lime" />OUR PHILOSOPHY</span>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-2xl leading-[1.15] text-white sm:mt-6 sm:text-3xl md:mx-0 md:text-4xl">We don't just teach you what to do. <span className="text-lime">We teach you how to think.</span></h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="copy-emphasis max-w-3xl text-sm leading-7 text-white/65 sm:text-base"><strong>Market knowledge alone is not enough.</strong> A strong understanding of risk, discipline and psychology matters just as much. HedgeScience combines fundamental knowledge, technical analysis and strategic thinking to help learners understand markets from every angle.</p>
          </Reveal>
        </div>
        <div className="mb-4 mt-10 flex items-center justify-between gap-3 sm:mt-14 lg:mb-5 lg:mt-20"><p className="text-[9px] font-semibold tracking-[0.16em] text-white/40 sm:text-[10px] sm:tracking-[0.22em]">THE FIVE PILLARS</p><span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" /><p className="text-[9px] tracking-wider text-white/35 sm:text-[10px]">01 to 05</p></div>
        <div className="relative grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:grid-cols-5">
          {pillars.map(({ title, desc, Icon }, i) => <Reveal key={title} delay={i * 45} className={i === pillars.length - 1 ? 'philosophy-last-grid-item' : ''}><article className={'group relative h-full overflow-hidden rounded-2xl border border-white/25 bg-[#22262d]/80 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:bg-[#272c33] sm:p-6 md:text-left ' + (i === pillars.length - 1 ? 'philosophy-last-card' : '')}><div className="flex items-center justify-between"><span className="font-display text-[10px] tracking-[0.15em] text-white/35 sm:text-xs">0{i + 1}</span><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-lime/20 bg-lime/[0.06] text-lime transition-colors group-hover:bg-lime group-hover:text-ink sm:h-10 sm:w-10"><Icon /></span></div><h3 className="mt-4 font-display text-sm text-white sm:mt-5 sm:text-base">{title}</h3><p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm sm:text-white/55">{desc}</p><div className="mx-auto mt-4 h-px w-8 bg-lime/50 transition-all duration-300 group-hover:w-1/2 sm:mt-6 md:mx-0" /></article></Reveal>)}
        </div>
      </div>
    </section>
  )
}
