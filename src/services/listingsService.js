import { categories, listings } from '../data/listings'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getListings() {
  await wait(350)
  return listings
}

export async function getCategories() {
  await wait(150)
  return categories
}

export async function getListingById(id) {
  await wait(250)
  return listings.find((listing) => listing.id === Number(id)) || null
}
