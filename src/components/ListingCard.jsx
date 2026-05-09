import { motion } from 'framer-motion'
import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

const fallbackImage =
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80'

function ListingCard({ listing, isLiked, onToggleLike, onReserve }) {
  return (
    <motion.article
      className="group min-w-0"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative aspect-[1/0.88] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
        <Link to={`/listing/${listing.id}`} aria-label={`View ${listing.title}`}>
        <img
          className="block h-full w-full object-cover transition duration-200 group-hover:scale-[1.04]"
          src={listing.image}
          alt={listing.title}
          onError={(event) => {
            event.currentTarget.src = fallbackImage
          }}
        />
        </Link>
        <button
          type="button"
          className={`absolute top-3 right-3 grid h-9.5 w-9.5 place-items-center rounded-full border-0 bg-white/90 text-xl shadow-sm hover:scale-105 ${
            isLiked ? 'text-[#ff385c]' : 'text-neutral-900'
          }`}
          onClick={() => onToggleLike(listing.id)}
          aria-label="Save listing"
        >
          <Heart className={isLiked ? 'fill-current' : ''} size={19} />
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
          <span className="inline-flex flex-none items-center gap-1 font-bold">
            <Star className="fill-current" size={15} />
            {listing.rating}
          </span>
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
            className="ml-auto min-h-9 rounded-full border-0 bg-[#ff385c] px-3.5 text-sm font-extrabold text-white hover:bg-[#e03250] active:scale-[0.98]"
            type="button"
            onClick={() => onReserve(listing)}
          >
            Reserve
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default ListingCard
