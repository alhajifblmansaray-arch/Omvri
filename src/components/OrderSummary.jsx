import { orderTotals } from '../lib/orders'
import { formatMoney, currencyCode } from '../lib/currency'

export default function OrderSummary({ items, compact = false }) {
  const totals = orderTotals(items)

  return (
    <aside className={compact ? '' : 'border border-obsidian-900/10 p-6'}>
      <h3 className="font-display text-xl text-obsidian-900 mb-5">Order summary</h3>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.lineId} className="flex gap-4">
            <div className="w-14 h-18 bg-ivory shrink-0 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm text-obsidian-900 truncate">{item.name}</span>
                {item.custom && (
                  <span className="text-[8px] tracking-[0.12em] uppercase text-gold-700 border border-gold-700/40 px-1.5 py-0.5 shrink-0">
                    Custom
                  </span>
                )}
              </div>
              <div className="text-xs text-obsidian-400 mt-0.5">
                Qty {item.qty || 1}
                {item.size ? ` · Size ${item.size}` : ''}
              </div>
            </div>
            <div className="text-sm text-obsidian-900 shrink-0">
              {formatMoney(item.price * (item.qty || 1))}
            </div>
          </div>
        ))}
      </div>

      <Line label="Subtotal" value={formatMoney(totals.subtotal, 2)} />
      <Line label="Delivery" value="Free" />
      <Line label={`Sales tax (${totals.taxLabel})`} value={formatMoney(totals.tax, 2)} />
      <div className="flex items-baseline justify-between pt-3 mt-1 border-t border-obsidian-900/10">
        <span className="text-lg text-obsidian-900">Total</span>
        <span className="text-lg text-obsidian-900">
          {formatMoney(totals.total, 2)} <span className="text-[10px] text-obsidian-400 uppercase">{currencyCode()}</span>
        </span>
      </div>
    </aside>
  )
}

function Line({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm border-t border-obsidian-900/10">
      <span className="text-obsidian-400">{label}</span>
      <span className="text-obsidian-900">{value}</span>
    </div>
  )
}
