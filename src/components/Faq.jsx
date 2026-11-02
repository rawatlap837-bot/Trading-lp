import React, { useState } from 'react'
import SplitText, { toWords } from './SplitText.jsx'

const faqs = [
  { q: 'Do I need prior stock market knowledge to join?', a: 'No. The learning journey starts with fundamental concepts and gradually progresses towards advanced topics.' },
  { q: 'Does the course cover both investing and trading?', a: 'Yes. The curriculum covers fundamental analysis, technical analysis, trading concepts, derivatives and risk management.' },
  { q: 'Will I learn futures and options?', a: 'Yes. The advanced curriculum introduces futures, options, option Greeks, derivatives strategies and hedging concepts.' },
  { q: 'Is this course suitable for beginners?', a: 'Absolutely. The course is designed to accommodate learners starting from the basics.' },
  { q: 'Does the course guarantee profits?', a: 'No. Financial markets involve risk, and no educational program can guarantee trading or investment profits. Our focus is knowledge, analytical skills, risk awareness and disciplined decision-making.' },
]

function FaqItem({ item, isOpen, onToggle }) {
  return <div className={'rounded-2xl border px-4 transition-colors sm:px-6 ' + (isOpen ? 'border-lime/50 bg-white/[0.05]' : 'border-white/25 bg-white/[0.03] hover:border-lime/30')}><button onClick={onToggle} aria-expanded={isOpen} className="focus-ring flex w-full items-center justify-between gap-4 rounded-xl py-4 sm:gap-6 sm:py-5 text-left"><span className="text-[15px] font-semibold text-white sm:text-base">{item.q}</span><span className={'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ' + (isOpen ? 'rotate-45 border-lime bg-lime text-ink' : 'border-white/20 text-lime')}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 2v12M2 8h12" /></svg></span></button><div className={`grid transition-all duration-200 ease-out ${isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden"><p className="max-w-xl pr-2 text-sm leading-relaxed text-muted sm:pr-0">{item.a}</p></div></div></div>
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  return <section id="faq" data-page-motion className="border-t border-white/5 bg-[#171a20] py-14 sm:py-16 md:py-24"><div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12"><div className="mx-auto max-w-4xl text-center"><span className="inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime">QUESTIONS</span><SplitText as="h2" words={toWords('FREQUENTLY ASKED QUESTIONS', 3)} className="mt-5 font-display text-2xl leading-tight text-white sm:text-3xl md:text-4xl" /></div><div className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 text-left sm:mt-12">{faqs.map((item, i) => <FaqItem key={item.q} item={item} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />)}</div></div></section>
}
