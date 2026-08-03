import { Link } from 'react-router-dom'
import { lookbook } from '../data/content'
import { getProductBySlug } from '../data/products'

const spanClass = {
  tall: 'row-span-2',
  square: 'row-span-1',
  wide: 'row-span-1 sm:col-span-2',
}

export default function Lookbook() {
  return (
    <div className="pt-20">
      <section className="max-w-[900px] mx-auto px-6 pt-20 pb-14 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          The Lookbook
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          Every frame in the house.
        </h1>
        <p className="reveal text-obsidian-500 text-base max-w-[540px] mx-auto mt-6 leading-relaxed" style={{ animationDelay: '180ms' }}>
          The complete archive, from the desert road to Lake Como. Every photograph is
          shoppable, so tap a frame to open the suit behind it.
        </p>
      </section>

      <section className="max-w-[1300px] mx-auto px-4 md:px-10 pb-28">
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[240px] md:auto-rows-[320px] gap-3 md:gap-5">
          {lookbook.map((f, i) => {
            const product = f.product ? getProductBySlug(f.product) : null
            const inner = (
              <div className="relative w-full h-full overflow-hidden group bg-ivory">
                <img
                  src={f.src}
                  alt={f.title}
                  loading={i > 5 ? 'lazy' : undefined}
                  className="w-full h-full object-cover transition-transform duration-700 ease-signature group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-obsidian-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-450">
                  <div className="text-white text-xs tracking-wide">{f.title}</div>
                  {product && (
                    <div className="text-gold-400 text-[10px] tracking-[0.14em] uppercase mt-1">
                      Shop {product.name}
                    </div>
                  )}
                </div>
              </div>
            )
            return product ? (
              <Link key={i} to={`/suits/${product.slug}`} className={spanClass[f.span] || ''}>
                {inner}
              </Link>
            ) : (
              <div key={i} className={spanClass[f.span] || ''}>
                {inner}
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/collections"
            className="inline-block px-9 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
          >
            Shop All Suits
          </Link>
        </div>
      </section>
    </div>
  )
}
