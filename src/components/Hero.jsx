function Hero({ search, onSearchChange }) {
  return (
    <section
      className="mx-auto mt-5 mb-4 flex min-h-[520px] w-[min(1180px,calc(100%-32px))] items-end overflow-hidden rounded-[28px] bg-cover bg-center max-lg:min-h-0 max-sm:mt-3 max-sm:w-[calc(100%-24px)] max-sm:rounded-2xl"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(0,0,0,0.76), rgba(0,0,0,0.2)), url("https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85")',
      }}
    >
      <div className="w-[min(720px,100%)] p-5 text-white sm:p-10 lg:p-14">
        <p className="mb-2.5 text-xs font-extrabold uppercase tracking-normal text-[#ff385c]">
          Find your next stay
        </p>
        <h1 className="m-0 max-w-160 text-[38px] leading-[1.02] tracking-normal sm:text-6xl lg:text-[76px] lg:leading-[0.96]">
          Book homes with room to breathe.
        </h1>
        <p className="my-5 max-w-140 text-base leading-relaxed text-white/85 sm:text-lg">
          Explore beach villas, cabins, city lofts, and quiet retreats across
          India with a polished Airbnb-style experience.
        </p>

        <form className="grid max-w-180 grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/20 shadow-xl lg:grid-cols-[1.3fr_1fr_1fr]">
          <label className="grid gap-2 bg-white p-4 text-xs font-extrabold text-neutral-900">
            Location
            <input
              className="min-h-8.5 w-full border-0 bg-transparent text-neutral-600 outline-0"
              type="text"
              placeholder="Try Goa or Manali"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </label>
          <label className="grid gap-2 bg-white p-4 text-xs font-extrabold text-neutral-900">
            Check in
            <input
              className="min-h-8.5 w-full border-0 bg-transparent text-neutral-600 outline-0"
              type="date"
            />
          </label>
          <label className="grid gap-2 bg-white p-4 text-xs font-extrabold text-neutral-900">
            Guests
            <select
              className="min-h-8.5 w-full border-0 bg-transparent text-neutral-600 outline-0"
              defaultValue="2"
            >
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="4">4 guests</option>
              <option value="6">6 guests</option>
            </select>
          </label>
        </form>
      </div>
    </section>
  )
}

export default Hero
