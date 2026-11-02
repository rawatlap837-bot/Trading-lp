import React from 'react'
import Reveal from './Reveal.jsx'
import SplitText, { toWords } from './SplitText.jsx'
import { IconFoundation, IconCandles, IconTrend, IconChecklist, IconShield, IconBrain, IconPlan, IconTarget } from './icons.jsx'

const benefits = [
  { title: 'Stock Market Fundamentals', desc: 'Understand markets, participants, exchanges, indices, stocks and investment instruments.', Icon: IconFoundation },
  { title: 'Technical Analysis', desc: 'Learn price action, candlestick patterns, trends, indicators and market structure.', Icon: IconCandles },
  { title: 'Fundamental Analysis', desc: 'Explore financial statements, company valuation, ratios and business models.', Icon: IconTrend },
  { title: 'Trading Psychology', desc: 'Understand fear, greed, FOMO and the biases behind market decisions.', Icon: IconBrain },
  { title: 'Risk & Reward Management', desc: 'Learn position sizing, risk-to-reward, stop-loss strategies and capital protection.', Icon: IconShield },
  { title: 'Money Management', desc: 'Understand capital allocation, portfolios, compounding and market exposure.', Icon: IconPlan },
  { title: 'Trading Discipline', desc: 'Build trading plans, keep journals, follow rules and evaluate performance.', Icon: IconChecklist },
  { title: 'Derivatives & Options', desc: 'Learn futures, options, option Greeks, payoff structures and volatility.', Icon: IconTarget },
  { title: 'Hedging Strategies', desc: 'Explore portfolio protection, risk mitigation and strategic use of derivatives.', Icon: IconShield },
]

export default function Learn() {
  return (
    <section id="learn" className="relative overflow-hidden border-t border-white/5 bg-[#171a20] py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <span className="inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime">WHAT WILL YOU LEARN?</span>
        <SplitText as="h2" words={toWords('EDUCATION THAT GOES BEYOND CHARTS AND INDICATORS.', 5)} className="mt-5 max-w-4xl font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl" />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => <Reveal key={b.title} delay={(i % 3) * 70}><article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white transition-all hover:-translate-y-1 hover:border-lime/50"><div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-lime"><b.Icon /></div><h3 className="mt-5 font-display text-base tracking-wide">{b.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p></article></Reveal>)}
        </div>
      </div>
    </section>
  )
}
