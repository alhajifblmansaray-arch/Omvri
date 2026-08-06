import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { contact } from '../data/content'

const topics = ['General inquiry', 'Book a fitting', 'Wedding party', 'Existing order', 'Press']

export default function Contact() {
  const [params] = useSearchParams()
  // arriving from a "consult with us" link preselects what it is about
  const preset = topics.find((t) => t === params.get('topic'))
  const [form, setForm] = useState({ topic: preset || topics[0] })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name?.trim()) errs.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || '')) errs.email = 'Enter a valid email'
    if (!form.message?.trim()) errs.message = 'Required'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    // Stored locally for the demo — wire to an inbox/CRM before launch.
    const all = JSON.parse(localStorage.getItem('omvri-inquiries') || '[]')
    all.unshift({ ...form, sentAt: new Date().toISOString() })
    localStorage.setItem('omvri-inquiries', JSON.stringify(all))
    setSent(true)
  }

  return (
    <div className="pt-20">
      <section className="max-w-[900px] mx-auto px-6 pt-20 pb-14 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          Contact
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          Speak to the atelier.
        </h1>
        <p className="reveal text-obsidian-400 text-sm max-w-[480px] mx-auto mt-6 leading-relaxed" style={{ animationDelay: '180ms' }}>
          Fittings, weddings, orders in progress, or a cloth you have in mind. Write, and a
          person answers within one working day.
        </p>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 items-start">
          {/* form */}
          {sent ? (
            <div className="border border-obsidian-900/10 px-8 py-20 text-center">
              <span className="w-14 h-14 rounded-full border border-gold-700 text-gold-700 flex items-center justify-center mx-auto mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </span>
              <h2 className="font-display text-3xl text-obsidian-900 mb-3">Received.</h2>
              <p className="text-sm text-obsidian-400 max-w-[380px] mx-auto leading-relaxed">
                Thank you. Your note is with the atelier. Expect a reply at {form.email} within
                one working day.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" error={errors.name}>
                  <input value={form.name || ''} onChange={(e) => set('name', e.target.value)} aria-label="Name" className={inputCls(errors.name)} />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" value={form.email || ''} onChange={(e) => set('email', e.target.value)} aria-label="Email" className={inputCls(errors.email)} />
                </Field>
              </div>
              <Field label="Topic">
                <select value={form.topic} onChange={(e) => set('topic', e.target.value)} aria-label="Topic" className={inputCls()}>
                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Message" error={errors.message}>
                <textarea
                  rows={6}
                  value={form.message || ''}
                  onChange={(e) => set('message', e.target.value)}
                  aria-label="Message"
                  className={`${inputCls(errors.message)} resize-none`}
                />
              </Field>
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
              >
                Send to the Atelier
              </button>
            </form>
          )}

          {/* details */}
          <aside className="space-y-8">
            <Detail title="Visit">
              {contact.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </Detail>
            <Detail title="Hours">
              {contact.hours.map(([d, h]) => (
                <span key={d} className="flex justify-between gap-6">
                  <span>{d}</span>
                  <span className="text-obsidian-900">{h}</span>
                </span>
              ))}
            </Detail>
            <Detail title="Write or call">
              <a href={`mailto:${contact.email}`} className="hover:text-gold-700 transition-colors duration-450 block">
                {contact.email}
              </a>
              <span className="block mt-1">{contact.phone}</span>
            </Detail>
          </aside>
        </div>
      </section>
    </div>
  )
}

const inputCls = (err) =>
  `w-full bg-transparent outline-none px-3 py-2.5 text-obsidian-900 border transition-colors duration-300 ${
    err ? 'border-red-400' : 'border-obsidian-900/20 focus:border-gold-700'
  }`

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-xs text-obsidian-500 mb-1.5 block">{label}</span>
      {children}
      {error && <span className="text-[11px] text-red-500 mt-1 block">{error}</span>}
    </label>
  )
}

function Detail({ title, children }) {
  return (
    <div className="border-t border-obsidian-900/15 pt-4">
      <div className="text-[11px] tracking-[0.12em] uppercase text-gold-700 mb-2">{title}</div>
      <div className="text-sm text-obsidian-400 leading-relaxed">{children}</div>
    </div>
  )
}
