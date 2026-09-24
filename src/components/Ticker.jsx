import React from 'react'

const items = [
  { label: 'LIVE CLASSES', up: true },
  { label: 'RISK MANAGEMENT', up: true },
  { label: 'TECHNICAL ANALYSIS', up: false },
  { label: 'TRADING PSYCHOLOGY', up: true },
  { label: 'MENTORSHIP SUPPORT', up: true },
  { label: 'COMMUNITY ACCESS', up: false },
  { label: 'BEGINNER FRIENDLY', up: true },
]

function TickerRow() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2 px-6 py-2.5 font-mono text-xs font-medium text-body/80">
          <svg width="10" height="10" viewBox="0 0 10 10" className={item.up ? 'text-rise' : 'text-fall'}>
            {item.up ? (
              <path d="M5 1 L9 8 L1 8 Z" fill="currentColor" />
            ) : (
              <path d="M5 9 L9 2 L1 2 Z" fill="currentColor" />
            )}
          </svg>
          {item.label}
          <span className="text-line">•</span>
        </span>
      ))}
    </div>
  )
}

export default function Ticker() {
  return (
    <div className="overflow-hidden border-b border-line bg-white" aria-hidden="true">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <TickerRow />
        <TickerRow />
      </div>
    </div>
  )
}
