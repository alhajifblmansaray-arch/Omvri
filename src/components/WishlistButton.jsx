import { useWishlist } from '../context/WishlistContext'

// Heart toggle used on product cards and the product page.
export default function WishlistButton({ productId, className = '' }) {
  const { has, toggle } = useWishlist()
  const active = has(productId)

  return (
    <button
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(productId)
      }}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
        active ? 'text-gold-700' : 'text-obsidian-300 hover:text-obsidian-900'
      } ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9Z" />
      </svg>
    </button>
  )
}
