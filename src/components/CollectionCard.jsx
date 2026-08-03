import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatMoney, currencyCode } from '../lib/currency'
import WishlistButton from './WishlistButton'

// Card that previews the whole gallery in place. Hovering reveals two faint
// glass panels on either side; clicking them steps through the shots without
// leaving the grid. Keeps the link intact for anything outside those zones.
export default function CollectionCard({ product, index = 0 }) {
  const shots = product.gallery.map((g) => g.src)
  const [i, setI] = useState(0)
  const [hover, setHover] = useState(false)

  const step = (e, delta) => {
    e.preventDefault()
    e.stopPropagation()
    setI((p) => (p + delta + shots.length) % shots.length)
  }

  return (
    <Link
      to={`/suits/${product.slug}`}
      className="reveal group block"
      style={{ animationDelay: `${index * 90}ms` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setI(0)
      }}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-ivory border border-obsidian-900/5">
        {shots.map((src, n) => (
          <img
            key={src}
            src={src}
            alt={n === 0 ? product.name : `${product.name}, view ${n + 1}`}
            loading={index > 1 && n > 0 ? 'lazy' : undefined}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-signature ${
              n === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* click zones: faint glass so it is clear where to press */}
        {shots.length > 1 && (
          <>
            <button
              aria-label="Previous photo"
              onClick={(e) => step(e, -1)}
              className={`absolute left-0 top-0 bottom-0 w-[22%] flex items-center justify-start pl-4 transition-opacity duration-300 ${
                hover ? 'opacity-100' : 'opacity-0'
              } bg-gradient-to-r from-white/25 to-transparent backdrop-blur-[2px] hover:from-white/40`}
            >
              <span className="w-8 h-8 rounded-full bg-white/70 border border-white/60 flex items-center justify-center text-obsidian-900 shadow-sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </span>
            </button>
            <button
              aria-label="Next photo"
              onClick={(e) => step(e, 1)}
              className={`absolute right-0 top-0 bottom-0 w-[22%] flex items-center justify-end pr-4 transition-opacity duration-300 ${
                hover ? 'opacity-100' : 'opacity-0'
              } bg-gradient-to-l from-white/25 to-transparent backdrop-blur-[2px] hover:from-white/40`}
            >
              <span className="w-8 h-8 rounded-full bg-white/70 border border-white/60 flex items-center justify-center text-obsidian-900 shadow-sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            {/* position bars */}
            <div
              className={`absolute bottom-3 inset-x-0 flex justify-center gap-1.5 transition-opacity duration-300 ${
                hover ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {shots.map((s, n) => (
                <span
                  key={s}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    n === i ? 'w-6 bg-white' : 'w-3 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
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
