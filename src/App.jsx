import React from 'react'
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

const tickerItems = [
  'KNOWLEDGE BEFORE EXECUTION',
  'ANALYSIS BEFORE DECISIONS',
  'RISK BEFORE REWARD',
  'PROCESS BEFORE PROFITS',
  'DISCIPLINE BEFORE EMOTIONS',
]

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-ink">
      <Navbar />
      <Hero />
      <Marquee items={tickerItems} />
      <main>
        <section id="about" className="border-t border-white/5 bg-[#20242b] py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12">
            <span className="inline-block rounded-full border border-lime/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-lime">ABOUT HEDGESCIENCE</span>
            <h2 className="mt-5 max-w-4xl font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">More than trading. <span className="text-lime">It's about understanding the market.</span></h2>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">HedgeScience is a stock market education initiative dedicated to building strong financial knowledge and practical market understanding. We believe successful market participation begins with education, not speculation. Our structured learning journey spans market fundamentals, technical and fundamental analysis, trading psychology, risk management and strategic thinking—from your first concepts to advanced market strategies.</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">Our goal is simple: help you become an informed, independent and disciplined market participant.</p>
          </div>
        </section>
        <Learn />
        <MidCta />
        <Program />
        <WhyHedgeScience />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
