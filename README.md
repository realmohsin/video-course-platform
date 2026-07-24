# Video Course Platform

A learning management platform where instructor role can create and sell video courses while student role can purchase courses, watch lessons, and track their progress. Built with Next.js, React, TypeScript, Prisma, Clerk, Stripe, Mux, UploadThing, Tailwind CSS, and Radix UI.

## Requirements

* Node.js 20
* npm

## Environment Variables

`.env`:

```env
# Database
DATABASE_URL=

# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stripe payments
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

# Mux video hosting
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

# UploadThing file uploads
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Development

Install:

```bash
nvm install
nvm use
npm install
```

Set up the database:

```bash
npx prisma db push
```

Start the dev server:

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```
