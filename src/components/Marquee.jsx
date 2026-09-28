/**
 * A seamless scrolling ticker strip. Pauses on hover so it's readable,
 * and duplicates its items once so the loop has no visible seam.
 */
export default function Marquee({ items, className = '' }) {
  const loop = [...items, ...items]

  return (
    <div className={'group relative overflow-hidden border-y border-white/10 bg-ink py-4 ' + className}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-32" />
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center gap-10">
            <span className="font-display text-sm tracking-[0.25em] text-white/70 sm:text-base">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}
