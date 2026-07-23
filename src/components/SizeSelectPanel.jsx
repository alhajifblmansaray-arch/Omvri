import { useState } from 'react'
import { sizeMatrix } from '../data/products'
import { formatMoney, currencyCode } from '../lib/currency'

const sizeLabels = {
  32: 'XXS', 34: 'XS', 36: 'S', 38: 'M', 40: 'M/L',
  42: 'L', 44: 'XL', 46: 'XXL', 48: '3XL', 50: '4XL',
}

// Regular first, as the common case — matches reference UX.
const columns = [
  { key: 'Regular', note: '5.5-6.1"' },
  { key: 'Long', note: '> 6.1"' },
  { key: 'Short', note: '< 5.5"' },
]

const suffix = { Regular: '', Long: 'L', Short: 'S' }

export default function SizeSelectPanel({ product, onAdd }) {
  const [selected, setSelected] = useState(null) // { size, length }

  const trousers = selected ? selected.size - 6 : null

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-8">
        <a href="#" className="text-sm text-obsidian-400 underline underline-offset-4 hover:text-gold-700 transition-colors duration-450">
          View size guide
        </a>
      </div>

      {/* size matrix */}
      <div className="grid grid-cols-[44px_repeat(3,1fr)] gap-x-3 gap-y-2 items-center">
        <span />
        {columns.map((c) => (
          <div key={c.key} className="text-center pb-2">
            <div className="text-sm font-medium text-obsidian-900">{c.key}</div>
            <div className="text-[11px] text-obsidian-400">{c.note}</div>
          </div>
        ))}

        {sizeMatrix.sizes.map((size) => (
          <FragmentRow
            key={size}
            size={size}
            selected={selected}
            onSelect={setSelected}
          />
        ))}
      </div>

      {/* footer resolves choices into plain english; pinned while matrix scrolls */}
      <div className="sticky bottom-0 bg-white mt-auto pt-4 -mx-1 px-1">
        <div className="flex items-center justify-between py-4 border-t border-obsidian-900/10 text-sm">
          <span className="text-obsidian-400">Suit includes</span>
          <span className="text-obsidian-900">
            {selected ? `Jacket ${selected.size}${suffix[selected.length]} · Trousers ${trousers}` : 'Select a size'}
          </span>
        </div>
        <div className="flex items-end justify-between pb-2">
          <div>
            <div className="text-xl text-obsidian-900">
              {formatMoney(product.price)} <span className="text-xs text-obsidian-400 uppercase">{currencyCode()}</span>
            </div>
            <div className="text-sm text-obsidian-400 mt-1">Delivery: 2 to 4 business days</div>
          </div>
          <button
            disabled={!selected}
            onClick={() =>
              onAdd({
                size: `${selected.size}${suffix[selected.length]}`,
                trousers,
              })
            }
            className={`px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase transition-colors duration-450 ${
              selected
                ? 'bg-obsidian-900 text-white hover:bg-gold-700'
                : 'bg-obsidian-100 text-obsidian-300 cursor-not-allowed'
            }`}
          >
            Add to bag
          </button>
        </div>
      </div>
    </div>
  )
}

function FragmentRow({ size, selected, onSelect }) {
  return (
    <>
      <span className="text-[11px] text-obsidian-400 uppercase">{sizeLabels[size]}</span>
      {columns.map(({ key: length }) => {
        const unavailable = sizeMatrix.unavailable[length]?.includes(size)
        const isSelected = selected?.size === size && selected?.length === length
        if (unavailable) return <span key={length} />
        return (
          <button
            key={length}
            onClick={() => onSelect({ size, length })}
            className={`py-3 text-sm border transition-colors duration-300 ${
              isSelected
                ? 'bg-obsidian-900 text-white border-obsidian-900'
                : 'bg-white text-obsidian-900 border-obsidian-900/10 hover:border-obsidian-900/50'
            }`}
          >
            {size}
            {suffix[length]}
          </button>
        )
      })}
    </>
  )
}
