import React, { useEffect, useState } from 'react'
import { useActiveSection } from '../hooks/useReveal.js'

const links = [
  { href: '#about', id: 'about', label: 'About' },
  { href: '#learn', id: 'learn', label: 'Curriculum' },
  { href: '#program', id: 'program', label: 'Learning Journey' },
  { href: '#why', id: 'why', label: 'Why Us' },
  { href: '#faq', id: 'faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(links.map((l) => l.id))

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-1.5 sm:px-6 sm:py-2 md:px-12">
        <a href="#top" className="focus-ring flex items-center gap-3 rounded-full">
          <img src="/logo.png" alt="HedgeScience" className="h-11 w-auto object-contain sm:h-14" />
          <span className="hidden text-xs font-semibold tracking-[0.2em] text-slate-500 sm:inline">
            HEDGESCIENCE
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative text-sm font-semibold tracking-wide transition-colors hover:text-sky-600 ${active === l.id ? 'text-sky-600' : 'text-slate-700'
                }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full ${active === l.id ? 'w-full' : 'w-0'
                  }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              window.dispatchEvent(new CustomEvent('open-enrollment'))
            }}
            className="focus-ring hidden rounded-full border border-sky-400 bg-sky-300 px-6 py-3 text-sm font-extrabold tracking-wide text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-sky-200 hover:shadow-md md:inline-block"
          >
            ENROL NOW
          </button>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:border-sky-500 hover:bg-sky-50 hover:text-sky-600 lg:hidden"
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
          'overflow-hidden border-t border-slate-200 bg-white transition-[max-height] duration-300 ease-out lg:hidden ' +
          (open ? 'max-h-96' : 'max-h-0 border-t-0')
        }
      >
        <nav id="mobile-navigation" className="flex flex-col gap-1 px-4 py-3 sm:px-6 sm:py-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold tracking-wide hover:bg-sky-50 hover:text-sky-600 ${active === l.id ? 'bg-sky-50 text-sky-600' : 'text-slate-700'
                }`}
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              window.dispatchEvent(new CustomEvent('open-enrollment'))
            }}
            className="focus-ring mt-2 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-sky-400 bg-sky-300 px-6 py-3 text-sm font-extrabold tracking-wide text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-sky-200 hover:shadow-md"
          >
            ENROL NOW
          </button>
        </nav>
      </div>

      <div className="h-[2px] w-full bg-gradient-to-r from-sky-400 via-sky-200 to-transparent" />
    </header>
  )
}
