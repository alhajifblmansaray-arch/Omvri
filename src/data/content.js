// Editorial + support content for the storefront. All static — swap copy
// freely; structure is what the pages render from.
const look = (color) => `/images/looks/${color}`

export const faqs = [
  {
    group: 'Ordering & Bespoke',
    items: [
      { q: 'What is the difference between a house look and a bespoke build?', a: 'House looks are our six signature suits, cut to your chosen size or custom measurements at $999. A bespoke build starts from an empty bolt in the Configurator — you choose cloth, lapel, buttons and lining, and it is cut from scratch at $1,500 plus any premium options.' },
      { q: 'How long does a suit take?', a: 'Three to five weeks from the day your order is confirmed. Every suit is cut on the table for one person — we never pull from a rack.' },
      { q: 'Can I change my order after placing it?', a: 'Within 48 hours, yes — write to the atelier and we will adjust cloth, options or measurements before cutting begins. Once your cloth is cut, the build is committed.' },
      { q: 'Do you make wedding parties?', a: 'We do — the groom locks a cloth and lapel spec, and each member of the party is measured and fitted individually against it. Book a fitting and mention the date; we plan backwards from it.' },
    ],
  },
  {
    group: 'Fit & Measurements',
    items: [
      { q: "What if I don't know my measurements?", a: 'Use the guided How to Measure page — twelve numbers, ten minutes with a soft tape. Or book a fitting, in person or virtual, and we take every measurement for you.' },
      { q: 'What if the suit does not fit when it arrives?', a: 'First alterations are on the house. We adjust in the atelier until nothing needs saying, and the corrections are saved to your measurements so the next suit fits better than the last.' },
      { q: 'Do you keep my measurements on file?', a: 'Yes — your measurements are saved to your profile and travel with every order, so reordering never means re-measuring.' },
    ],
  },
  {
    group: 'Shipping & Returns',
    items: [
      { q: 'Where do you ship?', a: 'Canada and the United States today; worldwide by arrangement. Delivery is free on every suit.' },
      { q: 'What is your return policy?', a: 'Ready-to-wear pieces return free within 30 days, unworn. Custom-measured and bespoke pieces are cut for one body — they exchange for alteration, not refund.' },
      { q: 'How is the suit delivered?', a: 'Pressed, hung and shipped in a rigid OMVRI garment box with tracking. Signature on delivery.' },
    ],
  },
  {
    group: 'Care',
    items: [
      { q: 'How should I care for my suit?', a: 'Brush after wear, rest it a day between wears, and dry clean sparingly — two or three times a year at most. Steam, never iron, the lapel roll.' },
      { q: 'My suit needs a repair — what do I do?', a: 'Send it home. The atelier repairs OMVRI garments for life: buttons, linings, seams and edges.' },
    ],
  },
]

export const testimonials = [
  { name: 'Marcus T.', city: 'Toronto', quote: 'The first suit that has ever actually fit me. The measurement flow took ten minutes and the jacket landed like it was drawn on.', suit: 'The Meridian' },
  { name: 'Adaeze O.', city: 'Ottawa', quote: 'Wore the Vesper to my brother’s wedding and got asked about it more than the groom got congratulated.', suit: 'The Vesper' },
  { name: 'Dev P.', city: 'New York', quote: 'Built mine in the configurator on a Tuesday night. Five weeks later it showed up better than the preview.', suit: 'Bespoke Build' },
]

// Star ratings are static demo content — wire to a real review platform later.
export const reviews = {
  'meridian-charcoal': [
    { name: 'Marcus T.', rating: 5, date: 'June 2026', title: 'Cut like glass', body: 'Shoulders sit perfectly. The satin shawl reads expensive because it is.' },
    { name: 'Leon B.', rating: 5, date: 'May 2026', title: 'Black tie, solved', body: 'Two events in and it still presses out like new. Worth every dollar.' },
    { name: 'A. Girma', rating: 4, date: 'May 2026', title: 'Nearly perfect', body: 'Sleeve needed a small alteration — done free in a week. Fit is now exact.' },
  ],
  'solstice-navy': [
    { name: 'Daniel K.', rating: 5, date: 'June 2026', title: 'The uniform', body: 'Wear it twice a week. Holds a press through a full day of meetings.' },
    { name: 'Omar S.', rating: 5, date: 'April 2026', title: 'Quietly correct', body: 'Exactly as described. The birdseye has depth without shouting.' },
  ],
  'faro-tan': [
    { name: 'Jules M.', rating: 5, date: 'July 2026', title: 'Summer answered', body: 'Breathes in 35° heat. The soft shoulder makes it read relaxed, not sloppy.' },
    { name: 'Chris A.', rating: 4, date: 'June 2026', title: 'Great warm-weather cut', body: 'Linen blend creases as linen does — but that is the charm.' },
  ],
  'vesper-ivory': [
    { name: 'Adaeze O.', rating: 5, date: 'June 2026', title: 'A bit of nerve, delivered', body: 'The burgundy photographs even better in person. Compliments all night.' },
    { name: 'T. Laurent', rating: 5, date: 'May 2026', title: 'Statement piece', body: 'Close through the body as promised. The Zegna cloth has real weight.' },
  ],
  'harlow-forest': [
    { name: 'Ben W.', rating: 5, date: 'March 2026', title: 'Winter armour', body: 'The Fox flannel is substantial. Warmest tailoring I own.' },
    { name: 'S. Novak', rating: 4, date: 'February 2026', title: 'Heavy in the best way', body: 'Drapes beautifully. Runs warm — exactly the point.' },
  ],
  'ashford-stone': [
    { name: 'Hasan R.', rating: 5, date: 'June 2026', title: 'Shifts in the light', body: 'The sharkskin two-tone is subtle until the sun hits it. Office-sharp.' },
    { name: 'P. Delgado', rating: 5, date: 'April 2026', title: 'Dormeuil delivers', body: 'Crisp shoulder line, clean close. My second OMVRI and not my last.' },
  ],
}

