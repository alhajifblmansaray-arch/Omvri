import { useEffect, useRef, useState } from 'react'

// Fires once when an element first scrolls into view. Used for reveals that
// should play on arrival rather than on mount, so nothing animates offscreen.
export default function useInView({ threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // respect a reduced motion preference by showing the content immediately
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return [ref, inView]
}
