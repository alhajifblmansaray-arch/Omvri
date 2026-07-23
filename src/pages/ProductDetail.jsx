import { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getProductBySlug } from '../data/products'
import { formatMoney, currencyCode } from '../lib/currency'
import { useCart } from '../context/CartContext'
import SidePanel from '../components/SidePanel'
import ShopTheLookPanel from '../components/ShopTheLookPanel'
import SaveForLaterPanel from '../components/SaveForLaterPanel'
import CustomMeasurementsPanel from '../components/CustomMeasurementsPanel'

const accordionSections = [
  {
    title: 'Size & Fit',
    body: 'Cut to a tailored fit: trim through the chest and waist without pulling, with room in the blade for movement. Between sizes, size up — the atelier takes it in at your fitting.',
  },
  {
    title: 'Details & Care',
    body: 'Half canvas construction, hand-set collar, functional four-button cuffs. Dry clean sparingly; steam between wears and rest the garment a day between outings.',
  },
  {
    title: 'Delivery and Returns',
    body: 'Free shipping and returns. Delivery in 2 to 4 business days, cut to your measurements. Pick-up in store and get it customized at no charge.',
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
    setPanel('look')
  }

  return (
    <div className="pt-20">
      <div className="lg:grid lg:grid-cols-[60%_40%]">
        {/* scrolling image column — the craft story */}
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
                <figcaption className="px-6 md:px-12 py-6 text-sm text-obsidian-400 leading-relaxed max-w-[480px]">
                  <span className="text-gold-700 uppercase tracking-[0.14em] text-[11px] block mb-1.5">
                    {shot.caption.split(' — ')[0]}
                  </span>
                  {shot.caption.split(' — ')[1]}
                </figcaption>
              )}
            </figure>
          ))}

          {/* floating contextual cross-sell pill */}
          <button
            onClick={() => setPanel('look')}
            className="sticky bottom-8 ml-6 md:ml-12 mb-8 inline-flex items-center gap-2.5 bg-white/90 backdrop-blur px-6 py-3.5 rounded-full text-sm text-obsidian-900 shadow-lg border border-obsidian-900/10 hover:border-gold-700 transition-colors duration-450"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 8h12l-1 13H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            Shop the Look
          </button>
        </div>

        {/* pinned right panel */}
        <div className="px-6 md:px-12 py-10 lg:py-0">
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto lg:py-12">
            <span className="text-[11px] tracking-widest2 uppercase text-gold-700">
              {product.mill}
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-obsidian-900 mt-3">
              {product.name}
            </h1>
            <div className="text-obsidian-400 text-sm mt-2">{product.fabric}</div>
            <div className="text-xl text-obsidian-900 mt-5">
              {formatMoney(product.price)}{' '}
              <span className="text-xs text-obsidian-400 uppercase">{currencyCode()}</span>
            </div>

            <p className="text-sm text-obsidian-400 leading-relaxed mt-6 max-w-[420px]">
              {product.description}
            </p>

            {/* CTA row: bookmark / customize / select size */}
            <div className="flex items-stretch gap-3 mt-9">
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
                Customize
              </button>
            </div>

            <div className="flex items-center gap-6 mt-8 text-xs text-obsidian-400">
              <span className="flex items-center gap-2">
                <Check /> Free shipping &amp; returns
              </span>
              <span className="flex items-center gap-2">
                <Check /> Pick-up in store, customized
              </span>
            </div>

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
        open={panel === 'look'}
        onClose={() => setPanel(null)}
        title="Shop the Look"
      >
        <ShopTheLookPanel />
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
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-700">
      <path d="M4 12l5 5L20 6" />
    </svg>
  )
}
