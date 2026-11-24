import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import SearchOverlay from './SearchOverlay'
import useLockBodyScroll from '../hooks/useLockBodyScroll'

const menuLinks = [
  ['Featured', '/featured'],
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
// with a wash on hover so they feel alive rather than greyed out. 44px on
// phones, the size Apple and Google both recommend for a fingertip.
const iconBtn =
  'w-11 h-11 md:w-10 md:h-10 rounded-full flex items-center justify-center text-obsidian-800 ' +
  'hover:text-obsidian-900 hover:bg-obsidian-900/[0.06] active:scale-95 active:bg-obsidian-900/[0.06] ' +
  'transition-all duration-300 ease-signature'

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

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

  useLockBodyScroll(menuOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-450 ease-signature ${
          scrolled ? 'bg-white/95 backdrop-blur-md header-raise' : 'bg-transparent'
        }`}
      >
        {/* phones: menu + search on the left, account + bag on the right, so the
            wordmark sits dead centre with equal room either side */}
        <div className="relative max-w-[1600px] mx-auto px-2 sm:px-4 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center">
            <button
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="w-11 h-11 flex flex-col items-center justify-center gap-[5px] group -ml-0.5 md:ml-0 md:w-6 md:items-start"
            >
              <span className="h-px bg-obsidian-900 w-[22px] md:w-6 transition-all duration-450 group-hover:bg-gold" />
              <span className="h-px bg-obsidian-900 w-[22px] md:w-4 transition-all duration-450 group-hover:bg-gold group-hover:w-6" />
            </button>
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className={`md:hidden ${iconBtn}`}>
              <SearchIcon />
            </button>
          </div>

          <Link
            to="/"
            aria-label="OMVRI home"
            className="font-display text-[1.35rem] sm:text-2xl md:text-3xl tracking-[0.24em] md:tracking-[0.3em] uppercase text-obsidian-900 absolute left-1/2 -translate-x-1/2 pl-[0.24em] md:pl-[0.3em]"
          >
            Omvri
          </Link>

          <div className="flex items-center md:gap-3">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className={`hidden md:flex ${iconBtn}`}>
              <SearchIcon />
            </button>

            <button
              aria-label="Wishlist"
              onClick={() => navigate('/account')}
              className={`relative hidden md:flex ${iconBtn}`}
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
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4 md:px-10 h-16 md:h-20 flex items-center justify-end">
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-obsidian-500 hover:text-obsidian-900 active:bg-obsidian-900/[0.06] transition-colors duration-450"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <nav className="flex flex-col items-center justify-center gap-3 md:gap-5 mt-4 md:mt-10 pb-[max(4rem,env(safe-area-inset-bottom))]">
            {menuLinks.map(([label, to], i) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${i * 60}ms` }}
                className="reveal font-display text-[2.1rem] leading-tight md:text-5xl py-1 text-obsidian-900 hover:text-obsidian-500 active:text-obsidian-500 transition-colors duration-450"
              >
                {label}
              </Link>
            ))}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-x-8 gap-y-1 mt-8 md:mt-10 px-6 text-center">
              {menuSmall.map(([label, to], i) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  style={{ animationDelay: `${(menuLinks.length + i) * 60}ms` }}
                  className="reveal py-3 text-[11px] tracking-[0.18em] uppercase text-obsidian-500 hover:text-obsidian-900 transition-colors duration-450"
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
