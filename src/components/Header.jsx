import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { items } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-450 ease-signature ${
          scrolled ? 'bg-white/90 backdrop-blur-md border-b border-obsidian-900/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px] w-6 group"
          >
            <span className="h-px bg-obsidian-900 w-full transition-all duration-450 group-hover:bg-gold" />
            <span className="h-px bg-obsidian-900 w-4 transition-all duration-450 group-hover:bg-gold group-hover:w-full" />
          </button>

          <Link
            to="/"
            className="font-display text-2xl md:text-3xl tracking-[0.3em] uppercase text-obsidian-900 absolute left-1/2 -translate-x-1/2"
          >
            Omvri
          </Link>

          <div className="flex items-center gap-5 md:gap-7">
            <button
              onClick={onBook}
              className="hidden md:inline text-[11px] tracking-[0.18em] uppercase text-obsidian-400 hover:text-gold-700 transition-colors duration-450"
            >
              Book a Fitting
            </button>
            <button aria-label="Account" className="text-obsidian-400 hover:text-gold-700 transition-colors duration-450">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </svg>
            </button>
            <button
              aria-label="Bag"
              onClick={() => navigate('/cart')}
              className="relative text-obsidian-400 hover:text-gold-700 transition-colors duration-450"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 8h12l-1 13H7L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold-700 text-white text-[9px] flex items-center justify-center font-sans font-medium">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-white transition-opacity duration-550 ease-signature ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 flex items-center justify-end">
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="text-obsidian-400 hover:text-gold-700 transition-colors duration-450 text-2xl leading-none"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-6 mt-16">
          {[
            ['Collections', '/collections'],
            ['Build Your Own', '/configure'],
            ['The House', '/#about'],
            ['Bag', '/cart'],
          ].map(([label, to], i) => (
            <Link
              key={label}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${i * 70}ms` }}
              className={`reveal font-display text-4xl md:text-6xl text-obsidian-900 hover:text-gold-700 transition-colors duration-450`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
