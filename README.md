# Paisa — Personal Finance Tracker

A frontend-only personal finance tracker built with React, Tailwind CSS, and
DaisyUI. React Router provides overview and transaction-history routes.
Transactions are saved in your browser's local storage.

## Setup

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173`. The overview is at `/`, and
the full transaction history is at `/transactions`. Create a production build
with `npm run build`, or preview the build locally with `npm run preview`.

Amounts are stored as integer paisa and displayed in NPR. Transaction dates are
stored as calendar dates (`YYYY-MM-DD`).
