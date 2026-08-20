// The scannable spec list. A beauty page uses GOOD FOR / FEELS LIKE / LOOKS
// LIKE; the same shape works for cloth, and it answers the questions a buyer
// actually has before they will commit to a price like this.
export default function SpecBlock({ spec, image, name }) {
  if (!spec) return null
  const rows = Object.entries(spec)

  return (
    <section className="border-t border-obsidian-900/10">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2">
        {image && (
          <div className="relative min-h-[320px] md:min-h-[560px] bg-ivory order-1 md:order-none overflow-hidden">
            <img
              src={image}
              alt={`${name}, cloth detail`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        <div className="px-6 md:px-12 py-14 md:py-20 flex flex-col justify-center">
          <span className="text-[11px] tracking-widest2 uppercase text-obsidian-500 block mb-4">
            Meet the cloth
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-obsidian-900 mb-10">
            What you are actually buying.
          </h2>

          <dl className="space-y-0">
            {rows.map(([label, value]) => (
              <div key={label} className="border-t border-obsidian-900/10 py-5">
                <dt className="text-[10px] tracking-[0.16em] uppercase text-obsidian-500 mb-2">
                  {label}
                </dt>
                <dd className="text-[15px] text-obsidian-800 leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