export const lookbook = [
  { src: `${look('burgundy')}/cover.jpg`, title: 'The Vesper, Valley of Fire', product: 'vesper-ivory', span: 'tall' },
  { src: `${look('black')}/walk-1.jpg`, title: 'The Meridian in motion', product: 'meridian-charcoal', span: 'tall' },
  { src: `${look('grey')}/stool-1.jpg`, title: 'The Solstice, elevated', product: 'solstice-navy', span: 'tall' },
  { src: `${look('brown')}/cover.jpg`, title: 'The Faro crossing', product: 'faro-tan', span: 'tall' },
  { src: `${look('grey')}/chest-1.jpg`, title: 'Birdseye, up close', product: 'solstice-navy', span: 'square' },
  { src: `${look('burgundy')}/reach-1.jpg`, title: 'Burgundy against sky', product: 'vesper-ivory', span: 'tall' },
  { src: `${look('black')}/torso-1.jpg`, title: 'Black tie detail', product: 'meridian-charcoal', span: 'square' },
  { src: `${look('brown')}/portrait-2.jpg`, title: 'Tan cotton-linen, low sun', product: 'faro-tan', span: 'tall' },
  { src: `${look('grey')}/walk-1.jpg`, title: 'The Ashford leans in', product: 'ashford-stone', span: 'tall' },
  { src: `${look('craft')}/artistry-1.jpg`, title: 'The OMVRI tab, by hand', product: null, span: 'square' },
  { src: `${look('burgundy')}/stool-1.jpg`, title: 'Vesper, full length', product: 'vesper-ivory', span: 'tall' },
  { src: `${look('grey')}/lapel-1.jpg`, title: 'Peak lapel study', product: 'ashford-stone', span: 'square' },
  { src: `${look('black')}/back-2.jpg`, title: 'Meridian, from behind', product: 'meridian-charcoal', span: 'tall' },
  { src: `${look('brown')}/cuff-1.jpg`, title: 'Four buttons, brown twill', product: 'faro-tan', span: 'square' },
  { src: `${look('grey')}/wide-1.jpg`, title: 'Stone grey, open road', product: 'ashford-stone', span: 'wide' },
]

export const craft = {
  image: `${look('craft')}/artistry-1.jpg`,
  cuffBlack: `${look('black')}/cuff-1.jpg`,
  cuffBrown: `${look('brown')}/cuff-1.jpg`,
  lapelGrey: `${look('grey')}/lapel-1.jpg`,
}

export const contact = {
  email: 'atelier@omvri.com',
  phone: '+1 (416) 555-0148',
  address: ['The OMVRI Atelier', '128 Ossington Avenue', 'Toronto, ON M6J 2Z5'],
  hours: [
    ['Tuesday — Friday', '10:00 – 19:00'],
    ['Saturday', '11:00 – 17:00'],
    ['Sunday — Monday', 'By appointment'],
  ],
  instagram: 'https://instagram.com/omvri',
}

// Production stages for the order tracker. `afterDays` is days since the
// order was placed — a stand-in until a real workshop system reports status.
export const orderStages = [
  { key: 'confirmed', label: 'Order confirmed', detail: 'Your measurements and options are locked with the atelier.', afterDays: 0 },
  { key: 'cut', label: 'Cloth cut', detail: 'Your pattern is drafted and the cloth is cut on the table.', afterDays: 3 },
  { key: 'tailoring', label: 'In tailoring', detail: 'Canvas, shoulders and seams — the long, slow middle.', afterDays: 10 },
  { key: 'finishing', label: 'Final press & QC', detail: 'Buttonholes finished by hand, then pressed and inspected.', afterDays: 24 },
  { key: 'shipped', label: 'Shipped', detail: 'On its way in a rigid OMVRI garment box, signature on delivery.', afterDays: 31 },
]
