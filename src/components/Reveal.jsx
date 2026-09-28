import { useEffect, useRef, useState } from 'react'

/**
 * Fades + slides its children up into place the first time they scroll
 * into view. One direction, no re-triggering — keeps motion deliberate
 * instead of janky on re-scroll.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={
        'transition-all duration-700 ease-out motion-reduce:transition-none ' +
        (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8') +
        ' ' +
        className
      }
    >
      {children}
    </div>
  )
}
