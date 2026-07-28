import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faqs } from '../data/content'

export default function FAQ() {
  return (
    <div className="pt-20">
      <section className="max-w-[900px] mx-auto px-6 pt-20 pb-14 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          Questions
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          Frequently Asked
        </h1>
        <p className="reveal text-obsidian-400 text-sm max-w-[460px] mx-auto mt-6 leading-relaxed" style={{ animationDelay: '180ms' }}>
          Ordering, fit, delivery and care. If the answer is not here,{' '}
          <Link to="/contact" className="text-gold-700 hover:underline">
            write to the atelier
          </Link>
          .
        </p>
      </section>

      <section className="max-w-[760px] mx-auto px-6 pb-28">
        {faqs.map((g) => (
          <div key={g.group} className="mb-12">
            <h2 className="text-[11px] tracking-[0.18em] uppercase text-gold-700 mb-4">{g.group}</h2>
            {g.items.map((f) => (
              <Item key={f.q} {...f} />
            ))}
          </div>
        ))}

        <div className="text-center mt-16 border-t border-obsidian-900/10 pt-14">
          <h2 className="font-display text-2xl text-obsidian-900 mb-3">Still unsure?</h2>
          <p className="text-sm text-obsidian-400 mb-8">A person answers within one working day.</p>
          <Link
            to="/contact"
            className="inline-block px-9 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
          >
            Contact the Atelier
          </Link>
        </div>
      </section>
    </div>
  )
}

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="accordion-item" data-open={open}>
      <button className="accordion-trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {q}
        <span className="accordion-icon text-obsidian-400">+</span>
      </button>
      <div className="accordion-body">
        <div className="accordion-body-inner">
          <div className="accordion-content">{a}</div>
        </div>
      </div>
    </div>
  )
}
