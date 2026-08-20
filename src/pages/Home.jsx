import { Link } from 'react-router-dom'
import { featuredProducts } from '../data/products'
import { formatMoney } from '../lib/currency'
import { testimonials, lookbook, craft } from '../data/content'
import Stars, { ratingFor } from '../components/Stars'

export default function Home() {
  return (
    <div>
      {/* full-bleed video hero */}
      <section className="relative h-[100svh] overflow-hidden bg-ivory">
        <video
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
          src="/video/hero.mp4"
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      {/* shoppable strip sits directly under the hero, before any essay */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pt-20 pb-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[11px] tracking-widest2 uppercase text-obsidian-500 block mb-3">
              The Featured Edit
            </span>
            <h3 className="font-display text-3xl md:text-4xl text-obsidian-900">
              Cutting most this season
            </h3>
          </div>
          <Link to="/featured" className="text-[11px] tracking-[0.16em] uppercase text-obsidian-500 hover:text-obsidian-900 transition-colors duration-450 shrink-0">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts().map((p) => {
            const rating = ratingFor(p.id)
            return (
              <Link key={p.id} to={`/suits/${p.slug}`} className="group bg-white rounded-xl overflow-hidden card-raise">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.hero}
                    alt={p.name}
                    className={`w-full h-full object-cover transition-transform duration-[700ms] ease-signature group-hover:scale-105 ${
                      p.id === 'vesper-ivory' ? 'object-[center_14%]' : 'object-top'
                    }`}
                  />
                </div>
                <div className="px-4 pt-5 pb-6">
                  <div className="text-obsidian-900 font-display text-xl group-hover:text-obsidian-500 transition-colors duration-450">
                    {p.name}
                  </div>
                  <div className="text-obsidian-600 text-sm mt-1">
                    {p.fabric} · {formatMoney(p.price)}
                  </div>
                  {rating && (
                    <span className="flex items-center gap-1.5 mt-2">
                      <Stars n={Math.round(rating.avg)} size={11} />
                      <span className="text-xs text-obsidian-500">({rating.count})</span>
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* editorial intro */}
      <section id="about" className="max-w-[900px] mx-auto px-6 pb-28 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-obsidian-900 mb-6 leading-snug">
          Every stitch placed by hand, every measurement taken in person.
        </h2>
        <p className="text-obsidian-600 text-base leading-relaxed max-w-[560px] mx-auto">
          Omvri works with a small circle of mills across Italy and England, cutting each
          garment to the individual, not the size chart. The result is a suit that fits
          the way a bespoke suit should: like it was never made for anyone else.
        </p>
      </section>

      {/* weddings and parties, copy sits in the banner's open left side */}
      <section className="relative border-y border-obsidian-900/10 bg-[#e9e1d6]">
        {/* banner: background on desktop, stacked image on small screens */}
        <img
          src="/images/looks/party/banner.jpg"
          alt="Five men in black tie, dressed by the atelier"
          loading="lazy"
          className="w-full h-[52vw] max-h-[300px] object-cover object-right md:absolute md:inset-0 md:h-full md:max-h-none"
        />

        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 py-14 md:py-32">
          <div className="max-w-[520px] md:max-w-[46%]">
            <span className="text-[11px] tracking-widest2 uppercase text-obsidian-500 block mb-5">
              Weddings &amp; Parties
            </span>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-obsidian-900 leading-[1.08] mb-6">
              Dressing more
              <br className="hidden sm:block" /> than one.
            </h3>
            <p className="text-obsidian-600 text-base leading-relaxed mb-9 max-w-[430px]">
              Grooms, groomsmen, whole parties. We lock one cloth and one silhouette, then cut
              every suit to the man wearing it. One point of contact, one delivery date, and
              nobody left in a rental.
            </p>

            <ul className="space-y-2.5 mb-10">
              {[
                'Six suits or more, priced together',
                'Measurements taken in person or at home',
                'Everything finished for the same date',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-obsidian-700">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-gold-600 mt-1 shrink-0">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>

            <Link
              to="/contact?topic=Wedding%20party"
              className="btn btn-primary"
            >
              Consult With Us
            </Link>
          </div>
        </div>
      </section>

      {/* craft band, the OMVRI tab */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] max-w-md w-full mx-auto overflow-hidden bg-ivory order-2 md:order-1">
          <img src={craft.image} alt="The OMVRI cuff tab, hand-embroidered in gold thread" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left order-1 md:order-2">
          <span className="text-[11px] tracking-widest2 uppercase text-obsidian-500 block mb-5">
            The Signature
          </span>
          <h3 className="font-display text-4xl md:text-5xl text-obsidian-900 leading-[1.1] mb-6">
            One tab, sewn by hand,
            <br /> on every finished cuff.
          </h3>
          <p className="text-obsidian-400 text-sm leading-relaxed max-w-[420px] mx-auto md:mx-0 mb-10">
            The last stitch of every OMVRI garment is the same: the house tab, embroidered in
            gold thread and set beside the working buttons. It goes on only when the cutter is
            satisfied, which takes longer than you would think.
          </p>
          <Link
            to="/house"
            className="btn btn-outline"
          >
            Inside the House
          </Link>
        </div>
      </section>

      {/* testimonials */}
      <section className="bg-ivory border-y border-obsidian-900/10">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-24">
          <h3 className="font-display text-3xl md:text-4xl text-obsidian-900 text-center mb-16">
            Worn and vouched for.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <figure key={t.name} className="border-t border-obsidian-900/15 pt-6">
                <div className="text-obsidian-500 mb-4" aria-hidden="true">★★★★★</div>
                <blockquote className="text-sm text-obsidian-900 leading-relaxed mb-5">
                  “{t.quote}”
                </blockquote>
                <figcaption className="text-xs text-obsidian-400">
                  {t.name}, {t.city}
                  <span className="block text-obsidian-500 mt-0.5">{t.suit}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* lookbook teaser */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-28">
        <div className="flex items-end justify-between mb-10">
          <h3 className="font-display text-3xl text-obsidian-900">From the Lookbook</h3>
          <Link to="/lookbook" className="text-[11px] tracking-[0.16em] uppercase text-obsidian-500 hover:text-obsidian-900 transition-colors duration-450">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {lookbook.slice(0, 4).map((f) => (
            <Link key={f.src} to="/lookbook" className="group relative aspect-[3/4] overflow-hidden bg-ivory">
              <img
                src={f.src}
                alt={f.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-signature group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-obsidian-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-450">
                <span className="text-white text-xs tracking-wide">{f.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
