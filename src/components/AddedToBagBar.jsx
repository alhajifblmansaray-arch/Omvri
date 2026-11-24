import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function AddedToBagBar() {
  const { lastAdded, clearLastAdded } = useCart()
  const navigate = useNavigate()
  // keep the last name rendered while the bar slides out
  const shownRef = useRef(null)
  if (lastAdded) shownRef.current = lastAdded

  useEffect(() => {
    if (!lastAdded) return
    const t = setTimeout(clearLastAdded, 5000)
    return () => clearTimeout(t)
  }, [lastAdded, clearLastAdded])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[65] transition-transform duration-550 ease-signature ${
        lastAdded ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-obsidian-900 border-t border-gold/40 shadow-[0_-8px_30px_rgba(0,0,0,0.15)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 pt-3 pb-safe md:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
            <span className="text-sm text-white truncate">
              Added to bag · <span className="text-obsidian-200">{shownRef.current?.name}</span>
            </span>
          </div>
          <button
            onClick={() => {
              clearLastAdded()
              navigate('/cart')
            }}
            className="shrink-0 rounded-full border border-white/30 px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase text-white hover:border-white active:bg-white/10 transition-colors duration-450"
          >
            View bag
          </button>
        </div>
      </div>
    </div>
  )
}
