import { useMemo, useState } from 'react'
import BookingModal from '../components/BookingModal'
import CategoryFilter from '../components/CategoryFilter'
import Hero from '../components/Hero'
import ListingsGrid from '../components/ListingsGrid'
import Navbar from '../components/Navbar'
import { categories, listings } from '../data/listings'

function Home({
  search,
  setSearch,
  likedListings,
  onToggleLike,
  theme,
  onToggleTheme,
}) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedListing, setSelectedListing] = useState(null)

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch = `${listing.title} ${listing.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesCategory =
        activeCategory === 'All' || listing.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [activeCategory, search])

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

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
          onToggleLike={onToggleLike}
          onReserve={setSelectedListing}
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
