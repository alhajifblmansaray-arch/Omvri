import { Link } from 'react-router-dom'

// The house cross-sell. Where a beauty brand would suggest a fifth product,
// the equivalent here is dressing the whole party in the suit already on screen.
export default function PartyBand({ productName }) {
  return (
    <section className="px-4 md:px-10 py-10">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.05fr] items-stretch bg-[#e9e1d6] rounded-3xl overflow-hidden panel-raise">
        <div className="px-6 md:px-10 py-12 md:py-16 flex flex-col justify-center">
          <span className="text-[11px] tracking-widest2 uppercase text-obsidian-500 block mb-4">
            Weddings &amp; Parties
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-obsidian-900 leading-[1.1] mb-4">
            Need {productName ? `the ${productName}` : 'this'} for the
            <br className="hidden sm:block" /> whole party?
          </h2>
          <p className="text-obsidian-600 text-[15px] leading-relaxed mb-7 max-w-[420px]">
            Six suits or more are priced together and finished for the same date. One cloth,
            one silhouette, every suit cut to the man wearing it.
          </p>
          <Link
            to="/contact?topic=Wedding%20party"
            className="btn btn-primary"
          >
            Consult With Us
          </Link>
        </div>

        <div className="relative min-h-[220px] md:min-h-[320px]">
          <img
            src="/images/looks/party/banner.jpg"
            alt="A party of five in black tie"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-right"
          />
        </div>
      </div>
    </section>
  )
}
