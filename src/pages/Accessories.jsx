import { useState } from 'react'
import { accessories } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatMoney, currencyCode } from '../lib/currency'

export default function Accessories() {
  const { addItem } = useCart()
  const [added, setAdded] = useState({})

  const add = (a) => {
    addItem({ id: a.id, name: a.name, price: a.price, image: a.image, delivery: '2 to 4 business days' })
    setAdded((s) => ({ ...s, [a.id]: true }))
    setTimeout(() => setAdded((s) => ({ ...s, [a.id]: false })), 1600)
  }

  return (
    <div className="pt-20">
      <section className="max-w-[900px] mx-auto px-6 pt-20 pb-14 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          Finishing Touches
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          Accessories
        </h1>
        <p className="reveal text-obsidian-400 text-sm max-w-[480px] mx-auto mt-6 leading-relaxed" style={{ animationDelay: '180ms' }}>
          The last five percent of the outfit — leather, silk and horn, chosen to sit beside the
          cloth without competing with it.
        </p>
      </section>

      <section className="max-w-[1300px] mx-auto px-6 md:px-10 pb-28">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          {accessories.map((a) => (
            <div key={a.id} className="group">
              <div className="relative aspect-[4/5] bg-ivory overflow-hidden mb-4">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-signature group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-obsidian-900">{a.name}</h3>
                  <div className="text-xs text-obsidian-400 mt-0.5">{a.material}</div>
                  <div className="text-sm text-obsidian-900 mt-1.5">
                    {formatMoney(a.price)}{' '}
                    <span className="text-[10px] text-obsidian-400 uppercase">{currencyCode()}</span>
                  </div>
                </div>
                <button
                  onClick={() => add(a)}
                  className={`shrink-0 px-4 py-2.5 text-[10px] tracking-[0.14em] uppercase border transition-colors duration-450 ${
                    added[a.id]
                      ? 'bg-gold-700 border-gold-700 text-white'
                      : 'border-obsidian-900/20 text-obsidian-900 hover:border-obsidian-900'
                  }`}
                >
                  {added[a.id] ? 'Added ✓' : 'Add to Bag'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
