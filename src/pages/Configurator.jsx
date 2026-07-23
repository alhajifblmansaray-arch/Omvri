import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { configuratorSteps } from '../data/products'
import {
  defaultConfig,
  resolveConfig,
  configToParams,
  paramsToConfig,
  configLineItem,
} from '../lib/config'
import { useCart } from '../context/CartContext'
import { useMeasurements } from '../context/MeasurementsContext'
import { formatMoney, currencyCode } from '../lib/currency'

export default function Configurator() {
  const location = useLocation()
  const navigate = useNavigate()
  const { slug } = useParams()
  const { addItem } = useCart()
  const measurements = useMeasurements()

  // Restore a shared build from the URL, else start from the slug in the path,
  // else the first house look. Runs once on mount.
  const [config, setConfig] = useState(() => {
    return paramsToConfig(location.search) || defaultConfig(slug || products[0].slug)
  })

  const [copied, setCopied] = useState(false)
  const [attachMeasurements, setAttachMeasurements] = useState(false)

  const { base, selections, price, preview } = useMemo(
    () => resolveConfig(config),
    [config],
  )

  const hasMeasurements = Object.keys(measurements.values || {}).length > 0

  // Keep the address bar in sync with the build so it's always refreshable and
  // shareable — replace (not push) so we don't flood browser history.
  useEffect(() => {
    const qs = configToParams(config)
    navigate(`/configure?${qs}`, { replace: true })
  }, [config, navigate])

  const choose = useCallback((stepId, code) => {
    setConfig((c) => ({ ...c, [stepId]: code }))
    setCopied(false)
  }, [])

  const setBase = useCallback((baseSlug) => {
    setConfig((c) => ({ ...c, base: baseSlug }))
    setCopied(false)
  }, [])

  const share = async () => {
    const url = `${window.location.origin}/configure?${configToParams(config)}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard blocked — drop the link in the address bar so it can be copied
      navigate(`/configure?${configToParams(config)}`, { replace: true })
    }
  }

  const addToBag = () => {
    const item = configLineItem(config, {
      measurements: attachMeasurements && hasMeasurements ? measurements.snapshot() : null,
    })
    addItem(item)
    navigate('/cart')
  }

  return (
    <div className="pt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 lg:py-16">
        <div className="text-center mb-10 lg:mb-14">
          <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-4 block">
            Build Your Own
          </span>
          <h1 className="reveal font-display text-4xl md:text-6xl text-obsidian-900">
            The Configurator
          </h1>
          <p className="reveal text-obsidian-400 text-sm max-w-[460px] mx-auto mt-5 leading-relaxed">
            Start from a house look and make it yours — cloth, lapel, button, lining.
            The price moves as you do. Save the link to sleep on it.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_440px] lg:gap-14 items-start">
          {/* live preview */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-ivory border border-obsidian-900/10 overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  key={preview}
                  src={preview}
                  alt={`${base.name} — bespoke build`}
                  className="reveal w-full h-full object-cover object-top"
                />
              </div>
              {/* current build, at a glance */}
              <div className="grid grid-cols-4 border-t border-obsidian-900/10 divide-x divide-obsidian-900/10">
                {selections.map((s) => (
                  <div key={s.stepId} className="p-3 text-center">
                    <div className="w-full aspect-square mb-2 overflow-hidden bg-white">
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[9px] tracking-[0.12em] uppercase text-obsidian-400">
                      {s.label}
                    </div>
                    <div className="text-[11px] text-obsidian-900 leading-tight mt-0.5">
                      {s.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-xs text-obsidian-400 mt-4">
              Preview shows the cloth on {base.name}. Final garment is cut and hand-finished to order.
            </p>
          </div>

          {/* options */}
          <div className="mt-12 lg:mt-0">
            {/* starting look */}
            <Group label="Starting from" hint={`${base.mill}`}>
              <div className="flex flex-wrap gap-2">
                {products.map((p) => {
                  const active = p.slug === base.slug
                  return (
                    <button
                      key={p.slug}
                      onClick={() => setBase(p.slug)}
                      className={`px-4 py-2.5 text-xs border transition-colors duration-300 ${
                        active
                          ? 'border-gold-700 text-obsidian-900 bg-gold-700/5'
                          : 'border-obsidian-900/15 text-obsidian-400 hover:text-obsidian-900 hover:border-obsidian-900/40'
                      }`}
                    >
                      {p.name}
                    </button>
                  )
                })}
              </div>
            </Group>

            {/* the four construction steps */}
            {configuratorSteps.map((step) => {
              const current = config[step.id]
              return (
                <Group key={step.id} label={step.label}>
                  <div className="grid grid-cols-1 gap-2">
                    {step.options.map((opt) => {
                      const active = opt.code === current
                      return (
                        <button
                          key={opt.code}
                          onClick={() => choose(step.id, opt.code)}
                          aria-pressed={active}
                          className={`flex items-center gap-4 p-2.5 border text-left transition-colors duration-300 ${
                            active
                              ? 'border-gold-700 bg-gold-700/5'
                              : 'border-obsidian-900/12 hover:border-obsidian-900/40'
                          }`}
                        >
                          <span className="w-12 h-12 shrink-0 overflow-hidden bg-ivory">
                            <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                          </span>
                          <span className="flex-1">
                            <span className="block text-sm text-obsidian-900">{opt.name}</span>
                            <span className="block text-[11px] text-obsidian-400 mt-0.5">
                              {opt.priceDelta === 0
                                ? 'Included'
                                : opt.priceDelta > 0
                                  ? `+ ${formatMoney(opt.priceDelta)}`
                                  : `– ${formatMoney(Math.abs(opt.priceDelta))}`}
                            </span>
                          </span>
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              active ? 'border-gold-700 text-gold-700' : 'border-obsidian-900/20 text-transparent'
                            }`}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M4 12l5 5L20 6" />
                            </svg>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </Group>
              )
            })}

            {/* measurements attach */}
            {hasMeasurements && (
              <label className="flex items-start gap-3 mt-8 p-4 border border-obsidian-900/12 cursor-pointer">
                <input
                  type="checkbox"
                  checked={attachMeasurements}
                  onChange={(e) => setAttachMeasurements(e.target.checked)}
                  className="mt-0.5 accent-gold-700 w-4 h-4"
                />
                <span className="text-sm text-obsidian-900">
                  Cut to my saved measurements
                  <span className="block text-[11px] text-obsidian-400 mt-0.5">
                    Attach the measurements on file so this suit is made to your size.
                  </span>
                </span>
              </label>
            )}

            {/* price + actions */}
            <div className="mt-8 pt-6 border-t border-obsidian-900/10">
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-sm tracking-[0.12em] uppercase text-obsidian-400">Your price</span>
                <span className="font-display text-3xl text-obsidian-900">
                  {formatMoney(price)}{' '}
                  <span className="text-[11px] text-obsidian-400 uppercase">{currencyCode()}</span>
                </span>
              </div>

              <button
                onClick={addToBag}
                className="w-full bg-obsidian-900 text-white py-4 text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
              >
                Add to bag — {formatMoney(price)}
              </button>
              <button
                onClick={share}
                className="w-full mt-3 border border-obsidian-900/20 text-obsidian-900 py-4 text-[11px] tracking-[0.16em] uppercase hover:border-obsidian-900 transition-colors duration-450"
              >
                {copied ? 'Link copied ✓' : 'Save & share this build'}
              </button>
              <p className="text-xs text-obsidian-400 text-center mt-3">
                The link rebuilds this exact configuration — send it to whoever gets a say.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group({ label, hint, children }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-[11px] tracking-[0.16em] uppercase text-obsidian-900">{label}</h2>
        {hint && <span className="text-[11px] text-obsidian-400">{hint}</span>}
      </div>
      {children}
    </div>
  )
}
