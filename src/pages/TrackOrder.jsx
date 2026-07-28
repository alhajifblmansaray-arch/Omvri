import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getOrder } from '../lib/orders'
import OrderTimeline from '../components/OrderTimeline'

export default function TrackOrder() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('id') || '')
  const [searched, setSearched] = useState(params.get('id') || null)

  const order = searched ? getOrder(searched.trim().toUpperCase()) : null

  const submit = (e) => {
    e.preventDefault()
    setSearched(q)
  }

  return (
    <div className="pt-20">
      <section className="max-w-[900px] mx-auto px-6 pt-20 pb-12 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          Order Status
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          Where is my suit?
        </h1>
        <p className="reveal text-obsidian-400 text-sm max-w-[460px] mx-auto mt-6 leading-relaxed" style={{ animationDelay: '180ms' }}>
          Enter your order number — it looks like OMV-123456 and lives in your confirmation.
        </p>
      </section>

      <section className="max-w-[560px] mx-auto px-6 pb-28">
        <form onSubmit={submit} className="flex gap-3 mb-10">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="OMV-000000"
            aria-label="Order number"
            className="flex-1 bg-transparent outline-none px-4 py-3.5 text-obsidian-900 border border-obsidian-900/20 focus:border-gold-700 transition-colors duration-300 tracking-[0.08em]"
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-obsidian-900 text-white text-[11px] tracking-[0.16em] uppercase hover:bg-gold-700 transition-colors duration-450"
          >
            Track
          </button>
        </form>

        {searched && !order && (
          <div className="border border-obsidian-900/10 px-8 py-12 text-center">
            <h2 className="font-display text-2xl text-obsidian-900 mb-3">Not found.</h2>
            <p className="text-sm text-obsidian-400 leading-relaxed max-w-[380px] mx-auto">
              No order “{searched}” on this device. Check the number in your confirmation email —
              or{' '}
              <Link to="/contact" className="text-gold-700 hover:underline">
                write to the atelier
              </Link>{' '}
              and we will find it.
            </p>
          </div>
        )}

        {order && (
          <div className="border border-obsidian-900/10 p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-8">
              <h2 className="font-display text-2xl text-obsidian-900">{order.id}</h2>
              <span className="text-xs text-obsidian-400">
                Placed {new Date(order.placedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                {' · '}ETA {order.eta}
              </span>
            </div>
            <OrderTimeline order={order} />
            <Link
              to={`/order/${order.id}`}
              className="inline-block mt-8 text-[11px] tracking-[0.14em] uppercase text-gold-700 hover:underline"
            >
              View full order →
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
