import { useState } from 'react'
import { Link } from 'react-router-dom'
import { contact } from '../data/content'

const cols = [
  {
    title: 'Shop',
    links: [
      ['Collections', '/collections'],
      ['Build Your Own', '/configure'],
      ['Accessories', '/accessories'],
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
            <div className="text-[11px] tracking-[0.18em] uppercase text-gold-700 mb-4">{c.title}</div>
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
          <div className="text-[11px] tracking-[0.18em] uppercase text-gold-700 mb-4">The List</div>
          {done ? (
            <p className="text-sm text-obsidian-400 leading-relaxed">
              You are on the list. <span className="text-gold-700">✓</span>
            </p>
          ) : (
            <form onSubmit={subscribe}>
              <p className="text-xs text-obsidian-400 leading-relaxed mb-4">
                New cloths, new looks, no noise. One letter a month.
              </p>
              <div className="flex border-b border-obsidian-900/30 focus-within:border-gold-700 transition-colors duration-300">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email for newsletter"
                  className="flex-1 min-w-0 bg-transparent outline-none py-2 text-sm text-obsidian-900 placeholder-obsidian-300"
                />
                <button type="submit" aria-label="Subscribe" className="text-obsidian-900 hover:text-gold-700 transition-colors duration-300 px-1">
                  →
                </button>
              </div>
            </form>
          )}
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 text-sm text-obsidian-400 hover:text-obsidian-900 transition-colors duration-450"
          >
            Instagram
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
