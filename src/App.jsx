import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppProvider'
import Home from './pages/Home'
import ListingDetails from './pages/ListingDetails'
import Login from './pages/Login'
import Wishlist from './pages/Wishlist'
import './App.css'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2400,
            style: {
              borderRadius: '14px',
              fontWeight: 700,
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
