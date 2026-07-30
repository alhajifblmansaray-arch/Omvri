import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { formatMoney } from '../lib/currency'
import { testimonials, lookbook, craft } from '../data/content'

const process = [
  {
    title: 'Choose the cloth',
    body: 'Start from a house look or an empty bolt. Every cloth is milled in Italy or England and cut for one person only.',
  },
  {
    title: 'Take your measure',
    body: 'Twelve numbers, taken at home in ten minutes with a soft tape. Our guide walks you through each one.',
  },
  {
    title: 'Cut by hand',
    body: 'Your pattern is drafted from scratch and cut on the table — no grading, no size chart, no shortcuts.',
  },
  {
    title: 'The final fitting',
    body: 'The suit arrives in three to five weeks. We adjust it in the atelier until nothing needs saying.',
  },
]

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

      {/* editorial intro */}
      <section id="about" className="max-w-[900px] mx-auto px-6 py-32 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-obsidian-900 mb-6 leading-snug">
          Every stitch placed by hand, every measurement taken in person.
        </h2>
        <p className="text-obsidian-400 text-sm leading-relaxed max-w-[560px] mx-auto">
          Omvri works with a small circle of mills across Italy and England, cutting each
          garment to the individual — not the size chart. The result is a suit that fits
          the way a bespoke suit should: like it was never made for anyone else.
        </p>
      </section>

      {/* featured looks strip */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-32">
        <div className="flex items-end justify-between mb-10">
          <h3 className="font-display text-3xl text-obsidian-900">Featured Looks</h3>
          <Link to="/collections" className="text-[11px] tracking-[0.16em] uppercase text-gold-700 hover:text-gold-800 transition-colors duration-450">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-obsidian-900/10">
          {products.slice(0, 4).map((p) => (
            <Link key={p.id} to={`/suits/${p.slug}`} className="group bg-white">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.hero}
                  alt={p.name}
                  className={`w-full h-full object-cover transition-transform duration-[700ms] ease-signature group-hover:scale-105 ${
                    p.id === 'vesper-ivory' ? 'object-[center_14%]' : 'object-top'
                  }`}
                />
              </div>
              <div className="px-1 pt-5 pb-6">
                <div className="text-obsidian-900 font-display text-xl group-hover:text-gold-700 transition-colors duration-450">
                  {p.name}
                </div>
                <div className="text-obsidian-400 text-xs mt-1">{p.fabric} — {formatMoney(p.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* the atelier process — hands off into the made-to-measure flow */}
      <section className="bg-ivory border-t border-obsidian-900/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-28 md:py-32">
          <div className="max-w-[560px] mb-16">
            <span className="text-[11px] tracking-widest2 uppercase text-gold-700 block mb-5">
              The Atelier
            </span>
            <h3 className="font-display text-4xl md:text-5xl text-obsidian-900 leading-[1.1]">
              Four steps between you and a suit that fits.
            </h3>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
            {process.map((s, i) => (
              <li key={s.title} className="border-t border-obsidian-900/15 pt-6">
                <span className="font-display text-3xl text-gold-700 block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-display text-2xl text-obsidian-900 mb-3">{s.title}</h4>
                <p className="text-sm text-obsidian-400 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-20">
            <Link
              to="/collections"
              className="w-full sm:w-auto text-center px-10 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
            >
              Start Your Suit
            </Link>
            <Link
              to="/measurement-guide"
              className="w-full sm:w-auto text-center px-10 py-4 border border-obsidian-900/20 text-obsidian-900 text-[11px] tracking-[0.18em] uppercase hover:border-obsidian-900 transition-colors duration-450"
            >
              How to Measure
            </Link>
          </div>
        </div>
      </section>

      {/* craft band — the OMVRI tab */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] max-w-md w-full mx-auto overflow-hidden bg-ivory order-2 md:order-1">
          <img src={craft.image} alt="The OMVRI cuff tab, hand-embroidered in gold thread" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left order-1 md:order-2">
          <span className="text-[11px] tracking-widest2 uppercase text-gold-700 block mb-5">
            The Signature
          </span>
          <h3 className="font-display text-4xl md:text-5xl text-obsidian-900 leading-[1.1] mb-6">
            One tab, sewn by hand,
            <br /> on every finished cuff.
          </h3>
          <p className="text-obsidian-400 text-sm leading-relaxed max-w-[420px] mx-auto md:mx-0 mb-10">
            The last stitch of every OMVRI garment is the same: the house tab, embroidered in
            gold thread and set beside the working buttons. It goes on only when the cutter is
            satisfied — which takes longer than you would think.
          </p>
          <Link
            to="/house"
            className="inline-block px-9 py-4 border border-obsidian-900/20 text-obsidian-900 text-[11px] tracking-[0.18em] uppercase hover:border-obsidian-900 transition-colors duration-450"
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
                <div className="text-gold-700 mb-4" aria-hidden="true">★★★★★</div>
                <blockquote className="text-sm text-obsidian-900 leading-relaxed mb-5">
                  “{t.quote}”
                </blockquote>
                <figcaption className="text-xs text-obsidian-400">
                  {t.name}, {t.city}
                  <span className="block text-gold-700 mt-0.5">{t.suit}</span>
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
          <Link to="/lookbook" className="text-[11px] tracking-[0.16em] uppercase text-gold-700 hover:text-gold-800 transition-colors duration-450">
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
