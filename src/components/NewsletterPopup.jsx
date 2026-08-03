import { useState, useEffect } from 'react'

const SEEN_KEY = 'omvri-popup-seen'

export default function NewsletterPopup() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem(SEEN_KEY)) return
    const timer = setTimeout(() => setShow(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    localStorage.setItem(SEEN_KEY, '1')
    setShow(false)
  }

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

    const subscribers = JSON.parse(localStorage.getItem('omvri-subscribers') || '[]')
    subscribers.push({ email, subscribedAt: new Date().toISOString(), source: 'popup' })
    localStorage.setItem('omvri-subscribers', JSON.stringify(subscribers))

    setSubmitted(true)
    setTimeout(dismiss, 2400)
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && show && dismiss()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show])

  if (!show) return null

  return (
    <div
      onClick={dismiss}
      className="fixed inset-0 bg-obsidian-900/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-[860px] grid grid-cols-1 sm:grid-cols-2 overflow-hidden shadow-2xl"
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 text-obsidian-400 hover:text-obsidian-900 transition-colors duration-300"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* image side */}
        <div className="hidden sm:block bg-ivory">
          <img
            src="/images/looks/lario/cover.jpg"
            alt="The Lario, photographed at Lake Como"
            className="w-full h-full object-cover"
          />
        </div>

        {/* form side */}
        <div className="flex flex-col justify-center px-8 sm:px-11 py-12 sm:py-16">
          {submitted ? (
            <div className="text-center py-6">
              <span className="w-12 h-12 rounded-full border border-gold-700 text-gold-700 flex items-center justify-center mx-auto mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </span>
              <h2 className="font-display text-3xl text-obsidian-900 mb-3">Check your inbox.</h2>
              <p className="text-obsidian-500 text-sm leading-relaxed">
                Your 15% code is on its way to {email}.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-4xl sm:text-[2.6rem] leading-[1.1] text-obsidian-900 mb-5">
                Get Exclusive Access
              </h2>
              <p className="text-obsidian-500 text-[15px] leading-relaxed mb-9">
                Sign up for early collection previews, expert styling advice, and the latest in
                menswear, all tailored for you. Take 15% off your first suit.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    className={`w-full px-4 py-3.5 border text-obsidian-900 placeholder-obsidian-400 outline-none transition-colors duration-300 ${
                      error ? 'border-red-400' : 'border-obsidian-900/25 focus:border-obsidian-900'
                    }`}
                  />
                  {error && <span className="text-[11px] text-red-500 mt-1.5 block">{error}</span>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-obsidian-900 text-white py-4 text-[15px] hover:bg-gold-700 transition-colors duration-450"
                >
                  Sign up
                </button>
              </form>

              <p className="text-obsidian-500 text-xs mt-6">
                By subscribing you accept our{' '}
                <a href="/privacy" className="underline hover:text-obsidian-900">
                  privacy policy
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
