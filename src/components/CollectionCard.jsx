import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { formatMoney, currencyCode } from '../lib/currency'
import WishlistButton from './WishlistButton'
import Stars, { ratingFor } from './Stars'
import useCanHover from '../hooks/useCanHover'

// Hovering a card walks slowly through that suit's gallery on its own and
// crossfades between shots. Leaving the card settles it back on the cover.
const HOLD_MS = 1600

export default function CollectionCard({ product, index = 0 }) {
  const shots = product.gallery.map((g) => g.src)
  const rating = ratingFor(product.id)
  const canHover = useCanHover()
  const [i, setI] = useState(0)
  const [hover, setHover] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!hover || !canHover || shots.length < 2) return
    timer.current = setInterval(() => {
      setI((p) => (p + 1) % shots.length)
    }, HOLD_MS)
    return () => clearInterval(timer.current)
  }, [hover, canHover, shots.length])

  const enter = () => canHover && setHover(true)
  const leave = () => {
    setHover(false)
    setI(0)
  }

  // on touch screens the gallery is a sideways swipe; track which shot is showing
  const onSwipe = (e) => {
    const el = e.currentTarget
    const n = Math.round(el.scrollLeft / el.clientWidth)
    if (n !== i) setI(n)
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
      <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-ivory card-raise">
        {canHover ? (
          shots.map((src, n) => (
            <img
              key={src}
              src={src}
              alt={n === 0 ? product.name : `${product.name}, view ${n + 1}`}
              loading={index > 1 && n > 0 ? 'lazy' : undefined}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-signature ${
                n === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))
        ) : (
          <div className="snap-row absolute inset-0" style={{ scrollPaddingInline: 0 }} onScroll={onSwipe}>
            {shots.map((src, n) => (
              <img
                key={src}
                src={src}
                alt={n === 0 ? product.name : `${product.name}, view ${n + 1}`}
                loading={n > 0 || index > 1 ? 'lazy' : undefined}
                draggable="false"
                className="w-full h-full object-cover object-top select-none"
              />
            ))}
          </div>
        )}

        {/* quiet position bars: while cycling on hover, always on touch */}
        {shots.length > 1 && (
          <div
            className={`pointer-events-none absolute bottom-3 inset-x-0 flex justify-center gap-1.5 transition-opacity duration-500 drop-shadow ${
              hover || !canHover ? 'opacity-100' : 'opacity-0'
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

        <WishlistButton productId={product.id} className="absolute top-3 right-3 md:top-4 md:right-4 !w-11 !h-11 md:!w-9 md:!h-9 bg-white/85 z-10" />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl text-obsidian-900 group-hover:text-obsidian-500 transition-colors duration-450 min-w-0">
          {product.name}
        </h3>
        <span className="text-sm text-obsidian-900 shrink-0">
          {formatMoney(product.price)}{' '}
          <span className="text-[10px] text-obsidian-500 uppercase">{currencyCode()}</span>
        </span>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-sm text-obsidian-500">{product.fabric}</span>
        {rating && (
          <span className="flex items-center gap-1.5 shrink-0">
            <Stars n={Math.round(rating.avg)} size={11} />
            <span className="text-xs text-obsidian-500">({rating.count})</span>
          </span>
        )}
      </div>
    </Link>
  )
}
