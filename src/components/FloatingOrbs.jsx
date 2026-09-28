const orbs = [
  { size: 18, top: '6%', left: '66%', delay: 0, duration: 6 },
  { size: 11, top: '14%', left: '90%', delay: 0.6, duration: 5, hideOnMobile: true },
  { size: 26, top: '34%', left: '2%', delay: 1.1, duration: 7 },
  { size: 9, top: '50%', left: '88%', delay: 0.3, duration: 4.5, hideOnMobile: true },
  { size: 16, top: '66%', left: '12%', delay: 0.9, duration: 6.5 },
  { size: 22, top: '80%', left: '58%', delay: 1.4, duration: 5.5 },
  { size: 8, top: '10%', left: '38%', delay: 0.2, duration: 4, hideOnMobile: true },
  { size: 13, top: '86%', left: '82%', delay: 0.7, duration: 6, hideOnMobile: true },
  { size: 15, top: '46%', left: '20%', delay: 1.7, duration: 5 },
]

export default function FloatingOrbs({ className = '' }) {
  return (
    <div aria-hidden="true" className={'pointer-events-none absolute inset-0 overflow-hidden ' + className}>
      {orbs.map((o, i) => (
        <span
          key={i}
          className={
            'absolute rounded-full animate-floatSlow motion-reduce:animate-none ' +
            (o.hideOnMobile ? 'hidden sm:block' : '')
          }
          style={{
            // scales between ~65% and 100% of the base size depending on viewport width
            width: `clamp(${o.size * 0.65}px, ${o.size * 0.5}px + 1.5vw, ${o.size}px)`,
            height: `clamp(${o.size * 0.65}px, ${o.size * 0.5}px + 1.5vw, ${o.size}px)`,
            top: o.top,
            left: o.left,
            animationDelay: `${o.delay}s`,
            animationDuration: `${o.duration}s`,
            background: 'radial-gradient(circle at 32% 28%, #eaffb0, #cbfe1c 45%, #6f9e0c 100%)',
            boxShadow: '0 0 12px rgba(203,254,28,0.55)',
          }}
        />
      ))}
    </div>
  )
}