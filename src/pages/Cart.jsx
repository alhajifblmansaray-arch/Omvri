import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { JACKET_FIELDS, PANT_FIELDS } from '../context/MeasurementsContext'
import SidePanel from '../components/SidePanel'
import ExpressCheckoutPanel from '../components/ExpressCheckoutPanel'

export default function Cart() {
  const { items, removeItem, updateItem, total } = useCart()
  const navigate = useNavigate()
  const [giftWrap, setGiftWrap] = useState(false)
  const [expressOpen, setExpressOpen] = useState(false)

  if (items.length === 0) {
    return (
      <div className="pt-20">
        <div className="max-w-[700px] mx-auto px-6 py-40 text-center">
          <h1 className="font-display text-4xl text-obsidian-900 mb-4">Your bag is empty.</h1>
          <p className="text-sm text-obsidian-400 mb-10">
            Nothing here yet — the collection is waiting.
          </p>
          <Link
            to="/collections"
            className="inline-block px-9 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
          >
            Shop Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-16">
        <h1 className="font-display text-4xl md:text-5xl text-obsidian-900 text-center mb-14">
          Shopping bag{' '}
          <span className="text-obsidian-400 text-2xl align-middle">
            ${total.toLocaleString()} CAD
          </span>
        </h1>

        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-14 items-start">
          {/* line items */}
          <div className="space-y-px bg-obsidian-900/5">
            {items.map((item) => (
              <div key={item.lineId} className="bg-white flex gap-6 p-6 border border-obsidian-900/10">
                <div className="w-32 h-40 bg-ivory shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-obsidian-900 font-medium">{item.name}</span>
                        {item.custom && (
                          <span className="text-[9px] tracking-[0.14em] uppercase text-gold-700 border border-gold-700/40 px-2 py-0.5">
                            Custom Sized
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-obsidian-400 mt-1">
                        Delivery: {item.delivery || '2 to 4 business days'}
                      </div>
                    </div>
                    <button
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.lineId)}
                      className="text-obsidian-300 hover:text-obsidian-900 transition-colors duration-300 leading-none"
                    >
                      ✕
                    </button>
                  </div>

                  {item.custom && item.measurements && (
                    <CustomSummary measurements={item.measurements} />
                  )}

                  <div className="flex items-end justify-between mt-auto pt-6">
                    <div className="flex items-center gap-5 text-sm">
                      <label className="flex items-center gap-2 text-obsidian-400">
                        Qty
                        <select
                          value={item.qty || 1}
                          onChange={(e) => updateItem(item.lineId, { qty: Number(e.target.value) })}
                          className="border border-obsidian-900/15 bg-white text-obsidian-900 py-1.5 pl-2 pr-1 outline-none focus:border-gold-700"
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </label>
                      {item.size && (
                        <span className="text-obsidian-400">
                          Size <span className="text-obsidian-900">{item.size}</span>
                          {item.trousers && (
                            <span className="text-obsidian-400"> · Trousers <span className="text-obsidian-900">{item.trousers}</span></span>
                          )}
                        </span>
                      )}
                    </div>
                    <div className="text-obsidian-900">
                      ${(item.price * (item.qty || 1)).toLocaleString()}{' '}
                      <span className="text-[10px] text-obsidian-400 uppercase">CAD</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* gift wrap add-on */}
            <div className="bg-white flex items-center gap-6 p-6 border border-obsidian-900/10">
              <div className="w-32 h-20 bg-ivory shrink-0 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-obsidian-900">
                  <rect x="3" y="8" width="18" height="13" />
                  <path d="M3 8h18M12 8v13M12 8c-2-4-6-4-6-1.5S10 8 12 8Zm0 0c2-4 6-4 6-1.5S14 8 12 8Z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-obsidian-900 font-medium">Add gift wrapping</div>
                <div className="text-xs text-obsidian-400 mt-1">Free</div>
              </div>
              <button
                aria-label={giftWrap ? 'Remove gift wrapping' : 'Add gift wrapping'}
                onClick={() => setGiftWrap((g) => !g)}
                className={`w-10 h-10 border flex items-center justify-center text-xl leading-none transition-colors duration-450 ${
                  giftWrap
                    ? 'bg-obsidian-900 text-white border-obsidian-900'
                    : 'border-obsidian-900/20 text-obsidian-900 hover:border-obsidian-900'
                }`}
              >
                {giftWrap ? '✓' : '+'}
              </button>
            </div>
          </div>

          {/* order summary */}
          <aside className="mt-12 lg:mt-0 lg:sticky lg:top-28">
            <ul className="space-y-3 text-sm text-obsidian-400 mb-8">
              <li className="flex items-center gap-2.5">
                <Check /> Free shipping &amp; returns.
              </li>
              <li className="flex items-center gap-2.5">
                <Check /> Pick-up in store and get it customized.
              </li>
            </ul>

            <div className="flex items-center justify-between py-3 text-sm border-t border-obsidian-900/10">
              <span className="text-obsidian-400">Delivery costs</span>
              <span className="text-obsidian-900">Free</span>
            </div>
            <div className="flex items-baseline justify-between py-3 border-t border-obsidian-900/10">
              <span className="text-xl text-obsidian-900">
                Total <span className="text-xs text-obsidian-400">Excl. Sales Tax</span>
              </span>
              <span className="text-xl text-obsidian-900">
                ${total.toLocaleString()} <span className="text-xs text-obsidian-400 uppercase">CAD</span>
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-5 bg-obsidian-900 text-white py-4 text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
            >
              Checkout
            </button>
            <button
              onClick={() => setExpressOpen(true)}
              className="w-full mt-3 border border-obsidian-900/20 text-obsidian-900 py-4 text-sm hover:border-obsidian-900 transition-colors duration-450"
            >
              Express checkout
            </button>
            <p className="text-xs text-obsidian-400 text-center mt-3">
              Express pays in one step with Apple&nbsp;Pay, Google&nbsp;Pay or PayPal.
            </p>
          </aside>
        </div>
      </div>

      <SidePanel
        open={expressOpen}
        onClose={() => setExpressOpen(false)}
        title="Express checkout"
      >
        <ExpressCheckoutPanel onClose={() => setExpressOpen(false)} />
      </SidePanel>
    </div>
  )
}

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-700 shrink-0">
      <path d="M4 12l5 5L20 6" />
    </svg>
  )
}

function CustomSummary({ measurements }) {
  const [open, setOpen] = useState(false)
  const { unit, values } = measurements
  const groups = [
    { title: 'Jacket', fields: JACKET_FIELDS },
    { title: 'Pants', fields: PANT_FIELDS },
  ]
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="text-[11px] tracking-[0.12em] uppercase text-obsidian-400 hover:text-gold-700 transition-colors duration-450 flex items-center gap-1.5"
      >
        {open ? 'Hide' : 'View'} measurements
        <span className={`inline-block transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 max-w-md">
          {groups.map((g) => (
            <div key={g.title}>
              <div className="text-[10px] tracking-[0.12em] uppercase text-gold-700 mb-1.5">{g.title}</div>
              {g.fields.map((f) => (
                <div key={f.key} className="flex justify-between text-xs py-0.5">
                  <span className="text-obsidian-400">{f.label}</span>
                  <span className="text-obsidian-900">{values[f.key] ? `${values[f.key]} ${unit}` : '—'}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
