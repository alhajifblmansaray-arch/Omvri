import { useState, useEffect } from 'react'
import useLockBodyScroll from '../hooks/useLockBodyScroll'

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

  useLockBodyScroll(show)

  if (!show) return null

  // phones: rises from the bottom as a sheet, within reach of the thumb.
  // larger screens: a centred card with the photograph beside the form.
  return (
    <div
      onClick={dismiss}
      className="fixed inset-0 bg-obsidian-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-[70] sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Get exclusive access"
        className="reveal relative bg-white w-full max-w-[860px] max-h-[92dvh] overflow-y-auto overscroll-contain grid grid-cols-1 sm:grid-cols-2 rounded-t-3xl sm:rounded-2xl panel-raise"
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-11 h-11 rounded-full flex items-center justify-center text-obsidian-400 hover:text-obsidian-900 active:bg-obsidian-900/[0.06] transition-colors duration-300"
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
        <div className="flex flex-col justify-center px-6 sm:px-11 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))] sm:py-16">
          {/* grab handle, the familiar cue that a sheet can be dismissed */}
          <span className="sm:hidden absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-obsidian-900/15" aria-hidden="true" />
          {submitted ? (
            <div className="text-center py-6">
              <span className="w-12 h-12 rounded-full bg-obsidian-900 text-white flex items-center justify-center mx-auto mb-5">
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
              <h2 className="font-display text-[2.1rem] sm:text-[2.6rem] leading-[1.1] text-obsidian-900 mb-4 sm:mb-5 pr-8 sm:pr-0">
                Get Exclusive Access
              </h2>
              <p className="text-obsidian-500 text-[15px] leading-relaxed mb-7 sm:mb-9">
                Sign up for early collection previews, expert styling advice, and the latest in
                menswear, all tailored for you. Take 15% off your first suit.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    autoComplete="email"
                    enterKeyHint="send"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    className={`w-full px-5 py-3.5 rounded-full border text-base text-obsidian-900 placeholder-obsidian-400 outline-none transition-colors duration-300 ${
                      error ? 'border-red-400' : 'border-obsidian-900/25 focus:border-obsidian-900'
                    }`}
                  />
                  {error && <span className="text-[11px] text-red-500 mt-1.5 block">{error}</span>}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full !text-[13px]"
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
