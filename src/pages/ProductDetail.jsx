import { useState, useRef, useEffect } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
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
  const wide = useMediaQuery('(min-width: 1024px)')

  // the pinned buy bar on phones shows whenever the main button is off screen
  const ctaRef = useRef(null)
  const [ctaVisible, setCtaVisible] = useState(true)
  useEffect(() => {
    const el = ctaRef.current
    if (!el || wide) return
    const io = new IntersectionObserver(([e]) => setCtaVisible(e.isIntersecting), {
      rootMargin: '-64px 0px 0px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [wide, slug])

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
    <div className="pt-16 md:pt-20">
      <div className="lg:grid lg:grid-cols-[60%_40%]">
        {wide ? (
          /* desktop: scrolling image column, the craft story */
          <div className="relative px-4 md:px-6 space-y-5">
            {product.gallery.map((shot, i) => (
              <figure key={i} className="relative m-0">
                <img
                  src={shot.src}
                  alt={shot.caption || `${product.name}, view ${i + 1}`}
                  className="w-full object-cover rounded-2xl card-raise"
                  loading={i > 1 ? 'lazy' : undefined}
                />
                {shot.caption && (
                  <figcaption className="px-6 md:px-12 py-6 text-sm text-obsidian-600 leading-relaxed max-w-[480px]">
                    <span className="text-obsidian-500 uppercase tracking-[0.14em] text-[11px] block mb-1.5">
                      {shot.caption.split(' · ')[0]}
                    </span>
                    {shot.caption.split(' · ')[1]}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : (
          /* phones and tablets: the same photos as a swipe, so the name, price
             and buy button are one thumb-scroll away instead of six photos down */
          <MobileGallery gallery={product.gallery} name={product.name} />
        )}

        {/* pinned right panel */}
        <div className="px-6 md:px-12 pt-6 pb-10 lg:py-0">
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto lg:py-12">
            <span className="text-[11px] tracking-widest2 uppercase text-obsidian-500">
              {product.mill}
            </span>
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display text-4xl md:text-5xl text-obsidian-900 mt-2 md:mt-3">
                {product.name}
              </h1>
              <WishlistButton productId={product.id} className="mt-2 md:mt-4 shrink-0 !w-11 !h-11 border border-obsidian-900/10" />
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
                className="flex items-center gap-2 mt-3 text-sm text-obsidian-600 hover:text-obsidian-500 transition-colors duration-300 w-fit"
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
              <div className="flex items-center gap-4 mt-6 md:mt-7 pt-6 border-t border-obsidian-900/10">
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

            <div className="text-2xl text-obsidian-900 mt-6 md:mt-7">
              {formatMoney(product.price)}{' '}
              <span className="text-xs text-obsidian-500 uppercase">{currencyCode()}</span>
            </div>

            {/* CTA row: bookmark / customize with the price stated on the button */}
            <div ref={ctaRef} className="flex items-stretch gap-3 mt-6 md:mt-8">
              <button
                aria-label="Save for later"
                onClick={() => setPanel('save')}
                className="w-[54px] rounded-full btn btn-outline !px-0 shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 3h12v18l-6-4-6 4V3Z" />
                </svg>
              </button>
              <button
                onClick={() => setPanel('custom')}
                className="btn btn-primary flex-1"
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
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-14 md:py-20 border-t border-obsidian-900/10">
        <h2 className="font-display text-3xl text-obsidian-900 mb-8 md:mb-10 text-center">You may also like</h2>
        <div className="snap-row gap-4 -mx-6 px-6 pb-4 -mb-4 sm:mx-0 sm:px-0 sm:pb-0 sm:mb-0 sm:grid sm:grid-cols-3 md:gap-8 sm:overflow-visible">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 3)
            .map((p) => (
              <Link key={p.id} to={`/suits/${p.slug}`} className="group w-[62%] sm:w-auto">
                <div className="aspect-[3/4] bg-ivory overflow-hidden rounded-xl card-raise mb-4">
                  <img
                    src={p.hero}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-signature group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-display text-lg md:text-xl text-obsidian-900 group-hover:text-obsidian-500 transition-colors duration-450">
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

      {/* phones and tablets: price and the buy button stay within thumb's reach */}
      {!wide && (
        <>
          <div
            className={`fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-obsidian-900/10 shadow-[0_-8px_24px_-12px_rgba(23,22,26,0.25)] transition-transform duration-450 ease-signature ${
              ctaVisible || panel ? 'translate-y-full' : 'translate-y-0'
            }`}
            aria-hidden={ctaVisible || !!panel}
          >
            <div className="max-w-[760px] mx-auto flex items-center gap-4 px-4 sm:px-6 pt-3 pb-safe">
              <div className="min-w-0 flex-1">
                <div className="font-display text-lg leading-tight text-obsidian-900 truncate">{product.name}</div>
                <div className="text-xs text-obsidian-500">
                  {formatMoney(product.price)} {currencyCode()}
                </div>
              </div>
              <button
                onClick={() => setPanel('custom')}
                tabIndex={ctaVisible ? -1 : 0}
                className="btn btn-primary !px-6 !py-3.5 shrink-0"
              >
                Customize
              </button>
            </div>
          </div>
          {/* keeps the bar from covering the last of the page */}
          <div className="h-20" aria-hidden="true" />
        </>
      )}
    </div>
  )
}

// Swipeable gallery for phones and tablets. One photo at a time on a phone,
// with the next peeking in; two on a tablet. Captions sit under each photo.
function MobileGallery({ gallery, name }) {
  const [i, setI] = useState(0)
  const rowRef = useRef(null)

  const onScroll = (e) => {
    const el = e.currentTarget
    const slide = el.firstElementChild
    if (!slide) return
    const step = slide.getBoundingClientRect().width + 12
    const n = Math.min(gallery.length - 1, Math.round(el.scrollLeft / step))
    if (n !== i) setI(n)
  }

  const [kicker, line] = (gallery[i]?.caption || '').split(' · ')

  const goTo = (n) => {
    const el = rowRef.current
    const slide = el?.children[n]
    if (slide) el.scrollTo({ left: slide.offsetLeft - 16, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={rowRef}
        onScroll={onScroll}
        className="snap-row gap-3 px-4 sm:px-6"
        style={{ scrollPaddingInline: '1rem' }}
        aria-label={`${name} photos`}
      >
        {gallery.map((shot, n) => (
          <div key={n} className="w-[86%] sm:w-[58%] md:w-[46%] aspect-[4/5] rounded-2xl overflow-hidden bg-ivory">
            <img
              src={shot.src}
              alt={shot.caption || `${name}, view ${n + 1}`}
              loading={n > 1 ? 'lazy' : undefined}
              draggable="false"
              className="w-full h-full object-cover select-none"
            />
          </div>
        ))}
        {/* lets the last photo snap fully into place */}
        <span className="w-px" aria-hidden="true" />
      </div>

      {gallery.length > 1 && (
        <div className="flex justify-center gap-1 pt-3">
          {gallery.map((_, n) => (
            <button
              key={n}
              onClick={() => goTo(n)}
              aria-label={`Show photo ${n + 1} of ${gallery.length}`}
              aria-current={n === i}
              className="h-6 px-1 flex items-center"
            >
              <span
                className={`block h-[3px] rounded-full transition-all duration-500 ${
                  n === i ? 'w-6 bg-obsidian-900' : 'w-3 bg-obsidian-900/20'
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* the craft note for whichever photo is showing */}
      {kicker && (
        <p key={i} className="reveal px-6 sm:px-8 pt-3 text-[13px] text-obsidian-600 leading-relaxed max-w-[560px]">
          <span className="text-obsidian-500 uppercase tracking-[0.14em] text-[10px] block mb-0.5">{kicker}</span>
          {line}
        </p>
      )}
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
