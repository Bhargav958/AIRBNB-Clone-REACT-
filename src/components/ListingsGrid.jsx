import ListingCard from './ListingCard'
import ListingSkeleton from './ListingSkeleton'

function ListingsGrid({
  listings,
  likedListings,
  onToggleLike,
  onReserve,
  loading = false,
}) {
  return (
    <section
      className="mx-auto mt-4 mb-18 w-[min(1180px,calc(100%-32px))] max-sm:w-[calc(100%-24px)]"
      id="listings"
    >
      <div className="mb-5.5 flex items-end justify-between gap-5 max-sm:block">
        <div>
          <p className="mb-2.5 text-xs font-extrabold uppercase tracking-normal text-[#ff385c]">
            Available homes
          </p>
          <h2 className="m-0 text-3xl tracking-normal">Stays guests love</h2>
        </div>
        <p className="m-0 font-bold text-neutral-500">
          {listings.length} homes found
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-6.5 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ListingSkeleton key={index} />
          ))
        ) : listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isLiked={likedListings.includes(listing.id)}
              onToggleLike={onToggleLike}
              onReserve={onReserve}
            />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-neutral-300 p-10 text-center dark:border-neutral-800">
            <h3 className="m-0 text-2xl font-extrabold">No stays found</h3>
            <p className="mx-auto mt-2 max-w-md text-neutral-500 dark:text-neutral-400">
              Try changing the destination or category filter.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ListingsGrid
