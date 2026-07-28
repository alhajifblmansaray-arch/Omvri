// Orders are persisted locally — there is no payment backend yet, so nothing
// here talks to a processor. Swap createOrder's body for the real API call
// when one exists; the shape below is what the atelier needs to cut a suit.

import { currencyCode } from './currency'

const STORAGE_KEY = 'omvri-orders'

// Tax follows the visitor's market. Canada charges 13% HST; other regions show
// no tax in this demo rather than inventing a rate (US sales tax varies by state,
// EU prices are usually tax-inclusive). Wire in real tax rules per market later.
function taxFor(code) {
  if (code === 'CAD') return { rate: 0.13, label: 'HST' }
  return { rate: 0, label: 'Sales tax' }
}

export function orderTotals(items, giftWrap = false) {
  const subtotal = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0)
  const shipping = 0
  const { rate, label } = taxFor(currencyCode())
  const tax = Math.round(subtotal * rate * 100) / 100
  return { subtotal, shipping, tax, taxLabel: label, giftWrap, total: subtotal + shipping + tax }
}

function orderNumber() {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `OMV-${n}`
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

// `method` records how it was paid: a wallet name for express, or 'card'.
export function createOrder({ items, contact, shipping, method, giftWrap }) {
  const totals = orderTotals(items, giftWrap)
  const order = {
    id: orderNumber(),
    placedAt: Date.now(),
    // measurements ride along on each line item, so the order is self-contained
    items,
    contact,
    shipping,
    method,
    giftWrap,
    totals,
    status: 'confirmed',
    eta: '3 to 5 weeks',
  }
  const all = readAll()
  all.unshift(order)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  return order
}

export function getOrder(id) {
  return readAll().find((o) => o.id === id) || null
}

export function getAllOrders() {
  return readAll()
}
