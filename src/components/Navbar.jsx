import { Heart, Menu, Moon, Search, Sun, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

function Navbar() {
  const { search, setSearch, theme, toggleTheme } = useApp()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95">
      <nav
        className="mx-auto grid min-h-20 w-[min(1180px,calc(100%-32px))] grid-cols-1 items-center gap-4 py-4 lg:grid-cols-[1fr_minmax(340px,520px)_1fr] lg:gap-6 lg:py-0"
        aria-label="Main navigation"
      >
        <Link
          className="inline-flex items-center gap-2.5 text-[22px] font-extrabold text-[#ff385c] no-underline"
          to="/"
          aria-label="Staybnb home"
        >
          <span className="grid h-8.5 w-8.5 place-items-center rounded-full bg-[#ff385c] font-black text-white">
            A
          </span>
          <span>staybnb</span>
        </Link>

        <div
          className="grid min-h-13 grid-cols-1 items-center gap-2 overflow-hidden rounded-[22px] border border-neutral-300 bg-white p-2 shadow-[0_6px_20px_rgba(0,0,0,0.08)] sm:grid-cols-[1fr_auto] sm:rounded-full sm:p-0 dark:border-neutral-700 dark:bg-neutral-900"
          role="search"
        >
          <label className="grid gap-0.5 px-2 text-xs font-bold sm:pl-6">
            <span className="text-neutral-900 dark:text-white">Where</span>
            <input
              className="w-full border-0 text-neutral-600 outline-0 dark:bg-transparent dark:text-neutral-300"
              type="search"
              placeholder="Search destinations"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <button
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border-0 bg-[#ff385c] px-6 font-bold text-white sm:mr-1"
            type="button"
            aria-label="Search stays"
          >
            <Search size={16} />
            <span>Search</span>
          </button>
        </div>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <NavLink
            className={({ isActive }) =>
              `font-bold no-underline ${
                isActive
                  ? 'text-[#ff385c]'
                  : 'text-neutral-900 dark:text-neutral-100'
              }`
            }
            to="/"
          >
            Explore homes
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `font-bold no-underline ${
                isActive
                  ? 'text-[#ff385c]'
                  : 'text-neutral-900 dark:text-neutral-100'
              }`
            }
            to="/wishlist"
          >
            Wishlist
          </NavLink>
          <button
            type="button"
            className="min-h-10 rounded-full border border-neutral-300 bg-white px-4 font-bold dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          >
            Airbnb your home
          </button>
          <button
            type="button"
            className="h-10 rounded-full border border-neutral-300 bg-white px-4 font-bold dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-full bg-neutral-900 px-4 text-sm font-extrabold text-white dark:bg-white dark:text-neutral-900"
            to="/login"
          >
            <User size={16} />
            Login
          </Link>
          <button
            type="button"
            className="flex h-10 w-[74px] items-center justify-around rounded-full border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900"
            aria-label="Open profile menu"
          >
            <span className="relative block h-0.5 w-4 rounded-full bg-neutral-600 before:absolute before:block before:h-0.5 before:w-4 before:-translate-y-1.5 before:rounded-full before:bg-neutral-600 before:content-[''] after:absolute after:block after:h-0.5 after:w-4 after:translate-y-1.5 after:rounded-full after:bg-neutral-600 after:content-['']"></span>
            <strong className="grid h-7 w-7 place-items-center rounded-full bg-neutral-900 text-[13px] text-white">
              B
            </strong>
          </button>
        </div>

        <div className="flex justify-end lg:hidden">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-neutral-300 px-4 font-bold dark:border-neutral-700 dark:text-white"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={20} />
            Menu
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" role="presentation">
          <aside className="ml-auto flex h-full w-[min(360px,86vw)] flex-col gap-4 bg-white p-6 shadow-2xl dark:bg-neutral-950">
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold text-[#ff385c]">staybnb</span>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 dark:border-neutral-700"
                onClick={closeMenu}
                aria-label="Close mobile menu"
              >
                <X size={20} />
              </button>
            </div>

            <Link className="rounded-xl p-3 font-bold" to="/" onClick={closeMenu}>
              Explore homes
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-xl p-3 font-bold"
              to="/wishlist"
              onClick={closeMenu}
            >
              <Heart size={18} />
              Wishlist
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-xl p-3 font-bold"
              to="/login"
              onClick={closeMenu}
            >
              <User size={18} />
              Login
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl p-3 text-left font-bold"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </aside>
        </div>
      )}
    </header>
  )
}

export default Navbar
