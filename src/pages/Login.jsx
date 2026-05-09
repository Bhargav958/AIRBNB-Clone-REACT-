import Navbar from '../components/Navbar'

function Login({ search, setSearch, theme, onToggleTheme }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <main className="mx-auto grid min-h-[calc(100vh-82px)] w-[min(1180px,calc(100%-32px))] place-items-center py-10">
        <form className="w-[min(440px,100%)] rounded-2xl border border-neutral-200 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-900">
          <p className="mb-2.5 text-xs font-extrabold uppercase tracking-normal text-[#ff385c]">
            Welcome back
          </p>
          <h1 className="m-0 mb-6 text-3xl font-extrabold">Login to Staybnb</h1>

          <label className="mb-4 grid gap-2 text-sm font-bold">
            Email
            <input
              className="min-h-12 rounded-xl border border-neutral-300 px-4 outline-0 dark:border-neutral-700 dark:bg-neutral-950"
              type="email"
              placeholder="you@example.com"
            />
          </label>
          <label className="mb-6 grid gap-2 text-sm font-bold">
            Password
            <input
              className="min-h-12 rounded-xl border border-neutral-300 px-4 outline-0 dark:border-neutral-700 dark:bg-neutral-950"
              type="password"
              placeholder="Enter password"
            />
          </label>

          <button
            className="min-h-12 w-full rounded-xl bg-[#ff385c] font-extrabold text-white"
            type="button"
          >
            Continue
          </button>
          <p className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
            Demo UI only. Authentication can be added later with Firebase or
            Supabase.
          </p>
        </form>
      </main>
    </div>
  )
}

export default Login
