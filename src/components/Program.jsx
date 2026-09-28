import React from 'react'
import Reveal from './Reveal.jsx'
import SplitText, { toWords } from './SplitText.jsx'

const specs = [
  { label: 'Program', value: 'M3 Stock Market Foundation Program' },
  { label: 'Format', value: 'Live online classes with recorded modules and mentorship support' },
  { label: 'Duration', value: 'Shared on the enrollment call — cohorts run in structured batches' },
  { label: 'Who it’s for', value: 'Beginners, investors, aspiring traders and working professionals' },
  { label: 'Bonus', value: 'Community access, session recordings, learning resources and Q&A support' },
]

export default function Program() {
  return (
    <section id="program" className="border-t border-white/5 bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime">
              THE OFFER
            </span>
            <SplitText
              as="h2"
              words={toWords('EVERYTHING INSIDE THE FOUNDATION PROGRAM', 3)}
              className="mt-5 font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              One structured program covering market fundamentals, technical analysis, risk
              management and trading psychology — with live support along the way.
            </p>
            <a
              id="enroll"
              href="#faq"
              className="focus-ring mt-8 inline-block rounded-full bg-lime px-8 py-4 text-sm font-bold tracking-wide text-ink transition-transform hover:scale-105"
            >
              RESERVE YOUR SEAT
            </a>
          </div>

          <div className="grid gap-3">
            {specs.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="grid grid-cols-[1fr_2fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 transition-all hover:border-lime/50 sm:grid-cols-[0.7fr_1.3fr]">
                  <dt className="font-display text-xs tracking-[0.15em] text-lime">{s.label.toUpperCase()}</dt>
                  <dd className="text-sm leading-relaxed text-white/85 sm:text-[15px]">{s.value}</dd>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
