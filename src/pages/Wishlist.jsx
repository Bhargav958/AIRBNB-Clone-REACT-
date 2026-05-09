import { useState } from 'react'
import BookingModal from '../components/BookingModal'
import Navbar from '../components/Navbar'
import ListingsGrid from '../components/ListingsGrid'
import { listings } from '../data/listings'

function Wishlist({
  search,
  setSearch,
  likedListings,
  onToggleLike,
  theme,
  onToggleTheme,
}) {
  const [selectedListing, setSelectedListing] = useState(null)
  const savedListings = listings.filter((listing) =>
    likedListings.includes(listing.id),
  )

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <main className="mx-auto w-[min(1180px,calc(100%-32px))] py-10 max-sm:w-[calc(100%-24px)]">
        <p className="mb-2.5 text-xs font-extrabold uppercase tracking-normal text-[#ff385c]">
          Saved homes
        </p>
        <h1 className="m-0 text-4xl font-extrabold">Your wishlist</h1>
        <p className="mt-3 max-w-150 text-neutral-500 dark:text-neutral-400">
          Saved listings stay here after refresh because they are stored in
          localStorage.
        </p>
      </main>

      {savedListings.length > 0 ? (
        <ListingsGrid
          listings={savedListings}
          likedListings={likedListings}
          onToggleLike={onToggleLike}
          onReserve={setSelectedListing}
        />
      ) : (
        <section className="mx-auto w-[min(1180px,calc(100%-32px))] rounded-2xl border border-dashed border-neutral-300 p-10 text-center dark:border-neutral-800">
          <h2 className="text-2xl font-extrabold">No saved homes yet</h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            Tap the heart on any listing to save it here.
          </p>
        </section>
      )}

      <BookingModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </div>
  )
}

export default Wishlist
