import { Link, useParams } from 'react-router-dom'
import BookingModal from '../components/BookingModal'
import Navbar from '../components/Navbar'
import { listings } from '../data/listings'
import { formatCurrency } from '../utils/formatCurrency'
import { useState } from 'react'

function ListingDetails({
  search,
  setSearch,
  likedListings,
  onToggleLike,
  theme,
  onToggleTheme,
}) {
  const { id } = useParams()
  const [selectedListing, setSelectedListing] = useState(null)
  const listing = listings.find((item) => item.id === Number(id))

  if (!listing) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
        <Navbar
          search={search}
          onSearchChange={setSearch}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
        <main className="mx-auto w-[min(1180px,calc(100%-32px))] py-16">
          <h1 className="text-3xl font-extrabold">Listing not found</h1>
          <Link className="font-bold text-[#ff385c]" to="/">
            Back to homes
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <main className="mx-auto w-[min(1180px,calc(100%-32px))] py-8 max-sm:w-[calc(100%-24px)]">
        <Link className="mb-5 inline-block font-bold text-[#ff385c]" to="/">
          Back to homes
        </Link>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="m-0 text-4xl font-extrabold leading-tight">
              {listing.title}
            </h1>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              ★ {listing.rating} · {listing.reviews} reviews · {listing.location}
            </p>
          </div>
          <button
            type="button"
            className={`rounded-full border px-5 py-2 font-bold ${
              likedListings.includes(listing.id)
                ? 'border-[#ff385c] text-[#ff385c]'
                : 'border-neutral-300 dark:border-neutral-700'
            }`}
            onClick={() => onToggleLike(listing.id)}
          >
            ♥ Save
          </button>
        </div>

        <section className="grid gap-2 overflow-hidden rounded-[24px] md:grid-cols-[2fr_1fr]">
          <img
            className="h-full min-h-90 w-full object-cover"
            src={listing.image}
            alt={listing.title}
          />
          <div className="grid gap-2">
            <img
              className="h-44 w-full object-cover md:h-full"
              src={listing.image}
              alt=""
            />
            <img
              className="h-44 w-full object-cover md:h-full"
              src={listing.image}
              alt=""
            />
          </div>
        </section>

        <section className="grid gap-8 py-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="border-b border-neutral-200 pb-6 dark:border-neutral-800">
              <h2 className="m-0 text-2xl font-extrabold">
                {listing.host}
              </h2>
              <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                {listing.guests} guests · {listing.beds} beds · Private stay
              </p>
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
              <h2 className="mb-4 text-2xl font-extrabold">Guest reviews</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {listing.reviewsText.map((review) => (
                  <blockquote
                    key={review}
                    className="rounded-2xl bg-neutral-50 p-5 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                  >
                    "{review}"
                  </blockquote>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-neutral-200 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4 flex items-center justify-between">
              <p className="m-0">
                <strong className="text-xl">{formatCurrency(listing.price)}</strong>{' '}
                night
              </p>
              <span className="font-bold">★ {listing.rating}</span>
            </div>
            <button
              type="button"
              className="min-h-12 w-full rounded-xl bg-[#ff385c] font-extrabold text-white"
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
