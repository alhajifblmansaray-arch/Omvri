import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { formatMoney } from '../lib/currency'
import useLockBodyScroll from '../hooks/useLockBodyScroll'

const pageLinks = [
  { label: 'The Featured Edit', to: '/featured' },
  { label: 'How to Measure', to: '/measurement-guide' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'The House', to: '/house' },
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

  useLockBodyScroll(open)

  if (!open) return null

  const term = q.trim().toLowerCase()
  const matchedProducts = term
    ? products.filter((p) =>
        [p.name, p.fabric, p.mill, p.category].join(' ').toLowerCase().includes(term),
      )
    : products.slice(0, 3)
  const matchedPages = term
    ? pageLinks.filter((l) => l.label.toLowerCase().includes(term))
    : pageLinks.slice(0, 4)

  return (
    <div className="fixed inset-0 z-[60] bg-white/[0.97] backdrop-blur-sm overflow-y-auto overscroll-contain" onClick={onClose}>
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 pt-6 md:pt-28 pb-20" onClick={(e) => e.stopPropagation()}>
        <div className="surface flex items-center gap-3 sm:gap-4 pl-5 pr-2 sm:px-6 py-2.5 sm:py-4">
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
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent outline-none font-display text-xl sm:text-2xl text-obsidian-900 placeholder-obsidian-300 [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-obsidian-400 hover:text-obsidian-900 active:bg-obsidian-900/[0.06]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {matchedProducts.length > 0 && (
          <div className="mt-10">
            <div className="text-[10px] tracking-[0.16em] uppercase text-obsidian-400 mb-4">Suits</div>
            <div className="space-y-2">
              {matchedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/suits/${p.slug}`}
                  onClick={onClose}
                  className="surface-soft surface-hover flex items-center gap-4 p-3 group"
                >
                  <div className="w-12 h-14 bg-ivory overflow-hidden shrink-0 rounded-lg">
                    <img src={p.hero} alt={p.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-obsidian-900 group-hover:text-obsidian-500 transition-colors duration-300 truncate">{p.name}</div>
                    <div className="text-xs text-obsidian-400 truncate">{p.fabric}</div>
                  </div>
                  <div className="text-sm text-obsidian-400 shrink-0 pr-1">{formatMoney(p.price)}</div>
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
                className="surface-soft surface-hover px-5 py-2.5 rounded-full text-sm text-obsidian-900"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {term && matchedProducts.length === 0 && matchedPages.length === 0 && (
          <p className="mt-12 text-obsidian-400 text-sm">
            Nothing found for “{q}”. Try a cloth, a suit name, or “measure”.
          </p>
        )}
      </div>
    </div>
  )
}
