import { accessories } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatMoney, currencyCode } from '../lib/currency'

export default function ShopTheLookPanel() {
  const { addItem } = useCart()

  return (
    <div className="space-y-10">
      {accessories.map((a) => (
        <div key={a.id} className="flex gap-6">
          <div className="w-32 h-40 bg-ivory shrink-0 overflow-hidden">
            <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-obsidian-900 font-medium">{a.name}</div>
            <div className="text-sm text-obsidian-400 mt-0.5">{a.material}</div>
            <div className="text-sm text-obsidian-900 mt-1.5">
              {formatMoney(a.price)} <span className="text-[10px] text-obsidian-400 uppercase">{currencyCode()}</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button
                aria-label="Save for later"
                className="w-10 h-10 border border-obsidian-900/15 flex items-center justify-center text-obsidian-900 hover:border-gold-700 hover:text-gold-700 transition-colors duration-450"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 3h12v18l-6-4-6 4V3Z" />
                </svg>
              </button>
              <button
                onClick={() => addItem({ ...a, qty: 1, delivery: '2 to 4 business days' })}
                className="px-6 py-2.5 border border-obsidian-900/20 text-obsidian-900 text-[11px] tracking-[0.16em] uppercase hover:border-obsidian-900 transition-colors duration-450"
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
