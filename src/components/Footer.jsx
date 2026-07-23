import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-obsidian-900/10 bg-ivory mt-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-2xl tracking-[0.3em] uppercase text-obsidian-900 mb-4">Omvri</div>
          <p className="text-xs text-obsidian-400 leading-relaxed max-w-[220px]">
            Bespoke tailoring, cut to measure. Est. in the atelier, made for the day ahead.
          </p>
        </div>
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase text-gold-700 mb-4">Shop</div>
          <ul className="space-y-2.5 text-sm text-obsidian-400">
            <li><Link to="/collections" className="hover:text-obsidian-900 transition-colors duration-450">Collections</Link></li>
            <li><Link to="/configure" className="hover:text-obsidian-900 transition-colors duration-450">Build Your Own</Link></li>
            <li><Link to="/cart" className="hover:text-obsidian-900 transition-colors duration-450">Bag</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase text-gold-700 mb-4">Atelier</div>
          <ul className="space-y-2.5 text-sm text-obsidian-400">
            <li><a href="#" className="hover:text-obsidian-900 transition-colors duration-450">Book a Fitting</a></li>
            <li><a href="#" className="hover:text-obsidian-900 transition-colors duration-450">Size &amp; Fit Guide</a></li>
            <li><a href="#" className="hover:text-obsidian-900 transition-colors duration-450">Delivery &amp; Returns</a></li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase text-gold-700 mb-4">Connect</div>
          <ul className="space-y-2.5 text-sm text-obsidian-400">
            <li><a href="#" className="hover:text-obsidian-900 transition-colors duration-450">Instagram</a></li>
            <li><a href="#" className="hover:text-obsidian-900 transition-colors duration-450">Journal</a></li>
            <li><a href="#" className="hover:text-obsidian-900 transition-colors duration-450">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-6 border-t border-obsidian-900/5 flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] tracking-wide text-obsidian-400/70">
        <span>© {new Date().getFullYear()} Omvri Bespoke. All rights reserved.</span>
        <span>Cut in-house. Finished by hand.</span>
      </div>
    </footer>
  )
}
