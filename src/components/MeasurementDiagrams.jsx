// Schematic measurement diagrams — ink line-art on paper, consistent with
// the brand's minimal figures. Labels correspond to the input field keys.
const line = 'var(--ink)'
const dim = 'rgba(23,22,26,0.35)'
const label = { fontSize: 9, fill: 'var(--ink)', fontFamily: 'Manrope, sans-serif', letterSpacing: 0.4 }

function Guide({ x1, y1, x2, y2 }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={dim} strokeWidth="1" strokeDasharray="3 3" />
}

export function CoatDiagram({ className = '' }) {
  return (
    <svg viewBox="0 0 320 300" className={className} role="img" aria-label="Jacket measurement points">
      <rect width="320" height="300" fill="#faf8f3" />
      {/* jacket silhouette */}
      <path
        d="M130 40 L110 52 L58 76 L74 120 L64 250 L130 250 L134 130 L160 138 L186 130 L190 250 L256 250 L246 120 L262 76 L210 52 L190 40 L160 60 Z"
        fill="#ffffff"
        stroke={line}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* lapel */}
      <path d="M160 60 L134 130 L160 138 M160 60 L186 130 L160 138" fill="none" stroke={line} strokeWidth="1" />
      {/* collar / neck */}
      <path d="M130 40 Q160 26 190 40" fill="none" stroke={line} strokeWidth="1" />

      {/* measurement guides */}
      <Guide x1={58} y1={72} x2={262} y2={72} />
      <text x="160" y="20" textAnchor="middle" {...label}>Shoulder Width</text>
      <line x1="160" y1="24" x2="160" y2="68" stroke={dim} strokeWidth="1" />

      <Guide x1={64} y1={150} x2={256} y2={150} />
      <text x="286" y="153" {...label}>Chest</text>

      <Guide x1={70} y1={210} x2={250} y2={210} />
      <text x="286" y="213" {...label}>Waist</text>

      {/* sleeve length down right arm */}
      <line x1="238" y1="70" x2="252" y2="248" stroke={dim} strokeWidth="1" strokeDasharray="3 3" />
      <text x="272" y="165" {...label}>Sleeve</text>

      {/* jacket length */}
      <line x1="112" y1="46" x2="112" y2="250" stroke={dim} strokeWidth="1" strokeDasharray="3 3" />
      <text x="34" y="150" {...label} textAnchor="middle" transform="rotate(-90 34 150)">Jacket Length</text>

      {/* bicep */}
      <ellipse cx="66" cy="128" rx="12" ry="7" fill="none" stroke={dim} strokeWidth="1" strokeDasharray="2 2" />
      <text x="16" y="110" {...label}>Bicep</text>

      {/* neck */}
      <text x="196" y="34" {...label}>Neck</text>
    </svg>
  )
}

export function PantsDiagram({ className = '' }) {
  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-label="Trouser measurement points">
      <rect width="320" height="320" fill="#faf8f3" />
      {/* trouser silhouette */}
      <path
        d="M104 30 L216 30 L212 96 L204 300 L168 300 L160 150 L152 300 L116 300 L108 96 Z"
        fill="#ffffff"
        stroke={line}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="104" y1="44" x2="216" y2="44" stroke={line} strokeWidth="1" />

      {/* waist */}
      <Guide x1={104} y1={34} x2={216} y2={34} />
      <text x="160" y="20" textAnchor="middle" {...label}>Waist</text>

      {/* hip */}
      <Guide x1={106} y1={78} x2={214} y2={78} />
      <text x="250" y="81" {...label}>Hip</text>

      {/* thigh */}
      <Guide x1={110} y1={120} x2={158} y2={120} />
      <text x="40" y="123" {...label}>Thigh</text>

      {/* knee */}
      <Guide x1={122} y1={200} x2={156} y2={200} />
      <text x="42" y="203" {...label}>Knee</text>

      {/* inseam (inner) */}
      <line x1="160" y1="150" x2="152" y2="298" stroke={dim} strokeWidth="1" strokeDasharray="3 3" />
      <text x="182" y="235" {...label}>Inseam</text>

      {/* outseam (outer) */}
      <line x1="106" y1="34" x2="115" y2="298" stroke={dim} strokeWidth="1" strokeDasharray="3 3" />
      <text x="30" y="250" {...label} textAnchor="middle" transform="rotate(-90 30 250)">Outseam</text>

      {/* bottom opening */}
      <Guide x1={116} y1={290} x2={152} y2={290} />
      <text x="216" y="300" {...label}>Bottom</text>
    </svg>
  )
}
