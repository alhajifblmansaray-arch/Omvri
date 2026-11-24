import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="pt-16 md:pt-20">
      <div className="max-w-[700px] mx-auto px-6 py-40 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-obsidian-500 mb-5 block">
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
            className="btn btn-primary"
          >
            Shop Collections
          </Link>
          <Link
            to="/"
            className="btn btn-outline"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}
