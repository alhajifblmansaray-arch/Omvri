import { useEffect, useState } from 'react'

// True on a mouse or trackpad, false on phones and tablets. Lets a component
// swap hover-driven behaviour for a touch-friendly one.
const query = '(hover: hover) and (pointer: fine)'

export default function useCanHover() {
  const [canHover, setCanHover] = useState(
    () => typeof window === 'undefined' || window.matchMedia?.(query).matches !== false,
  )

  useEffect(() => {
    const mq = window.matchMedia?.(query)
    if (!mq) return
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  return canHover
}
