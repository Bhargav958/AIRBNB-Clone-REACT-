# Airbnb Homepage Clone

A responsive Airbnb-style homepage clone built with React, Vite, and Tailwind
CSS. The project focuses on reusable components, clean layout structure, and a
polished booking discovery experience.

## Features

- Sticky navigation bar with destination search
- Full-width hero section with booking inputs
- Horizontal category filters
- Responsive property listing grid
- Favorite/save interaction
- Wishlist persistence with localStorage
- Shared app state managed with React Context API
- Service layer that simulates API-based listing access
- Debounced search input
- Skeleton loading cards
- Lucide React icons
- Mobile slide-out navigation menu
- Dynamic listing details route with animated image carousel, amenities,
  reviews, host profile, sticky booking card, and map-style location section
- Reservation modal with check-in, check-out, guest count, service fee, and total
- Escape key and backdrop close behavior for the booking modal
- Toast notifications for wishlist, booking, and login actions
- Framer Motion animations for cards, modal, and gallery transitions
- Dark mode toggle with saved preference
- Login UI route for future authentication
- Reusable component architecture

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Framer Motion
- React Hot Toast
- JavaScript

## Screenshots

Add screenshots after running the app locally or deploying:

```txt
screenshots/homepage.png
screenshots/listing-details.png
screenshots/wishlist.png
screenshots/dark-mode.png
```

Recommended screenshots:

- Homepage with listings grid
- Listing details page with carousel and sticky booking card
- Wishlist page after saving homes
- Dark mode view

## Architecture

- `AppProvider` manages global UI state with React Context.
- `listingsService.js` simulates API calls for listings and categories.
- `useDebounce()` optimizes search input updates.
- Pages stay focused on route-level layout.
- Reusable components handle cards, filters, navigation, modals, and loading UI.

## Project Structure

```txt
src/
  components/
    BookingModal.jsx
    CategoryFilter.jsx
    Hero.jsx
    ListingCard.jsx
    ListingsGrid.jsx
    Navbar.jsx
    ListingSkeleton.jsx
  context/
    AppProvider.jsx
    app-context.js
  data/
    listings.js
  hooks/
    useApp.js
    useDebounce.js
  pages/
    Home.jsx
    ListingDetails.jsx
    Login.jsx
    Wishlist.jsx
  utils/
    formatCurrency.js
  services/
    listingsService.js
```

## Routes

```txt
/             homepage
/listing/:id  listing details
/wishlist     saved homes
/login        login UI
```

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Recommended platform: Vercel.

```bash
npm run build
```

Then push the project to GitHub and import the repository in Vercel.

## Future Scope

- Add real authentication with Firebase or Supabase
- Connect listing data to a backend API
- Add real map integration
- Add date availability validation
- Add payment simulation
- Add user profile and booking history
