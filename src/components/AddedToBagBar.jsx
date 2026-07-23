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
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span className="text-sm text-white">
              Added to bag — <span className="text-obsidian-200">{shownRef.current?.name}</span>
            </span>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="text-[11px] tracking-[0.16em] uppercase text-gold-400 hover:text-white transition-colors duration-450"
          >
            View
          </button>
        </div>
      </div>
    </div>
  )
}
