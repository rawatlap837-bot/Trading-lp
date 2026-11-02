import React from 'react'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Curriculum', href: '#learn' },
  { label: 'Learning journey', href: '#program' },
  { label: 'Why us', href: '#why' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#17191d] py-8 sm:py-10">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent" />
      <div className="footer-layout mx-auto max-w-[1440px] gap-6 px-4 sm:gap-8 sm:px-6 md:gap-12 md:px-12">
        <div className="flex items-center justify-start gap-3">
          <a href="#top" className="focus-ring flex w-fit min-w-0 items-center gap-3 rounded-xl">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white p-1 shadow-sm" style={{ width: 44, height: 44 }}>
              <img src="/logo.png" alt="HedgeScience logo" className="h-9 w-9 object-contain" style={{ width: 36, height: 36, maxWidth: 36, maxHeight: 36 }} />
            </span>
          <span className="text-xs font-bold tracking-[0.2em] text-white/85 sm:text-sm">HEDGESCIENCE</span>
          </a>
        </div>

        <div className="flex min-w-0 flex-col items-start gap-3 md:items-end">
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-start gap-1 sm:gap-2 md:justify-end">
            {quickLinks.map((link) => <a key={link.href} href={link.href} className="focus-ring rounded-full px-3 py-2 text-xs text-white/60 transition-colors hover:bg-white/[0.06] hover:text-lime sm:text-sm">{link.label}</a>)}
          </nav>
          <div className="flex w-full max-w-xl items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3 sm:px-4">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-lime/25 text-[10px] font-bold text-lime" aria-hidden="true">!</span>
            <p className="text-[11px] leading-relaxed text-muted">Educational content only. Financial markets involve risk. No educational program can guarantee trading or investment profits.</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-[1440px] flex-col items-start justify-between gap-2 border-t border-white/[0.06] px-4 pt-4 text-[10px] text-white/30 sm:flex-row sm:items-center sm:px-6 md:px-12">
        <span>HedgeScience</span><a href="#top" className="transition-colors hover:text-lime">Back to top <span aria-hidden="true">&#8593;</span></a>
      </div>
    </footer>
  )
}
