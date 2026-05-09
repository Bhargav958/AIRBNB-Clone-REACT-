import { Link, NavLink } from 'react-router-dom'

function Navbar({ search, onSearchChange, theme, onToggleTheme }) {
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
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </label>
          <button
            className="h-10 rounded-full border-0 bg-[#ff385c] px-6 font-bold text-white sm:mr-1"
            type="button"
            aria-label="Search stays"
          >
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
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <Link
            className="grid h-10 place-items-center rounded-full bg-neutral-900 px-4 text-sm font-extrabold text-white dark:bg-white dark:text-neutral-900"
            to="/login"
          >
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

        <div className="flex gap-2 lg:hidden">
          <Link
            className="flex-1 rounded-full border border-neutral-300 py-2 text-center font-bold text-neutral-900 dark:border-neutral-700 dark:text-white"
            to="/wishlist"
          >
            Wishlist
          </Link>
          <button
            type="button"
            className="flex-1 rounded-full border border-neutral-300 py-2 font-bold text-neutral-900 dark:border-neutral-700 dark:text-white"
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <Link
            className="flex-1 rounded-full bg-neutral-900 py-2 text-center font-bold text-white dark:bg-white dark:text-neutral-900"
            to="/login"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
