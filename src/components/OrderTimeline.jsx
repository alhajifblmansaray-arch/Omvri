import { orderStages } from '../data/content'

const DAY = 24 * 60 * 60 * 1000

// Derives which production stage an order is in from its placement date.
export function stageIndexFor(order) {
  const elapsed = (Date.now() - order.placedAt) / DAY
  let idx = 0
  orderStages.forEach((s, i) => {
    if (elapsed >= s.afterDays) idx = i
  })
  return idx
}

export default function OrderTimeline({ order }) {
  const current = stageIndexFor(order)

  return (
    <ol className="relative">
      {orderStages.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={s.key} className="relative flex gap-5 pb-8 last:pb-0">
            {/* connector */}
            {i < orderStages.length - 1 && (
              <span
                className={`absolute left-[11px] top-6 bottom-0 w-px ${done ? 'bg-gold-700' : 'bg-obsidian-900/15'}`}
              />
            )}
            <span
              className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] transition-colors duration-300 ${
                done
                  ? 'bg-gold-700 text-white'
                  : active
                    ? 'bg-obsidian-900 text-white'
                    : 'border border-obsidian-900/20 bg-white text-obsidian-300'
              }`}
            >
              {done ? '✓' : i + 1}
            </span>
            <div className="pt-0.5">
              <div className={`text-sm ${active || done ? 'text-obsidian-900' : 'text-obsidian-400'}`}>
                {s.label}
                {active && (
                  <span className="ml-2 text-[10px] tracking-[0.14em] uppercase text-gold-700">
                    Current stage
                  </span>
                )}
              </div>
              <div className="text-xs text-obsidian-400 mt-1 leading-relaxed">{s.detail}</div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
