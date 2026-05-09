import { formatCurrency } from '../utils/formatCurrency'
import { Link } from 'react-router-dom'

function ListingCard({ listing, isLiked, onToggleLike, onReserve }) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[1/0.88] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
        <Link to={`/listing/${listing.id}`} aria-label={`View ${listing.title}`}>
        <img
          className="block h-full w-full object-cover transition duration-200 group-hover:scale-[1.04]"
          src={listing.image}
          alt={listing.title}
        />
        </Link>
        <button
          type="button"
          className={`absolute top-3 right-3 h-9.5 w-9.5 rounded-full border-0 bg-white/90 text-xl ${
            isLiked ? 'text-[#ff385c]' : 'text-neutral-900'
          }`}
          onClick={() => onToggleLike(listing.id)}
          aria-label="Save listing"
        >
          ♥
        </button>
      </div>

      <div className="pt-3">
        <div className="flex items-center justify-between gap-2.5">
          <Link
            className="m-0 truncate text-base font-bold text-neutral-900 no-underline dark:text-white"
            to={`/listing/${listing.id}`}
          >
            {listing.location}
          </Link>
          <span className="flex-none font-bold">★ {listing.rating}</span>
        </div>
        <p className="my-1 truncate text-neutral-500">{listing.title}</p>
        <p className="my-1 truncate text-neutral-500">
          {listing.beds} beds · {listing.guests} guests · {listing.reviews}{' '}
          reviews
        </p>
        <div className="mt-2.5 flex items-center gap-1.5">
          <strong className="text-base">{formatCurrency(listing.price)}</strong>
          <span className="text-neutral-500">night</span>
          <button
            className="ml-auto min-h-9 rounded-full border-0 bg-[#ff385c] px-3.5 text-sm font-extrabold text-white"
            type="button"
            onClick={() => onReserve(listing)}
          >
            Reserve
          </button>
        </div>
      </div>
    </article>
  )
}

export default ListingCard
