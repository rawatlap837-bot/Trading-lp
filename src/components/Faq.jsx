import React, { useState } from 'react'

const faqs = [
  {
    q: 'Do I need prior stock-market knowledge?',
    a: 'No. The program is designed for beginners and starts with the fundamentals — no background in trading or investing required.',
  },
  {
    q: 'Is this course only for traders?',
    a: 'No. It is suitable for anyone who wants to understand the stock market, including long-term investors and aspiring traders.',
  },
  {
    q: 'Will I get guaranteed profits?',
    a: 'No. The stock market involves risk, and no returns are guaranteed. This program is purely for educational purposes.',
  },
  {
    q: 'Will the sessions be live or recorded?',
    a: 'Classes are conducted live, so you can ask questions in real time. Recordings are also provided for review.',
  },
  {
    q: 'Will I receive support after joining?',
    a: 'Yes. You get Q&A sessions, mentorship support, and access to the M3 learner community.',
  },
  {
    q: 'What do I need to attend the course?',
    a: 'A smartphone or laptop, a stable internet connection, and a willingness to learn consistently.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="focus-ring flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-heading sm:text-base">{item.q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="#9C5F07"
          strokeWidth="1.6"
          strokeLinecap="round"
          className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
        >
          <path d="M8 2v12M2 8h12" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-200 ease-out ${isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        style={{ display: 'grid' }}
      >
        <div className="overflow-hidden">
          <p className="max-w-prose text-sm font-normal leading-relaxed text-body">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-cream py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Questions</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
              Before you join
            </h2>
          </div>
          <div className="rounded-xl border-2 border-line bg-white px-5">
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
