import { useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { getProductBySlug, products } from '../data/products'
import { formatMoney, currencyCode } from '../lib/currency'
import { useCart } from '../context/CartContext'
import SidePanel from '../components/SidePanel'
import SaveForLaterPanel from '../components/SaveForLaterPanel'
import CustomMeasurementsPanel from '../components/CustomMeasurementsPanel'
import WishlistButton from '../components/WishlistButton'
import Reviews from '../components/Reviews'
import Stars, { ratingFor } from '../components/Stars'
import PartyBand from '../components/PartyBand'
import SpecBlock from '../components/SpecBlock'

// The education stack. Same four headings on every suit so the page reads the
// same way twice, which is the point of a template.
const accordionSections = [
  {
    title: 'The Construction',
    body: 'Half canvas through the chest, hand set collar, functional four button cuffs and a hand finished buttonhole. The canvas floats against the cloth rather than being fused to it, which is why the jacket takes the shape of your chest over time instead of fighting it.',
  },
  {
    title: 'Fit & Sizing',
    body: 'Cut to a tailored fit: trim through the chest and waist without pulling, with room in the blade for movement. Every suit is cut to the twelve measurements you give us, so there is no size to choose. If you are unsure of a number, the guide walks you through taking it.',
  },
  {
    title: 'Care & Repairs',
    body: 'Brush after wearing and rest the suit a day between outings. Dry clean two or three times a year at most, and steam rather than iron the lapel roll. If we made it, we mend it: buttons, linings, seams and edges, for as long as the garment lives.',
  },
  {
    title: 'Delivery & Returns',
    body: 'Free delivery and returns. Your cloth is cut after you order and the suit arrives in three to five weeks, pressed and hung in a rigid garment box with signature on delivery. First alterations are on the house.',
  },
]

export default function ProductDetail() {
  const { slug } = useParams()
  const location = useLocation()
  const product = getProductBySlug(slug)
  const { addItem } = useCart()

  // returning from the measurement guide reopens Customize where it was left
  const resume = location.state?.openCustomize
  const [panel, setPanel] = useState(resume ? 'custom' : null) // null | 'custom' | 'look' | 'save'
  const [openSection, setOpenSection] = useState(null)
  const rating = ratingFor(product?.id)

  if (!product) {
    return <div className="pt-40 text-center text-obsidian-400 py-40">Suit not found.</div>
  }

  const handleAddCustom = ({ measurements }) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.hero,
      custom: true,
      measurements,
      qty: 1,
      delivery: '3 to 5 weeks · made to measure',
    })
    setPanel(null)
  }

  return (
    <div className="pt-20">
      <div className="lg:grid lg:grid-cols-[60%_40%]">
        {/* scrolling image column, the craft story */}
        <div className="relative">
          {product.gallery.map((shot, i) => (
            <figure key={i} className="relative m-0">
              <img
                src={shot.src}
                alt={shot.caption || `${product.name}, view ${i + 1}`}
                className="w-full object-cover"
                loading={i > 1 ? 'lazy' : undefined}
              />
              {shot.caption && (
                <figcaption className="px-6 md:px-12 py-6 text-sm text-obsidian-600 leading-relaxed max-w-[480px]">
                  <span className="text-gold-700 uppercase tracking-[0.14em] text-[11px] block mb-1.5">
                    {shot.caption.split(' · ')[0]}
                  </span>
                  {shot.caption.split(' · ')[1]}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {/* pinned right panel */}
        <div className="px-6 md:px-12 py-10 lg:py-0">
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto lg:py-12">
            <span className="text-[11px] tracking-widest2 uppercase text-gold-700">
              {product.mill}
            </span>
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display text-4xl md:text-5xl text-obsidian-900 mt-3">
                {product.name}
              </h1>
              <WishlistButton productId={product.id} className="mt-4 border border-obsidian-900/10" />
            </div>
            {product.descriptor && (
              <div className="text-[11px] tracking-[0.14em] uppercase text-obsidian-500 mt-2">
                {product.descriptor}
              </div>
            )}
            {/* rating sits with the price, not buried at the foot of the page */}
            {rating && (
              <a
                href="#reviews"
                className="flex items-center gap-2 mt-3 text-sm text-obsidian-600 hover:text-gold-700 transition-colors duration-300 w-fit"
              >
                <Stars n={Math.round(rating.avg)} size={13} />
                <span className="text-obsidian-900">{rating.avg.toFixed(1)}</span>
                <span className="text-obsidian-500">
                  ({rating.count} review{rating.count > 1 ? 's' : ''})
                </span>
              </a>
            )}

            <p className="text-[15px] text-obsidian-600 leading-relaxed mt-5 max-w-[420px]">
              {product.description}
            </p>

            {/* the cloth, shown rather than only named. stands where a beauty
                brand would put its shade selector. */}
            {product.swatch && (
              <div className="flex items-center gap-4 mt-7 pt-6 border-t border-obsidian-900/10">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-ivory shrink-0 ring-1 ring-obsidian-900/10">
                  <img src={product.swatch} alt={product.fabric} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.16em] uppercase text-obsidian-500 mb-1">
                    The cloth
                  </div>
                  <div className="text-sm text-obsidian-900">{product.fabric}</div>
                  <div className="text-xs text-obsidian-500 mt-0.5">{product.mill}</div>
                </div>
              </div>
            )}

            <div className="text-2xl text-obsidian-900 mt-7">
              {formatMoney(product.price)}{' '}
              <span className="text-xs text-obsidian-500 uppercase">{currencyCode()}</span>
            </div>

            {/* CTA row: bookmark / customize with the price stated on the button */}
            <div className="flex items-stretch gap-3 mt-8">
              <button
                aria-label="Save for later"
                onClick={() => setPanel('save')}
                className="w-[52px] border border-obsidian-900/15 flex items-center justify-center text-obsidian-900 hover:border-gold-700 hover:text-gold-700 transition-colors duration-450"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 3h12v18l-6-4-6 4V3Z" />
                </svg>
              </button>
              <button
                onClick={() => setPanel('custom')}
                className="flex-1 bg-obsidian-900 text-white py-4 text-[11px] tracking-[0.16em] uppercase hover:bg-gold-700 transition-colors duration-450"
              >
                Customize · {formatMoney(product.price)}
              </button>
            </div>

            <p className="text-xs text-obsidian-500 mt-3">
              Or four interest free payments of {formatMoney(product.price / 4, 2)}.
            </p>

            <ul className="mt-6 space-y-2">
              {[
                'Cut to your measurements, made to order',
                'First alterations free, repairs for life',
                'Free delivery and returns · 3 to 5 weeks',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[13px] text-obsidian-600">
                  <Check /> {line}
                </li>
              ))}
            </ul>

            {/* accordion */}
            <div className="mt-10">
              {accordionSections.map((s, i) => (
                <div key={s.title} className="accordion-item" data-open={openSection === i}>
                  <button
                    className="accordion-trigger"
                    onClick={() => setOpenSection(openSection === i ? null : i)}
                    aria-expanded={openSection === i}
                  >
                    {s.title}
                    <span className="accordion-icon text-obsidian-400">+</span>
                  </button>
                  <div className="accordion-body">
                    <div className="accordion-body-inner">
                      <div className="accordion-content">{s.body}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* what you are buying, in scannable rows */}
      <SpecBlock spec={product.spec} image={product.swatch} name={product.name} />

      {/* reviews */}
      <Reviews productId={product.id} />

      {/* house cross-sell: dress the whole party in this suit */}
      <PartyBand productName={product.name} />

      {/* related suits */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-20 border-t border-obsidian-900/10">
        <h2 className="font-display text-3xl text-obsidian-900 mb-10 text-center">You may also like</h2>
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 3)
            .map((p) => (
              <Link key={p.id} to={`/suits/${p.slug}`} className="group">
                <div className="aspect-[3/4] bg-ivory overflow-hidden mb-4">
                  <img
                    src={p.hero}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-signature group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-display text-lg md:text-xl text-obsidian-900 group-hover:text-gold-700 transition-colors duration-450">
                    {p.name}
                  </h3>
                  <span className="text-xs text-obsidian-400">{formatMoney(p.price)}</span>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* one reusable right-panel slot, content swaps by state */}
      <SidePanel
        open={panel === 'custom'}
        onClose={() => setPanel(null)}
        title="Custom Measurements"
      >
        <CustomMeasurementsPanel
          product={product}
          onAdd={handleAddCustom}
          initialStep={resume ? (location.state?.step ?? 0) : 0}
        />
      </SidePanel>

      <SidePanel
        open={panel === 'save'}
        onClose={() => setPanel(null)}
        title="Save for later"
      >
        <SaveForLaterPanel />
      </SidePanel>
    </div>
  )
}

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-gold-600 mt-1 shrink-0">
      <path d="M4 12l5 5L20 6" />
    </svg>
  )
}
