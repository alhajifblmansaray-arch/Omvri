import { Link } from 'react-router-dom'
import { craft } from '../data/content'

const values = [
  {
    title: 'One cutter, one suit',
    body: 'Your pattern is drafted by the same hands that cut it. Nothing is graded from a block, and no two patterns in the house are the same.',
  },
  {
    title: 'Cloth before everything',
    body: 'We buy from mills we can name — Loro Piana, VBC, Fox Brothers, Dormeuil, Solbiati, Zegna — and we will tell you exactly what your suit is made of.',
  },
  {
    title: 'Fit is a relationship',
    body: 'Your measurements live in the house and sharpen with every order. The third suit fits better than the first, because we remember.',
  },
  {
    title: 'Repair for life',
    body: 'Buttons, seams, linings, edges. If we made it, we mend it — for as long as the garment lives.',
  },
]

const numbers = [
  ['12', 'measurements taken for every cut'],
  ['3–5', 'weeks from cloth to doorstep'],
  ['6', 'mills across Italy and England'],
  ['1', 'pair of hands on your pattern'],
]

export default function House() {
  return (
    <div className="pt-20">
      {/* hero */}
      <section className="max-w-[900px] mx-auto px-6 pt-20 pb-16 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          The House
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900 leading-tight" style={{ animationDelay: '100ms' }}>
          Suits are not made here.
          <br />
          They are cut.
        </h1>
        <p className="reveal text-obsidian-400 text-sm max-w-[560px] mx-auto mt-7 leading-relaxed" style={{ animationDelay: '180ms' }}>
          OMVRI began with a simple refusal — the refusal to accept that a suit off a rack, sized
          for nobody, was good enough for anybody. Every garment in the house starts as a bolt of
          cloth and a set of twelve numbers, and becomes something that belongs to one person only.
        </p>
      </section>

      {/* craft band */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-start">
          <div className="aspect-[3/4] overflow-hidden">
            <img src={craft.cuffBlack} alt="Black satin cuff with OMVRI tab" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="aspect-[3/4] overflow-hidden md:mt-16">
            <img src={craft.image} alt="Hand-embroidered OMVRI tab in gold thread" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="aspect-[3/4] overflow-hidden hidden md:block mt-8">
            <img src={craft.lapelGrey} alt="Grey peak lapel with silk pocket square" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
        <p className="text-center text-xs text-obsidian-400 mt-6 tracking-wide">
          The OMVRI tab — embroidered by hand on every finished cuff.
        </p>
      </section>

      {/* values */}
      <section className="bg-ivory border-y border-obsidian-900/10">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24">
          <h2 className="font-display text-3xl md:text-4xl text-obsidian-900 text-center mb-16">
            What the house believes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
            {values.map((v, i) => (
              <div key={v.title} className="border-t border-obsidian-900/15 pt-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-display text-xl text-gold-700">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-2xl text-obsidian-900">{v.title}</h3>
                </div>
                <p className="text-sm text-obsidian-400 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* numbers */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {numbers.map(([n, label]) => (
            <div key={label}>
              <div className="font-display text-5xl text-obsidian-900 mb-3">{n}</div>
              <div className="text-xs text-obsidian-400 leading-relaxed max-w-[160px] mx-auto">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="max-w-[760px] mx-auto px-6 pb-28 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-obsidian-900 mb-8">
          The rest is better said in cloth.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/collections"
            className="px-9 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
          >
            Shop the Collection
          </Link>
          <Link
            to="/configure"
            className="px-9 py-4 border border-obsidian-900/20 text-obsidian-900 text-[11px] tracking-[0.18em] uppercase hover:border-obsidian-900 transition-colors duration-450"
          >
            Start a Bespoke Build
          </Link>
        </div>
      </section>
    </div>
  )
}
