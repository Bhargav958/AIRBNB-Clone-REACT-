import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AppContext } from './app-context'

export function AppProvider({ children }) {
  const [search, setSearch] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [likedListings, setLikedListings] = useState(() => {
    const savedLikes = localStorage.getItem('likedListings')
    return savedLikes ? JSON.parse(savedLikes) : []
  })

  useEffect(() => {
    localStorage.setItem('likedListings', JSON.stringify(likedListings))
  }, [likedListings])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleLike = (id) => {
    setLikedListings((current) => {
      if (current.includes(id)) {
        toast('Removed from wishlist')
        return current.filter((listingId) => listingId !== id)
      }

      toast.success('Saved to wishlist')
      return [...current, id]
    })
  }

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const value = useMemo(
    () => ({
      search,
      setSearch,
      theme,
      toggleTheme,
      likedListings,
      toggleLike,
    }),
    [likedListings, search, theme],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
