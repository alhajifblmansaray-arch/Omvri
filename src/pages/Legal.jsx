// One template renders both legal pages; content keyed by `kind`.
const content = {
  terms: {
    eyebrow: 'The Fine Print',
    title: 'Terms of Service',
    updated: 'July 2026',
    sections: [
      ['Who we are', 'OMVRI Bespoke ("OMVRI", "we") operates this site and the atelier behind it. By placing an order you agree to these terms, which are short on purpose.'],
      ['Orders', 'An order is confirmed when payment clears and you receive an order number. Made-to-order and bespoke garments begin production after a 48-hour grace window, during which you may change or cancel freely.'],
      ['Pricing', 'Prices are set in US dollars and shown in your local currency at the day’s display rate. The amount charged is the amount shown at checkout. Taxes are applied by delivery market.'],
      ['Fit & alterations', 'First alterations on every suit are free. Garments cut to custom measurements are exchanged for alteration rather than refunded. See Shipping & Returns for the full policy.'],
      ['Your measurements', 'Measurements you save belong to you. We store them to cut your garments and improve your next fit, and we never sell or share them.'],
      ['Intellectual property', 'Photography, the OMVRI mark and the cuff tab are ours. Please ask before reusing them.'],
      ['Liability', 'Our liability is limited to the price of the garment. Nothing in these terms limits rights you hold under local consumer law.'],
      ['Contact', 'Questions about these terms: atelier@omvri.com.'],
    ],
  },
  privacy: {
    eyebrow: 'Your Data',
    title: 'Privacy Policy',
    updated: 'July 2026',
    sections: [
      ['What we collect', 'Your name, contact and shipping details when you order; your measurements when you save them; your email when you subscribe. Nothing more.'],
      ['What we do with it', 'Cut your garments, deliver your orders, and write to you occasionally if you subscribed. We do not sell, rent or trade personal data. Ever.'],
      ['Where it lives', 'Order and measurement data is stored securely and retained while your account is active, because your next suit fits better when we remember your last one. Ask and we delete it.'],
      ['Payments', 'Card details are processed by our payment provider and never touch our servers. We keep only the last four digits, for your receipts.'],
      ['Cookies', 'We use the minimum needed to keep your bag and preferences working. No advertising trackers.'],
      ['Your rights', 'Access, correction, export and deletion: one email to atelier@omvri.com and it is done within 30 days.'],
    ],
  },
}

export default function Legal({ kind = 'terms' }) {
  const c = content[kind]
  return (
    <div className="pt-20">
      <section className="max-w-[900px] mx-auto px-6 pt-20 pb-14 text-center">
        <span className="reveal text-[11px] tracking-widest2 uppercase text-gold-700 mb-5 block">
          {c.eyebrow}
        </span>
        <h1 className="reveal font-display text-5xl md:text-6xl text-obsidian-900" style={{ animationDelay: '100ms' }}>
          {c.title}
        </h1>
        <p className="reveal text-xs text-obsidian-400 mt-5" style={{ animationDelay: '160ms' }}>
          Last updated {c.updated}
        </p>
      </section>

      <section className="max-w-[720px] mx-auto px-6 pb-28">
        {c.sections.map(([h, body], i) => (
          <div key={h} className="border-t border-obsidian-900/10 py-7">
            <div className="flex items-baseline gap-4 mb-2.5">
              <span className="font-display text-lg text-gold-700">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="text-obsidian-900">{h}</h2>
            </div>
            <p className="text-sm text-obsidian-400 leading-relaxed pl-10">{body}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
