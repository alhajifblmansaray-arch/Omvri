// Oversized closing wordmark that sits below the footer, the last thing on
// every page. Type scales with the viewport so it always fills the width.
export default function BrandMark() {
  return (
    <section className="bg-obsidian-900 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-20 pb-14 md:pt-28 md:pb-20 text-center">
        <h2
          className="font-display text-white leading-[0.85] tracking-[0.02em] select-none"
          style={{ fontSize: 'clamp(4.5rem, 21vw, 19rem)' }}
        >
          Omvri<span className="text-gold-500">.</span>
        </h2>
        <p className="font-display italic text-white/70 mt-6 md:mt-8 text-lg md:text-2xl">
          Cut for one person only.
        </p>
      </div>
    </section>
  )
}
