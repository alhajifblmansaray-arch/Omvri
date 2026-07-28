import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products, categories, accessories } from '../data/products'
import { formatMoney, currencyCode } from '../lib/currency'
import WishlistButton from '../components/WishlistButton'

const sorts = [
  ['featured', 'Featured'],
  ['name', 'Name A–Z'],
  ['price-asc', 'Price, low to high'],
  ['price-desc', 'Price, high to low'],
]

export default function Collections() {
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('featured')

  const shown = useMemo(() => {
    let list = cat === 'all' ? [...products] : products.filter((p) => p.category === cat)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    return list
  }, [cat, sort])

  return (
    <div className="pt-20">
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pt-20 pb-14 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          The Collection
        </span>
        <h1 className="reveal font-display text-5xl md:text-7xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          Ready to Wear,
          <br className="hidden sm:block" /> Made to Measure.
        </h1>
        <p className="reveal text-obsidian-400 text-sm max-w-[520px] mx-auto mt-6 leading-relaxed" style={{ animationDelay: '180ms' }}>
          Six looks, chosen from the atelier's current cloth. Every piece ships cut to your
          measurements — or start from any of them in the configurator.
        </p>
      </section>

      {/* filter + sort bar */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-obsidian-900/10 py-4">
          <div className="flex flex-wrap gap-1">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                aria-pressed={cat === c.key}
                className={`px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                  cat === c.key
                    ? 'bg-obsidian-900 text-white'
                    : 'text-obsidian-500 hover:text-obsidian-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-xs text-obsidian-400">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-obsidian-900/15 bg-white text-obsidian-900 text-xs py-2 pl-3 pr-2 outline-none focus:border-gold-700"
            >
              {sorts.map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {shown.map((p, i) => (
            <Link
              key={p.id}
              to={`/suits/${p.slug}`}
              className="reveal group block"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="relative overflow-hidden aspect-[4/5] bg-ivory border border-obsidian-900/5">
                <img
                  src={p.hero}
                  alt={p.name}
                  className="w-full h-full object-cover object-top transition-transform duration-[900ms] ease-signature group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-450" />

                {/* fabric + price reveal on hover/focus */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-450 ease-signature">
                  <div className="text-white/80 text-xs tracking-wide">{p.fabric}</div>
                  <div className="text-gold-400 text-sm mt-1">{formatMoney(p.price)} {currencyCode()}</div>
                </div>

                <WishlistButton productId={p.id} className="absolute top-4 right-4 bg-white/85" />
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-display text-2xl text-obsidian-900 group-hover:text-gold-700 transition-colors duration-450">
                  {p.name}
                </h3>
                <span className="text-xs text-obsidian-400 group-hover:opacity-0 transition-opacity duration-300">
                  {formatMoney(p.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="text-center text-obsidian-400 text-sm py-20">
            Nothing in this category yet.
          </p>
        )}
      </section>

      {/* accessories strip */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-28">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-3xl text-obsidian-900">Finishing touches</h2>
          <Link to="/accessories" className="text-[11px] tracking-[0.14em] uppercase text-gold-700 hover:underline">
            All Accessories →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {accessories.map((a) => (
            <Link key={a.id} to="/accessories" className="group">
              <div className="aspect-square bg-ivory overflow-hidden mb-3">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-signature group-hover:scale-[1.04]"
                />
              </div>
              <div className="text-sm text-obsidian-900 group-hover:text-gold-700 transition-colors duration-300">{a.name}</div>
              <div className="text-xs text-obsidian-400">{formatMoney(a.price)}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* configurator cross-sell */}
      <section className="bg-ivory border-t border-obsidian-900/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="font-display text-4xl md:text-5xl text-obsidian-900 mb-6">
              Or start from nothing at all.
            </h2>
            <p className="text-obsidian-400 text-sm leading-relaxed mb-10 max-w-[440px] mx-auto md:mx-0">
              Choose your cloth, your lapel, your lining — build a suit that exists nowhere
              else but on you.
            </p>
            <Link
              to="/configure"
              className="inline-block px-9 py-4 bg-gold-700 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-800 transition-colors duration-450"
            >
              Enter the Configurator
            </Link>
          </div>
          <div className="aspect-[4/5] max-w-sm mx-auto w-full bg-white border border-obsidian-900/10 overflow-hidden">
            <img
              src="/images/looks/burgundy/portrait-1.jpg"
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
