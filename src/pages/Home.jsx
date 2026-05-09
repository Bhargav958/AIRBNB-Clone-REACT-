import { useEffect, useMemo, useState } from 'react'
import BookingModal from '../components/BookingModal'
import CategoryFilter from '../components/CategoryFilter'
import Hero from '../components/Hero'
import ListingsGrid from '../components/ListingsGrid'
import Navbar from '../components/Navbar'
import { useApp } from '../hooks/useApp'
import { useDebounce } from '../hooks/useDebounce'
import { getCategories, getListings } from '../services/listingsService'

function Home() {
  const { search, setSearch, likedListings, toggleLike } = useApp()
  const debouncedSearch = useDebounce(search, 250)
  const [activeCategory, setActiveCategory] = useState('All')
  const [categories, setCategories] = useState([])
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedListing, setSelectedListing] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadHomeData() {
      setLoading(true)
      const [listingData, categoryData] = await Promise.all([
        getListings(),
        getCategories(),
      ])

      if (!ignore) {
        setListings(listingData)
        setCategories(categoryData)
        setLoading(false)
      }
    }

    loadHomeData()

    return () => {
      ignore = true
    }
  }, [])

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch = `${listing.title} ${listing.location}`
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
      const matchesCategory =
        activeCategory === 'All' || listing.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [activeCategory, debouncedSearch, listings])

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar />

      <main>
        <Hero search={search} onSearchChange={setSearch} />
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <ListingsGrid
          listings={filteredListings}
          likedListings={likedListings}
          onToggleLike={toggleLike}
          onReserve={setSelectedListing}
          loading={loading}
        />
      </main>

      <BookingModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </div>
  )
}

export default Home
