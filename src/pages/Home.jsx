import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { formatMoney } from '../lib/currency'

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

export default function Home({ onBook }) {
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
                  className="w-full h-full object-cover object-top transition-transform duration-[700ms] ease-signature group-hover:scale-105"
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
    </div>
  )
}
