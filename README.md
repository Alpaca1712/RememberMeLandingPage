# Remember Me - Landing Page

A beautiful, emotionally resonant landing page for an AI-powered voice preservation service.

## Features

- 🎨 Clean, modern design with dark mode support
- 📱 Fully responsive for all devices
- 📝 Two-step form collection:
  - Initial: Name, email, phone
  - Follow-up: Interests in voice, animated pictures, or video recreation
- ✉️ Email contact for sending recordings (david@artoo.love)
- ⚡ Built with Next.js 14 and Tailwind CSS
- 🚀 Optimized for Vercel deployment

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

1. Create a `.env.local` file in the project root
2. Add your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup instructions

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and deploy

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── signup/
│   │       └── route.ts      # API endpoint for form submissions
│   ├── page.tsx              # Main landing page component
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles with Tailwind
├── lib/
│   └── supabase.ts           # Supabase client configuration
├── supabase-setup.sql        # Database schema and setup
├── SUPABASE_SETUP.md         # Detailed Supabase setup guide
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Icons**: SVG icons (inline)

## Form Data Collection

The landing page collects:

1. **Initial Contact Info**:
   - Name
   - Email
   - Phone Number

2. **Additional Interests**:
   - Voice recreation
   - Animated pictures
   - Video messages
   - Optional details/memories

Form submissions are stored in Supabase. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete setup instructions.

## Security

This project uses a secure API route architecture:
- Database credentials are server-side only (never exposed to browser)
- All inserts go through `/api/signup` endpoint
- Row Level Security (RLS) enabled in Supabase
- Input validation on the server

See [SECURITY.md](./SECURITY.md) for detailed security architecture.

## Customization

### Colors
Update theme colors in `tailwind.config.ts`

### Content
Edit messaging in `app/page.tsx`

### Metadata
Update SEO metadata in `app/layout.tsx`

## Documentation

- [README.md](./README.md) - Project overview (you are here)
- [QUICKSTART.md](./QUICKSTART.md) - 5-minute setup guide
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Complete Supabase setup
- [SECURITY.md](./SECURITY.md) - Security architecture and best practices
- [REDESIGN_NOTES.md](./REDESIGN_NOTES.md) - Design decisions and changes

## License

Private project for artoo.love
