# Quick Start Guide

Get your Remember Me landing page up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is fine)

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Set Up Supabase (2 min)

### Create Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for it to provision

### Create Database Table
1. In Supabase, go to **SQL Editor**
2. Copy/paste the contents of `supabase-setup.sql`
3. Click "Run"

### Get API Keys
1. Go to **Settings** → **API**
2. Copy your **Project URL** and **anon key**

## Step 3: Configure Environment (1 min)

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Run Development Server (30 sec)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Test It! (30 sec)

1. Fill out the form on your landing page
2. Submit it
3. Go to Supabase **Table Editor** → `signups`
4. See your submission! 🎉

## Deploy to Vercel (2 min)

```bash
# Install Vercel CLI (if you haven't)
npm install -g vercel

# Deploy
vercel
```

Or push to GitHub and import in Vercel dashboard.

**Important**: Add your environment variables in Vercel:
- Settings → Environment Variables
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## What's Next?

- Customize the copy in `app/page.tsx`
- Adjust colors in `tailwind.config.ts`
- Set up email notifications (Supabase webhooks)
- Create an admin dashboard to view signups
- Add Google Analytics or tracking

## Need Help?

- Full setup guide: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- Project README: [README.md](./README.md)

## File Overview

- `app/page.tsx` - Main landing page (edit copy here)
- `app/api/signup/route.ts` - API endpoint for submissions
- `lib/supabase.ts` - Supabase client
- `supabase-setup.sql` - Database schema
- `app/globals.css` - Styling
- `.env.local` - Your secrets (create this!)

That's it! You're ready to collect leads for Remember Me. 🚀
