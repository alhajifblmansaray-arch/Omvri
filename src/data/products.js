// Editorial photography, shot on location (Valley of Fire desert road).
// Each look folder now carries a full editorial set — covers, motion shots,
// details and OMVRI cuff macros — so every product reads distinct.
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
      { src: `${look('black')}/torso-1.jpg`, caption: 'Satin Shawl — Bow tie, pleated bib and a hand-set pocket square.', type: 'detail' },
      { src: `${look('black')}/walk-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('black')}/cuff-1.jpg`, caption: 'Working Cuffs — Satin-covered buttons, hand-stitched OMVRI tab.', type: 'detail' },
      { src: `${look('black')}/back-2.jpg`, caption: null, type: 'full' },
    ],
    description:
      'A one-button peak lapel tuxedo in deep charcoal wool, built for the room that calls for restraint over spectacle. Satin facing, hand-finished throughout.',
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
      { src: `${look('grey')}/chest-1.jpg`, caption: 'Double-Breasted Front — Six buttons, cut to close clean.', type: 'detail' },
      { src: `${look('grey')}/cuff-1.jpg`, caption: 'OMVRI Cuff Tab — Hand-embroidered on every finished cuff.', type: 'detail' },
      { src: `${look('grey')}/wide-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('grey')}/stool-2.jpg`, caption: null, type: 'full' },
    ],
    description:
      'A double-breasted birdseye that reads as the closest thing to a uniform a bespoke suit can be — quietly correct in nearly every room, from the VBC mill outside Biella.',
  },
  {
    id: 'faro-tan',
    name: 'The Faro',
    fabric: 'Tan Cotton-Linen',
    mill: 'Solbiati, Como',
    price: 999,
    slug: 'faro-tan',
    tone: '#6b4a30',
    category: 'casual',
    hero: `${look('brown')}/walk-1.jpg`,
    gallery: [
      { src: `${look('brown')}/walk-1.jpg`, caption: null, type: 'full' },
      { src: `${look('brown')}/cover.jpg`, caption: null, type: 'full' },
      { src: `${look('craft')}/artistry-1.jpg`, caption: 'OMVRI Cuff Tab — Embroidered in raw silk thread by hand.', type: 'detail' },
      { src: `${look('brown')}/lean-1.jpg`, caption: null, type: 'styled' },
    ],
    description:
      'A warm-weather cotton-linen blend from Solbiati, cut double-breasted and left soft in the shoulder for a jacket that breathes.',
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
      { src: `${look('burgundy')}/back-2.jpg`, caption: 'Back Vent — A single deep vent, pressed to fall closed.', type: 'detail' },
      { src: `${look('burgundy')}/cover.jpg`, caption: null, type: 'full' },
    ],
    description:
      'A double-breasted wool twill in deep burgundy for occasions that call for a bit of nerve. Zegna cloth, cut close through the body.',
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
    hero: `${look('black')}/walk-1.jpg`,
    gallery: [
      { src: `${look('black')}/walk-1.jpg`, caption: null, type: 'full' },
      { src: `${look('black')}/detail-2.jpg`, caption: 'Milled Flannel — Brushed twice for a soft, matte hand.', type: 'detail' },
      { src: `${look('black')}/styled-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('black')}/detail-1.jpg`, caption: 'Notch Lapel — Cut narrow to keep the silhouette lean.', type: 'detail' },
      { src: `${look('black')}/full-2.jpg`, caption: null, type: 'full' },
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
    hero: `${look('grey')}/wide-1.jpg`,
    gallery: [
      { src: `${look('grey')}/wide-1.jpg`, caption: null, type: 'full' },
      { src: `${look('grey')}/detail-2.jpg`, caption: 'Sharkskin Weave — A two-tone twist yarn that shifts in the light.', type: 'detail' },
      { src: `${look('grey')}/walk-1.jpg`, caption: null, type: 'styled' },
      { src: `${look('grey')}/detail-1.jpg`, caption: 'Horn Buttons — Cut from natural buffalo horn, no two alike.', type: 'detail' },
      { src: `${look('grey')}/portrait-1.jpg`, caption: null, type: 'full' },
    ],
    description:
      'A stone-grey double-breasted from Dormeuil with a subtle two-tone shimmer. Sharp under office light, unassuming in shadow.',
  },
]

