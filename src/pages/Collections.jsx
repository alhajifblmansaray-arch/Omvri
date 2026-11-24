import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import CollectionCard from '../components/CollectionCard'

const sorts = [
  ['featured', 'Featured'],
  ['name', 'Name A to Z'],
  ['price-asc', 'Price, low to high'],
  ['price-desc', 'Price, high to low'],
]

export default function Collections() {
  const [sort, setSort] = useState('featured')

  const shown = useMemo(() => {
    const list = [...products]
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    return list
  }, [sort])

  return (
    <div className="pt-16 md:pt-20">
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-10 md:pb-14 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-obsidian-500 mb-5 block">
          The Collection
        </span>
        <h1 className="reveal font-display text-[2.6rem] leading-[1.08] sm:text-5xl md:text-7xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          Ready to Wear,
          <br className="hidden sm:block" /> Made to Measure.
        </h1>
        <p className="reveal text-obsidian-500 text-base max-w-[540px] mx-auto mt-6 leading-relaxed" style={{ animationDelay: '180ms' }}>
          Seven looks, chosen from the atelier's current cloth. Every piece is cut to your
          own measurements and made for one person only.
        </p>
      </section>

      {/* sort bar */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-10">
        <div className="surface-soft flex items-center justify-between gap-4 pl-5 pr-3 sm:px-6 py-3 sm:py-4">
          <span className="text-sm text-obsidian-500 shrink-0">
            {shown.length} suits
          </span>
          <label className="flex items-center gap-3 text-sm text-obsidian-500 min-w-0">
            <span className="hidden sm:inline">Sort</span>
            {/* 16px text on phones so iOS doesn't zoom the page when it's tapped */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort suits"
              className="min-w-0 max-w-full rounded-full bg-white text-obsidian-900 text-base sm:text-sm py-2.5 sm:py-2 pl-4 pr-3 outline-none border border-obsidian-900/15 focus:border-obsidian-900"
            >
              {sorts.map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-xs text-obsidian-500 mt-3">
          <span className="[@media(hover:none)]:hidden">Hover any suit to see it from every angle.</span>
          <span className="hidden [@media(hover:none)]:inline">Swipe any photo to see the suit from every angle.</span>
        </p>
      </section>

      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-20 md:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 md:gap-x-8 gap-y-12 md:gap-y-16">
          {shown.map((p, i) => (
            <CollectionCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* made to measure cross-sell */}
      <section className="bg-ivory border-t border-obsidian-900/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="font-display text-4xl md:text-5xl text-obsidian-900 mb-6">
              Cut to your measure.
            </h2>
            <p className="text-obsidian-500 text-base leading-relaxed mb-10 max-w-[440px] mx-auto md:mx-0">
              Every look in the house can be made to your own measurements. Twelve numbers,
              ten minutes with a soft tape, and the suit is cut for one person only.
            </p>
            <Link
              to="/measurement-guide"
              className="inline-block btn btn-primary"
            >
              How to Measure
            </Link>
          </div>
          <div className="aspect-[4/5] max-w-sm mx-auto w-full bg-white rounded-2xl card-raise overflow-hidden">
            <img
              src="/images/looks/lario/portrait-1.jpg"
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
