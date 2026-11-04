import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Learn from './components/Learn.jsx'
import MidCta from './components/MidCta.jsx'
import Program from './components/Program.jsx'
import WhyHedgeScience from './components/WhyM3.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import Enrollment from './components/Enrollment.jsx'
import Testimonials from './components/Testimonials.jsx'

const tickerItems = [
  'KNOWLEDGE BEFORE EXECUTION',
  'ANALYSIS BEFORE DECISIONS',
  'RISK BEFORE REWARD',
  'PROCESS BEFORE PROFITS',
  'DISCIPLINE BEFORE EMOTIONS',
]

export default function App() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-page-motion]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('page-motion-visible'))
      return
    }

    document.documentElement.classList.add('page-motion-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('page-motion-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' })

    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('page-motion-ready')
    }
  }, [])

  return (
    <div id="top" className="min-h-screen bg-ink">
      <Navbar />
      <Hero />
      <Marquee items={tickerItems} />
      <main>
        <section id="about" data-page-motion className="relative overflow-hidden border-t border-white/5 bg-[#20242b] py-14 sm:py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 md:px-12 md:text-left">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/[0.06] px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-lime"><span className="h-1.5 w-1.5 rounded-full bg-lime" />ABOUT HEDGESCIENCE</span>
              <h2 className="mx-auto mt-6 max-w-4xl font-display text-2xl leading-[1.15] text-white sm:text-3xl md:mx-0 md:text-4xl">More than trading. <span className="text-lime">It's about understanding the market.</span></h2>
            </div>
            <div className="mx-auto mt-7 max-w-3xl border-t border-white/10 pt-6 sm:mt-9 sm:pt-8 md:mx-0">
              <p className="copy-emphasis text-sm leading-7 text-white/65 sm:text-base">HedgeScience is a stock market education initiative dedicated to building <strong className="important-line">strong financial knowledge</strong> and practical market understanding. We believe successful market participation begins with <strong className="important-line">education, not speculation.</strong></p>
              <p className="copy-emphasis mt-4 text-sm leading-7 text-white/65 sm:text-base">Our structured learning journey spans market fundamentals, technical and fundamental analysis, trading psychology, risk management and strategic thinking, from your first concepts to advanced market strategies.</p>
              <p className="copy-emphasis mt-6 flex items-start justify-center gap-3 text-sm font-medium leading-relaxed text-white md:justify-start"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" /><strong>Become an informed, independent and disciplined market participant.</strong></p>
            </div>
          </div>
        </section>
        <Learn />
        <MidCta />
        <Program />
        <WhyHedgeScience />
        <Testimonials />
        <Faq />
        <FinalCta />
        <Enrollment />
      </main>
      <Footer />
    </div>
  )
}
