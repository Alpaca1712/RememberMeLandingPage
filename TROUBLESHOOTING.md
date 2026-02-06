# Troubleshooting Guide

## Error: "Failed to save signup" with "TypeError: fetch failed"

This error occurs when the Supabase credentials are invalid or incorrectly formatted.

### Quick Fix

1. **Get the correct Supabase credentials:**
   - Go to https://app.supabase.com
   - Select your project
   - Go to **Settings** (⚙️) → **API**
   - Copy:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public** key (very long JWT token starting with `eyJ`)

2. **Update your `.env` file:**
   ```bash
   SUPABASE_URL=https://your-actual-project-id.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZ... (very long)
   ```

3. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   # Start it again
   npm run dev
   ```

### What a Valid Anon Key Looks Like

**✅ CORRECT:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eG5yd2JiZWdtcGNhd29vZHZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTk5OTksImV4cCI6MjAxNTU3NTk5OX0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
(Very long, starts with `eyJ`, has dots separating sections)

**❌ INCORRECT:**
```
sb_publishable_7ALr2lDVbAlBjUr2G-BuVg_kAvodB1k
```
(This is not a valid Supabase anon key format)

## Common Issues

### Issue 1: Environment Variables Not Loading

**Symptoms:**
- Form submissions work but nothing saves
- Console says "Supabase not configured"

**Solutions:**

1. **Rename `.env` to `.env.local`:**
   ```bash
   mv .env .env.local
   ```
   Next.js prefers `.env.local` for local development.

2. **Restart the dev server** after changing env files:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

3. **Check the file is in the project root:**
   ```
   RememberMeLandingPage/
   ├── .env.local          ✅ Correct location
   ├── app/
   ├── lib/
   └── package.json
   ```

### Issue 2: Database Table Doesn't Exist

**Symptoms:**
- Error: "relation 'signups' does not exist"

**Solution:**
Run the SQL setup in Supabase:
1. Go to Supabase → **SQL Editor**
2. Copy contents of `supabase-setup.sql`
3. Click **Run**

### Issue 3: RLS Policies Blocking Inserts

**Symptoms:**
- Error: "new row violates row-level security policy"

**Solution:**
Check your RLS policy in Supabase:
```sql
-- Should exist in your database:
CREATE POLICY "Allow public inserts" ON signups
  FOR INSERT
  TO public
  WITH CHECK (true);
```

## Debug Mode

To see detailed logs:

1. **Check API route logs:**
   - Look at your terminal running `npm run dev`
   - Should show "Supabase URL: Set" and "Supabase Key: Set (eyJhbGc...)"

2. **Enable Supabase debugging:**
   Add to your API route:
   ```typescript
   console.log('Supabase client:', supabase ? 'Configured' : 'Not configured');
   console.log('URL:', process.env.SUPABASE_URL);
   ```

3. **Test with curl:**
   ```bash
   curl -X POST http://localhost:3000/api/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","phone":"123"}'
   ```

## Still Having Issues?

1. **Check the terminal logs** - The API route logs helpful debugging info
2. **Verify Supabase project is active** - Not paused or deleted
3. **Check your internet connection** - Supabase needs network access
4. **Try creating the `.env.local` file from scratch** - Sometimes copy/paste adds invisible characters

## Quick Test

To test if it's working without Supabase:

1. **Remove/rename `.env.local`:**
   ```bash
   mv .env.local .env.local.backup
   ```

2. **Restart dev server**

3. **Try submitting the form** - Should work in "development mode" and log to console

If this works, the issue is with your Supabase credentials.

## Contact

If you're still stuck, check:
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
