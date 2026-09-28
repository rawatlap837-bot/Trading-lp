import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const TRAIL_SIZE = 9 // trailing comet particles, NOT including the core dot
const EASE_MIN = 0.35 // ease for the particle closest to the core (fastest response)
const EASE_MAX = 0.55 // ease for the tail-most particle (fastest overall so it doesn't lag far behind)

/**
 * A lime-green custom cursor: a precise CORE dot that always sits exactly
 * on the real pointer position (no easing, no lag — this is what the user
 * clicks with), plus a trailing comet of eased circles behind it for
 * visual flair only. Disables itself entirely on touch devices and when
 * the user has requested reduced motion — the native cursor is left
 * alone there.
 *
 * OFFSET CORRECTION
 * ------------------
 * `position: fixed` elements are supposed to be positioned relative to
 * the viewport, matching `event.clientX/clientY` 1:1. But if ANY ancestor
 * in the DOM tree has a CSS `transform` (or `filter`/`perspective`) on it
 * — which smooth-scroll libraries like Lenis or Locomotive Scroll do
 * constantly, translating a wrapper (or even <body>) to fake scrolling —
 * then fixed descendants get repositioned relative to that transformed
 * ancestor instead. The result is a small, constant "the cursor renders
 * low/left of where I'm actually about to click" offset, and it can even
 * change live as the page scrolls.
 *
 * Rather than hard-coding a fix for one specific library, we measure the
 * real offset directly: a 0x0 `sentinel` div sits at `fixed; top:0;
 * left:0` right alongside the cursor's own elements. If nothing is
 * transformed, its bounding rect is (0, 0). If something IS transformed,
 * the sentinel gets pushed by exactly the same amount our cursor dots do
 * — so its rect tells us precisely how much to subtract from every
 * `clientX/clientY` before drawing. We re-measure it every animation
 * frame so this keeps tracking correctly even during live scroll
 * animation, not just once on mount.
 */
export default function CursorFollower() {
  const coreRef = useRef(null)
  const trailRefs = useRef([])
  const sentinelRef = useRef(null)

  // realTarget = the real, current pointer position (ground truth, raw clientX/Y)
  const realTarget = useRef({ x: -100, y: -100 })
  // offset = how far a `fixed` element's (0,0) has been pushed by an
  // ancestor transform, measured live via the sentinel
  const offset = useRef({ x: 0, y: 0 })
  // trail = comet particles chasing the (offset-corrected) core, decorative only
  const trail = useRef(Array.from({ length: TRAIL_SIZE }, () => ({ x: -100, y: -100 })))
  // per-particle ease, ramping up from EASE_MIN (near core) to EASE_MAX (tail) so the
  // whole chain snaps into place quickly instead of compounding lag toward the tail
  const eases = useRef(
    Array.from({ length: TRAIL_SIZE }, (_, i) =>
      TRAIL_SIZE === 1 ? EASE_MIN : EASE_MIN + (i / (TRAIL_SIZE - 1)) * (EASE_MAX - EASE_MIN)
    )
  )
  const raf = useRef(null)

  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    function onMove(e) {
      realTarget.current.x = e.clientX
      realTarget.current.y = e.clientY
      setVisible(true)

      // Move the core dot immediately, synchronously, on every mousemove —
      // not inside the rAF loop — so it never has a frame of lag behind
      // the real cursor. Corrected by the latest measured offset so it
      // lands exactly on the true click point even under a transformed
      // ancestor. This dot is what the user is actually aiming with.
      const core = coreRef.current
      if (core) {
        const dx = e.clientX - offset.current.x
        const dy = e.clientY - offset.current.y
        core.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`
      }
    }
    function onOver(e) {
      const el = e.target.closest && e.target.closest('a, button, input, textarea, select, [data-cursor-hover]')
      setHovering(Boolean(el))
    }
    function onLeaveWindow() {
      setVisible(false)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeaveWindow)

    function tick() {
      // Re-measure the live offset every frame. Cheap (one layout read on
      // a detached, dependency-free fixed element) and necessary because
      // scroll-linked transforms change continuously, not just once.
      if (sentinelRef.current) {
        const rect = sentinelRef.current.getBoundingClientRect()
        offset.current.x = rect.left
        offset.current.y = rect.top
      }

      // The comet chain chases the offset-corrected real target, not the
      // (already-lagging) previous particle's position stacking error on
      // error — each particle eases toward the true pointer, just with
      // more delay the further back it is in the chain. Each particle now
      // uses its own (higher) ease value so the tail catches up fast too.
      let leadX = realTarget.current.x - offset.current.x
      let leadY = realTarget.current.y - offset.current.y

      trail.current.forEach((point, i) => {
        const ease = eases.current[i]
        point.x += (leadX - point.x) * ease
        point.y += (leadY - point.y) * ease
        const el = trailRefs.current[i]
        if (el) {
          // Shrinks gradually toward the tail for a tapering comet shape.
          const scale = Math.max(1 - (i + 1) * (0.8 / (TRAIL_SIZE + 1)), 0.15)
          el.style.transform =
            `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${scale})`
        }
        leadX = point.x
        leadY = point.y
      })

      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeaveWindow)
      cancelAnimationFrame(raf.current)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!enabled) return null

  // Portal straight to <body>. Combined with the live offset correction
  // above, this keeps the cursor accurate even if this component happens
  // to mount deep inside some transformed wrapper — and the offset math
  // still self-corrects even in the rarer case where <body> itself ends
  // up being the transformed element.
  return createPortal(
    <>
      {/* Invisible, dependency-free probe used purely to measure how far
          `fixed; top:0; left:0` has been pushed by any ancestor transform. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, pointerEvents: 'none' }}
      />

      {/* Trailing comet particles — decorative only, rendered behind the core */}
      {trail.current.map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          aria-hidden="true"
          className={
            'pointer-events-none fixed left-0 top-0 z-[999] h-10 w-10 rounded-full bg-lime ' +
            'transition-opacity duration-150 ease-out ' +
            (hovering ? 'bg-lime/70 ' : '')
          }
          style={{
            opacity: visible ? Math.max(1 - (i + 1) * (0.9 / (TRAIL_SIZE + 1)), 0.05) : 0,
          }}
        />
      ))}

      {/* Core dot — always exactly on the real, offset-corrected pointer
          position, no easing. This is what the user is actually clicking
          with. Rendered last (on top) so it's never obscured by the trail. */}
      <div
        ref={coreRef}
        aria-hidden="true"
        className={
          'pointer-events-none fixed left-0 top-0 z-[1000] h-8 w-8 rounded-full bg-lime ' +
          (hovering ? 'bg-lime/90 scale-125 ' : '') +
          'transition-[background-color,transform] duration-150 ease-out'
        }
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>,
    document.body
  )
}