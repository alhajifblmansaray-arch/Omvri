import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products, accessories } from '../data/products'
import { formatMoney } from '../lib/currency'

const pageLinks = [
  { label: 'Build Your Own Suit', to: '/configure' },
  { label: 'How to Measure', to: '/measurement-guide' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'The House', to: '/house' },
  { label: 'Accessories', to: '/accessories' },
  { label: 'Track an Order', to: '/track' },
  { label: 'Contact the Atelier', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
]

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQ('')
      // focus after the overlay mounts
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  const term = q.trim().toLowerCase()
  const matchedProducts = term
    ? products.filter((p) =>
        [p.name, p.fabric, p.mill, p.category].join(' ').toLowerCase().includes(term),
      )
    : products.slice(0, 3)
  const matchedAccessories = term
    ? accessories.filter((a) => [a.name, a.material].join(' ').toLowerCase().includes(term))
    : []
  const matchedPages = term
    ? pageLinks.filter((l) => l.label.toLowerCase().includes(term))
    : pageLinks.slice(0, 4)

  return (
    <div className="fixed inset-0 z-[60] bg-white/97 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="max-w-[760px] mx-auto px-6 pt-28 pb-20" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4 border-b border-obsidian-900 pb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-obsidian-400 shrink-0">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search suits, cloths, pages…"
            aria-label="Search"
            className="flex-1 bg-transparent outline-none font-display text-2xl text-obsidian-900 placeholder-obsidian-300"
          />
          <button onClick={onClose} aria-label="Close search" className="text-obsidian-400 hover:text-obsidian-900 text-2xl leading-none">
            ×
          </button>
        </div>

        {matchedProducts.length > 0 && (
          <div className="mt-10">
            <div className="text-[10px] tracking-[0.16em] uppercase text-obsidian-400 mb-4">Suits</div>
            <div className="space-y-1">
              {matchedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/suits/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2 -mx-2 hover:bg-ivory transition-colors duration-300 group"
                >
                  <div className="w-12 h-14 bg-ivory overflow-hidden shrink-0">
                    <img src={p.hero} alt={p.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1">
                    <div className="text-obsidian-900 group-hover:text-gold-700 transition-colors duration-300">{p.name}</div>
                    <div className="text-xs text-obsidian-400">{p.fabric}</div>
                  </div>
                  <div className="text-sm text-obsidian-400">{formatMoney(p.price)}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {matchedAccessories.length > 0 && (
          <div className="mt-10">
            <div className="text-[10px] tracking-[0.16em] uppercase text-obsidian-400 mb-4">Accessories</div>
            <div className="space-y-1">
              {matchedAccessories.map((a) => (
                <Link key={a.id} to="/accessories" onClick={onClose} className="flex items-center gap-4 p-2 -mx-2 hover:bg-ivory transition-colors duration-300">
                  <div className="w-12 h-12 bg-ivory overflow-hidden shrink-0">
                    <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-obsidian-900">{a.name}</div>
                  <div className="text-sm text-obsidian-400">{formatMoney(a.price)}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <div className="text-[10px] tracking-[0.16em] uppercase text-obsidian-400 mb-4">
            {term ? 'Pages' : 'Quick links'}
          </div>
          <div className="flex flex-wrap gap-2">
            {matchedPages.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={onClose}
                className="px-4 py-2 border border-obsidian-900/15 text-sm text-obsidian-900 hover:border-gold-700 hover:text-gold-700 transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {term && matchedProducts.length === 0 && matchedAccessories.length === 0 && matchedPages.length === 0 && (
          <p className="mt-12 text-obsidian-400 text-sm">
            Nothing found for “{q}”. Try a cloth, a suit name, or “measure”.
          </p>
        )}
      </div>
    </div>
  )
}
