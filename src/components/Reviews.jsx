import { reviews } from '../data/content'
import Stars from './Stars'

export default function Reviews({ productId }) {
  const list = reviews[productId] || []
  if (list.length === 0) return null

  const avg = list.reduce((s, r) => s + r.rating, 0) / list.length

  return (
    <section id="reviews" className="max-w-[900px] mx-auto px-6 py-20 border-t border-obsidian-900/10">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-display text-3xl text-obsidian-900">Worn &amp; Reviewed</h2>
        <div className="flex items-center gap-2 text-sm text-obsidian-500">
          <Stars n={Math.round(avg)} />
          {avg.toFixed(1)} · {list.length} review{list.length > 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-8">
        {list.map((r, i) => (
          <div key={i} className="border-t border-obsidian-900/10 pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Stars n={r.rating} />
                <span className="text-obsidian-900 text-sm font-medium">{r.title}</span>
              </div>
              <span className="text-xs text-obsidian-400">{r.date}</span>
            </div>
            <p className="text-sm text-obsidian-600 leading-relaxed mb-2">{r.body}</p>
            <span className="text-xs text-obsidian-900">{r.name}</span>
            <span className="text-xs text-obsidian-500 ml-2">Verified order</span>
          </div>
        ))}
      </div>
    </section>
  )
}
