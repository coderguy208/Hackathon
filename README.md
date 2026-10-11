# FamilyHub

> Everything your family needs, in one place.

FamilyHub is a privacy-first family coordination web application built for the Hacks for Humanity 2026 hackathon. It helps single parents and busy families keep schedules organized, discover trusted caregivers, connect with their community, and coordinate a verified care exchange. 

**Live Demo:** [https://hack-for-humanity-one.vercel.app/](https://hack-for-humanity-one.vercel.app/)

## Features 

- **Verification & Safety** — Verification requires an ID, Address, Phone number, and a check of criminal records. 
- **Child Care Swap** — Gated behind user verification. Parents who require childcare can access a board where volunteers post their availability, and volunteers can add specific time slots. Contact information is restricted to display only general location and phone numbers.
- **Networking** — Open community networking functioning similarly to an educational discussion board.
- **Friend List** — Users can add other accounts and save them to a starred list.
- **Shared schedule** — Week and month calendar views with work shifts, appointments, events, color categories, care-needed reminders, editing, deletion, and recurrence controls.
- **Caregiver directory** — Verified caregiver directory with availability, distance, hourly-rate filters, care requests, and a backup-caregiver saving system.
- **Responsive design** — Mobile-first Bento Box UI layouts, accessible labels, keyboard-friendly controls, focusable inputs, and a cohesive blue/green visual system.

## Tech stack

- **Frontend:** [React](https://react.dev/), [Vite](https://vite.dev/), [React Router](https://reactrouter.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Architecture & Data Layer:** To ensure zero-knowledge data privacy for sensitive family scheduling and location data, the backend was intentionally bypassed for this prototype. All state and session management is handled entirely client-side via browser `localStorage` using a custom data layer in `src/lib/store.js`.

## Running Locally

To run the static frontend prototype on your local machine:

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd <your-repository-directory>
