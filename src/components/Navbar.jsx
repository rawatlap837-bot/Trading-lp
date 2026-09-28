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
    <header className="sticky top-0 z-30 w-full bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3 md:px-12">
        <a href="#top" className="focus-ring flex items-center gap-3 rounded-full">
          <span className="font-display text-2xl tracking-tight text-white">
            M<span className="text-lime">3</span>
          </span>
          <span className="hidden text-xs font-medium tracking-[0.2em] text-muted sm:inline">
            MARKET MINDSET MASTERY
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative text-sm font-medium tracking-wide transition-colors hover:text-lime ${
                active === l.id ? 'text-lime' : 'text-white/80'
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-lime transition-all duration-300 group-hover:w-full ${
                  active === l.id ? 'w-full' : 'w-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#enroll"
            className="focus-ring hidden rounded-full bg-lime px-6 py-3 text-sm font-bold tracking-wide text-ink transition-transform hover:scale-105 md:inline-block"
          >
            ENROLL NOW
          </a>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-lime hover:text-lime lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={
          'overflow-hidden border-t border-white/10 bg-ink transition-[max-height] duration-300 ease-out lg:hidden ' +
          (open ? 'max-h-96' : 'max-h-0 border-t-0')
        }
      >
        <nav className="flex flex-col gap-4 px-6 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium tracking-wide hover:text-lime ${
                active === l.id ? 'text-lime' : 'text-white/80'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#enroll"
            onClick={() => setOpen(false)}
            className="mt-2 w-fit rounded-full bg-lime px-6 py-3 text-sm font-bold tracking-wide text-ink"
          >
            ENROLL NOW
          </a>
        </nav>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-lime/60 via-white/10 to-transparent" />
    </header>
  )
}
