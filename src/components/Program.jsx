import React from 'react'
import { useReveal } from '../hooks/useReveal.js'

const specs = [
  { label: 'Program', value: 'M3 Stock Market Foundation Program' },
  { label: 'Format', value: 'Live online classes with recorded modules and mentorship support' },
  { label: 'Duration', value: 'Shared on the enrollment call — cohorts run in structured batches' },
  { label: 'Who it\u2019s for', value: 'Beginners, investors, aspiring traders and working professionals' },
  { label: 'Bonus', value: 'Community access, session recordings, learning resources and Q&A support' },
]

export default function Program() {
  const [panelRef, visible] = useReveal()

  return (
    <section id="program" className="bg-cream py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">The offer</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
              Everything inside the Foundation Program
            </h2>
            <p className="mt-5 max-w-prose font-normal leading-relaxed text-body">
              One structured program covering market fundamentals, technical
              analysis, risk management and trading psychology — with live
              support along the way.
            </p>
            <a
              id="enroll"
              href="#faq"
              className="focus-ring mt-8 inline-block rounded-md border-2 border-amber-500 bg-amber-500 px-7 py-3.5 text-sm font-bold text-ink-900 transition-colors hover:bg-amber-400"
            >
              Reserve your seat
            </a>
          </div>

          <dl
            ref={panelRef}
            className={`divide-y divide-line rounded-xl border-2 border-line bg-white p-2 transition-all duration-700 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[1fr_2fr] gap-4 px-4 py-5 sm:grid-cols-[0.7fr_1.3fr]">
                <dt className="font-mono text-[13px] font-semibold text-amber-700">{s.label}</dt>
                <dd className="text-[15px] font-normal leading-relaxed text-heading/90">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
