# FamilyHub

> Everything your family needs, in one place.

FamilyHub is a warm, local-first family coordination app created for a hackathon demo. It helps single parents and busy families keep schedules organized, discover trusted caregivers, connect with their community, and coordinate a verified care exchange.

**🌐 Live Demo:** [https://hacksforhumanity2026team6.vercel.app](https://hacksforhumanity2026team6.vercel.app)[cite: 24]

## Features

- **Verification & Safety** — Verification requires an ID, Address, Phone number, and a check of criminal records[cite: 23].
- **Child Care Swap** — Users must verify first before accessing the swap[cite: 23]. Parents who require childcare can access a page where volunteers post their availability, and volunteers can add their specific time availability[cite: 23]. Contact information is restricted to only show general location and a phone number[cite: 23].
- **Networking** — Community networking does not require verification and operates similarly to an Ed Discussion board in Canvas[cite: 23].
- **Friend List** — Users can add other accounts and save them to a starred list[cite: 23].
- **Shared schedule** — Week and month views with work shifts, appointments, events, color categories, care-needed reminders, editing, deletion, and recurrence controls[cite: 24].
- **Caregiver directory** — Twelve seeded verified caregivers with availability, distance, hourly-rate filters, care requests, and a backup-caregiver list[cite: 24].
- **Responsive design** — Mobile-first layouts, accessible labels, keyboard-friendly controls, focusable inputs, and a calm blue/green visual system[cite: 24].

## Tech stack

- [React](https://react.dev/)[cite: 24]
- [Vite](https://vite.dev/)[cite: 24]
- [React Router](https://reactrouter.com/)[cite: 24]
- [Tailwind CSS](https://tailwindcss.com/)[cite: 24]
- [Supabase](https://supabase.com/) for backend database, authentication, and file storage
- Browser `localStorage` through a small data layer in `src/lib/store.js`[cite: 24]

## Demo walkthrough

1. Select **Get Started** and create a mock account.[cite: 24]
2. Complete the family profile.[cite: 24]
3. Add or edit calendar items from **Schedule**.[cite: 24]
4. Browse caregivers and send a sample care request.[cite: 24]
5. Join groups and publish a post in **Network**.[cite: 24]
6. Complete **Safety** verification.[cite: 24]
7. Visit `/admin`, enter `familyhub-demo`, and approve the current family.[cite: 24]
8. Open **Care exchange** to post or browse verified-family requests.[cite: 24]

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
