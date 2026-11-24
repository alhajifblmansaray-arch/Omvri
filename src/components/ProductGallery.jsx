import { useRef, useState } from 'react'

export default function ProductGallery({ product }) {
  const { name, gallery } = product
  const track = useRef(null)
  const [active, setActive] = useState(0)

  function syncSlide({ currentTarget }) {
    if (currentTarget.clientWidth) {
      const index = Math.round(currentTarget.scrollLeft / currentTarget.clientWidth)
      setActive(Math.max(0, Math.min(index, gallery.length - 1)))
    }
  }

  function showSlide(index) {
    track.current.scrollTo({ left: index * track.current.clientWidth })
  }

  return (
    <section aria-label={`${name} photos`} className="min-w-0 px-4 md:px-6">
      <div className="relative">
        <div
          ref={track}
          onScroll={syncSlide}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain motion-safe:scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:space-y-5 md:overflow-visible md:snap-none"
        >
          {gallery.map((shot, index) => (
            <figure key={shot.src} className="relative m-0 w-full flex-none snap-start snap-always">
              <img
                src={shot.src}
                alt={shot.caption || `${name}, view ${index + 1}`}
                className="card-raise w-full rounded-2xl max-md:aspect-[3/4] max-md:bg-obsidian-50 max-md:object-contain max-md:hover:transform-none md:object-cover"
                loading={index > 1 ? 'lazy' : undefined}
              />
              {shot.caption && (
                <figcaption className={`${index === active ? '' : 'max-md:hidden'} px-6 md:px-12 py-6 text-sm text-obsidian-600 leading-relaxed max-w-[480px]`}>
                  <span className="text-obsidian-500 uppercase tracking-[0.14em] text-[11px] block mb-1.5">
                    {shot.caption.split(' · ')[0]}
                  </span>
                  {shot.caption.split(' · ')[1]}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {gallery.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex aspect-[3/4] items-center justify-between px-2 md:hidden">
            <GalleryArrow previous disabled={active === 0} onClick={() => showSlide(active - 1)} />
            <GalleryArrow disabled={active === gallery.length - 1} onClick={() => showSlide(active + 1)} />
            <span className="sr-only" role="status">Photo {active + 1} of {gallery.length}</span>
          </div>
        )}
      </div>
    </section>
  )
}

function GalleryArrow({ previous = false, disabled, onClick }) {
  return (
    <button
      type="button"
      aria-label={previous ? 'Previous photo' : 'Next photo'}
      disabled={disabled}
      onClick={onClick}
      className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-white text-obsidian-900 opacity-95 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 disabled:text-obsidian-300"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={previous ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}
