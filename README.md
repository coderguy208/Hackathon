# FamilyHub

> Everything your family needs, in one place.

FamilyHub is a warm, local-first family coordination app created for a hackathon demo. It helps single parents and busy families keep schedules organized, discover trusted caregivers, connect with their community, and coordinate a verified care exchange.

![FamilyHub logo](public/family-circle-12.svg)

## Features

- **Family profile and mock authentication** — create an account, add family details, and keep the demo session in the browser.
- **Shared schedule** — week and month views with work shifts, appointments, events, color categories, care-needed reminders, editing, deletion, and recurrence controls.
- **Caregiver directory** — twelve seeded verified caregivers with availability, distance, hourly-rate filters, care requests, and a backup-caregiver list.
- **Family network** — groups for single parents, working parents, toddler tips, and weekend activities; create posts, like posts, and read comments.
- **Care exchange** — a verification-gated board where families can ask for or offer local help, with a demo messaging entry point.
- **Safety and verification** — mock ID upload, background-check consent, references, a safety agreement, community guidelines, concern reporting, and demo admin approval.
- **Responsive design** — mobile-first layouts, accessible labels, keyboard-friendly controls, focusable inputs, and a calm blue/green visual system.

## Tech stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- Browser `localStorage` through a small data layer in `src/lib/store.js`

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
git clone https://github.com/YOUR-USERNAME/familyhub.git
cd familyhub
npm install
npm run dev
```

Open the local URL shown in your terminal, typically `http://localhost:5173`.

### Production build

```bash
npm run build
```

The production files are generated in `dist/`.

## Demo walkthrough

1. Select **Get Started** and create a mock account.
2. Complete the family profile.
3. Add or edit calendar items from **Schedule**.
4. Browse caregivers and send a sample care request.
5. Join groups and publish a post in **Network**.
6. Complete **Safety** verification.
7. Visit `/admin`, enter `familyhub-demo`, and approve the current family.
8. Open **Care exchange** to post or browse verified-family requests.

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
```

## Demo data and safety note

This is a front-end demonstration. Authentication, caregiver verification, background checks, care requests, messaging, reviews, payment, and admin approval are mocked. All app data remains in the browser's `localStorage`; no information is sent to a server. The ID control is intentionally a non-persistent demo interaction.

To reset the demo, use **Settings → Reset demo data**.

## What a production version needs

- Secure authentication, role-based authorization, and account recovery
- A production database and audited server API
- Encrypted file uploads and a vetted identity/background-check provider
- Real-time messaging, notifications, and payment processing
- Care-exchange matching, availability conflict handling, reviews, and dispute workflows
- Community moderation, reporting triage, rate limiting, and abuse prevention
- Privacy policy, data retention, consent management, accessibility review, and security testing

## License

Built as a hackathon demo. Add a license before public distribution.
