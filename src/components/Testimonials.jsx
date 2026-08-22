import { testimonials } from '../data/content'
import useInView from '../hooks/useInView'

export default function Testimonials() {
  return (
    <section className="px-4 md:px-10 py-10">
      <div className="max-w-[1300px] mx-auto surface-soft rounded-3xl px-6 md:px-10 py-20 md:py-24">
        <h3 className="font-display text-3xl md:text-4xl text-obsidian-900 text-center mb-16">
          Worn and vouched for.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Card key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({ testimonial: t, index }) {
  const [ref, inView] = useInView()

  return (
    <figure
      ref={ref}
      // each card lands a beat after the one before it
      style={{ transitionDelay: `${index * 160}ms` }}
      className={`testimonial surface rounded-2xl px-7 pt-9 pb-7 flex flex-col ${
        inView ? 'is-visible' : ''
      }`}
    >
      <span className="testimonial-quote" aria-hidden="true">
        &ldquo;
      </span>

      <div className="relative">
        <div className="text-gold-600 text-sm tracking-[0.2em] mb-2" aria-hidden="true">
          ★★★★★
        </div>
        <span className="testimonial-rule mb-6" aria-hidden="true" />

        <blockquote className="text-[15px] text-obsidian-800 leading-relaxed mb-7">
          {t.quote}
        </blockquote>

        <figcaption className="flex items-center gap-3 mt-auto">
          <span className="w-9 h-9 rounded-full bg-obsidian-900 text-white text-[11px] flex items-center justify-center shrink-0">
            {t.name.charAt(0)}
          </span>
          <span className="text-sm text-obsidian-900">
            {t.name}
            <span className="block text-xs text-obsidian-500 mt-0.5">
              {t.city} · {t.suit}
            </span>
          </span>
        </figcaption>
      </div>
    </figure>
  )
}
