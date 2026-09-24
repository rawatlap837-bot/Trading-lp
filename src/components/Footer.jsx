import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 text-sm text-body sm:flex-row">
        <span className="font-display text-heading">
          M<span className="text-amber-600">3</span>{' '}
          <span className="font-body font-normal text-body">— Market Mindset Mastery</span>
        </span>
        <p className="text-center text-xs leading-relaxed text-body/70 sm:text-right">
          Educational content only. Stock-market investing carries risk;
          past performance and illustrative examples do not guarantee
          future results.
        </p>
      </div>
    </footer>
  )
}
