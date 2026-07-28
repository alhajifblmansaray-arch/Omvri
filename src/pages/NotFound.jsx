import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="pt-20">
      <div className="max-w-[700px] mx-auto px-6 py-40 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          404
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900 mb-6" style={{ animationDelay: '100ms' }}>
          This page was never cut.
        </h1>
        <p className="reveal text-sm text-obsidian-400 mb-12 max-w-[400px] mx-auto leading-relaxed" style={{ animationDelay: '180ms' }}>
          The address does not exist in the house. The collection, however, does.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/collections"
            className="px-9 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
          >
            Shop Collections
          </Link>
          <Link
            to="/"
            className="px-9 py-4 border border-obsidian-900/20 text-obsidian-900 text-[11px] tracking-[0.18em] uppercase hover:border-obsidian-900 transition-colors duration-450"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}
