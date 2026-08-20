import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Delivery',
    rows: [
      ['Made to order suits', 'Three to five weeks, cut after your order is confirmed', 'Free'],
      ['Alterations returning home', 'Five to seven business days round trip', 'Free'],
    ],
    note: 'Every suit ships pressed and hung in a rigid OMVRI garment box, with tracking and signature on delivery. We ship across Canada and the United States; elsewhere by arrangement with the atelier.',
  },
]

const returns = [
  {
    title: 'Ready to wear',
    body: '30 days, free, unworn with tags. Refund lands on the original payment method within five business days of the piece reaching the atelier.',
  },
  {
    title: 'Custom measured suits',
    body: 'Cut for one body, so they exchange for alteration rather than refund. First alterations are always free. We adjust until nothing needs saying.',
  },
  {
    title: 'Bespoke builds',
    body: 'Committed once the cloth is cut. Within 48 hours of ordering you may change or cancel freely; after cutting, the build is yours and we will make it right by fitting.',
  },
  {
    title: 'Faults',
    body: 'A fault in cloth or construction is our fault, at any age of the garment. Send it home and we repair it, for life.',
  },
]

export default function ShippingReturns() {
  return (
    <div className="pt-20">
      <section className="max-w-[900px] mx-auto px-6 pt-20 pb-14 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-obsidian-500 mb-5 block">
          The Practical Part
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          Shipping &amp; Returns
        </h1>
      </section>

      <section className="max-w-[860px] mx-auto px-6 pb-24">
        {sections.map((s) => (
          <div key={s.title} className="mb-16">
            <h2 className="text-[11px] tracking-[0.18em] uppercase text-obsidian-500 mb-5">{s.title}</h2>
            <div className="space-y-3">
              {s.rows.map(([what, when, cost]) => (
                <div key={what} className="surface-soft grid grid-cols-[1fr_auto] sm:grid-cols-[1.2fr_1.4fr_auto] gap-3 px-6 py-4 text-sm items-baseline">
                  <span className="text-obsidian-900">{what}</span>
                  <span className="text-obsidian-400 hidden sm:block">{when}</span>
                  <span className="text-obsidian-900 text-right">{cost}</span>
                  <span className="text-obsidian-400 text-xs sm:hidden col-span-2">{when}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-obsidian-400 leading-relaxed mt-4 max-w-[640px]">{s.note}</p>
          </div>
        ))}

        <h2 className="text-[11px] tracking-[0.18em] uppercase text-obsidian-500 mb-5">Returns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {returns.map((r) => (
            <div key={r.title} className="surface surface-hover px-7 py-6">
              <h3 className="text-obsidian-900 mb-2">{r.title}</h3>
              <p className="text-sm text-obsidian-400 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>

        <div className="surface-soft px-8 py-10 text-center">
          <p className="text-sm text-obsidian-400 mb-6">
            Tracking a suit already on the table?
          </p>
          <Link
            to="/track"
            className="btn btn-primary"
          >
            Track Your Order
          </Link>
        </div>
      </section>
    </div>
  )
}
