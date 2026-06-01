# Hirafi

A home-services booking app — find and book vetted local pros (electricians,
plumbers, AC techs, cleaners, carpenters, painters) for on-demand and scheduled
visits.

Built with **Expo + React Native** and file-based routing (expo-router).

## Features so far

- **Home** — location header, search, service categories, promo banner, top-rated pros
- **Category listing** — browse providers within a category
- **Provider profile** — bio, stats, services, pricing, sticky "Book now" CTA
- **Booking flow** — pick service, date, time, duration, address & notes with a live price estimate
- **Bookings** — upcoming / cancelled tabs, cancel a booking
- **Profile** — user stats and account menu

## Getting started

```bash
npm install
npm start        # then press i / a / w for iOS, Android, or web
npm run web      # run directly in a browser
```

## Project structure

```
app/                     # screens (file-based routes)
  _layout.js             # root stack + providers
  (tabs)/                # Home, Bookings, Profile tabs
  category/[id].js       # providers in a category
  provider/[id].js       # provider profile
  booking/[id].js        # booking flow
components/              # reusable UI (Button, Card, ProviderCard…)
constants/theme.js       # colors, spacing, radius tokens
data/services.js         # mock catalog (categories + providers)
store/bookings.js        # in-memory bookings context
```

> Data is currently mocked in `data/services.js`. Swap the helpers there for an
> API layer when a backend is available.
