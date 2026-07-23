// Placeholder editorial art: minimal line-drawn figures in suits on a
// white ground, standing in for real OMVRI product photography (not yet
// shot). Swap `products.js` image fields for real photo URLs once
// available — every call site just expects an <img src> string.

const uri = (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`

const HAIR = '#2a2620'
const SKIN = '#e3c4a3'
const SHIRT = '#f7f4ec'

// Standing, front-on figure — used for full-body shots.
export function suitFigureFull(jacket = '#3a3a3d') {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1125">
  <rect width="900" height="1125" fill="#ffffff"/>
  <ellipse cx="450" cy="1078" rx="150" ry="16" fill="#f0ede6"/>

  <!-- legs / trousers -->
  <rect x="372" y="620" width="72" height="440" rx="12" fill="${jacket}"/>
  <rect x="456" y="620" width="72" height="440" rx="12" fill="${jacket}"/>
  <rect x="372" y="1020" width="72" height="34" rx="8" fill="${HAIR}" opacity="0.85"/>
  <rect x="456" y="1020" width="72" height="34" rx="8" fill="${HAIR}" opacity="0.85"/>

  <!-- arms -->
  <rect x="266" y="330" width="58" height="300" rx="24" fill="${jacket}"/>
  <rect x="576" y="330" width="58" height="300" rx="24" fill="${jacket}"/>
  <rect x="270" y="618" width="50" height="42" rx="12" fill="${SKIN}"/>
  <rect x="580" y="618" width="50" height="42" rx="12" fill="${SKIN}"/>

  <!-- jacket torso -->
  <path d="M330 300 L450 262 L570 300 L610 640 L520 660 L520 480 L500 660 L400 660 L380 480 L380 660 L290 640 Z" fill="${jacket}"/>

  <!-- shirt + collar -->
  <path d="M450 262 L414 316 L450 400 L486 316 Z" fill="${SHIRT}"/>
  <path d="M450 262 L414 316 L398 292 L424 258 Z" fill="${jacket}"/>
  <path d="M450 262 L486 316 L502 292 L476 258 Z" fill="${jacket}"/>

  <!-- buttons -->
  <circle cx="450" cy="440" r="6" fill="${HAIR}"/>
  <circle cx="450" cy="500" r="6" fill="${HAIR}"/>

  <!-- neck + head -->
  <rect x="420" y="196" width="60" height="76" rx="24" fill="${SKIN}"/>
  <circle cx="450" cy="168" r="58" fill="${SKIN}"/>
  <path d="M394 150 A56 56 0 0 1 506 150 A80 40 0 0 0 394 150 Z" fill="${HAIR}"/>
</svg>`.trim()
  return uri(svg)
}

// Waist-up, styled-on-model crop.
export function suitFigureStyled(jacket = '#3a3a3d') {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1125">
  <rect width="900" height="1125" fill="#ffffff"/>

  <!-- arms -->
  <rect x="196" y="560" width="90" height="360" rx="30" fill="${jacket}"/>
  <rect x="614" y="560" width="90" height="360" rx="30" fill="${jacket}"/>

  <!-- jacket torso, wider crop -->
  <path d="M300 500 L450 440 L600 500 L660 920 L240 920 Z" fill="${jacket}"/>

  <!-- shirt + collar -->
  <path d="M450 440 L396 516 L450 640 L504 516 Z" fill="${SHIRT}"/>
  <path d="M450 440 L396 516 L374 484 L410 434 Z" fill="${jacket}"/>
  <path d="M450 440 L504 516 L526 484 L490 434 Z" fill="${jacket}"/>

  <!-- buttons -->
  <circle cx="450" cy="690" r="8" fill="${HAIR}"/>
  <circle cx="450" cy="760" r="8" fill="${HAIR}"/>

  <!-- neck + head -->
  <rect x="404" y="330" width="92" height="120" rx="34" fill="${SKIN}"/>
  <circle cx="450" cy="292" r="86" fill="${SKIN}"/>
  <path d="M372 262 A78 78 0 0 1 528 262 A112 54 0 0 0 372 262 Z" fill="${HAIR}"/>
</svg>`.trim()
  return uri(svg)
}

// Macro construction detail — stitching / buttons, abstracted.
export function suitDetailMacro(jacket = '#3a3a3d') {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1050">
  <rect width="1400" height="1050" fill="#ffffff"/>
  <rect x="0" y="0" width="1400" height="1050" fill="${jacket}" opacity="0.05"/>
  <g stroke="${HAIR}" stroke-width="2" opacity="0.45">
    ${Array.from({ length: 14 })
      .map((_, i) => `<line x1="${120 + i * 90}" y1="120" x2="${60 + i * 90}" y2="930" />`)
      .join('')}
  </g>
  <circle cx="700" cy="500" r="46" fill="${jacket}" stroke="${HAIR}" stroke-width="3"/>
  <circle cx="686" cy="486" r="7" fill="${HAIR}"/>
  <circle cx="714" cy="486" r="7" fill="${HAIR}"/>
  <circle cx="686" cy="514" r="7" fill="${HAIR}"/>
  <circle cx="714" cy="514" r="7" fill="${HAIR}"/>
</svg>`.trim()
  return uri(svg)
}

export function suitSwatch(jacket = '#3a3a3d') {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#ffffff"/>
  <rect x="20" y="20" width="360" height="360" fill="${jacket}"/>
</svg>`.trim()
  return uri(svg)
}
