# Spell Farm Academy

A cozy, spoiler-light Stardew Valley learning guide made for Frieren's Meadowlands farm.

## Website

GitHub Pages publishes the contents of `public/` whenever `main` is updated. The website is a static, responsive site and works on phones, iPads, and desktop browsers.

## Saved progress

The site keeps working locally in each browser and also offers passwordless email sign-in through Supabase. Once signed in, lesson completion, current farm notes, quest and bundle checklists, collection checklists, and the current farm photo sync across laptops, iPads, and phones.

- The first signed-in device imports any existing browser progress when the cloud account is empty.
- Later devices download the account copy after sign-in.
- Local storage remains as an offline fallback; the most recently saved copy wins when the site reconnects.
- Every account is protected by row-level rules, and farm photos are stored in a private bucket.

The browser uses only Supabase's publishable key. Never add a database password or `service_role` key to `public/`.

The database setup is versioned in `supabase/migrations/20261126_cross_device_sync.sql`.

## Publish settings

In the GitHub repository, open **Settings → Pages** and select **GitHub Actions** as the source if it is not selected automatically. The included workflow handles future publishing.
