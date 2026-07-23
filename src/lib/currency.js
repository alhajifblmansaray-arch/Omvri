// Single source of truth for money display. Every price in the app is stored
// in USD; this module detects the visitor's currency once and converts + formats
// at display time. A US visitor sees $999; a Canadian visitor sees the CAD
// equivalent labelled CAD, and so on.
//
// NOTE: the rates below are static placeholders for the demo. For production,
// either wire them to a live FX feed or (better for a store) set deliberate
// per-market prices instead of raw conversions.
const RATES = {
  USD: 1,
  CAD: 1.37,
  GBP: 0.79,
  EUR: 0.92,
  AUD: 1.52,
}

const EURO_REGIONS = ['DE', 'FR', 'ES', 'IT', 'NL', 'IE', 'PT', 'AT', 'BE', 'FI', 'GR', 'LU']

function detectCurrency() {
  try {
    // region from the browser's locale, e.g. "en-CA" -> "CA"
    const langs = navigator.languages || [navigator.language]
    for (const lang of langs) {
      const region = new Intl.Locale(lang).region
      if (region === 'CA') return 'CAD'
      if (region === 'US') return 'USD'
      if (region === 'GB') return 'GBP'
      if (region === 'AU') return 'AUD'
      if (EURO_REGIONS.includes(region)) return 'EUR'
    }
    // fallback: infer Canada from the time zone when locale has no region
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (/Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|Montreal|St_Johns/.test(tz)) {
      return 'CAD'
    }
  } catch {
    /* ignore — fall through to default */
  }
  return 'USD'
}

let CURRENCY = null
export function currencyCode() {
  if (!CURRENCY) CURRENCY = detectCurrency()
  return CURRENCY
}

// Format a USD amount into the visitor's currency, e.g. formatMoney(999) -> "$1,369".
// Uses a narrow symbol so CAD/USD/AUD all render as "$" (the code is shown
// separately in the UI, matching the existing "$999 CAD" pattern).
export function formatMoney(usd, decimals = 0) {
  const code = currencyCode()
  const converted = usd * (RATES[code] ?? 1)
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: code,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(converted)
}
