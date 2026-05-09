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
- Dynamic listing details route with gallery, amenities, reviews, and host info
- Reservation modal with check-in, check-out, guest count, service fee, and total
- Dark mode toggle with saved preference
- Login UI route for future authentication
- Reusable component architecture

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- JavaScript

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
  data/
    listings.js
  pages/
    Home.jsx
    ListingDetails.jsx
    Login.jsx
    Wishlist.jsx
  utils/
    formatCurrency.js
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
