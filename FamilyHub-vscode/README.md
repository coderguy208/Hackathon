# FamilyHub

FamilyHub is a Vite + React hackathon demo for busy families. It keeps all demo data in browser `localStorage` through `src/lib/store.js`, ready to swap for a backend later.

## Run

`npm install` then `npm run dev`

## Features

- Mock auth, family profile, and persistent browser session
- Week/month schedule with CRUD, recurring events, and care-needed reminders
- 12 seeded caregivers, filters, requests, and backup-caregiver list
- Family groups, feed, likes, comments, and posts
- Demo verification, gated care exchange, and in-app-message placeholder
- About, FAQ, contact/report, and demo admin approval at `/admin`

## Mocked

Auth, background checks, messages, payments, and approval are demo-only. IDs are never uploaded or saved; all data stays in the browser.

## Production needs

Real auth and authorization, database/API, encrypted uploads, background-check provider, payments, push notifications, moderation, rate limits, and a privacy/security review.
