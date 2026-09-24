import React from 'react'
import { useReveal } from '../hooks/useReveal.js'

const WHY_IMAGE =
  'https://images.unsplash.com/photo-1744782211816-c5224434614f?auto=format&fit=crop&w=1000&q=80'

export default function WhyM3() {
  const [textRef, textVisible] = useReveal()
  const [imgRef, imgVisible] = useReveal()

  return (
    <section id="why" className="bg-sand/60 py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div
            ref={textRef}
            className={`transition-all duration-700 ${
              textVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <span className="eyebrow">Why M3</span>
            <p className="mt-5 font-display text-2xl font-extrabold leading-snug tracking-tight text-heading sm:text-3xl">
              We don't teach shortcuts. We teach the process — how the market
              actually works, how to manage risk, and how to think clearly
              when money is on the line.
            </p>
            <p className="mt-6 max-w-prose font-normal leading-relaxed text-body">
              Market Mindset Mastery exists because most beginners lose money
              chasing tips, not because they lack intelligence. M3 focuses on
              education, risk awareness and the discipline needed to make
              better decisions — session after session.
            </p>
          </div>

          <div
            ref={imgRef}
            className={`overflow-hidden rounded-xl border-2 border-line bg-white transition-all duration-700 ${
              imgVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <img
              src={WHY_IMAGE}
              alt="Candlestick charts displayed across multiple trading screens"
              className="h-72 w-full object-cover transition-transform duration-500 hover:scale-[1.03] sm:h-80"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
