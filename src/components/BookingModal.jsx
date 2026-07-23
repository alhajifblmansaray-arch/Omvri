import { useState } from 'react'

export default function BookingModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-obsidian-900/50 backdrop-blur-sm transition-opacity duration-450"
        onClick={onClose}
      />
      <div className="reveal relative w-full max-w-md bg-white border border-obsidian-900/10 shadow-2xl p-8 md:p-10">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-5 right-5 text-obsidian-400 hover:text-gold-700 transition-colors duration-450"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h3 className="font-display text-3xl text-obsidian-900 mb-2">Book a Fitting</h3>
            <p className="text-sm text-obsidian-400 mb-8 leading-relaxed">
              Reserve time with our tailors, in-house or virtual.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] tracking-[0.14em] uppercase text-obsidian-400 mb-2">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-transparent border-b border-obsidian-900/20 focus:border-gold outline-none py-2 text-obsidian-900 transition-colors duration-450"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.14em] uppercase text-obsidian-400 mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="w-full bg-transparent border-b border-obsidian-900/20 focus:border-gold outline-none py-2 text-obsidian-900 transition-colors duration-450"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.14em] uppercase text-obsidian-400 mb-2">
                  Preferred Date
                </label>
                <input
                  required
                  type="date"
                  className="w-full bg-transparent border-b border-obsidian-900/20 focus:border-gold outline-none py-2 text-obsidian-900 transition-colors duration-450"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-gold-700 text-white py-3.5 text-[11px] tracking-[0.18em] uppercase hover:bg-gold-800 transition-colors duration-450"
              >
                Request Fitting
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <h3 className="font-display text-3xl text-obsidian-900 mb-3">Request Received</h3>
            <p className="text-sm text-obsidian-400 leading-relaxed">
              An atelier associate will confirm your fitting within one business day.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
