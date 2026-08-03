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
    fabric: 'Forest Flannel',
    mill: 'Fox Brothers, Somerset',
    price: 999,
    slug: 'harlow-forest',
    tone: '#1c1c1e',
    category: 'business',
    hero: `${look('harlow')}/cover.jpg`,
    gallery: [
      { src: `${look('harlow')}/cover.jpg`, caption: null, type: 'full' },
      { src: `${look('harlow')}/detail-1.jpg`, caption: null, type: 'detail' },
      { src: `${look('harlow')}/seated-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('harlow')}/lapel-1.jpg`, caption: 'Satin Peak Lapel · Faced in contrast satin, pressed to a sharp roll.', type: 'detail' },
      { src: `${look('harlow')}/portrait-1.jpg`, caption: null, type: 'full' },
    ],
    description:
      'A deep flannel from Fox Brothers, milled in Somerset since 1772. Heavier in the hand, built for the cold months.',
  },
  {
    id: 'ashford-stone',
    name: 'The Ashford',
    fabric: 'Stone Sharkskin',
    mill: 'Dormeuil, Paris',
    price: 999,
    slug: 'ashford-stone',
    tone: '#8d94a0',
    category: 'business',
    hero: `${look('ashford')}/cover.jpg`,
    gallery: [
      { src: `${look('ashford')}/cover.jpg`, caption: null, type: 'full' },
      { src: `${look('ashford')}/seated-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('ashford')}/lapel-1.jpg`, caption: 'Satin Peak Lapel · Contrast satin facing, hand set pocket square.', type: 'detail' },
      { src: `${look('ashford')}/seated-2.jpg`, caption: null, type: 'full' },
    ],
    description:
      'A stone grey double breasted from Dormeuil with a subtle two tone shimmer. Sharp under office light, unassuming in shadow.',
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
