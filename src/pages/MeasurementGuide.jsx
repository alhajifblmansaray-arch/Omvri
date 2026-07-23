import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { jacketSlides, pantSlides } from '../data/measureGuide'

const sets = {
  jacket: { label: 'Jacket', slides: jacketSlides },
  pants: { label: 'Pants', slides: pantSlides },
}

const faqs = [
  { q: 'How do I measure my chest?', a: 'Wrap the tape around the fullest part of your chest, under the arms and across the shoulder blades, keeping it parallel to the floor.' },
  { q: 'Should I wear clothing while measuring?', a: 'Measure over a single thin layer — a dress shirt is ideal. Avoid measuring over jackets or thick knits.' },
  { q: 'What measuring tape should I use?', a: 'A soft, flexible fabric tailor’s tape gives the most accurate reading. A metal tape will not follow the body.' },
  { q: "What if I don't know my measurements?", a: 'Book a fitting with our atelier — in person or virtual — and we will take every measurement for you.' },
]

export default function MeasurementGuide() {
  const navigate = useNavigate()
  const location = useLocation()
  // set by the Customize panel so we can drop the customer back where they were
  const { returnTo, returnStep } = location.state || {}

  const [set, setSet] = useState(returnStep === 1 ? 'pants' : 'jacket')
  const [i, setI] = useState(0)

  const slides = sets[set].slides
  const slide = slides[i]

  const go = useCallback(
    (delta) => setI((p) => (p + delta + slides.length) % slides.length),
    [slides.length],
  )

  // arrow keys drive the viewer
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const switchSet = (k) => {
    setSet(k)
    setI(0)
  }

  const goBack = () => {
    if (returnTo) navigate(returnTo, { state: { openCustomize: true, step: returnStep ?? 0 } })
    else navigate(-1)
  }

  return (
    <div className="pt-20">
      {/* hero */}
      <section className="max-w-[900px] mx-auto px-6 pt-20 pb-14 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          Sizing Assistance
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          How to Measure for the Perfect Fit
        </h1>
        <p className="reveal text-obsidian-400 text-sm max-w-[520px] mx-auto mt-6 leading-relaxed" style={{ animationDelay: '180ms' }}>
          Seven for the jacket, five for the trouser. Take your time — accuracy here is the
          difference between off-the-rack and made-for-you.
        </p>
      </section>

      {/* interactive viewer */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 pb-24">
        {/* set switch */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex border border-obsidian-900/15">
            {Object.entries(sets).map(([k, v]) => (
              <button
                key={k}
                onClick={() => switchSet(k)}
                className={`px-8 py-3 text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                  set === k ? 'bg-obsidian-900 text-white' : 'text-obsidian-500 hover:text-obsidian-900'
                }`}
              >
                {v.label}
                <span className="ml-2 text-[10px] opacity-60">{v.slides.length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-start">
          {/* numbered index */}
          <ol className="lg:sticky lg:top-28 grid grid-cols-2 lg:grid-cols-1 gap-x-4">
            {slides.map((s, n) => {
              const active = n === i
              return (
                <li key={s.key}>
                  <button
                    onClick={() => setI(n)}
                    aria-current={active}
                    className={`w-full text-left flex items-baseline gap-3 py-3 border-t transition-colors duration-300 ${
                      active
                        ? 'border-gold-700 text-obsidian-900'
                        : 'border-obsidian-900/10 text-obsidian-400 hover:text-obsidian-900'
                    }`}
                  >
                    <span className={`font-display text-lg ${active ? 'text-gold-700' : 'text-obsidian-300'}`}>
                      {String(n + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm">{s.label}</span>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* stage */}
          <div className="border border-obsidian-900/10 bg-white">
            <div className="relative">
              <Stage slide={slide} />
              <Arrow dir="prev" onClick={() => go(-1)} label={`Previous: ${slides[(i - 1 + slides.length) % slides.length].label}`} />
              <Arrow dir="next" onClick={() => go(1)} label={`Next: ${slides[(i + 1) % slides.length].label}`} />
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-t border-obsidian-900/10">
              <span className="text-[11px] tracking-[0.12em] uppercase text-obsidian-900">
                <span className="text-gold-700">{i + 1}</span>
                <span className="text-obsidian-300"> / {slides.length}</span>
                <span className="ml-2">{slide.label}</span>
              </span>
              <div className="flex items-center gap-1.5">
                {slides.map((s, n) => (
                  <button
                    key={s.key}
                    onClick={() => setI(n)}
                    aria-label={`Show ${s.label}`}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      n === i ? 'bg-obsidian-900' : 'bg-obsidian-900/20 hover:bg-obsidian-900/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-obsidian-400 mt-6">
          Use the arrow keys to step through each measurement.
        </p>
      </section>

      {/* video tutorials placeholder */}
      <section className="bg-ivory border-y border-obsidian-900/10">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-20">
          <h2 className="font-display text-3xl text-obsidian-900 mb-8 text-center">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Measuring the Jacket', 'Measuring the Trouser'].map((label) => (
              <div key={label} className="aspect-video bg-white border border-obsidian-900/10 flex flex-col items-center justify-center gap-3">
                <span className="w-14 h-14 rounded-full border border-obsidian-900/20 flex items-center justify-center text-obsidian-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="text-sm text-obsidian-400">{label} — coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="max-w-[760px] mx-auto px-6 py-20">
        <h2 className="font-display text-3xl text-obsidian-900 mb-8 text-center">Frequently Asked</h2>
        {faqs.map((f, n) => (
          <Faq key={n} {...f} />
        ))}

        <div className="text-center mt-14">
          <button
            onClick={goBack}
            className="inline-block px-9 py-4 bg-obsidian-900 text-white text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
          >
            {returnTo ? 'Back to your measurements' : 'Back to Shopping'}
          </button>
        </div>
      </section>
    </div>
  )
}

// keyed so each change remounts and replays the fade
function Stage({ slide }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => setFailed(false), [slide.key])

  if (failed) {
    return (
      <div className="aspect-[4/3] flex flex-col items-center justify-center gap-2 text-center px-6">
        <span className="font-display text-3xl text-obsidian-900">{slide.label}</span>
        <span className="text-sm text-obsidian-400">Guide image coming soon</span>
      </div>
    )
  }

  return (
    <img
      key={slide.key}
      src={slide.src}
      alt={`How to measure your ${slide.label.toLowerCase()}`}
      onError={() => setFailed(true)}
      className="reveal w-full aspect-[4/3] object-contain bg-white select-none"
      draggable="false"
    />
  )
}

function Arrow({ dir, onClick, label }) {
  const isPrev = dir === 'prev'
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 ${isPrev ? 'left-4' : 'right-4'} w-11 h-11 rounded-full bg-white/90 backdrop-blur border border-obsidian-900/10 shadow-sm flex items-center justify-center text-obsidian-900 hover:border-gold-700 hover:text-gold-700 transition-colors duration-450`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={isPrev ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}

function Faq({ q, a }) {
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
