import { useState } from 'react'

export default function SaveForLaterPanel() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="text-center pt-10">
        <h3 className="font-display text-2xl text-obsidian-900 mb-3">Saved</h3>
        <p className="text-sm text-obsidian-400 leading-relaxed max-w-[300px] mx-auto">
          We'll keep this look in your wardrobe. A confirmation is on its way to your inbox.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="pt-4 space-y-6"
    >
      <div className="relative border border-obsidian-900/20 focus-within:border-gold-700 transition-colors duration-450 px-4 pt-5 pb-2">
        <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-obsidian-400">
          Email
        </label>
        <input
          required
          type="email"
          className="w-full bg-transparent outline-none text-obsidian-900"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-obsidian-900 text-white py-4 text-[11px] tracking-[0.18em] uppercase hover:bg-gold-700 transition-colors duration-450"
      >
        Continue
      </button>

      <div className="flex items-center gap-4 text-xs text-obsidian-400">
        <span className="flex-1 h-px bg-obsidian-900/10" />
        or
        <span className="flex-1 h-px bg-obsidian-900/10" />
      </div>

      <button
        type="button"
        className="w-full border border-obsidian-900/20 text-obsidian-900 py-4 text-sm hover:border-obsidian-900 transition-colors duration-450"
      >
         Continue with Apple
      </button>
      <button
        type="button"
        className="w-full border border-obsidian-900/20 text-obsidian-900 py-4 text-sm hover:border-obsidian-900 transition-colors duration-450"
      >
        Continue with Google
      </button>

      <p className="text-xs text-obsidian-400 leading-relaxed text-center">
        We process your personal data to create an account and provide our services. Read in
        our <a href="#" className="underline underline-offset-2">Privacy policy</a> how we
        process this data.
      </p>
    </form>
  )
}
