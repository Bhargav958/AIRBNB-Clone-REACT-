import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, MapPin, ShieldCheck, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BookingModal from '../components/BookingModal'
import Navbar from '../components/Navbar'
import { useApp } from '../hooks/useApp'
import { getListingById } from '../services/listingsService'
import { formatCurrency } from '../utils/formatCurrency'

function ListingDetails() {
  const { id } = useParams()
  const { likedListings, toggleLike } = useApp()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedListing, setSelectedListing] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadListing() {
      setLoading(true)
      const data = await getListingById(id)

      if (!ignore) {
        setListing(data)
        setLoading(false)
      }
    }

    loadListing()

    return () => {
      ignore = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
        <Navbar />
        <main className="mx-auto w-[min(1180px,calc(100%-32px))] py-8">
          <div className="mb-5 h-10 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-100 animate-pulse rounded-[24px] bg-neutral-200 dark:bg-neutral-800" />
        </main>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
        <Navbar />
        <main className="mx-auto w-[min(1180px,calc(100%-32px))] py-16">
          <h1 className="text-3xl font-extrabold">Listing not found</h1>
          <Link className="font-bold text-[#ff385c]" to="/">
            Back to homes
          </Link>
        </main>
      </div>
    )
  }

  const galleryImages = listing.images || [listing.image]

  const showPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    )
  }

  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1,
    )
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar />

      <main className="mx-auto w-[min(1180px,calc(100%-32px))] py-8 max-sm:w-[calc(100%-24px)]">
        <Link className="mb-5 inline-block font-bold text-[#ff385c]" to="/">
          Back to homes
        </Link>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="m-0 text-3xl font-extrabold leading-tight sm:text-4xl">
              {listing.title}
            </h1>
            <p className="mt-2 inline-flex flex-wrap items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <Star className="fill-current" size={16} />
              {listing.rating} · {listing.reviews} reviews · {listing.location}
            </p>
          </div>
          <button
            type="button"
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 font-bold hover:border-[#ff385c] ${
              likedListings.includes(listing.id)
                ? 'border-[#ff385c] text-[#ff385c]'
                : 'border-neutral-300 dark:border-neutral-700'
            }`}
            onClick={() => toggleLike(listing.id)}
          >
            <Heart
              className={`inline ${likedListings.includes(listing.id) ? 'fill-current' : ''}`}
              size={18}
            />{' '}
            Save
          </button>
        </div>

        <section className="grid gap-2 overflow-hidden rounded-[24px] md:grid-cols-[2fr_1fr]">
          <div className="relative min-h-72 overflow-hidden bg-neutral-100 sm:min-h-90 dark:bg-neutral-900">
            <AnimatePresence mode="wait">
              <motion.img
                key={galleryImages[activeImageIndex]}
                className="h-full min-h-72 w-full object-cover sm:min-h-90"
                src={galleryImages[activeImageIndex]}
                alt={listing.title}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.24 }}
              />
            </AnimatePresence>
            <button
              type="button"
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-neutral-900 shadow"
              onClick={showPreviousImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-neutral-900 shadow"
              onClick={showNextImage}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {galleryImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeImageIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/60'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="hidden gap-2 md:grid">
            <img
              className="h-44 w-full object-cover md:h-full"
              src={galleryImages[1] || galleryImages[0]}
              alt=""
            />
            <img
              className="h-44 w-full object-cover md:h-full"
              src={galleryImages[2] || galleryImages[0]}
              alt=""
            />
          </div>
        </section>

        <section className="grid gap-8 py-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="grid gap-5 border-b border-neutral-200 pb-6 sm:grid-cols-[auto_1fr] dark:border-neutral-800">
              <div className="grid h-18 w-18 place-items-center rounded-full bg-[#ff385c] text-2xl font-black text-white">
                {listing.host.replace('Hosted by ', '').slice(0, 1)}
              </div>
              <div>
                <h2 className="m-0 text-2xl font-extrabold">{listing.host}</h2>
                <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                  Superhost · {listing.guests} guests · {listing.beds} beds ·
                  Private stay
                </p>
                <p className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-bold dark:bg-neutral-900">
                  <ShieldCheck size={17} />
                  Identity verified · Responds within one hour
                </p>
              </div>
            </div>

            <div className="border-b border-neutral-200 py-6 dark:border-neutral-800">
              <h2 className="mb-4 text-2xl font-extrabold">What this place offers</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {listing.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="rounded-xl border border-neutral-200 p-4 font-bold dark:border-neutral-800"
                  >
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="py-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="m-0 text-2xl font-extrabold">Guest reviews</h2>
                <span className="inline-flex items-center gap-1 font-bold">
                  <Star className="fill-current" size={16} />
                  {listing.rating}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {listing.reviewsText.map((review, index) => (
                  <blockquote
                    key={review}
                    className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-neutral-900 font-bold text-white dark:bg-white dark:text-neutral-900">
                        {index === 0 ? 'A' : 'M'}
                      </div>
                      <div>
                        <p className="m-0 font-bold text-neutral-900 dark:text-white">
                          {index === 0 ? 'Ananya' : 'Mohit'}
                        </p>
                        <p className="m-0 text-sm text-neutral-500">
                          Stayed recently
                        </p>
                      </div>
                    </div>
                    <p className="m-0">"{review}"</p>
                  </blockquote>
                ))}
              </div>
            </div>

            <section className="border-t border-neutral-200 py-6 dark:border-neutral-800">
              <h2 className="mb-4 text-2xl font-extrabold">Where you will be</h2>
              <div className="relative min-h-72 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
                <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center gap-3 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#ff385c] text-white shadow-xl">
                    <MapPin size={28} />
                  </span>
                  <strong>{listing.location}</strong>
                </div>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-neutral-200 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] lg:sticky lg:top-28 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4 flex items-center justify-between">
              <p className="m-0">
                <strong className="text-xl">{formatCurrency(listing.price)}</strong>{' '}
                night
              </p>
              <span className="inline-flex items-center gap-1 font-bold">
                <Star className="fill-current" size={15} />
                {listing.rating}
              </span>
            </div>
            <button
              type="button"
              className="min-h-12 w-full rounded-xl bg-[#ff385c] font-extrabold text-white hover:bg-[#e03250] active:scale-[0.99]"
              onClick={() => setSelectedListing(listing)}
            >
              Reserve
            </button>
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              You will not be charged yet
            </p>
          </aside>
        </section>
      </main>

      <BookingModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </div>
  )
}

export default ListingDetails
