function ListingSkeleton() {
  return (
    <article className="animate-pulse">
      <div className="aspect-[1/0.88] rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-3 grid gap-2">
        <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </article>
  )
}

export default ListingSkeleton
