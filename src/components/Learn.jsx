import React from 'react'
import Reveal from './Reveal.jsx'
import SplitText, { toWords } from './SplitText.jsx'
import {
  IconFoundation, IconCandles, IconTrend, IconChecklist,
  IconShield, IconBrain, IconPlan, IconTarget,
} from './icons.jsx'

const benefits = [
  { title: 'Market fundamentals', desc: 'Learn stock-market basics from the ground up — built for complete beginners.', Icon: IconFoundation },
  { title: 'Chart reading', desc: 'Understand candlestick charts, trends, support and resistance levels.', Icon: IconCandles },
  { title: 'Technical analysis', desc: 'Build a solid foundation in the tools and concepts of technical analysis.', Icon: IconTrend },
  { title: 'A structured process', desc: 'Follow a repeatable approach instead of relying on tips or emotion.', Icon: IconChecklist },
  { title: 'Risk management', desc: 'Understand risk management and how to protect your capital.', Icon: IconShield },
  { title: 'Trading psychology', desc: 'Strengthen the patience, discipline and control that trading demands.', Icon: IconBrain },
  { title: 'A trading plan', desc: 'Create and follow a personal trading or investing plan.', Icon: IconPlan },
  { title: 'Guided practice', desc: 'Work through practical, real examples with guided support.', Icon: IconTarget },
]

export default function Learn() {
  return (
    <section id="learn" className="relative overflow-hidden border-t border-white/5 bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <span className="inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime">
          WHAT YOU'LL LEARN
        </span>
        <SplitText
          as="h2"
          words={toWords('A STRUCTURED PATH THROUGH THE MARKET, NOT A PILE OF TIPS', 6)}
          className="mt-5 max-w-4xl font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const hot = i === 3
            return (
              <Reveal key={b.title} delay={(i % 4) * 80}>
                <div
                  className={
                    'h-full rounded-2xl border p-6 transition-all hover:-translate-y-1 ' +
                    (hot
                      ? 'border-lime bg-lime text-ink'
                      : 'border-white/10 bg-white/[0.03] text-white hover:border-lime/50')
                  }
                >
                  <div
                    className={
                      'flex h-12 w-12 items-center justify-center rounded-full border ' +
                      (hot ? 'border-ink/30 text-ink' : 'border-white/15 text-lime')
                    }
                  >
                    <b.Icon />
                  </div>
                  <h3 className="mt-5 font-display text-base tracking-wide">{b.title}</h3>
                  <p className={'mt-2 text-sm leading-relaxed ' + (hot ? 'text-ink/70' : 'text-muted')}>{b.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
