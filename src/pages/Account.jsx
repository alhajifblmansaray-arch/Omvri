import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllOrders } from '../lib/orders'
import { formatMoney } from '../lib/currency'
import { useWishlist } from '../context/WishlistContext'
import { useMeasurements, JACKET_FIELDS, PANT_FIELDS } from '../context/MeasurementsContext'
import { products } from '../data/products'
import { orderStages } from '../data/content'
import OrderTimeline, { stageIndexFor } from '../components/OrderTimeline'
import WishlistButton from '../components/WishlistButton'

const tabs = [
  ['orders', 'Orders'],
  ['measurements', 'My Measurements'],
  ['wishlist', 'Wishlist'],
]

export default function Account() {
  const [tab, setTab] = useState('orders')

  return (
    <div className="pt-20">
      <section className="max-w-[900px] mx-auto px-6 pt-20 pb-12 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          My Wardrobe
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          Your account
        </h1>
        <p className="reveal text-obsidian-400 text-sm max-w-[460px] mx-auto mt-6 leading-relaxed" style={{ animationDelay: '180ms' }}>
          Every suit you have ordered, the measurements it was cut to, and the pieces you are
          still deciding on — all in one place, saved on this device.
        </p>
      </section>

      <section className="max-w-[900px] mx-auto px-6 pb-28">
        {/* tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border border-obsidian-900/15">
            {tabs.map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-6 sm:px-8 py-3 text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                  tab === k ? 'bg-obsidian-900 text-white' : 'text-obsidian-500 hover:text-obsidian-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab === 'orders' && <Orders />}
        {tab === 'measurements' && <Measurements />}
        {tab === 'wishlist' && <Wishlist />}
      </section>
    </div>
  )
}

function Empty({ title, body, cta, to }) {
  return (
    <div className="text-center py-16 border border-obsidian-900/10">
      <h2 className="font-display text-2xl text-obsidian-900 mb-3">{title}</h2>
      <p className="text-sm text-obsidian-400 mb-8 max-w-[380px] mx-auto leading-relaxed">{body}</p>
      <Link
        to={to}
        className="inline-block px-9 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
      >
        {cta}
      </Link>
    </div>
  )
}

function Orders() {
  const orders = getAllOrders()
  const [openId, setOpenId] = useState(orders[0]?.id ?? null)

  if (orders.length === 0) {
    return (
      <Empty
        title="No orders yet."
        body="When you place your first order it will appear here, with its production status and full specification."
        cta="Shop Collections"
        to="/collections"
      />
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((o) => {
        const open = openId === o.id
        const stage = orderStages[stageIndexFor(o)]
        return (
          <div key={o.id} className="border border-obsidian-900/10">
            <button
              onClick={() => setOpenId(open ? null : o.id)}
              aria-expanded={open}
              className="w-full flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-5 text-left"
            >
              <span className="text-obsidian-900 font-medium">{o.id}</span>
              <span className="text-xs text-obsidian-400">
                {new Date(o.placedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="text-[10px] tracking-[0.14em] uppercase text-gold-700 border border-gold-700/40 px-2 py-0.5">
                {stage.label}
              </span>
              <span className="ml-auto text-obsidian-900">{formatMoney(o.totals.total, 2)}</span>
              <span className={`text-obsidian-400 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
            </button>

            {open && (
              <div className="px-6 pb-8 border-t border-obsidian-900/10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="text-[11px] tracking-[0.12em] uppercase text-gold-700 mb-4">Production</div>
                  <OrderTimeline order={o} />
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.12em] uppercase text-gold-700 mb-4">Pieces</div>
                  <div className="space-y-4">
                    {o.items.map((item) => (
                      <div key={item.lineId} className="flex gap-4">
                        <div className="w-14 h-18 bg-ivory shrink-0 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                        </div>
                        <div className="text-sm">
                          <div className="text-obsidian-900">{item.name}</div>
                          <div className="text-xs text-obsidian-400 mt-0.5">
                            Qty {item.qty || 1}
                            {item.custom ? ' · Custom sized' : item.size ? ` · Size ${item.size}` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/order/${o.id}`}
                    className="inline-block mt-6 text-[11px] tracking-[0.14em] uppercase text-gold-700 hover:underline"
                  >
                    View full order →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function Measurements() {
  const { unit, values, savedAt } = useMeasurements()
  const filled = Object.values(values).filter(Boolean).length

  if (filled === 0) {
    return (
      <Empty
        title="No measurements on file."
        body="Save your twelve numbers once and every suit after that is cut to them — no re-measuring, ever."
        cta="How to Measure"
        to="/measurement-guide"
      />
    )
  }

  return (
    <div className="border border-obsidian-900/10 p-8">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-2xl text-obsidian-900">On file</h2>
        <span className="text-xs text-obsidian-400">
          {filled} of {JACKET_FIELDS.length + PANT_FIELDS.length} saved
          {savedAt ? ` · updated ${new Date(savedAt).toLocaleDateString()}` : ''}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1">
        {[
          { title: 'Jacket', fields: JACKET_FIELDS },
          { title: 'Pants', fields: PANT_FIELDS },
        ].map((g) => (
          <div key={g.title}>
            <div className="text-[11px] tracking-[0.12em] uppercase text-gold-700 mb-3">{g.title}</div>
            {g.fields.map((f) => (
              <div key={f.key} className="flex justify-between text-sm py-1.5 border-t border-obsidian-900/5">
                <span className="text-obsidian-400">{f.label}</span>
                <span className="text-obsidian-900">{values[f.key] ? `${values[f.key]} ${unit}` : '—'}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/measurement-guide"
          className="px-7 py-3.5 border border-obsidian-900/20 text-obsidian-900 text-[11px] tracking-[0.16em] uppercase hover:border-obsidian-900 transition-colors duration-450"
        >
          Review the Guide
        </Link>
        <Link
          to="/collections"
          className="px-7 py-3.5 bg-obsidian-900 text-white text-[11px] tracking-[0.16em] uppercase hover:bg-gold-700 transition-colors duration-450"
        >
          Order With These
        </Link>
      </div>
    </div>
  )
}

function Wishlist() {
  const { ids } = useWishlist()
  const saved = products.filter((p) => ids.includes(p.id))

  if (saved.length === 0) {
    return (
      <Empty
        title="Nothing saved yet."
        body="Tap the heart on any suit to keep it here while you decide."
        cta="Browse Suits"
        to="/collections"
      />
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
      {saved.map((p) => (
        <Link key={p.id} to={`/suits/${p.slug}`} className="group">
          <div className="relative aspect-[3/4] bg-ivory overflow-hidden mb-4">
            <img
              src={p.hero}
              alt={p.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-signature group-hover:scale-[1.03]"
            />
            <WishlistButton productId={p.id} className="absolute top-3 right-3 bg-white/85" />
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-xl text-obsidian-900 group-hover:text-gold-700 transition-colors duration-450">
              {p.name}
            </h3>
            <span className="text-xs text-obsidian-400">{formatMoney(p.price)}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
