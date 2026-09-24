import React from 'react'
import { useReveal } from '../hooks/useReveal.js'
import {
  IconFoundation,
  IconCandles,
  IconTrend,
  IconChecklist,
  IconShield,
  IconBrain,
  IconPlan,
  IconTarget,
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

function BenefitCard({ title, desc, Icon, index }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 4) * 70}ms` }}
      className={`group rounded-xl border-2 border-line bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500 hover:shadow-[0_14px_30px_-18px_rgba(31,27,18,0.35)] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-amber-600/30 bg-amber-50">
        <Icon />
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-heading">{title}</h3>
      <p className="mt-2 text-sm font-normal leading-relaxed text-body">{desc}</p>
    </div>
  )
}

export default function Learn() {
  return (
    <section id="learn" className="bg-cream py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-prose">
          <span className="eyebrow">What you'll learn</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            A structured path through the market, not a pile of tips
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} {...b} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
