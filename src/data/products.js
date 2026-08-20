// Editorial photography, shot on location (Valley of Fire desert road).
// Each look folder now carries a full editorial set: covers, motion shots,
// details and OMVRI cuff macros, so every product reads distinct.
const look = (color) => `/images/looks/${color}`

export const products = [
  {
    id: 'meridian-charcoal',
    name: 'The Meridian',
    fabric: 'Charcoal Wool Twill',
    mill: 'Loro Piana, Biella',
    price: 999,
    slug: 'meridian-charcoal',
    tone: '#1c1c1e',
    category: 'evening',
    descriptor: 'One button peak lapel · Black tie',
    swatch: `${look('black')}/cuff-1.jpg`,
    spec: {
      'Best for': 'Black tie, galas, and the wedding you are standing up in rather than attending.',
      'Feels like': 'Dry and fine in the hand, with almost no weight to it. Cool to wear under lights.',
      'Sits': 'Close through the chest, one button, clean break over the shoe.',
      'The cloth': 'Charcoal wool twill from Loro Piana in Biella, with a satin faced lapel and covered buttons.',
      'Good to know': 'Satin does not take a press the way wool does. Steam the lapel, never iron it.',
    },
    hero: `${look('black')}/full-1.jpg`,
    gallery: [
      { src: `${look('black')}/full-1.jpg`, caption: null, type: 'full' },
      { src: `${look('black')}/torso-1.jpg`, caption: 'Satin Shawl · Bow tie, pleated bib and a hand set pocket square.', type: 'detail' },
      { src: `${look('black')}/walk-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('black')}/cuff-1.jpg`, caption: 'Working Cuffs · Satin covered buttons, hand stitched OMVRI tab.', type: 'detail' },
      { src: `${look('black')}/back-2.jpg`, caption: null, type: 'full' },
    ],
    description:
      'A one button peak lapel tuxedo in deep charcoal wool, built for the room that calls for restraint over spectacle. Satin facing, finished by hand throughout.',
  },
  {
    id: 'solstice-navy',
    name: 'The Solstice',
    fabric: 'Navy Birdseye Wool',
    mill: 'Vitale Barberis Canonico',
    price: 999,
    slug: 'solstice-navy',
    tone: '#8d94a0',
    category: 'business',
    descriptor: 'Double breasted · Business',
    swatch: `${look('grey')}/chest-1.jpg`,
    spec: {
      'Best for': 'The working week. Boardrooms, and anywhere you would rather be taken at your word.',
      'Feels like': 'A firm, dry handle with enough body to hold a press through a full day.',
      'Sits': 'Structured shoulder, six buttons, cut to close clean with nothing pulling.',
      'The cloth': 'Navy birdseye from Vitale Barberis Canonico, milled outside Biella.',
      'Good to know': 'Birdseye reads solid across a room and textured up close. It forgives a long day.',
    },
    hero: `${look('grey')}/stool-1.jpg`,
    gallery: [
      { src: `${look('grey')}/stool-1.jpg`, caption: null, type: 'full' },
      { src: `${look('grey')}/chest-1.jpg`, caption: 'Double Breasted Front · Six buttons, cut to close clean.', type: 'detail' },
      { src: `${look('grey')}/cuff-1.jpg`, caption: 'OMVRI Cuff Tab · Hand embroidered on every finished cuff.', type: 'detail' },
      { src: `${look('grey')}/wide-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('grey')}/stool-2.jpg`, caption: null, type: 'full' },
    ],
    description:
      'A double breasted birdseye that reads as the closest thing to a uniform a bespoke suit can be, quietly correct in nearly every room, from the VBC mill outside Biella.',
  },
  {
    id: 'faro-tan',
    name: 'The Faro',
    fabric: 'Tan Cotton Linen',
    mill: 'Solbiati, Como',
    price: 999,
    slug: 'faro-tan',
    tone: '#6b4a30',
    category: 'casual',
    descriptor: 'Double breasted · Warm weather',
    swatch: `${look('craft')}/artistry-1.jpg`,
    spec: {
      'Best for': 'Summer weddings, long lunches, and anywhere with real heat in it.',
      'Feels like': 'Open and light, with a dry handle. It breathes before you notice the heat.',
      'Sits': 'Soft shoulder, little structure, relaxed through the body.',
      'The cloth': 'A cotton linen blend from Solbiati in Como.',
      'Good to know': 'Linen creases as you wear it. That is the cloth behaving, not a fault in the make.',
    },
    hero: `${look('brown')}/walk-1.jpg`,
    gallery: [
      { src: `${look('brown')}/walk-1.jpg`, caption: null, type: 'full' },
      { src: `${look('brown')}/cover.jpg`, caption: null, type: 'full' },
      { src: `${look('craft')}/artistry-1.jpg`, caption: 'OMVRI Cuff Tab · Embroidered in raw silk thread by hand.', type: 'detail' },
      { src: `${look('brown')}/lean-1.jpg`, caption: null, type: 'styled' },
    ],
    description:
      'A warm weather cotton linen blend from Solbiati, cut double breasted and left soft in the shoulder for a jacket that breathes.',
  },
  {
    id: 'vesper-ivory',
    name: 'The Vesper',
    fabric: 'Burgundy Wool Twill',
    mill: 'Ermenegildo Zegna',
    price: 999,
    slug: 'vesper-ivory',
    tone: '#7a2e2e',
    category: 'evening',
    descriptor: 'Double breasted · Evening',
    swatch: `${look('burgundy')}/back-2.jpg`,
    spec: {
      'Best for': 'Evenings that call for a bit of nerve. Openings, dinners, anything with a photographer.',
      'Feels like': 'Substantial and smooth, with genuine weight in the skirt of the jacket.',
      'Sits': 'Cut close through the body with a strong shoulder line.',
      'The cloth': 'Burgundy wool twill from Ermenegildo Zegna.',
      'Good to know': 'It photographs darker than it wears. In daylight the colour moves toward oxblood.',
    },
    hero: `${look('burgundy')}/stool-1.jpg`,
    gallery: [
      { src: `${look('burgundy')}/stool-1.jpg`, caption: null, type: 'full' },
      { src: `${look('burgundy')}/front-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('burgundy')}/back-1-full.jpg`, caption: null, type: 'full' },
      { src: `${look('burgundy')}/back-2.jpg`, caption: 'Back Vent · A single deep vent, pressed to fall closed.', type: 'detail' },
      { src: `${look('burgundy')}/cover.jpg`, caption: null, type: 'full' },
    ],
    description:
      'A double breasted wool twill in deep burgundy for occasions that call for a bit of nerve. Zegna cloth, cut close through the body.',
  },
  {
    id: 'harlow-forest',
    name: 'The Harlow',
    fabric: 'Navy Satin Faced Wool',
    mill: 'Ermenegildo Zegna',
    price: 999,
    slug: 'harlow-forest',
    tone: '#141a2b',
    category: 'evening',
    descriptor: 'Double breasted · Black tie',
    swatch: `${look('harlow')}/lapel-1.jpg`,
    spec: {
      'Best for': 'Black tie where the room is already full of black. Midnight reads richer under light.',
      'Feels like': 'Smooth and cool, with a satin lapel that catches rather than shines.',
      'Sits': 'Double breasted, peak lapel, cut close and buttoned high.',
      'The cloth': 'Navy satin faced wool from Ermenegildo Zegna.',
      'Good to know': 'Midnight navy was invented because true black photographs flat. It still holds.',
    },
    hero: `${look('harlow')}/cover.jpg`,
    gallery: [
      { src: `${look('harlow')}/cover.jpg`, caption: null, type: 'full' },
      { src: `${look('harlow')}/detail-1.jpg`, caption: null, type: 'detail' },
      { src: `${look('harlow')}/seated-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('harlow')}/lapel-1.jpg`, caption: 'Satin Peak Lapel · Faced in contrast satin, pressed to a sharp roll.', type: 'detail' },
      { src: `${look('harlow')}/portrait-1.jpg`, caption: null, type: 'full' },
    ],
    description:
      'A midnight navy dinner suit, double breasted and faced in satin at the lapel. Cut for the room where everyone else came in black.',
  },
  {
    id: 'ashford-stone',
    name: 'The Ashford',
    fabric: 'Olive Satin Faced Wool',
    mill: 'Dormeuil, Paris',
    price: 999,
    slug: 'ashford-stone',
    tone: '#4a4a32',
    category: 'evening',
    descriptor: 'Peak lapel · Evening',
    swatch: `${look('ashford')}/lapel-1.jpg`,
    spec: {
      'Best for': 'The evening where you would rather not wear black, and rather not be forgotten.',
      'Feels like': 'Fluid and cool with a soft sheen, heavier than it looks on the hanger.',
      'Sits': 'Peak lapel faced in satin, cut lean through the waist.',
      'The cloth': 'Olive satin faced wool from Dormeuil in Paris.',
      'Good to know': 'Olive shifts with the light, reading almost brown by candle and green by day.',
    },
    hero: `${look('ashford')}/cover.jpg`,
    gallery: [
      { src: `${look('ashford')}/cover.jpg`, caption: null, type: 'full' },
      { src: `${look('ashford')}/seated-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('ashford')}/lapel-1.jpg`, caption: 'Satin Peak Lapel · Contrast satin facing, hand set pocket square.', type: 'detail' },
      { src: `${look('ashford')}/seated-2.jpg`, caption: null, type: 'full' },
    ],
    description:
      'An olive dinner jacket with a satin peak lapel, cut lean through the waist. For the evening that does not need another black suit in it.',
  },
  {
    id: 'lario-black',
    name: 'The Lario',
    fabric: 'Black Wool Barathea',
    mill: 'Drago, Biella',
    price: 999,
    slug: 'lario-black',
    tone: '#111113',
    category: 'evening',
    descriptor: 'Double breasted · Black tie',
    swatch: `${look('lario')}/lapel-1.jpg`,
    spec: {
      'Best for': 'True black tie. The hour after sunset, and everything that follows it.',
      'Feels like': 'Firm, matte and completely flat to the eye. No shine, no blue cast.',
      'Sits': 'Double breasted with a wide peak lapel, pressed to a knife edge.',
      'The cloth': 'Black wool barathea from Drago in Biella.',
      'Good to know': 'Barathea is the traditional black tie cloth precisely because it refuses to reflect.',
    },
    hero: `${look('lario')}/cover.jpg`,
    gallery: [
      { src: `${look('lario')}/cover.jpg`, caption: null, type: 'full' },
      { src: `${look('lario')}/lawn-1.jpg`, caption: null, type: 'full' },
      { src: `${look('lario')}/lapel-1.jpg`, caption: 'Peak Lapel · Cut wide and pressed to a knife edge, with covered buttons.', type: 'detail' },
      { src: `${look('lario')}/walk-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('lario')}/portrait-1.jpg`, caption: null, type: 'full' },
      { src: `${look('lario')}/edge-1.jpg`, caption: null, type: 'styled' },
    ],
    description:
      'A double breasted black barathea cut for the hour after sunset, shot on the water at Lake Como, from which it takes its name. Peak lapels, covered buttons, nothing else.',
  },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

// The Featured edit: a short, rotating selection that paid traffic lands on
// instead of the homepage. Reorder this list to change what the campaign sells.
export const featuredSlugs = ['lario-black', 'meridian-charcoal', 'vesper-ivory', 'harlow-forest']

export const featuredProducts = () =>
  featuredSlugs.map((s) => getProductBySlug(s)).filter(Boolean)

export const sizeMatrix = {
  lengths: ['Short', 'Regular', 'Long'],
  sizes: [32, 34, 36, 38, 40, 42, 44, 46, 48, 50],
  // sizes unavailable for a given length
  unavailable: {
    Short: [32, 48, 50],
    Regular: [],
    Long: [32, 34, 36],
  },
}
