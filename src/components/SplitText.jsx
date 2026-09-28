import { Fragment, useEffect, useRef, useState } from 'react'

/**
 * Renders a heading word-by-word, each word masked and sliding up into
 * place with a stagger. Plays once — immediately (`eager`) or on first
 * scroll into view.
 *
 * words: [{ text: 'HELLO' }, { text: 'WORLD', highlight: true }, { text: 'DONE.', break: true }]
 */
export default function SplitText({
  words,
  as: Tag = 'h2',
  className = '',
  eager = false,
  staggerMs = 45,
  startDelayMs = 0,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (eager) {
      const t = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(t)
    }
    const node = ref.current
    if (!node || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
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
      { threshold: 0.3, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [eager])

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
            <span
              className={
                'inline-block transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ' +
                (visible ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0') +
                (w.highlight ? ' text-lime' : '')
              }
              style={{ transitionDelay: visible ? `${startDelayMs + i * staggerMs}ms` : '0ms' }}
            >
              {w.text}
            </span>
          </span>
          {w.break ? <br /> : ' '}
        </Fragment>
      ))}
    </Tag>
  )
}

/** Turn a plain string into SplitText words. `highlightFrom` = word index where lime starts. */
export function toWords(str, highlightFrom = -1, highlightTo = Infinity) {
  return str.split(' ').map((text, i) => ({
    text,
    highlight: highlightFrom >= 0 && i >= highlightFrom && i < highlightTo,
  }))
}
