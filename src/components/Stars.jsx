import { reviews } from '../data/content'

// Aggregate rating for a product, so the score can sit near the buy button
// as well as on the reviews section further down.
export function ratingFor(productId) {
  const list = reviews[productId] || []
  if (list.length === 0) return null
  const avg = list.reduce((s, r) => s + r.rating, 0) / list.length
  return { avg, count: list.length }
}

export default function Stars({ n, size = 12 }) {
  return (
    <span className="flex gap-0.5 text-gold-600" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= n ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8-6.1-3.5-6.1 3.5 1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
        </svg>
      ))}
    </span>
  )
}
