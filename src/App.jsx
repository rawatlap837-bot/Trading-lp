import React from 'react'
import CursorFollower from './components/CursorFollower.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Learn from './components/Learn.jsx'
import MidCta from './components/MidCta.jsx'
import Program from './components/Program.jsx'
import WhyM3 from './components/WhyM3.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'

const tickerItems = [
  'LIVE CLASSES',
  'RISK MANAGEMENT',
  'TECHNICAL ANALYSIS',
  'TRADING PSYCHOLOGY',
  'MENTORSHIP SUPPORT',
  'COMMUNITY ACCESS',
  'BEGINNER FRIENDLY',
]

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-ink">
      <CursorFollower />
      <Navbar />
      <Hero />
      <Marquee items={tickerItems} />
      <main>
        <Learn />
        <MidCta />
        <Program />
        <WhyM3 />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
