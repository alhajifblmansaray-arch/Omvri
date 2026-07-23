// Orders are persisted locally — there is no payment backend yet, so nothing
// here talks to a processor. Swap createOrder's body for the real API call
// when one exists; the shape below is what the atelier needs to cut a suit.

const STORAGE_KEY = 'omvri-orders'
export const TAX_RATE = 0.13 // HST

// toLocaleString drops trailing zeros ($245.7); money always wants two places.
export function money(n) {
  return n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function orderTotals(items, giftWrap = false) {
  const subtotal = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0)
  const shipping = 0
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  return { subtotal, shipping, tax, giftWrap, total: subtotal + shipping + tax }
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
