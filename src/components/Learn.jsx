import React from 'react'
import Reveal from './Reveal.jsx'
import SplitText, { toWords } from './SplitText.jsx'
import { IconFoundation, IconCandles, IconTrend, IconChecklist, IconShield, IconBrain, IconPlan, IconTarget } from './icons.jsx'

const benefits = [
  { title: 'Stock Market Fundamentals', desc: 'Understand markets, participants, exchanges, indices, stocks and investment instruments.', image: '/images/curriculum/module-01.jpeg', Icon: IconFoundation },
  { title: 'Technical Analysis', desc: 'Learn price action, candlestick patterns, trends, indicators and market structure.', image: '/images/curriculum/module-02.jpeg', Icon: IconCandles },
  { title: 'Fundamental Analysis', desc: 'Explore financial statements, company valuation, ratios and business models.', image: '/images/curriculum/module-03.jpeg', Icon: IconTrend },
  { title: 'Trading Psychology', desc: 'Understand fear, greed, FOMO and the biases behind market decisions.', image: '/images/curriculum/module-04.jpeg', Icon: IconBrain },
  { title: 'Risk & Reward Management', desc: 'Learn position sizing, risk-to-reward, stop-loss strategies and capital protection.', image: '/images/curriculum/module-05.jpeg', Icon: IconShield },
  { title: 'Money Management', desc: 'Understand capital allocation, portfolios, compounding and market exposure.', image: '/images/curriculum/module-06.jpeg', Icon: IconPlan },
  { title: 'Trading Discipline', desc: 'Build trading plans, keep journals, follow rules and evaluate performance.', image: '/images/curriculum/module-07.jpeg', Icon: IconChecklist },
  { title: 'Derivatives & Options', desc: 'Learn futures, options, option Greeks, payoff structures and volatility.', image: '/images/curriculum/module-08.jpeg', Icon: IconTarget },
  { title: 'Hedging Strategies', desc: 'Explore portfolio protection, risk mitigation and strategic use of derivatives.', image: '/images/curriculum/module-09.jpeg', Icon: IconShield },
]

export default function Learn() {
  return (
    <section id="learn" data-page-motion className="relative overflow-x-clip border-t border-white/5 bg-[#171a20] py-14 sm:py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12">
        <div className="text-center md:text-left"><span className="inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime">WHAT WILL YOU LEARN?</span>
        <SplitText as="h2" words={toWords('EDUCATION THAT GOES BEYOND CHARTS AND INDICATORS.', 5)} className="mx-auto mt-5 max-w-4xl font-display text-2xl leading-tight text-white sm:text-3xl md:mx-0 md:text-4xl" /></div>
        <div className="learning-card-deck mt-8 grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:mt-12 sm:gap-4 lg:grid-cols-3">
          {benefits.map((b, i) => <Reveal key={b.title} delay={(i % 3) * 70} className="learning-deck-item" style={{ '--stack-offset': `${i * 10}px`, zIndex: i + 1 }}><article className="group h-full overflow-hidden rounded-2xl border border-white/25 bg-[#20242b] text-white transition-all duration-300 hover:-translate-y-1 hover:border-lime/50 hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]"><div className="relative aspect-[16/9] overflow-hidden"><img src={b.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#171a20] via-[#171a20]/10 to-transparent" /><span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink/75 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-white/90 backdrop-blur">MODULE 0{i + 1}</span></div><div className="p-5 text-center sm:p-6 md:text-left"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-lime/25 bg-lime/[0.07] text-lime md:mx-0"><b.Icon /></div><h3 className="mt-4 font-display text-base tracking-wide">{b.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p></div></article></Reveal>)}
        </div>
      </div>
    </section>
  )
}
