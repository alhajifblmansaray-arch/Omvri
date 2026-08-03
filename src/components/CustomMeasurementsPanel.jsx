import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMeasurements, JACKET_FIELDS, PANT_FIELDS } from '../context/MeasurementsContext'
import { jacketSlides, pantSlides } from '../data/measureGuide'
import MeasureCarousel from './MeasureCarousel'

const STEPS = ['Jacket', 'Pants', 'Review & Save']

// numeric, positive, up to one decimal — reused for every field
function fieldError(raw) {
  if (raw === undefined || raw === '') return 'Required'
  if (!/^\d+(\.\d+)?$/.test(String(raw).trim())) return 'Numbers only'
  if (Number(raw) <= 0) return 'Must be greater than 0'
  return null
}

export default function CustomMeasurementsPanel({ product, onAdd, initialStep = 0 }) {
  const { unit, setUnit, values, setValue, markSaved, savedAt } = useMeasurements()
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState(initialStep)
  const [touched, setTouched] = useState({})
  // which guide slide is showing; focusing a field brings its slide up
  const [activeKey, setActiveKey] = useState(null)

  const fieldsForStep = step === 0 ? JACKET_FIELDS : step === 1 ? PANT_FIELDS : []
  const allFields = [...JACKET_FIELDS, ...PANT_FIELDS]

  const stepComplete = (fields) => fields.every((f) => !fieldError(values[f.key]))
  const allComplete = stepComplete(allFields)

  const touchStep = (fields) =>
    setTouched((t) => ({ ...t, ...Object.fromEntries(fields.map((f) => [f.key, true])) }))

  const next = () => {
    touchStep(fieldsForStep)
    if (stepComplete(fieldsForStep)) setStep((s) => Math.min(s + 1, 2))
  }

  const handleSaveAndAdd = () => {
    touchStep(allFields)
    if (!allComplete) return
    markSaved()
    onAdd({
      custom: true,
      measurements: { unit, values: { ...values } },
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* unit toggle + guide link */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex border border-obsidian-900/15 text-[11px] tracking-[0.12em] uppercase">
          {['in', 'cm'].map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-4 py-2 transition-colors duration-300 ${
                unit === u ? 'bg-obsidian-900 text-white' : 'text-obsidian-500 hover:text-obsidian-900'
              }`}
            >
              {u === 'in' ? 'Inches' : 'Cm'}
            </button>
          ))}
        </div>
        <button
          onClick={() =>
            // remember the page and step so the guide can bring us back here
            navigate('/measurement-guide', {
              state: { returnTo: location.pathname, returnStep: step },
            })
          }
          className="text-[11px] tracking-[0.14em] uppercase text-gold-700 hover:text-gold-800 underline underline-offset-4 transition-colors duration-450"
        >
          How to Measure
        </button>
      </div>

      {/* progress indicator */}
      <ol className="flex items-center gap-2 mb-8" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 ${i <= step ? '' : 'pointer-events-none'}`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-colors duration-300 ${
                  i < step
                    ? 'bg-gold-700 text-white'
                    : i === step
                      ? 'bg-obsidian-900 text-white'
                      : 'border border-obsidian-900/20 text-obsidian-400'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </span>
              <span className={`text-[10px] tracking-[0.1em] uppercase hidden sm:inline ${
                i === step ? 'text-obsidian-900' : 'text-obsidian-400'
              }`}>
                {s}
              </span>
            </button>
            {i < STEPS.length - 1 && <span className="flex-1 h-px bg-obsidian-900/10" />}
          </li>
        ))}
      </ol>

      {/* step body */}
      <div className="flex-1">
        {step === 0 && (
          <StepFields
            title="Step 1 · Jacket Measurements"
            diagram={
              <MeasureCarousel
                slides={jacketSlides}
                activeKey={activeKey}
                onActiveChange={setActiveKey}
              />
            }
            fields={JACKET_FIELDS}
            values={values}
            unit={unit}
            touched={touched}
            setTouched={setTouched}
            setValue={setValue}
            onFocusField={setActiveKey}
          />
        )}
        {step === 1 && (
          <StepFields
            title="Step 2 · Pant Measurements"
            diagram={
              <MeasureCarousel
                slides={pantSlides}
                activeKey={activeKey}
                onActiveChange={setActiveKey}
              />
            }
            fields={PANT_FIELDS}
            values={values}
            unit={unit}
            touched={touched}
            setTouched={setTouched}
            setValue={setValue}
            onFocusField={setActiveKey}
          />
        )}
        {step === 2 && (
          <ReviewStep values={values} unit={unit} onEdit={setStep} />
        )}
      </div>

      {/* sticky footer */}
      <div className="sticky bottom-0 bg-white mt-6 pt-4 border-t border-obsidian-900/10">
        {savedAt && step === 2 && (
          <p className="text-xs text-gold-700 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-700" />
            Your custom measurements have been saved successfully.
          </p>
        )}
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-6 py-3.5 border border-obsidian-900/20 text-obsidian-900 text-[11px] tracking-[0.16em] uppercase hover:border-obsidian-900 transition-colors duration-450"
            >
              Back
            </button>
          )}
          {step < 2 ? (
            <button
              onClick={next}
              className="flex-1 bg-obsidian-900 text-white py-4 text-[11px] tracking-[0.16em] uppercase hover:bg-gold-700 transition-colors duration-450"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSaveAndAdd}
              disabled={!allComplete}
              className={`flex-1 py-4 text-[11px] tracking-[0.16em] uppercase transition-colors duration-450 ${
                allComplete
                  ? 'bg-obsidian-900 text-white hover:bg-gold-700'
                  : 'bg-obsidian-100 text-obsidian-300 cursor-not-allowed'
              }`}
            >
              Save &amp; Add to Bag
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function StepFields({ title, diagram, fields, values, unit, touched, setTouched, setValue, onFocusField }) {
  return (
    <div>
      <h3 className="text-[11px] tracking-[0.14em] uppercase text-gold-700 mb-4">{title}</h3>
      <div className="mb-6">{diagram}</div>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((f) => {
          const err = touched[f.key] ? fieldError(values[f.key]) : null
          return (
            <label key={f.key} className="block">
              <span className="text-xs text-obsidian-500 mb-1.5 block">{f.label}</span>
              <div
                className={`flex items-center border transition-colors duration-300 ${
                  err ? 'border-red-400' : 'border-obsidian-900/20 focus-within:border-gold-700'
                }`}
              >
                <input
                  type="text"
                  inputMode="decimal"
                  aria-label={`${f.label} in ${unit === 'in' ? 'inches' : 'centimeters'}`}
                  aria-invalid={!!err}
                  value={values[f.key] ?? ''}
                  onChange={(e) => setValue(f.key, e.target.value)}
                  onFocus={() => onFocusField?.(f.key)}
                  onBlur={() => setTouched((t) => ({ ...t, [f.key]: true }))}
                  className="w-full bg-transparent outline-none px-3 py-2.5 text-obsidian-900"
                />
                <span className="px-3 text-xs text-obsidian-400 shrink-0">{unit}</span>
              </div>
              {err && <span className="text-[11px] text-red-500 mt-1 block">{err}</span>}
            </label>
          )
        })}
      </div>
    </div>
  )
}

function ReviewStep({ values, unit, onEdit }) {
  const rows = [
    { title: 'Jacket', fields: JACKET_FIELDS, step: 0 },
    { title: 'Pants', fields: PANT_FIELDS, step: 1 },
  ]
  return (
    <div>
      <h3 className="text-[11px] tracking-[0.14em] uppercase text-gold-700 mb-4">
        Step 3 · Review &amp; Save
      </h3>
      {rows.map((group) => (
        <div key={group.title} className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-xl text-obsidian-900">{group.title}</span>
            <button
              onClick={() => onEdit(group.step)}
              className="text-[11px] tracking-[0.14em] uppercase text-obsidian-400 hover:text-gold-700 transition-colors duration-450"
            >
              Edit
            </button>
          </div>
          <dl className="divide-y divide-obsidian-900/10 border-t border-obsidian-900/10">
            {group.fields.map((f) => (
              <div key={f.key} className="flex justify-between py-2.5 text-sm">
                <dt className="text-obsidian-400">{f.label}</dt>
                <dd className="text-obsidian-900">
                  {values[f.key] ? `${values[f.key]} ${unit}` : '·'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}
