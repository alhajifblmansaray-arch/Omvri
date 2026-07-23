// The bespoke-build data model. Every configured suit is one plain object:
//
//   { base: <product slug>, fabric: <code>, lapel: <code>, button: <code>, lining: <code> }
//
// This is the schema the whole roadmap hangs off of — cart line items, the
// shareable URL, the wardrobe portal, and the tailor's cut-sheet all read this
// exact shape. It is deliberately flat and code-based so it maps 1:1 onto
// Shopify line-item properties (or metafields) later without a rebuild:
// each key becomes a property, each value is a stable option code.

import { configuratorSteps, products, getProductBySlug } from '../data/products'

// step ids in canonical order: ['fabric','lapel','button','lining']
export const STEP_IDS = configuratorSteps.map((s) => s.id)

// A made-to-order suit starts at a flat bespoke base (USD), independent of which
// house look it starts from — premade looks are $999, a bespoke build is $1,500
// before any premium-option upgrades.
export const CUSTOM_BASE_PRICE = 1500

function stepOf(stepId) {
  return configuratorSteps.find((s) => s.id === stepId)
}

function optionOf(stepId, code) {
  return stepOf(stepId)?.options.find((o) => o.code === code) || null
}

// A fresh build: first option of every step, starting from a house look.
export function defaultConfig(baseSlug = products[0].slug) {
  const base = getProductBySlug(baseSlug) ? baseSlug : products[0].slug
  const cfg = { base }
  configuratorSteps.forEach((s) => {
    cfg[s.id] = s.options[0].code
  })
  return cfg
}

// Turn a config into rich, display-ready data + a live price.
// `selections` is the ordered list the cart, order, and cut-sheet all render.
export function resolveConfig(config) {
  const base = getProductBySlug(config.base) || products[0]

  const selections = configuratorSteps.map((step) => {
    const opt = optionOf(step.id, config[step.id]) || step.options[0]
    return {
      stepId: step.id,
      label: step.label,
      code: opt.code,
      name: opt.name,
      priceDelta: opt.priceDelta,
      image: opt.image,
    }
  })

  const price = CUSTOM_BASE_PRICE + selections.reduce((sum, s) => sum + s.priceDelta, 0)

  // Fabric drives the main garment preview; the other three read as swatches.
  // When true per-option isolated photography exists, this becomes a stacked
  // <img> composite (base → lapel → button → lining) with no schema change.
  const fabric = selections.find((s) => s.stepId === 'fabric')
  const preview = fabric?.image || base.hero

  return { base, selections, price, preview }
}

// config <-> URL query string, for the shareable "save your build" link.
export function configToParams(config) {
  const p = new URLSearchParams()
  p.set('base', config.base)
  configuratorSteps.forEach((s) => p.set(s.id, config[s.id]))
  return p.toString()
}

// Reconstruct a build from a URL. Returns null if there's nothing to restore;
// unknown option codes fall back to the first option rather than breaking.
export function paramsToConfig(search) {
  const p = new URLSearchParams(search)
  const base = p.get('base')
  if (!base || !getProductBySlug(base)) return null

  const cfg = { base }
  configuratorSteps.forEach((s) => {
    const code = p.get(s.id)
    cfg[s.id] = optionOf(s.id, code) ? code : s.options[0].code
  })
  return cfg
}

// Build a cart line item from a config. `measurements` (optional) is a snapshot
// from MeasurementsContext — when present the suit is cut to size, not just spec.
export function configLineItem(config, { measurements } = {}) {
  const { base, selections, price, preview } = resolveConfig(config)
  const hasMeasurements = !!(measurements && Object.keys(measurements.values || {}).length)

  return {
    id: `custom-${base.slug}`,
    name: `${base.name} — Bespoke`,
    price,
    image: preview,
    configured: true,
    custom: hasMeasurements,
    // the full build rides along on the line item, so the order is self-contained
    config: { ...config, selections },
    measurements: hasMeasurements ? measurements : null,
    delivery: '3 to 5 weeks',
    qty: 1,
  }
}
