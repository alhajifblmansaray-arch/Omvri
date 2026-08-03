import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { formatMoney, currencyCode } from '../lib/currency'
import WishlistButton from './WishlistButton'

// Hovering a card walks slowly through that suit's gallery on its own and
// crossfades between shots. Leaving the card settles it back on the cover.
const HOLD_MS = 1600

export default function CollectionCard({ product, index = 0 }) {
  const shots = product.gallery.map((g) => g.src)
  const [i, setI] = useState(0)
  const [hover, setHover] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!hover || shots.length < 2) return
    timer.current = setInterval(() => {
      setI((p) => (p + 1) % shots.length)
    }, HOLD_MS)
    return () => clearInterval(timer.current)
  }, [hover, shots.length])

  const enter = () => setHover(true)
  const leave = () => {
    setHover(false)
    setI(0)
  }

  return (
    <Link
      to={`/suits/${product.slug}`}
      className="reveal group block"
      style={{ animationDelay: `${index * 90}ms` }}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-ivory border border-obsidian-900/5">
        {shots.map((src, n) => (
          <img
            key={src}
            src={src}
            alt={n === 0 ? product.name : `${product.name}, view ${n + 1}`}
            loading={index > 1 && n > 0 ? 'lazy' : undefined}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-signature ${
              n === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* quiet position bars, only while the card is cycling */}
        {shots.length > 1 && (
          <div
            className={`absolute bottom-3 inset-x-0 flex justify-center gap-1.5 transition-opacity duration-500 ${
              hover ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {shots.map((s, n) => (
              <span
                key={s}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  n === i ? 'w-6 bg-white' : 'w-3 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        <WishlistButton productId={product.id} className="absolute top-4 right-4 bg-white/85 z-10" />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl text-obsidian-900 group-hover:text-gold-700 transition-colors duration-450">
          {product.name}
        </h3>
        <span className="text-sm text-obsidian-900 shrink-0">
          {formatMoney(product.price)}{' '}
          <span className="text-[10px] text-obsidian-500 uppercase">{currencyCode()}</span>
        </span>
      </div>
      <div className="text-sm text-obsidian-500 mt-1">{product.fabric}</div>
    </Link>
  )
}
