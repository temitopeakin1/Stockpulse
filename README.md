# Stockpulse

Stockpulse is a modern stock market tracking app. It helps users monitor markets, search stocks, manage a personal watchlist, and get AI-assisted news summaries and email alerts.

## Features

- **Market dashboard** — TradingView widgets for market overview, stock heatmap, top stories, and market quotes
- **Stock search** — Quickly find symbols and company profiles via Finnhub
- **Watchlist** — Save stocks you care about and use them for personalized workflows
- **Auth** — Email/password sign-in and sign-up with Better Auth and MongoDB
- **Demo mode** — Browse the app without MongoDB using fixed demo credentials
- **Background workflows** — Inngest-powered welcome emails and AI daily news digests (Gemini)

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Better Auth** + **MongoDB / Mongoose**
- **Finnhub** for market data
- **Inngest** for event-driven jobs
- **Nodemailer** for email delivery
- **Google Gemini** for AI summaries

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Finnhub
NEXT_PUBLIC_FINNHUB_API_KEY=
FINNHUB_BASE_URL=https://finnhub.io/api/v1

# MongoDB (optional in demo mode)
MONGODB_URI=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# Gemini
GEMINI_API_KEY=

# Nodemailer
NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For background jobs (emails / digests), also run:

```bash
npx inngest-cli@latest dev
```

## Demo login

If `MONGODB_URI` is not set, the app runs in **demo mode** (no database required):

| Field    | Value               |
| -------- | ------------------- |
| Email    | `demo@stockpulse.app` |
| Password | `demo1234`          |

These credentials are also shown on the sign-in page.

To use real auth and persistence, set `MONGODB_URI`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`, then restart the app.

## Project structure

```text
app/                 # Next.js routes (auth + dashboard + stock pages)
components/          # UI components (header, search, charts, forms)
database/            # Mongoose connection and models
lib/
  actions/           # Server actions (auth, watchlist, Finnhub, users)
  better-auth/       # Auth configuration
  demo/              # Demo-mode session helpers
  inngest/           # Background workflows
```

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Create a production build  |
| `npm run start`   | Run the production server  |
| `npm run lint`    | Run ESLint                 |
| `npm run test:db` | Test the MongoDB connection |

## License

Private / personal project.
