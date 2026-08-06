import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import SearchOverlay from './SearchOverlay'

const menuLinks = [
  ['Collections', '/collections'],
  ['Lookbook', '/lookbook'],
  ['The House', '/house'],
  ['My Wardrobe', '/account'],
]

const menuSmall = [
  ['How to Measure', '/measurement-guide'],
  ['Track an Order', '/track'],
  ['FAQ', '/faq'],
  ['Contact', '/contact'],
]

// Icons sit in their own tappable circle: dark enough to read at a glance,
// with a gold wash and lift on hover so they feel alive rather than greyed out.
const iconBtn =
  'w-9 h-9 rounded-full flex items-center justify-center text-obsidian-800 ' +
  'hover:text-gold-600 hover:bg-gold-700/10 active:scale-95 ' +
  'transition-all duration-300 ease-signature'

function Badge({ children }) {
  return (
    <span className="absolute top-0.5 right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-gold-600 text-white text-[10px] font-sans font-semibold flex items-center justify-center ring-2 ring-white shadow-sm">
      {children}
    </span>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { items } = useCart()
  const { count: wishCount } = useWishlist()
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

          <div className="flex items-center gap-2 md:gap-3">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className={iconBtn}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>

            <button
              aria-label="Wishlist"
              onClick={() => navigate('/account')}
              className={`relative hidden sm:flex ${iconBtn}`}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill={wishCount > 0 ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
                className={wishCount > 0 ? 'text-gold-600' : ''}
              >
                <path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9Z" />
              </svg>
              {wishCount > 0 && <Badge>{wishCount}</Badge>}
            </button>

            <button aria-label="Account" onClick={() => navigate('/account')} className={iconBtn}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </svg>
            </button>

            <button aria-label="Bag" onClick={() => navigate('/cart')} className={`relative ${iconBtn}`}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
                <path d="M6 8h12l-1 13H7L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {items.length > 0 && <Badge>{items.length}</Badge>}
            </button>
          </div>
        </div>
      </header>

      {/* full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-white overflow-y-auto transition-opacity duration-550 ease-signature ${
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
        {menuOpen && (
          <nav className="flex flex-col items-center justify-center gap-5 mt-10 pb-16">
            {menuLinks.map(([label, to], i) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${i * 60}ms` }}
                className="reveal font-display text-4xl md:text-5xl text-obsidian-900 hover:text-gold-700 transition-colors duration-450"
              >
                {label}
              </Link>
            ))}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10 px-6">
              {menuSmall.map(([label, to], i) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  style={{ animationDelay: `${(menuLinks.length + i) * 60}ms` }}
                  className="reveal text-[11px] tracking-[0.18em] uppercase text-obsidian-400 hover:text-gold-700 transition-colors duration-450"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
