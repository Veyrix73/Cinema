# Dancing Fruit Cinema

A Latvian-language cinema booking website with a Node.js API and PostgreSQL database.

## What's included

- Entire customer and administrator interface in Latvian.
- Movie catalogue with search, genre filters, poster thumbnails and animated page transitions.
- Admin movie editor accepts HTTPS poster URLs or JPG/PNG/WebP image uploads (automatically resized before saving).
- Four-step booking flow: screening, seating, upgrades/snacks and contact details.
- Seven seats per screening: six bed-style seats and one office chair.
- Automatic seat assignment or custom seat selection (€0.10 per booking).
- One office chair is available as a premium seat (default €0.20 upgrade).
- Water and popcorn add-ons.
- Maximum 7 tickets per booking; the server enforces this limit.
- Server-side bookings shared by all visitors.
- PostgreSQL transaction and row locks to prevent double-booking a seat.
- Booking lookup with booking reference + email.
- Customer cancellation up to 24 hours before the screening, with the booking code and booking email. Checked-in tickets cannot be cancelled.
- Hidden admin login shortcut: **Ctrl + Shift + Alt + P**.
- Admin tools to add/edit movies and screening dates/times, view bookings, cancel reservations, update prices and change the admin password.
- Admin login uses a server-side password hash and an HTTP-only session cookie.

## Darbināšana datorā

Requirements: Node.js 20+ and a PostgreSQL database.

1. Clone or download this repository.
2. Copy `.env.example` to `.env`.
3. Put your PostgreSQL connection string in `DATABASE_URL`.
4. Set a long random value for `SESSION_SECRET`.
5. Set `ADMIN_USERNAME=admin` and choose a new, unique `ADMIN_PASSWORD` (at least 12 characters).
6. Install dependencies with `npm install`.
7. Run `npm test` to check JavaScript syntax.
8. Start the server with `npm start`.
8. Open `http://localhost:3000`.

The server automatically creates the database tables, default prices, initial admin account and demo movie screenings on first start. Existing occupied legacy seat records are preserved during seat-layout updates.

## Publicēšana internetā

This project needs a Node.js host and a managed PostgreSQL database. GitHub Pages alone will **not** run the booking API.

For a Render-style deployment:

1. Create a PostgreSQL database with your hosting provider.
2. Create a Node web service connected to this GitHub repository and the `main` branch.
3. Set the build command to `npm install`.
4. Set the start command to `npm start`.
5. Add these environment variables to the server service:
   - `NODE_ENV=production`
   - `DATABASE_URL` — your PostgreSQL connection string
   - `SESSION_SECRET` — a long random secret, at least 32 characters
   - `ADMIN_USERNAME=admin`
   - `ADMIN_PASSWORD` — a new, unique password of at least 12 characters
6. Deploy the service and open its URL.

Never commit `.env`, database passwords, session secrets or admin passwords to GitHub. The `.gitignore` file excludes local environment files.

## Administrācija

Open the website and press **Ctrl + Shift + Alt + P**. Log in with the administrator credentials configured in the hosting environment.

Fn is handled by many keyboards before browser JavaScript receives the event, so the browser shortcut is **Ctrl + Shift + Alt + P** (without Fn).

The initial administrator is created from `ADMIN_USERNAME` and `ADMIN_PASSWORD` when the database is first initialized. Changing those environment variables later does not automatically reset an existing admin account. Use the admin password-change section instead.

## Rezervāciju darbība

When a customer books, the server:
1. Checks the screening and its remaining seats.
2. Locks the selected seat rows inside a database transaction.
3. Calculates the price using server-side settings.
4. Saves the booking and seat assignments.
5. Commits the transaction so other visitors immediately see those seats as occupied.

A booking reference and email address are required to look up a reservation. Customers can cancel more than 24 hours before the screening; after that, only an administrator can cancel it. When a booking is cancelled, seats are released for other visitors while the booking history remains recorded.

## Svarīgi ierobežojumi

- The backend and shared booking system are implemented, but the service is **not online until you deploy it and configure PostgreSQL and the environment variables**.
- The site records reservations; it does not currently take card payments or send confirmation emails.
- Movie posters can be added through the admin editor using an HTTPS image URL or a JPG/PNG/WebP upload. Uploaded images are resized and stored in PostgreSQL; use images you have permission to display.
- This is a starter cinema platform, not a certified ticketing/payment system. Add monitoring, backups, a privacy notice and any required legal information before using it with real customers.

## Social sign-in (Google and Facebook)

The customer account modal supports Google and Facebook OAuth. Password-based accounts remain available. Social sign-in reuses a customer account with the same provider-returned email so existing booking history stays attached; OAuth-only accounts do not receive a local password.

Configure these environment variables on Render (and in local `.env` when testing):

- `APP_BASE_URL` — the exact public origin, without a trailing slash (for example, your Render service URL).
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` — create a Google OAuth 2.0 Web application client.
- `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET` — create a Meta app and enable Facebook Login.

Register these exact redirect URIs in each provider's app settings:

- `https://YOUR-DOMAIN/api/auth/google/callback`
- `https://YOUR-DOMAIN/api/auth/facebook/callback`

Replace `YOUR-DOMAIN` with the same host configured in `APP_BASE_URL`. Keep all client secrets only in Render environment variables or a local untracked `.env` file; never commit them. Google sign-in requires a verified email. Facebook sign-in requests the `public_profile` and `email` permissions; a Facebook account that does not share an email must use the email/password option instead.

The provider apps must be configured and, where required, reviewed/published by Google or Meta before public visitors can use them. Until their environment variables are present, email/password login continues to work.
