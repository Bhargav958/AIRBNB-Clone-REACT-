import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ListingDetails from './pages/ListingDetails'
import Login from './pages/Login'
import Wishlist from './pages/Wishlist'
import './App.css'

function App() {
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
    setLikedListings((current) =>
      current.includes(id)
        ? current.filter((listingId) => listingId !== id)
        : [...current, id],
    )
  }

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const sharedProps = {
    search,
    setSearch,
    likedListings,
    onToggleLike: toggleLike,
    theme,
    onToggleTheme: toggleTheme,
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home {...sharedProps} />} />
        <Route path="/listing/:id" element={<ListingDetails {...sharedProps} />} />
        <Route path="/wishlist" element={<Wishlist {...sharedProps} />} />
        <Route path="/login" element={<Login {...sharedProps} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
