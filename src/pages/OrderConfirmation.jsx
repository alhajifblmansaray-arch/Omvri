import { useParams, Link } from 'react-router-dom'
import { getOrder } from '../lib/orders'
import { formatMoney, currencyCode } from '../lib/currency'
import { JACKET_FIELDS, PANT_FIELDS } from '../context/MeasurementsContext'

export default function OrderConfirmation() {
  const { id } = useParams()
  const order = getOrder(id)

  if (!order) {
    return (
      <div className="pt-20">
        <div className="max-w-[700px] mx-auto px-6 py-40 text-center">
          <h1 className="font-display text-4xl text-obsidian-900 mb-4">Order not found.</h1>
          <Link to="/collections" className="text-[11px] tracking-[0.16em] uppercase text-gold-700">
            Back to Collections
          </Link>
        </div>
      </div>
    )
  }

  const { totals } = order

  return (
    <div className="pt-20">
      <div className="max-w-[820px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="w-14 h-14 rounded-full border border-gold-700 text-gold-700 flex items-center justify-center mx-auto mb-7">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12l5 5L20 6" />
            </svg>
          </span>
          <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 block mb-4">
            Order {order.id}
          </span>
          <h1 className="reveal font-display text-4xl md:text-5xl text-obsidian-900 mb-5">
            Your suit is on the table.
          </h1>
          <p className="reveal text-sm text-obsidian-400 max-w-[440px] mx-auto leading-relaxed">
            A confirmation is on its way to {order.contact.email}. We'll write again when your
            cloth is cut. Expect delivery in {order.eta}.
          </p>
        </div>

        <div className="border border-obsidian-900/10">
          {order.items.map((item) => (
            <div key={item.lineId} className="flex gap-6 p-6 border-b border-obsidian-900/10">
              <div className="w-24 h-32 bg-ivory shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-obsidian-900 font-medium">{item.name}</span>
                  {item.custom && (
                    <span className="text-[9px] tracking-[0.14em] uppercase text-gold-700 border border-gold-700/40 px-2 py-0.5">
                      Custom Sized
                    </span>
                  )}
                </div>
                <div className="text-xs text-obsidian-400 mt-1">Qty {item.qty || 1}</div>

                {item.custom && item.measurements && (
                  <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 max-w-md">
                    {[
                      { title: 'Jacket', fields: JACKET_FIELDS },
                      { title: 'Pants', fields: PANT_FIELDS },
                    ].map((g) => (
                      <div key={g.title}>
                        <div className="text-[10px] tracking-[0.12em] uppercase text-gold-700 mb-1.5">
                          {g.title}
                        </div>
                        {g.fields.map((f) => (
                          <div key={f.key} className="flex justify-between text-xs py-0.5">
                            <span className="text-obsidian-400">{f.label}</span>
                            <span className="text-obsidian-900">
                              {item.measurements.values[f.key]
                                ? `${item.measurements.values[f.key]} ${item.measurements.unit}`
                                : '·'}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-obsidian-900 shrink-0">
                {formatMoney(item.price * (item.qty || 1))}
              </div>
            </div>
          ))}

          <div className="p-6 space-y-2">
            <Line label="Subtotal" value={formatMoney(totals.subtotal, 2)} />
            <Line label="Delivery" value="Free" />
            <Line label={`Sales tax (${totals.taxLabel || 'Tax'})`} value={formatMoney(totals.tax, 2)} />
            <div className="flex items-baseline justify-between pt-3 border-t border-obsidian-900/10">
              <span className="text-lg text-obsidian-900">Total</span>
              <span className="text-lg text-obsidian-900">
                {formatMoney(totals.total, 2)}{' '}
                <span className="text-[10px] text-obsidian-400 uppercase">{currencyCode()}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          <Detail title="Shipping to">
            {order.shipping.name}
            <br />
            {order.shipping.address}
            <br />
            {order.shipping.city} {order.shipping.postal}
            <br />
            {order.shipping.country}
          </Detail>
          <Detail title="Paid with">{order.method}</Detail>
        </div>

        <div className="text-center mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={`/track?id=${order.id}`}
            className="px-9 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
          >
            Track This Order
          </Link>
          <Link
            to="/collections"
            className="px-9 py-4 border border-obsidian-900/20 text-obsidian-900 text-[11px] tracking-[0.18em] uppercase hover:border-obsidian-900 transition-colors duration-450"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

function Line({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-obsidian-400">{label}</span>
      <span className="text-obsidian-900">{value}</span>
    </div>
  )
}

function Detail({ title, children }) {
  return (
    <div className="border-t border-obsidian-900/15 pt-4">
      <div className="text-[11px] tracking-[0.12em] uppercase text-gold-700 mb-2">{title}</div>
      <div className="text-sm text-obsidian-400 leading-relaxed">{children}</div>
    </div>
  )
}
