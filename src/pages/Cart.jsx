import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatMoney, currencyCode } from '../lib/currency'
import { JACKET_FIELDS, PANT_FIELDS } from '../context/MeasurementsContext'
import SidePanel from '../components/SidePanel'
import ExpressCheckoutPanel from '../components/ExpressCheckoutPanel'

export default function Cart() {
  const { items, removeItem, updateItem, total } = useCart()
  const navigate = useNavigate()
  const [giftWrap, setGiftWrap] = useState(false)
  const [expressOpen, setExpressOpen] = useState(false)

  const checkoutRef = useRef(null)
  const [checkoutVisible, setCheckoutVisible] = useState(true)
  useEffect(() => {
    const el = checkoutRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setCheckoutVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [items.length])

  if (items.length === 0) {
    return (
      <div className="pt-16 md:pt-20">
        <div className="max-w-[700px] mx-auto px-6 py-40 text-center">
          <h1 className="font-display text-4xl text-obsidian-900 mb-4">Your bag is empty.</h1>
          <p className="text-sm text-obsidian-400 mb-10">
            Nothing here yet. The collection is waiting.
          </p>
          <Link
            to="/collections"
            className="btn btn-primary"
          >
            Shop Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 md:pt-20">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-16">
        <h1 className="font-display text-4xl md:text-5xl text-obsidian-900 text-center mb-8 md:mb-14">
          Shopping bag
          <span className="block sm:inline text-obsidian-400 text-xl sm:text-2xl sm:align-middle mt-2 sm:mt-0 sm:ml-3">
            {formatMoney(total)} {currencyCode()}
          </span>
        </h1>

        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-14 items-start">
          {/* line items */}
          <div className="space-y-3 sm:space-y-4">
            {items.map((item) => (
              <div key={item.lineId} className="surface flex gap-4 sm:gap-6 p-3.5 sm:p-6">
                <div className="w-[88px] h-[118px] sm:w-32 sm:h-40 bg-ivory shrink-0 overflow-hidden rounded-xl">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 pt-1">
                      <div className="flex items-center gap-x-2.5 gap-y-1.5 flex-wrap">
                        <span className="text-obsidian-900 font-medium">{item.name}</span>
                        {item.custom && (
                          <span className="text-[9px] tracking-[0.14em] uppercase text-obsidian-600 bg-obsidian-900/5 rounded-full px-2.5 py-1">
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
                      className="w-10 h-10 -mt-1.5 -mr-1.5 sm:mt-0 sm:mr-0 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center text-obsidian-400 hover:text-obsidian-900 active:bg-obsidian-900/[0.06] transition-colors duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </div>

                  {item.custom && item.measurements && (
                    <CustomSummary measurements={item.measurements} />
                  )}

                  <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 mt-auto pt-4 sm:pt-6">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                      <label className="flex items-center gap-2 text-obsidian-400">
                        Qty
                        <select
                          value={item.qty || 1}
                          onChange={(e) => updateItem(item.lineId, { qty: Number(e.target.value) })}
                          className="rounded-full border border-obsidian-900/15 bg-white text-obsidian-900 text-base sm:text-sm py-1.5 pl-3 pr-2 outline-none focus:border-obsidian-900"
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
                      {formatMoney(item.price * (item.qty || 1))}{' '}
                      <span className="text-[10px] text-obsidian-400 uppercase">{currencyCode()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* gift wrap add-on */}
            <div className="surface flex items-center gap-4 sm:gap-6 p-3.5 sm:p-6">
              <div className="w-[88px] h-16 sm:w-32 sm:h-20 bg-ivory rounded-xl shrink-0 flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-obsidian-900">
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
                className={`w-11 h-11 shrink-0 rounded-full border flex items-center justify-center text-xl leading-none transition-colors duration-450 ${
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
          <aside className="mt-8 lg:mt-0 lg:sticky lg:top-28 max-lg:bg-white max-lg:rounded-2xl max-lg:p-5 max-lg:shadow-[0_1px_2px_rgba(23,22,26,0.04),0_10px_24px_-14px_rgba(23,22,26,0.18)]">
            <ul className="space-y-3 text-sm text-obsidian-400 mb-8">
              <li className="flex items-center gap-2.5">
                <Check /> Free shipping &amp; returns.
              </li>
              <li className="flex items-center gap-2.5">
                <Check /> Pick-up in store and get it customized.
              </li>
            </ul>

            <div className="flex items-center justify-between py-3 text-sm">
              <span className="text-obsidian-400">Delivery costs</span>
              <span className="text-obsidian-900">Free</span>
            </div>
            <div className="flex items-baseline justify-between py-3 border-t border-obsidian-900/10 mt-1">
              <span className="text-xl text-obsidian-900">
                Total <span className="text-xs text-obsidian-400">Excl. Sales Tax</span>
              </span>
              <span className="text-xl text-obsidian-900">
                {formatMoney(total)} <span className="text-xs text-obsidian-400 uppercase">{currencyCode()}</span>
              </span>
            </div>

            <div ref={checkoutRef}>
              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary w-full mt-5"
              >
                Checkout
              </button>
              <button
                onClick={() => setExpressOpen(true)}
                className="btn btn-outline w-full mt-3"
              >
                Express checkout
              </button>
            </div>
            <p className="text-xs text-obsidian-400 text-center mt-3">
              Express pays in one step with Apple&nbsp;Pay, Google&nbsp;Pay or PayPal.
            </p>
          </aside>
        </div>
      </div>

      {/* phones and tablets: total and checkout pinned to the bottom until the
          summary's own buttons scroll into view */}
      <div className="lg:hidden">
        <div
          className={`fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-obsidian-900/10 shadow-[0_-8px_24px_-12px_rgba(23,22,26,0.25)] transition-transform duration-450 ease-signature ${
            checkoutVisible || expressOpen ? 'translate-y-full' : 'translate-y-0'
          }`}
          aria-hidden={checkoutVisible || expressOpen}
        >
          <div className="max-w-[760px] mx-auto flex items-center gap-4 px-4 sm:px-6 pt-3 pb-safe">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] tracking-[0.14em] uppercase text-obsidian-500">Total</div>
              <div className="text-obsidian-900">
                {formatMoney(total)} <span className="text-[10px] text-obsidian-400 uppercase">{currencyCode()}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              tabIndex={checkoutVisible ? -1 : 0}
              className="btn btn-primary !px-8 !py-3.5 shrink-0"
            >
              Checkout
            </button>
          </div>
        </div>
        <div className="h-20" aria-hidden="true" />
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
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-obsidian-500 shrink-0">
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
        className="py-1.5 -my-1.5 text-[11px] tracking-[0.12em] uppercase text-obsidian-500 hover:text-obsidian-900 transition-colors duration-450 flex items-center gap-1.5"
      >
        {open ? 'Hide' : 'View'} measurements
        <span className={`inline-block transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-1 max-w-md">
          {groups.map((g) => (
            <div key={g.title}>
              <div className="text-[10px] tracking-[0.12em] uppercase text-obsidian-500 mb-1.5">{g.title}</div>
              {g.fields.map((f) => (
                <div key={f.key} className="flex justify-between text-xs py-0.5">
                  <span className="text-obsidian-400">{f.label}</span>
                  <span className="text-obsidian-900">{values[f.key] ? `${values[f.key]} ${unit}` : '·'}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
