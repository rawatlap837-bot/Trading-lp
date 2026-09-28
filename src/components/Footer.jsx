import React from 'react'

const quickLinks = [
  { label: 'Program', href: '#program' },
  { label: "What you'll learn", href: '#learn' },
  { label: 'Why M3', href: '#why' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-10">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-12">
        <a href="#top" className="font-display text-2xl text-white">
          M<span className="text-lime">3</span>{' '}
          <span className="text-xs font-normal tracking-[0.2em] text-muted">MARKET MINDSET MASTERY</span>
        </a>
        <nav className="flex flex-wrap justify-center gap-6">
          {quickLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/70 transition-colors hover:text-lime">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="max-w-sm text-center text-xs leading-relaxed text-muted md:text-right">
          Educational content only. Stock-market investing carries risk; past performance and
          illustrative examples do not guarantee future results.
        </p>
      </div>
    </footer>
  )
}
