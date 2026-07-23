import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function Collections() {
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

      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {products.map((p, i) => (
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
                  <div className="text-gold-400 text-sm mt-1">${p.price.toLocaleString()} CAD</div>
                </div>

                <span className="absolute top-5 right-5 w-8 h-8 rounded-full border border-obsidian-900/15 bg-white/80 flex items-center justify-center text-obsidian-900 opacity-0 group-hover:opacity-100 transition-opacity duration-450">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-display text-2xl text-obsidian-900 group-hover:text-gold-700 transition-colors duration-450">
                  {p.name}
                </h3>
                <span className="text-xs text-obsidian-400 group-hover:opacity-0 transition-opacity duration-300">
                  ${p.price.toLocaleString()}
                </span>
              </div>
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
