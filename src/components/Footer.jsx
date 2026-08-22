import { useState } from 'react'
import { Link } from 'react-router-dom'
import { contact } from '../data/content'

const cols = [
  {
    title: 'Shop',
    links: [
      ['Featured', '/featured'],
      ['Collections', '/collections'],
      ['Lookbook', '/lookbook'],
      ['Bag', '/cart'],
    ],
  },
  {
    title: 'Atelier',
    links: [
      ['The House', '/house'],
      ['How to Measure', '/measurement-guide'],
      ['My Wardrobe', '/account'],
      ['Track an Order', '/track'],
    ],
  },
  {
    title: 'Help',
    links: [
      ['Contact', '/contact'],
      ['FAQ', '/faq'],
      ['Shipping & Returns', '/shipping-returns'],
      ['Terms', '/terms'],
      ['Privacy', '/privacy'],
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    const subs = JSON.parse(localStorage.getItem('omvri-subscribers') || '[]')
    subs.push({ email, subscribedAt: new Date().toISOString(), source: 'footer' })
    localStorage.setItem('omvri-subscribers', JSON.stringify(subs))
    setDone(true)
  }

  return (
    <footer className="border-t border-obsidian-900/10 bg-ivory mt-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-2xl tracking-[0.3em] uppercase text-obsidian-900 mb-4">Omvri</div>
          <p className="text-xs text-obsidian-400 leading-relaxed max-w-[220px]">
            Bespoke tailoring, cut to measure. Est. in the atelier, made for the day ahead.
          </p>
          <div className="text-xs text-obsidian-400 leading-relaxed mt-5">
            {contact.address.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-[11px] tracking-[0.18em] uppercase text-obsidian-500 mb-4">{c.title}</div>
            <ul className="space-y-2.5 text-sm text-obsidian-400">
              {c.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="hover:text-obsidian-900 transition-colors duration-450">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 md:col-span-1">
          <div className="text-[11px] tracking-[0.18em] uppercase text-obsidian-500 mb-4">The List</div>
          {done ? (
            <p className="text-sm text-obsidian-400 leading-relaxed">
              You are on the list. <span className="text-obsidian-500">✓</span>
            </p>
          ) : (
            <form onSubmit={subscribe}>
              <p className="text-xs text-obsidian-400 leading-relaxed mb-4">
                New cloths, new looks, no noise. One letter a month.
              </p>
              <div className="flex items-center bg-white rounded-full border border-obsidian-900/15 focus-within:border-obsidian-900 transition-colors duration-300 pl-4 pr-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email for newsletter"
                  className="flex-1 min-w-0 bg-transparent outline-none py-2.5 text-sm text-obsidian-900 placeholder-obsidian-300"
                />
                <button type="submit" aria-label="Subscribe" className="text-obsidian-900 hover:text-obsidian-500 transition-colors duration-300 px-1">
                  →
                </button>
              </div>
            </form>
          )}
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`OMVRI on Instagram, ${contact.instagramHandle}`}
            className="group inline-flex items-center gap-2.5 mt-6 text-sm text-obsidian-600 hover:text-obsidian-900 transition-colors duration-450"
          >
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>
            {contact.instagramHandle}
          </a>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-6 border-t border-obsidian-900/5 flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] tracking-wide text-obsidian-400/70">
        <span>© {new Date().getFullYear()} Omvri Bespoke. All rights reserved.</span>
        <span>Cut in-house. Finished by hand.</span>
      </div>
    </footer>
  )
}
