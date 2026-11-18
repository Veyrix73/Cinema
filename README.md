# Dancing Fruit Cinema

A responsive, Latvian-language cinema booking demo built with plain HTML, CSS and JavaScript.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a browser.
3. The demo data is saved in that browser's local storage.

## Features

- Movie catalogue with search and genre filters.
- Four-step booking flow: screening, seats, upgrades/snacks and contact details.
- 36 bed-style seats per screening.
- Automatic seat assignment or custom seat selection (€0.10 per booking).
- Optional office-chair upgrades (default €0.20 per seat).
- Water and popcorn add-ons.
- Maximum 8 tickets per booking.
- Customer reservation lookup by email.
- Customer cancellation up to 24 hours before the screening.
- Hidden admin login shortcut: **Ctrl + Shift + Alt + P**.
- Admin tools to add/edit/delete movies, set screening dates/times, manage reservations and edit prices.

## First admin setup

On the first use, press **Ctrl + Shift + Alt + P** and create the administrator account. The username defaults to `admin`. Choose a new password during setup.

Browsers generally do not expose the Fn key to web pages, so the shortcut is implemented as Ctrl + Shift + Alt + P (without Fn).

## Important demo limitations

This is a front-end prototype. Movies, bookings, prices and the demo administrator account are stored in the current browser's local storage. They do not synchronize between different devices or browsers.

The admin setup is **not production-grade authentication**. A public cinema service needs a server-side database, proper authentication and authorization (for example, Supabase with Row Level Security), plus atomic seat reservations to prevent two customers booking the same seat at the same time.

The booking flow records a demo reservation only. It does not take payments or send confirmation emails. Do not use this prototype to collect real customer details or operate paid bookings.

## Publish with GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.
5. Open the Pages URL shown by GitHub after deployment.
