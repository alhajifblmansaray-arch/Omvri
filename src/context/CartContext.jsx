import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'omvri-bag'

function loadItems() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item) => {
    setItems((prev) => [...prev, { ...item, lineId: `${item.id}-${Date.now()}` }])
    setLastAdded(item)
  }, [])

  const removeItem = useCallback((lineId) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId))
  }, [])

  const updateItem = useCallback((lineId, patch) => {
    setItems((prev) => prev.map((i) => (i.lineId === lineId ? { ...i, ...patch } : i)))
  }, [])

  const clearLastAdded = useCallback(() => setLastAdded(null), [])

  // emptied once an order is placed
  const clear = useCallback(() => setItems([]), [])

  const total = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateItem, clear, total, lastAdded, clearLastAdded }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
