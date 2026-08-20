import { reviews } from '../data/content'
import Stars from './Stars'

export default function Reviews({ productId }) {
  const list = reviews[productId] || []
  if (list.length === 0) return null

  const avg = list.reduce((s, r) => s + r.rating, 0) / list.length

  return (
    <section id="reviews" className="px-4 md:px-10 py-10">
      <div className="max-w-[1000px] mx-auto">
        {/* summary sits on its own rounded card above the reviews */}
        <div className="surface-soft px-7 py-6 mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl text-obsidian-900">Worn &amp; Reviewed</h2>
          <div className="flex items-center gap-2.5">
            <Stars n={Math.round(avg)} size={14} />
            <span className="text-obsidian-900">{avg.toFixed(1)}</span>
            <span className="text-sm text-obsidian-500">
              out of 5 · {list.length} review{list.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((r, i) => (
            <article key={i} className="surface surface-hover px-7 py-6 flex flex-col">
              <div className="flex items-center justify-between gap-4 mb-3">
                <Stars n={r.rating} size={13} />
                <span className="text-xs text-obsidian-500">{r.date}</span>
              </div>
              <h3 className="text-obsidian-900 mb-2">{r.title}</h3>
              <p className="text-sm text-obsidian-600 leading-relaxed mb-5 flex-1">{r.body}</p>
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-obsidian-900 text-white text-[11px] flex items-center justify-center shrink-0">
                  {r.name.charAt(0)}
                </span>
                <span className="text-sm text-obsidian-900">{r.name}</span>
                <span className="text-[10px] tracking-[0.12em] uppercase text-obsidian-500 bg-obsidian-900/5 rounded-full px-2.5 py-1 ml-auto">
                  Verified
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
