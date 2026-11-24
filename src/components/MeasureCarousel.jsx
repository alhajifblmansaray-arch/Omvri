import { useState, useEffect, useRef } from 'react'

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

  // swipe left or right to step through, for phones
  const touchX = useRef(null)
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current == null || slides.length < 2) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }

  return (
    <div className="relative bg-white" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
      className={`absolute top-1/2 -translate-y-1/2 ${isPrev ? 'left-1' : 'right-1'} w-11 h-11 rounded-full flex items-center justify-center text-obsidian-500 hover:text-obsidian-900 active:bg-obsidian-900/[0.06] transition-colors duration-450`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={isPrev ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}
