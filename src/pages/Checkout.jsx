import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder, orderTotals, money } from '../lib/orders'
import OrderSummary from '../components/OrderSummary'

const STEPS = ['Contact', 'Shipping', 'Payment', 'Review']

const required = (v) => (v && v.trim() ? null : 'Required')
const emailErr = (v) =>
  required(v) || (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Enter a valid email')
const digitsOnly = (v) => (v || '').replace(/\D/g, '')

const validators = {
  email: emailErr,
  firstName: required,
  lastName: required,
  address: required,
  city: required,
  postal: required,
  country: required,
  cardName: required,
  cardNumber: (v) => (digitsOnly(v).length === 16 ? null : 'Enter the 16-digit number'),
  expiry: (v) => (/^(0[1-9]|1[0-2])\/\d{2}$/.test(v || '') ? null : 'MM/YY'),
  cvc: (v) => ([3, 4].includes(digitsOnly(v).length) ? null : '3–4 digits'),
}

const stepFields = [
  ['email'],
  ['firstName', 'lastName', 'address', 'city', 'postal', 'country'],
  ['cardName', 'cardNumber', 'expiry', 'cvc'],
  [],
]

export default function Checkout() {
  const { items, clear } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [touched, setTouched] = useState({})
  const [form, setForm] = useState({ country: 'Canada' })

  if (items.length === 0) {
    return (
      <div className="pt-20">
        <div className="max-w-[700px] mx-auto px-6 py-40 text-center">
          <h1 className="font-display text-4xl text-obsidian-900 mb-4">Your bag is empty.</h1>
          <Link
            to="/collections"
            className="inline-block mt-6 px-9 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
          >
            Shop Collections
          </Link>
        </div>
      </div>
    )
  }

  const errOf = (k) => (validators[k] ? validators[k](form[k]) : null)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const stepOk = (n) => stepFields[n].every((k) => !errOf(k))

  const next = () => {
    setTouched((t) => ({ ...t, ...Object.fromEntries(stepFields[step].map((k) => [k, true])) }))
    if (stepOk(step)) setStep((s) => Math.min(s + 1, 3))
  }

  const placeOrder = () => {
    const order = createOrder({
      items,
      contact: { email: form.email },
      shipping: {
        name: `${form.firstName} ${form.lastName}`,
        address: form.address,
        city: form.city,
        postal: form.postal,
        country: form.country,
      },
      // only the last four is kept — the full number never leaves this form
      method: `Card ending ${digitsOnly(form.cardNumber).slice(-4)}`,
    })
    clear()
    navigate(`/order/${order.id}`)
  }

  const totals = orderTotals(items)

  return (
    <div className="pt-20">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-16">
        <h1 className="font-display text-4xl md:text-5xl text-obsidian-900 text-center mb-12">
          Checkout
        </h1>

        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-14 items-start">
          <div>
            {/* progress */}
            <ol className="flex items-center gap-2 mb-10">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-2 flex-1">
                  <button
                    onClick={() => i < step && setStep(i)}
                    className={`flex items-center gap-2 ${i <= step ? '' : 'pointer-events-none'}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-colors duration-300 ${
                        i < step
                          ? 'bg-gold-700 text-white'
                          : i === step
                            ? 'bg-obsidian-900 text-white'
                            : 'border border-obsidian-900/20 text-obsidian-400'
                      }`}
                    >
                      {i < step ? '✓' : i + 1}
                    </span>
                    <span
                      className={`text-[10px] tracking-[0.1em] uppercase hidden sm:inline ${
                        i === step ? 'text-obsidian-900' : 'text-obsidian-400'
                      }`}
                    >
                      {s}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && <span className="flex-1 h-px bg-obsidian-900/10" />}
                </li>
              ))}
            </ol>

            {step === 0 && (
              <Section title="Contact">
                <Field k="email" label="Email" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} type="email" />
                <p className="text-xs text-obsidian-400 mt-3">
                  Your order confirmation and fitting updates go here.
                </p>
              </Section>
            )}

            {step === 1 && (
              <Section title="Shipping address">
                <div className="grid grid-cols-2 gap-4">
                  <Field k="firstName" label="First name" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} />
                  <Field k="lastName" label="Last name" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} />
                </div>
                <Field k="address" label="Address" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} />
                <div className="grid grid-cols-2 gap-4">
                  <Field k="city" label="City" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} />
                  <Field k="postal" label="Postal code" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} />
                </div>
                <Field k="country" label="Country" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} />
              </Section>
            )}

            {step === 2 && (
              <Section title="Payment">
                <Field k="cardName" label="Name on card" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} />
                <Field k="cardNumber" label="Card number" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} inputMode="numeric" placeholder="•••• •••• •••• ••••" />
                <div className="grid grid-cols-2 gap-4">
                  <Field k="expiry" label="Expiry (MM/YY)" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} placeholder="MM/YY" />
                  <Field k="cvc" label="CVC" form={form} set={set} touched={touched} setTouched={setTouched} errOf={errOf} inputMode="numeric" />
                </div>
                <p className="text-xs text-obsidian-400 mt-4 leading-relaxed">
                  Demo only — no payment is processed and no card details are stored or sent
                  anywhere. Connect a payment provider before taking real orders.
                </p>
              </Section>
            )}

            {step === 3 && (
              <Section title="Review">
                <Row label="Contact" value={form.email} onEdit={() => setStep(0)} />
                <Row
                  label="Ship to"
                  value={`${form.firstName} ${form.lastName}, ${form.address}, ${form.city} ${form.postal}, ${form.country}`}
                  onEdit={() => setStep(1)}
                />
                <Row
                  label="Payment"
                  value={`Card ending ${digitsOnly(form.cardNumber).slice(-4)}`}
                  onEdit={() => setStep(2)}
                />
                <p className="text-sm text-obsidian-400 leading-relaxed mt-6">
                  Custom-sized pieces are cut to the measurements saved on each item and arrive in
                  3 to 5 weeks.
                </p>
              </Section>
            )}

            <div className="flex items-center gap-3 mt-10">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="px-6 py-3.5 border border-obsidian-900/20 text-obsidian-900 text-[11px] tracking-[0.16em] uppercase hover:border-obsidian-900 transition-colors duration-450"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={next}
                  className="flex-1 bg-obsidian-900 text-white py-4 text-[11px] tracking-[0.16em] uppercase hover:bg-gold-700 transition-colors duration-450"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={placeOrder}
                  className="flex-1 bg-obsidian-900 text-white py-4 text-[11px] tracking-[0.16em] uppercase hover:bg-gold-700 transition-colors duration-450"
                >
                  Place order — ${money(totals.total)}
                </button>
              )}
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:sticky lg:top-28">
            <OrderSummary items={items} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-obsidian-900 mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({ k, label, form, set, touched, setTouched, errOf, type = 'text', inputMode, placeholder }) {
  const err = touched[k] ? errOf(k) : null
  return (
    <label className="block">
      <span className="text-xs text-obsidian-500 mb-1.5 block">{label}</span>
      <input
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-label={label}
        aria-invalid={!!err}
        value={form[k] ?? ''}
        onChange={(e) => set(k, e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, [k]: true }))}
        className={`w-full bg-transparent outline-none px-3 py-2.5 text-obsidian-900 border transition-colors duration-300 ${
          err ? 'border-red-400' : 'border-obsidian-900/20 focus:border-gold-700'
        }`}
      />
      {err && <span className="text-[11px] text-red-500 mt-1 block">{err}</span>}
    </label>
  )
}

function Row({ label, value, onEdit }) {
  return (
    <div className="flex items-start justify-between gap-6 border-t border-obsidian-900/10 py-4">
      <div>
        <div className="text-[11px] tracking-[0.12em] uppercase text-obsidian-400 mb-1">{label}</div>
        <div className="text-sm text-obsidian-900">{value}</div>
      </div>
      <button
        onClick={onEdit}
        className="text-[11px] tracking-[0.14em] uppercase text-obsidian-400 hover:text-gold-700 transition-colors duration-450 shrink-0"
      >
        Edit
      </button>
    </div>
  )
}
