import React from 'react'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Curriculum', href: '#learn' },
  { label: 'Learning journey', href: '#program' },
  { label: 'Why us', href: '#why' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return <footer className="border-t border-white/10 bg-ink py-10"><div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-12"><a href="#top" className="flex items-center gap-3 rounded-full"><img src="/logo.png" alt="HedgeScience" className="h-10 w-auto object-contain" /><span className="text-xs font-normal tracking-[0.2em] text-muted">HEDGESCIENCE</span></a><nav className="flex flex-wrap justify-center gap-6">{quickLinks.map((l) => <a key={l.href} href={l.href} className="text-sm text-white/70 transition-colors hover:text-lime">{l.label}</a>)}</nav><p className="max-w-sm text-center text-xs leading-relaxed text-muted md:text-right">Educational content only. Financial markets involve risk. No educational program can guarantee trading or investment profits.</p></div></footer>
}
