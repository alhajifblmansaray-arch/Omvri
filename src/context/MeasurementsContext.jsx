import { createContext, useContext, useState, useEffect, useCallback } from 'react'

// Field definitions drive the panel, validation, and cart display.
// Order matches the numbered how-to-measure slides in the Customize panel.
export const JACKET_FIELDS = [
  { key: 'chest', label: 'Chest' },
  { key: 'shoulder', label: 'Shoulder Width' },
  { key: 'sleeve', label: 'Sleeve Length' },
  { key: 'backLength', label: 'Back Length' },
  { key: 'stomach', label: 'Stomach' },
  { key: 'bicep', label: 'Bicep' },
  { key: 'neck', label: 'Neck' },
]

export const PANT_FIELDS = [
  { key: 'hip', label: 'Hip' },
  { key: 'pantWaist', label: 'Waist' },
  { key: 'thigh', label: 'Thigh' },
  { key: 'outseam', label: 'Outseam' },
  { key: 'inseam', label: 'Inseam' },
]

const MeasurementsContext = createContext(null)
const STORAGE_KEY = 'omvri-measurements'

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (parsed && typeof parsed === 'object') return parsed
  } catch {
    /* ignore */
  }
  return { unit: 'in', values: {}, savedAt: null }
}

export function MeasurementsProvider({ children }) {
  const [state, setState] = useState(load)

  // persist on every change — survives refresh, navigation, and browser restart
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setUnit = useCallback((unit) => setState((s) => ({ ...s, unit })), [])

  const setValue = useCallback((key, value) => {
    setState((s) => ({ ...s, values: { ...s.values, [key]: value }, savedAt: null }))
  }, [])

  const markSaved = useCallback(() => {
    setState((s) => ({ ...s, savedAt: Date.now() }))
  }, [])

  const clear = useCallback(() => {
    setState({ unit: state.unit, values: {}, savedAt: null })
  }, [state.unit])

  // a snapshot to attach to a cart line item
  const snapshot = useCallback(
    () => ({ unit: state.unit, values: { ...state.values } }),
    [state.unit, state.values],
  )

  return (
    <MeasurementsContext.Provider
      value={{ ...state, setUnit, setValue, markSaved, clear, snapshot }}
    >
      {children}
    </MeasurementsContext.Provider>
  )
}

export function useMeasurements() {
  const ctx = useContext(MeasurementsContext)
  if (!ctx) throw new Error('useMeasurements must be used within MeasurementsProvider')
  return ctx
}
