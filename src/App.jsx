import React from 'react'
import Navbar from './components/Navbar.jsx'
import Ticker from './components/Ticker.jsx'
import Hero from './components/Hero.jsx'
import Learn from './components/Learn.jsx'
import MidCta from './components/MidCta.jsx'
import Program from './components/Program.jsx'
import WhyM3 from './components/WhyM3.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Ticker />
      <main>
        <Hero />
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
