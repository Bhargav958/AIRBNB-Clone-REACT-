import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatCurrency } from '../utils/formatCurrency'
import { useEffect, useMemo, useState } from 'react'

const today = new Date().toISOString().split('T')[0]

const getNightCount = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) {
    return 1
  }

  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const difference = end.getTime() - start.getTime()

  return Math.max(Math.ceil(difference / (1000 * 60 * 60 * 24)), 1)
}

function BookingModal({ listing, onClose }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [confirmed, setConfirmed] = useState(false)

  const nights = useMemo(() => getNightCount(checkIn, checkOut), [checkIn, checkOut])
  const serviceFee = Math.round(listing?.price * nights * 0.12 || 0)
  const total = listing ? listing.price * nights + serviceFee : 0
  const hasInvalidDateRange =
    checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!listing) {
    return null
  }

  return (
    <AnimatePresence>
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-black/45 p-3 sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <motion.section
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ duration: 0.18 }}
        className="relative grid max-h-[92vh] w-[min(820px,100%)] overflow-y-auto rounded-2xl bg-white shadow-[0_22px_80px_rgba(0,0,0,0.28)] md:grid-cols-[0.9fr_1fr] dark:bg-neutral-950"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="absolute top-4 right-4 z-10 h-9.5 w-9.5 rounded-full border-0 bg-white text-2xl text-neutral-900 shadow hover:bg-neutral-100"
          onClick={onClose}
          aria-label="Close booking modal"
        >
          <X className="mx-auto" size={20} />
        </button>
        <img
          className="h-60 w-full object-cover md:h-full md:min-h-95"
          src={listing.image}
          alt={listing.title}
        />
        <div className="p-5 sm:p-8">
          <p className="mb-2.5 text-xs font-extrabold uppercase tracking-normal text-[#ff385c]">
            {listing.host}
          </p>
          <h2 className="m-0 mb-2.5 text-3xl leading-tight">{listing.title}</h2>
          <p className="text-neutral-500 dark:text-neutral-400">{listing.location}</p>

          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-700">
            <label className="grid gap-1 border-r border-neutral-300 p-3 text-xs font-bold dark:border-neutral-700">
              Check in
              <input
                className="bg-transparent text-sm font-normal outline-0"
                type="date"
                min={today}
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
              />
            </label>
            <label className="grid gap-1 p-3 text-xs font-bold">
              Check out
              <input
                className="bg-transparent text-sm font-normal outline-0"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
              />
            </label>
            <label className="col-span-2 grid gap-1 border-t border-neutral-300 p-3 text-xs font-bold dark:border-neutral-700">
              Guests
              <select
                className="bg-transparent text-sm font-normal outline-0"
                value={guests}
                onChange={(event) => setGuests(Number(event.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((guestCount) => (
                  <option className="text-neutral-900" key={guestCount} value={guestCount}>
                    {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="my-7 grid gap-3 border-y border-neutral-300 py-4.5 text-sm dark:border-neutral-700">
            <div className="flex justify-between gap-4">
              <span>
                {formatCurrency(listing.price)} x {nights}{' '}
                {nights === 1 ? 'night' : 'nights'}
              </span>
              <strong>{formatCurrency(listing.price * nights)}</strong>
            </div>
            <div className="flex justify-between gap-4">
              <span>Service fee</span>
              <strong>{formatCurrency(serviceFee)}</strong>
            </div>
            <div className="flex justify-between gap-4 text-base">
              <span>Total for {guests} {guests === 1 ? 'guest' : 'guests'}</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </div>
          <button
            type="button"
            className="min-h-12 w-full rounded-xl border-0 bg-[#ff385c] font-extrabold text-white hover:bg-[#e03250] disabled:hover:bg-[#ff385c]"
            disabled={confirmed || hasInvalidDateRange}
            onClick={() => {
              if (hasInvalidDateRange) {
                toast.error('Check-out must be after check-in')
                return
              }

              setConfirmed(true)
              toast.success('Booking request confirmed')
            }}
          >
            {hasInvalidDateRange
              ? 'Fix dates to continue'
              : confirmed
                ? 'Reservation confirmed'
                : 'Confirm reservation'}
          </button>
          {confirmed && (
            <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm font-bold text-[#ff385c] dark:bg-rose-950/40">
              Your stay request is ready. The host will receive your booking
              details.
            </p>
          )}
        </div>
      </motion.section>
    </div>
    </AnimatePresence>
  )
}

export default BookingModal
