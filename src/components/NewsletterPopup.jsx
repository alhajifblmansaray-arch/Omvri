import { useState, useEffect } from 'react'

export default function NewsletterPopup() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    // Save to localStorage
    const subscribers = JSON.parse(localStorage.getItem('omvri-subscribers') || '[]')
    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
    })
    localStorage.setItem('omvri-subscribers', JSON.stringify(subscribers))

    setSubmitted(true)
    setTimeout(() => {
      setShow(false)
      setEmail('')
      setSubmitted(false)
    }, 2000)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-sm shadow-lg">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-900 text-2xl leading-none"
        >
          ×
        </button>

        <div className="text-center">
          <span className="text-gold-700 text-sm tracking-widest uppercase block mb-3">
            Exclusive Offer
          </span>
          <h2 className="font-display text-3xl text-obsidian-900 mb-2">
            Get 10% Off
          </h2>
          <p className="text-obsidian-400 text-sm mb-6">
            Your first bespoke suit. Enter your email to claim.
          </p>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full border border-gold-700 text-gold-700 flex items-center justify-center mx-auto mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </div>
              <p className="text-obsidian-900 font-medium">Check your inbox!</p>
              <p className="text-obsidian-400 text-xs mt-1">Offer code sent to {email}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  className="w-full px-4 py-3 border border-obsidian-900/20 text-obsidian-900 placeholder-obsidian-400 focus:outline-none focus:border-gold-700 transition-colors"
                />
                {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
              </div>
              <button
                type="submit"
                className="w-full bg-obsidian-900 text-white py-3 text-sm tracking-[0.16em] uppercase hover:bg-gold-700 transition-colors duration-300 font-medium"
              >
                Claim My 10% Off
              </button>
            </form>
          )}

          <p className="text-obsidian-400 text-xs mt-6">
            We'll never spam you. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
