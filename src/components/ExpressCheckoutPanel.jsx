import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../lib/orders'
import OrderSummary from './OrderSummary'

// Express skips the checkout form because the wallet already holds the
// customer's contact, address and payment method. In a real integration each
// button hands off to that provider's sheet; here we stand in for the
// authorization and use the details the wallet would have returned.
const wallets = [
  { id: 'apple', label: 'Apple Pay', glyph: '' },
  { id: 'google', label: 'Google Pay', glyph: 'G' },
  { id: 'paypal', label: 'PayPal', glyph: 'P' },
]

// what a wallet would hand back after the customer authorizes
const walletProfile = {
  email: 'wallet@omvri.com',
  name: 'Wallet Customer',
  address: '1 Atelier Lane',
  city: 'Toronto',
  postal: 'M5V 2T6',
  country: 'Canada',
}

export default function ExpressCheckoutPanel({ onClose }) {
  const { items, clear } = useCart()
  const navigate = useNavigate()
  const [authorizing, setAuthorizing] = useState(null)

  const pay = (wallet) => {
    setAuthorizing(wallet.id)
    // stand-in for the wallet's authorization sheet
    setTimeout(() => {
      const order = createOrder({
        items,
        contact: { email: walletProfile.email },
        shipping: {
          name: walletProfile.name,
          address: walletProfile.address,
          city: walletProfile.city,
          postal: walletProfile.postal,
          country: walletProfile.country,
        },
        method: wallet.label,
      })
      clear()
      onClose?.()
      navigate(`/order/${order.id}`)
    }, 900)
  }

  return (
    <div className="flex flex-col h-full">
      <p className="text-sm text-obsidian-400 leading-relaxed mb-6">
        Pay in one step. Your wallet supplies the email, shipping address and payment method —
        no forms to fill in.
      </p>

      <div className="space-y-3 mb-8">
        {wallets.map((w) => (
          <button
            key={w.id}
            onClick={() => pay(w)}
            disabled={!!authorizing}
            className={`w-full py-4 flex items-center justify-center gap-2.5 text-sm transition-colors duration-450 ${
              authorizing === w.id
                ? 'bg-obsidian-700 text-white'
                : 'bg-obsidian-900 text-white hover:bg-gold-700 disabled:opacity-40'
            }`}
          >
            <span className="text-base leading-none">{w.glyph}</span>
            {authorizing === w.id ? 'Authorizing…' : `Pay with ${w.label}`}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-obsidian-400 mb-8">
        <span className="flex-1 h-px bg-obsidian-900/10" />
        or use the full checkout
        <span className="flex-1 h-px bg-obsidian-900/10" />
      </div>

      <button
        onClick={() => {
          onClose?.()
          navigate('/checkout')
        }}
        className="w-full border border-obsidian-900/20 text-obsidian-900 py-4 text-[11px] tracking-[0.16em] uppercase hover:border-obsidian-900 transition-colors duration-450 mb-8"
      >
        Enter details manually
      </button>

      <OrderSummary items={items} compact />

      <p className="text-xs text-obsidian-400 leading-relaxed mt-6">
        Demo only — no wallet is contacted and no payment is taken.
      </p>
    </div>
  )
}
