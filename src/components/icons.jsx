import React from 'react'

const base = { fill: 'none', stroke: '#9C5F07', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function IconFoundation() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...base}>
      <path d="M3 10 L12 4 L21 10" />
      <path d="M5 10 V19 M19 10 V19 M3 19 H21" />
    </svg>
  )
}

export function IconCandles() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...base}>
      <path d="M6 3v3M6 12v6M18 3v9M18 18v3" />
      <rect x="3.5" y="6" width="5" height="6" rx="0.5" />
      <rect x="15.5" y="12" width="5" height="6" rx="0.5" />
    </svg>
  )
}

export function IconTrend() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...base}>
      <path d="M3 17 L9 11 L13 14 L21 5" />
      <path d="M15 5 H21 V11" />
    </svg>
  )
}

export function IconChecklist() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...base}>
      <path d="M4 6h11M4 12h11M4 18h7" />
      <path d="M18 5l1.5 1.5L22.5 3" />
    </svg>
  )
}

export function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...base}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9.5 12l1.8 1.8L15 9.5" />
    </svg>
  )
}

export function IconBrain() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...base}>
      <path d="M9 4a3 3 0 00-3 3v.3A3 3 0 004 10v1a3 3 0 001.5 2.6A3 3 0 008 18h1V4H9z" />
      <path d="M15 4a3 3 0 013 3v.3A3 3 0 0120 10v1a3 3 0 01-1.5 2.6A3 3 0 0116 18h-1V4h0z" />
    </svg>
  )
}

export function IconPlan() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...base}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  )
}

export function IconTarget() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="#9C5F07" />
    </svg>
  )
}
