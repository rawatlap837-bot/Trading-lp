import React, { useState } from 'react'

const reviews = [
  { image: 'review-sambhunath-patra.webp', name: 'Sambhunath Patra' },
  { image: 'review-trilochan-dakua.webp', name: 'Trilochan Dakua' },
  { image: 'review-kalpatru-naik.webp', name: 'Kalpataru Naik' },
  { image: 'review-ananta-dev-maharana.webp', name: 'Ananta Dev Maharana' },
  { image: 'review-amiya-padhy.webp', name: 'Amiya Padhy' },
  { image: 'review-k-tripathy.webp', name: 'K Tripathy' },
  { image: 'review-prativa-manjari-mohanta.webp', name: 'Prativa Manjari Mohanta' },
  { image: 'review-rakesh-das.webp', name: 'Rakesh Das' },
  { image: 'review-rasananda-swain.webp', name: 'Rasananda Swain' },
  { image: 'review-prafulla-rohidas.webp', name: 'Prafulla Rohidas' },
  { image: 'review-lingaraj-behera.webp', name: 'Lingaraj Behera' },
  { image: 'review-viju-bhatia.webp', name: 'Viju Bhatia' },
]

const loopedReviews = [...reviews, ...reviews]

export default function Testimonials() {
  const [paused, setPaused] = useState(false)

  return (
    <section id="testimonials" data-page-motion className="border-t border-white/5 bg-[#171a20] py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div>
          <span className="inline-flex rounded-full border border-lime/30 bg-lime/[.06] px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-lime">STUDENT TESTIMONIALS</span>
          <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">Learners share their experience.</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">Real feedback from students learning with HedgeScience.</p>
        </div>

        <div
          className={`testimonial-viewport mt-8 sm:mt-10 ${paused ? 'is-paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onWheel={(event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
              event.currentTarget.scrollLeft += event.deltaY
            }
          }}
          tabIndex={0}
          role="region"
          aria-label="Student review carousel. Scroll or swipe to browse reviews."
        >
          <div className="testimonial-marquee">
            {[loopedReviews, loopedReviews].map((set, setIndex) => (
              <div className="testimonial-group" key={setIndex} aria-hidden={setIndex === 1}>
                {set.map((review, index) => (
                  <article key={`${review.image}-${index}`} className="testimonial-card flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#22262d]">
                    <div className="flex min-h-[210px] flex-1 items-center justify-center bg-[#292d35] p-2 sm:min-h-[240px] sm:p-3">
                      <img
                        src={`/images/${review.image}`}
                        alt={setIndex === 0 ? `Five-star student review by ${review.name}` : ''}
                        loading={index < 4 ? 'eager' : 'lazy'}
                        className="block h-auto max-h-[360px] w-full rounded-lg object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
                      <span className="truncate text-sm font-semibold text-white">{review.name}</span>
                      <span className="shrink-0 text-xs tracking-[0.12em] text-amber-300" aria-label="5 out of 5 stars">★★★★★</span>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-white/40">Scroll or swipe to browse. Hover or touch to pause.</p>
      </div>
    </section>
  )
}
