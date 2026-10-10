# FamilyHub

> Everything your family needs, in one place.

FamilyHub is a local-first family coordination app created for a hackathon demo. It helps single parents and busy families keep schedules organized, discover trusted caregivers, connect with their community, and coordinate a verified care exchange.

**Note:** This project is configured to run locally for the full integrated backend and frontend experience.

## Features

- **Verification & Safety** — Verification requires an ID, Address, Phone number, and a check of criminal records.
- **Child Care Swap** — Users must verify first before accessing the swap. Parents who require childcare can access a page where volunteers post their availability, and volunteers can add their specific time availability. Contact information is restricted to only show general location and a phone number.
- **Networking** — Community networking does not require verification and operates similarly to an Ed Discussion board in Canvas.
- **Friend List** — Users can add other accounts and save them to a starred list.
- **Shared schedule** — Week and month views with work shifts, appointments, events, color categories, care-needed reminders, editing, deletion, and recurrence controls.
- **Caregiver directory** — Twelve seeded verified caregivers with availability, distance, hourly-rate filters, care requests, and a backup-caregiver list.
- **Responsive design** — Mobile-first layouts, accessible labels, keyboard-friendly controls, focusable inputs, and a calm blue/green visual system.

## Tech stack

- **Frontend:** [React](https://react.dev/), [Vite](https://vite.dev/), [React Router](https://reactrouter.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** Node.js
- **Data Layer:** Browser `localStorage` through a small data layer in `src/lib/store.js`

## Running Locally

To run the full application (frontend and backend) on your local machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/coderguy208/Hackathon.git](https://github.com/coderguy208/Hackathon.git)
   cd Hackathon
