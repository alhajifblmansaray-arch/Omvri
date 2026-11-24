import { useEffect } from 'react'
import useLockBodyScroll from '../hooks/useLockBodyScroll'

// One reusable right-hand panel slot. Content swaps (size select, shop
// the look, save for later) while the product imagery stays put beneath.
// On phones it fills the screen.
export default function SidePanel({ open, onClose, onBack, title, children, footer }) {
  useLockBodyScroll(open)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      {/* scrim over the left imagery */}
      <div
        className={`fixed inset-0 z-[55] bg-obsidian-900/30 transition-opacity duration-450 ease-signature ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 z-[60] w-full sm:w-[480px] lg:w-[40vw] lg:max-w-[560px] bg-white panel-raise flex flex-col transition-transform duration-550 ease-signature ${
          open ? 'translate-x-0 shadow-[-24px_0_60px_rgba(0,0,0,0.12)]' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex items-center justify-between px-3 sm:px-6 md:px-10 pt-3 sm:pt-6">
          {onBack ? (
            <button
              aria-label="Back"
              onClick={onBack}
              className="w-11 h-11 rounded-full flex items-center justify-center text-obsidian-800 hover:bg-obsidian-900/5 transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
          ) : (
            <span />
          )}
          <button
            aria-label="Close panel"
            onClick={onClose}
            className="w-11 h-11 rounded-full flex items-center justify-center text-obsidian-500 hover:text-obsidian-900 active:bg-obsidian-900/[0.06] transition-colors duration-450"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {title && (
          <h2 className="font-display text-[1.75rem] sm:text-3xl text-obsidian-900 text-center mt-0 sm:mt-2 mb-5 sm:mb-6 px-6">
            {title}
          </h2>
        )}

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 md:px-10 pb-safe">{children}</div>

        {footer && <div className="border-t border-obsidian-900/10 pb-safe">{footer}</div>}
      </aside>
    </>
  )
}
