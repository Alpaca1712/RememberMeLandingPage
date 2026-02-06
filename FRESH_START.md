# Fresh Start Guide - Supabase Setup

Follow these steps for a clean, working setup.

## Step 1: Wipe Your Supabase Database

1. Go to https://app.supabase.com
2. Select your project: **rxxnrwbbegmpcawoodvh**
3. Go to **SQL Editor**
4. Run this to completely wipe the signups table:

```sql
DROP TABLE IF EXISTS signups CASCADE;
```

## Step 2: Run the Setup Script

1. Still in **SQL Editor**, create a **New Query**
2. Copy the ENTIRE contents of `supabase-setup.sql` (in your project root)
3. Paste it into the SQL Editor
4. Click **Run** or press Cmd/Ctrl + Enter

You should see verification output showing:
- ✅ Table created: signups
- ✅ RLS enabled: true
- ✅ Policies created: 2
- ✅ Policy list showing `Allow anon inserts` and `Allow authenticated reads`

## Step 3: Verify Your .env.local File

Make sure your `.env.local` file has the correct credentials:

```bash
SUPABASE_URL=https://rxxnrwbbegmpcawoodvh.supabase.co
SUPABASE_ANON_KEY=eyJhbGc... (very long JWT token starting with eyJ)
```

**Important:** The anon key should be:
- ✅ Very long (500+ characters)
- ✅ Starts with `eyJ`
- ❌ NOT the short key starting with `sb_publishable_`

### How to Get the Correct Anon Key

1. In Supabase, go to **Settings** (⚙️) → **API**
2. Under "Project API keys", copy the **`anon` `public`** key
3. Paste it into your `.env.local` as `SUPABASE_ANON_KEY`

## Step 4: Restart Your Dev Server

**Important:** After any changes to `.env.local`, you MUST restart:

```bash
# Stop the server: Press Ctrl+C in your terminal
# Start it again:
npm run dev
```

## Step 5: Test the Form

1. Go to http://localhost:3000
2. Fill out the form with test data
3. Click "Get Early Access"
4. You should see the thank you page! ✅

## Step 6: Verify Data Was Saved

1. Go back to Supabase
2. Click **Table Editor** in the left sidebar
3. Select the `signups` table
4. You should see your test submission!

## What You Should See in Terminal

When you submit the form, your terminal should show:

```
Supabase URL: Set
Supabase Key: Set (eyJhbGc...)
Successfully saved signup: [...]
```

## If It Still Doesn't Work

### Check 1: Environment Variables Loading

Add this to your form submission to debug:
```javascript
console.log('Env check:', {
  url: process.env.SUPABASE_URL ? 'Set' : 'Not set',
  key: process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not set'
});
```

### Check 2: Verify Supabase Policies

Run this in SQL Editor:
```sql
SELECT policyname, cmd, roles
FROM pg_policies 
WHERE tablename = 'signups';
```

Should show:
- `Allow anon inserts` - INSERT - `{anon}`
- `Allow authenticated reads` - SELECT - `{authenticated}`

### Check 3: Test Without RLS (Temporary)

To confirm RLS is the issue:
```sql
ALTER TABLE signups DISABLE ROW LEVEL SECURITY;
```

Try the form. If it works now, the issue is with RLS policies.

Re-enable RLS:
```sql
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;
```

## Key Points

1. ✅ Use `anon` role in policy (not `public`)
2. ✅ Use correct anon key (long JWT, starts with `eyJ`)
3. ✅ File is named `.env.local` (not `.env`)
4. ✅ Restart dev server after env changes
5. ✅ Run the complete setup script (drops and recreates everything)

## Success Criteria

You know it's working when:
- ✅ Form submits without errors
- ✅ Thank you page displays
- ✅ Data appears in Supabase Table Editor
- ✅ Terminal shows "Successfully saved signup"

---

**If you're still stuck after following all these steps, check your terminal output and share the exact error message.**
