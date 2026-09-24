import React, { useState } from 'react'
import { useActiveSection } from '../hooks/useReveal.js'

const links = [
  { href: '#program', id: 'program', label: 'Program' },
  { href: '#learn', id: 'learn', label: "What you'll learn" },
  { href: '#why', id: 'why', label: 'Why M3' },
  { href: '#faq', id: 'faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(links.map((l) => l.id))

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 focus-ring rounded">
          <span className="font-display text-lg font-extrabold tracking-tight text-heading">
            M<span className="text-amber-600">3</span>
          </span>
          <span className="hidden text-sm text-body/80 sm:inline">Market Mindset Mastery</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`focus-ring rounded text-sm transition-colors ${
                active === l.id ? 'font-semibold text-amber-700' : 'text-body hover:text-heading'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#enroll"
          className="focus-ring hidden rounded-md border-2 border-amber-500 bg-amber-500 px-4 py-2 text-sm font-bold text-ink-900 transition-colors hover:bg-amber-400 md:inline-block"
        >
          Enroll now
        </a>

        <button
          className="focus-ring rounded p-2 text-heading md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-cream px-6 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`focus-ring rounded text-base ${
                  active === l.id ? 'font-semibold text-amber-700' : 'text-body hover:text-heading'
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#enroll"
              onClick={() => setOpen(false)}
              className="focus-ring mt-2 rounded-md border-2 border-amber-500 bg-amber-500 px-4 py-3 text-center text-sm font-bold text-ink-900"
            >
              Enroll now
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
