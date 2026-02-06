# Supabase Setup Guide

This guide will help you set up Supabase as the backend for your Remember Me landing page.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in the details:
   - **Name**: Remember Me Landing Page (or your preferred name)
   - **Database Password**: Create a strong password (save it somewhere safe)
   - **Region**: Choose the region closest to your users
5. Click "Create new project"
6. Wait for the project to be provisioned (1-2 minutes)

## Step 2: Create the Database Table

1. In your Supabase project, go to the **SQL Editor** (in the left sidebar)
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-setup.sql` into the editor
4. Click "Run" to execute the SQL
5. You should see a success message

This creates:
- A `signups` table with all necessary fields
- Indexes for better performance
- Row Level Security (RLS) policies
- A view for easy data analysis

## Step 3: Get Your API Credentials

1. In your Supabase project, go to **Settings** → **API** (in the left sidebar)
2. Copy the following values:
   - **Project URL** (under "Project API keys")
   - **anon/public key** (under "Project API keys")

## Step 4: Configure Your Environment Variables

1. Create a new file called `.env.local` in your project root (not tracked by git)
2. Add your Supabase credentials (server-side only, more secure):

```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the values with your actual credentials from Step 3

**Security Note:** These variables do NOT have the `NEXT_PUBLIC_` prefix, which means they are **server-side only** and never exposed to the browser. This is more secure than using `NEXT_PUBLIC_` variables.

## Step 5: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)
3. Fill out the form and submit
4. Go to your Supabase project → **Table Editor** → `signups` table
5. You should see your test submission!

## Step 6: View Your Data

### In Supabase Dashboard

1. Go to **Table Editor** in your Supabase project
2. Select the `signups` table
3. You'll see all submissions with filters and search

### Using the Summary View

1. Go to **SQL Editor**
2. Run this query:
   ```sql
   SELECT * FROM signups_summary;
   ```
3. This gives you a formatted view with boolean flags for interests

## Step 7: Deploy to Vercel

When deploying to Vercel:

1. In your Vercel project settings, go to **Environment Variables**
2. Add the server-side environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
3. Make sure these are **NOT** set as `NEXT_PUBLIC_` variables
4. Redeploy your project

## Optional: Export Data

### Export as CSV
1. In Supabase **Table Editor**, select the `signups` table
2. Click the "Export" button
3. Choose CSV format
4. Download your data

### Export via SQL
```sql
COPY (SELECT * FROM signups) TO '/tmp/signups.csv' WITH CSV HEADER;
```

## Database Schema

```
signups
├── id (UUID, Primary Key)
├── name (TEXT)
├── email (TEXT)
├── phone (TEXT)
├── recreate_interest (TEXT[]) - Array of: "voice", "pictures", "video"
├── other_details (TEXT, Nullable)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Security Notes

- **Server-side only:** Your Supabase credentials are NEVER exposed to the browser
- **API Route protection:** All database writes go through your Next.js API route
- **RLS enabled:** Row Level Security is enabled to protect your data
- **Limited access:** Only inserts are allowed from the public API (your form submissions)
- **Admin access:** Full read access requires authentication (for admin viewing)

### Why This Is Secure

1. **No direct database access from frontend** - Users can't inspect your code and find database credentials
2. **API route acts as a gatekeeper** - You control exactly what data can be inserted
3. **Server-side validation** - All validation happens on the server before touching the database
4. **RLS policies** - Even with the anon key, Supabase only allows what your RLS policies permit

## Troubleshooting

### "Missing Supabase environment variables" Error
- Make sure `.env.local` exists in your project root
- Check that variable names match exactly (including `NEXT_PUBLIC_` prefix)
- Restart your dev server after adding environment variables

### Form Submission Fails
- Check browser console for errors
- Verify your Supabase URL and key are correct
- Ensure the `signups` table exists in your Supabase project
- Check that RLS policies are configured correctly

### Can't See Data in Supabase
- Go to **Table Editor** → `signups`
- If the table is empty, try submitting the form again
- Check the API response in browser Network tab

## Next Steps

- Set up email notifications when someone signs up (using Supabase webhooks)
- Create an admin dashboard to view all signups
- Add analytics to track conversion rates
- Set up automated emails to new signups

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
