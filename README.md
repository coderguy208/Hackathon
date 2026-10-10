# FamilyHub

> Everything your family needs, in one place.

FamilyHub is a warm, local-first family coordination app created for a hackathon demo. It helps single parents and busy families keep schedules organized, discover trusted caregivers, connect with their community, and coordinate a verified care exchange.

**🌐 Live Demo:** [hacksforhumanity2026-team6.vercel.app](https://hacksforhumanity2026-team6.vercel.app/)

## Features

- **Family profile and mock authentication** — create an account, add family details, and keep the demo session in the browser.
- **Shared schedule** — week and month views with work shifts, appointments, events, color categories, care-needed reminders, editing, deletion, and recurrence controls.
- **Caregiver directory** — twelve seeded verified caregivers with availability, distance, hourly-rate filters, care requests, and a backup-caregiver list.
- **Family network** — groups for single parents, working parents, toddler tips, and weekend activities; create posts, like posts, and read comments.
- **Care exchange** — a verification-gated board where families can ask for or offer local help, with a demo messaging entry point.
- **Safety and verification** — mock ID upload, background-check consent, references, a safety agreement, community guidelines, concern reporting, and demo admin approval.
- **Responsive design** — mobile-first layouts, accessible labels, keyboard-friendly controls, focusable inputs, and a calm blue/green visual system.

## Tech stack

- [React](https://react.dev/)[cite: 11]
- [Vite](https://vite.dev/)[cite: 11]
- [React Router](https://reactrouter.com/)[cite: 11]
- [Tailwind CSS](https://tailwindcss.com/)[cite: 11]
- Browser `localStorage` through a small data layer in `src/lib/store.js`

## Demo walkthrough

1. Select **Get Started** and create a mock account.
2. Complete the family profile.[cite: 11]
3. Add or edit calendar items from **Schedule**.[cite: 11]
4. Browse caregivers and send a sample care request.[cite: 11]
5. Join groups and publish a post in **Network**.[cite: 11]
6. Complete **Safety** verification.[cite: 11]
7. Visit `/admin`, enter `familyhub-demo`, and approve the current family.[cite: 11]
8. Open **Care exchange** to post or browse verified-family requests.[cite: 11]

## Project structure

```text
src/
├── App.jsx           # Router, shared layout, and reusable UI primitives
├── pages.jsx         # Feature pages and browser interactions
├── index.css         # Responsive design system
└── lib/
    └── store.js      # localStorage data layer, demo data, and type JSDoc
public/
└── family-circle-12.svg
