import React, { useState } from 'react'
import SplitText, { toWords } from './SplitText.jsx'

const faqs = [
  { q: 'Do I need prior stock-market knowledge?', a: 'No. The program is designed for beginners and starts with the fundamentals — no background in trading or investing required.' },
  { q: 'Is this course only for traders?', a: 'No. It is suitable for anyone who wants to understand the stock market, including long-term investors and aspiring traders.' },
  { q: 'Will I get guaranteed profits?', a: 'No. The stock market involves risk, and no returns are guaranteed. This program is purely for educational purposes.' },
  { q: 'Will the sessions be live or recorded?', a: 'Classes are conducted live, so you can ask questions in real time. Recordings are also provided for review.' },
  { q: 'Will I receive support after joining?', a: 'Yes. You get Q&A sessions, mentorship support, and access to the M3 learner community.' },
  { q: 'What do I need to attend the course?', a: 'A smartphone or laptop, a stable internet connection, and a willingness to learn consistently.' },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={
        'rounded-2xl border px-6 transition-colors ' +
        (isOpen ? 'border-lime/50 bg-white/[0.05]' : 'border-white/10 bg-white/[0.03] hover:border-lime/30')
      }
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="focus-ring flex w-full items-center justify-between gap-6 rounded-full py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-white sm:text-base">{item.q}</span>
        <span
          className={
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ' +
            (isOpen ? 'rotate-45 border-lime bg-lime text-ink' : 'border-white/20 text-lime')
          }
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M8 2v12M2 8h12" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-200 ease-out ${isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="max-w-xl text-sm leading-relaxed text-muted">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="border-t border-white/5 bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime">
              QUESTIONS
            </span>
            <SplitText
              as="h2"
              words={toWords('BEFORE YOU JOIN', 2)}
              className="mt-5 font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
            />
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
