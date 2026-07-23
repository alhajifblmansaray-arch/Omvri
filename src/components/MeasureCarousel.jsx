import { useState, useEffect } from 'react'

// Just the artwork. The slides carry their own number, title and copy, so no
// frame, counter or dots are drawn around them — navigation is the arrows plus
// focusing a field below, which brings that measurement's slide up.
export default function MeasureCarousel({ slides, activeKey, onActiveChange, aspect = 'aspect-[4/3]' }) {
  const [i, setI] = useState(0)
  const [failed, setFailed] = useState({})

  // follow the field the customer is filling in, when one is focused
  useEffect(() => {
    if (!activeKey) return
    const next = slides.findIndex((s) => s.key === activeKey)
    if (next >= 0) setI(next)
  }, [activeKey, slides])

  const go = (delta) => {
    const next = (i + delta + slides.length) % slides.length
    setI(next)
    onActiveChange?.(slides[next].key)
  }

  const slide = slides[i]

  return (
    <div className="relative bg-white">
      {failed[slide.key] ? (
        <div className={`${aspect} flex flex-col items-center justify-center gap-2 px-6 text-center`}>
          <span className="font-display text-2xl text-obsidian-900">{slide.label}</span>
          <span className="text-xs text-obsidian-400">Guide image coming soon</span>
        </div>
      ) : (
        <img
          src={slide.src}
          alt={`How to measure your ${slide.label.toLowerCase()}`}
          className={`w-full ${aspect} object-contain bg-white select-none`}
          draggable="false"
          onError={() => setFailed((f) => ({ ...f, [slide.key]: true }))}
        />
      )}

      {slides.length > 1 && (
        <>
          <Arrow dir="prev" onClick={() => go(-1)} label={`Previous: ${slides[(i - 1 + slides.length) % slides.length].label}`} />
          <Arrow dir="next" onClick={() => go(1)} label={`Next: ${slides[(i + 1) % slides.length].label}`} />
        </>
      )}
    </div>
  )
}

function Arrow({ dir, onClick, label }) {
  const isPrev = dir === 'prev'
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 ${isPrev ? 'left-2' : 'right-2'} w-9 h-9 rounded-full flex items-center justify-center text-obsidian-400 hover:text-gold-700 transition-colors duration-450`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={isPrev ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}
