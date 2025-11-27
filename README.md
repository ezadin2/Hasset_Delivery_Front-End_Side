<div align="center">

<img src="public/ourlogo.jpg" alt="ሀሴት Delivery Logo" width="120" />

<img src="src/assets/027612d655664ce5469a768edc12392eca0af979.png" alt="ሀሴት Delivery Branding" width="200" />

# ሀሴት Delivery — Frontend  
### React + TypeScript

**Modern, fast, and scalable frontend for Ethiopia's premium delivery service**

<br/>

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38b2ac?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646cff?logo=vite)](https://vitejs.dev/)

</div>



---

## Overview

**ሀሴት Delivery** is a fast, accessible, and locally‑tailored React frontend built to serve customers and businesses across Addis Ababa and Ethiopia. The app focuses on simple booking, live tracking, localized payment flows, and an admin dashboard for operations and analytics.

This repository contains the client‑side code only — UI, navigation, forms, and integration hooks meant to connect to a backend API.

---

## Key Features

### End‑user

* **Service booking** (food, parcels, documents)
* **Real‑time tracking** with order status updates
* **Secure payments** integration (local providers / ETB)
* **User auth & profile** (register / login / manage addresses)
* **Responsive UI** (mobile → desktop)
* **Dark / Light theme** with persistence

### Operator / Admin

* **Order management** and assignment
* **Coverage map** (Addis Ababa districts) and service areas
* **Pricing calculator** and dynamic rate rules
* **Analytics**: orders, revenue, delivery time
* **Customer support** inbox and logs

---

## Tech Stack

* **React 18** (functional components + hooks)
* **TypeScript** for type safety
* **Vite** for dev server & build
* **Tailwind CSS** + **shadcn/ui** for styling & components
* **Framer Motion** for UI animations
* **Lucide React** icons
* **React Router DOM** for routing
* **React Context** for lightweight global state
* **React Hook Form** for forms & validation

---

## Project Structure

```
src/
├── assets/           # images, fonts, static files
├── components/       # reusable components (ui/, global/, figma/)
├── contexts/         # React Context providers
├── pages/            # route pages (Home, Services, TrackOrder, Contact, ...)
├── services/         # API clients / adapters
├── styles/           # global Tailwind config + utilities
├── utils/            # helpers, validators, constants
└── App.tsx
```

---

## Local Development — Quick Start

### Prerequisites

* Node.js v16+ (LTS recommended)
* npm or yarn

### Install & Run

```bash
# clone
git clone https://github.com/ezadin2/Hasset_Delivery_Front-End_Side.git
cd Hasset_Delivery_Front-End_Side

# install
npm install
# or
# yarn

# start dev server
npm run dev

# open: http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview    # preview the production build locally
```

---

## Environment / Configuration

Place environment variables in a `.env` file at project root. Example variables used by the app:

```
VITE_API_BASE_URL=https://api.hassetdelivery.et
VITE_MAPS_API_KEY=your_map_provider_key
VITE_PAYMENT_PROVIDER_KEY=your_payment_key
VITE_ENV=development
```

> The frontend expects an API that exposes auth, orders, tracking, and payments endpoints. Update `services/api.ts` to match your backend routes.

---

## Localization & Ethiopian Market Notes

* Phone number format: `+251xxxxxxxxx` (Ethiopian numbering). Validation helpers included.
* Currency: ETB (display & formatting helpers in `utils/currency.ts`).
* Default coverage includes common Addis Ababa districts (Bole, Kirkos, Arada); service areas are configurable in the admin.
* Timezone and business hours configurable for local holidays.

---

## UX / Design System

* Brand color: **Primary — Orange (#EA580C)**
* Success — Emerald (#10B981)
* Typography: **Inter** (headings & body), **JetBrains Mono** for code snippets
* Components: glass cards, 3D interactive cards, animated sections
* Breakpoints: mobile (<768px), tablet (768–1024px), desktop (>1024px)

---

## Integrations

* **Payment** — hooks and example flows for local providers (implement provider SDK in `services/payments.ts`).
* **Maps / Tracking** — uses map provider key; implement real‑time location updates via WebSockets or polling.
* **Auth** — JWT / cookie flows supported (update `contexts/AuthContext` to match backend).

---

## Testing & Linting

* `npm run lint` — run ESLint
* `npm run format` — run Prettier
* Component and utility tests can be added with your preferred test runner (Vitest / Jest). Recommended to mock API responses and test form validation.

---

## Deployment Notes

* Static build (`dist/`) is suitable for static hosts (Netlify, Vercel) or served from a CDN behind a web server.
* Ensure environment variables are injected at deployment time (Vercel / Netlify env settings).
* Use an HTTPS endpoint for the API and secure WebSocket connections for live tracking.

---

## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/awesome`
3. Commit your changes: `git commit -m "feat: add awesome feature"`
4. Push and open a Pull Request

Please follow the existing code style and run lint/format before submitting.

---

## Roadmap (suggested)

* Mobile PWA with offline order creation & sync
* Driver app for Android (React Native / Flutter)
* Multi‑language support (Amharic + English)
* Rate optimization & dynamic pricing
* Automated end‑to‑end tests for critical flows

---

## Contact & Support

* **Email:** [support@hasetdelivery.et](mailto:support@hasetdelivery.et)
* **Phone:** +251 911 234 567
* **Address:** Bole Road, Addis Ababa, Ethiopia

---

## License

Proprietary — ሀሴት Delivery. All rights reserved.

<div align="center">Built for Ethiopia's growing delivery market • ሀሴት Delivery</div>