export const categories = [
  { key: 'all', label: 'All Suits' },
  { key: 'business', label: 'Business' },
  { key: 'evening', label: 'Evening' },
  { key: 'casual', label: 'Casual' },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

export const accessories = [
  { id: 'belt-black', name: 'Black Belt', material: 'Italian Cow Leather', price: 129, image: `${look('black')}/detail-3.jpg` },
  { id: 'tie-burgundy', name: 'Burgundy Silk Tie', material: 'Mulberry Silk', price: 139, image: `${look('burgundy')}/detail-1.jpg` },
  { id: 'oxford-black', name: 'Black Oxford', material: 'Calf Leather', price: 319, image: `${look('black')}/full-1.jpg` },
  { id: 'pocket-square-ivory', name: 'Ivory Pocket Square', material: 'Silk Satin', price: 79, image: `${look('grey')}/lapel-1.jpg` },
  { id: 'bow-tie-black', name: 'Black Bow Tie', material: 'Silk Satin', price: 119, image: `${look('black')}/torso-1.jpg` },
  { id: 'cufflinks-gold', name: 'Gold Cufflinks', material: 'Plated Brass', price: 149, image: `${look('black')}/cuff-1.jpg` },
]

// Configurator option inventory. Real per-option garment photography
// (each button/lapel/lining shot in isolation) is not yet available —
// `image` falls back to the closest full look shot, so the "live preview"
// swaps looks rather than true construction details. Replace with actual
// macro shots per option before this feels genuinely live.
export const configuratorSteps = [
  {
    id: 'fabric',
    label: 'Fabric',
    options: [
      { code: '595.201', name: 'Charcoal Wool Twill', priceDelta: 0, image: `${look('black')}/full-1.jpg` },
      { code: '412.118', name: 'Navy Birdseye', priceDelta: 0, image: `${look('grey')}/full-1.jpg` },
      { code: '330.087', name: 'Tan Cotton-Linen', priceDelta: -80, image: `${look('brown')}/full-1.jpg` },
      { code: '710.204', name: 'Burgundy Twill', priceDelta: 60, image: `${look('burgundy')}/full-1.jpg` },
    ],
  },
  {
    id: 'lapel',
    label: 'Lapel',
    options: [
      { code: 'L1', name: 'Notch Lapel', priceDelta: 0, image: `${look('black')}/styled-1.jpg` },
      { code: 'L2', name: 'Peak Lapel', priceDelta: 40, image: `${look('grey')}/full-2.jpg` },
      { code: 'L3', name: 'Shawl Lapel', priceDelta: 60, image: `${look('brown')}/styled-1.jpg` },
    ],
  },
  {
    id: 'button',
    label: 'Button',
    options: [
      { code: 'TFH01', name: 'Mahogany', priceDelta: 0, image: `${look('brown')}/detail-1.jpg` },
      { code: 'G8', name: 'Dark & Light Brown', priceDelta: 0, image: `${look('brown')}/detail-3.jpg` },
      { code: 'B09', name: 'Grey & Dark Brown Horn', priceDelta: 10, image: `${look('grey')}/detail-1.jpg` },
      { code: 'E2', name: 'Maroon & Dark Brown', priceDelta: 0, image: `${look('burgundy')}/detail-1.jpg` },
    ],
  },
  {
    id: 'lining',
    label: 'Lining',
    options: [
      { code: 'LN1', name: 'Obsidian', priceDelta: 0, image: `${look('black')}/detail-1.jpg` },
      { code: 'LN2', name: 'Gold Paisley', priceDelta: 30, image: `${look('brown')}/detail-2.jpg` },
      { code: 'LN3', name: 'Burgundy', priceDelta: 20, image: `${look('burgundy')}/detail-2.jpg` },
    ],
  },
]

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
