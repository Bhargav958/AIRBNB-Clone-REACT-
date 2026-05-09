function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <section
      className="mx-auto flex w-[min(1180px,calc(100%-32px))] gap-2.5 overflow-x-auto py-4.5 max-sm:w-[calc(100%-24px)]"
      aria-label="Stay categories"
    >
      {['All', ...categories].map((category) => (
        <button
          key={category}
          type="button"
          className={`min-h-10.5 flex-none rounded-full border px-4.5 font-bold transition ${
            category === activeCategory
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-300 bg-white text-neutral-600 hover:border-neutral-900'
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </section>
  )
}

export default CategoryFilter
