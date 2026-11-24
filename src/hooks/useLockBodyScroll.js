import { useEffect } from 'react'

// While a menu, panel or popup is open, stop the page behind it from scrolling.
// On phones the page underneath otherwise scrolls along with your finger.
// Counted, so two overlays open at once don't unlock each other.
let locks = 0

export default function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return
    locks += 1
    document.documentElement.style.overflow = 'hidden'
    return () => {
      locks -= 1
      if (locks === 0) document.documentElement.style.overflow = ''
    }
  }, [active])
}
