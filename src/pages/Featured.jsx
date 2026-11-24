import { Link } from 'react-router-dom'
import { featuredProducts } from '../data/products'
import CollectionCard from '../components/CollectionCard'
import PartyBand from '../components/PartyBand'

// A short shoppable edit built as a landing destination. Campaign traffic
// should arrive here or on a suit page, never on the homepage, because the
// visitor already knows roughly what they clicked for.
export default function Featured() {
  const shown = featuredProducts()

  return (
    <div className="pt-16 md:pt-20">
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-10 md:pb-12 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-obsidian-500 mb-5 block">
          The Featured Edit
        </span>
        <h1 className="reveal font-display text-[2.6rem] leading-[1.08] sm:text-5xl md:text-7xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          Black tie, and
          <br className="hidden sm:block" /> what comes after.
        </h1>
        <p className="reveal text-obsidian-500 text-base max-w-[540px] mx-auto mt-6 leading-relaxed" style={{ animationDelay: '180ms' }}>
          Four looks the atelier is cutting most this season. Every one is made to your
          measurements at {shown[0] ? '$999' : ''}, delivered in three to five weeks.
        </p>
      </section>

      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 md:gap-x-8 gap-y-12 md:gap-y-16">
          {shown.map((p, i) => (
            <CollectionCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Link
            to="/collections"
            className="btn btn-outline w-full sm:w-auto"
          >
            See All Seven Suits
          </Link>
        </div>
      </section>

      <PartyBand />
    </div>
  )
}
