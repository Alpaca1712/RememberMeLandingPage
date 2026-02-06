# Remember Me - Landing Page

A beautiful, emotionally resonant landing page for an AI-powered voice preservation service.

## Features

- 🎨 Warm, emotional design focused on grief and memory
- 📱 Fully responsive for all devices
- 📝 Single-step form with interests and details
- ✉️ Email contact for sending recordings (info@artoo.love)
- ⚡ Built with Next.js 14, TypeScript, and Tailwind CSS
- 🔒 Secure Supabase backend with RLS
- 🚀 Optimized for Vercel deployment

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the entire `supabase-setup.sql` file
3. Get your credentials from **Settings** → **API**

### 3. Configure Environment

Create `.env.local`:

```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGc... (your long JWT token)
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Deploy!

Or use CLI:
```bash
vercel
```

## Tech Stack

- **Next.js 14** - App Router, TypeScript
- **Tailwind CSS** - Styling
- **Supabase** - PostgreSQL database with RLS
- **API Routes** - Secure server-side handling

## Project Structure

```
├── app/
│   ├── api/signup/route.ts  # Form submission endpoint
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Styles
├── lib/supabase.ts          # Supabase client
├── supabase-setup.sql       # Database schema
├── .env.local               # Your credentials (gitignored)
└── package.json
```

## Security

- ✅ Server-side only credentials (no `NEXT_PUBLIC_` prefix)
- ✅ API route handles all database writes
- ✅ Row Level Security (RLS) enabled
- ✅ Input validation on server

## Customization

- **Colors**: `tailwind.config.ts`
- **Content**: `app/page.tsx`
- **Metadata**: `app/layout.tsx`

## License

Private project for artoo.love
