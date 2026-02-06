# Security Architecture

## How Database Updates Work

### Architecture: API Route (Recommended) ✅

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│                                                             │
│  User fills form → Submits → POST to /api/signup           │
│  (Never sees Supabase credentials)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Request (JSON)
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   NEXT.JS SERVER                            │
│                                                             │
│  API Route: /app/api/signup/route.ts                       │
│  - Receives request                                         │
│  - Validates data (server-side)                             │
│  - Uses Supabase client (with server-only env vars)        │
│  - Inserts into database                                    │
│  - Returns success/error                                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Authenticated Request
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   SUPABASE DATABASE                         │
│                                                             │
│  - Receives insert request                                  │
│  - Checks RLS policies                                      │
│  - Allows/denies based on policy                            │
│  - Returns result                                           │
└─────────────────────────────────────────────────────────────┘
```

## Your Current Setup (Secure) ✅

### 1. Frontend Layer
**File:** `app/page.tsx`

```typescript
// Sends form data to API route
const response = await fetch('/api/signup', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

**Security:**
- ✅ No database credentials in browser
- ✅ No direct database access
- ✅ Simple fetch to your own API

### 2. API Route Layer
**File:** `app/api/signup/route.ts`

```typescript
// Server-side validation and insertion
export async function POST(request: NextRequest) {
  // Validate input
  if (!name || !email || !phone) {
    return error;
  }
  
  // Insert into Supabase (server-side only)
  const { data, error } = await supabase
    .from('signups')
    .insert([{ name, email, phone, ... }]);
}
```

**Security:**
- ✅ Server-side validation
- ✅ Controlled data structure
- ✅ Can add rate limiting
- ✅ Can add additional security checks
- ✅ Credentials never exposed to browser

### 3. Database Layer
**File:** `supabase-setup.sql`

```sql
-- RLS Policy: Allow public inserts only
CREATE POLICY "Allow public inserts" ON signups
  FOR INSERT
  TO public
  WITH CHECK (true);
```

**Security:**
- ✅ RLS enabled
- ✅ Only INSERT allowed for public
- ✅ No SELECT/UPDATE/DELETE for public
- ✅ Admin access requires authentication

## Environment Variables

### Current Configuration (Improved) ✅

```bash
# .env.local (SERVER-SIDE ONLY)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx

# These are NOT prefixed with NEXT_PUBLIC_
# Therefore they are ONLY available on the server
# They are NEVER sent to the browser
```

### Why This Is Better

| Variable Type | Exposed to Browser? | Used Where? |
|--------------|-------------------|-------------|
| `NEXT_PUBLIC_*` | ✅ Yes | Anywhere (client + server) |
| Regular env var | ❌ No | Server-side only |

**Best Practice:** Use regular env vars (no `NEXT_PUBLIC_`) for API keys and secrets.

## Alternative Approach (Less Secure) ❌

### Direct Supabase Client in Frontend

```typescript
// DON'T DO THIS (unless you have very specific reasons)
import { createClient } from '@supabase/supabase-js'

// In frontend component
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Direct insert from browser
const { data } = await supabase
  .from('signups')
  .insert([formData])
```

**Problems:**
- ❌ Credentials visible in browser DevTools
- ❌ Users can inspect Network tab and see your Supabase URL
- ❌ Harder to add validation logic
- ❌ Can't rate limit effectively
- ❌ Can't add server-side business logic
- ❌ Relies entirely on RLS for security

**When It's Okay:**
- Small hobby projects
- When you have very strict RLS policies
- When you need real-time subscriptions (requires client access)

## Security Layers

### Layer 1: API Route (Your First Defense)
- Validate input format
- Check for required fields
- Rate limiting (can add)
- Authentication checks (if needed later)
- Business logic

### Layer 2: Supabase RLS (Your Second Defense)
- Database-level security
- Row-level permissions
- Ensures only allowed operations happen

### Layer 3: Environment Variables (Your Secret Keeper)
- Server-side only variables
- Never exposed to browser
- Managed in Vercel/deployment platform

## Best Practices You're Following ✅

1. **API Route Pattern** - ✅ Using Next.js API routes
2. **Server-Side Credentials** - ✅ No `NEXT_PUBLIC_` prefix
3. **Input Validation** - ✅ Checking required fields
4. **RLS Enabled** - ✅ Database-level security
5. **Limited Permissions** - ✅ Only INSERT allowed for public
6. **Error Handling** - ✅ Graceful errors, no sensitive info leaked

## Additional Security You Could Add

### 1. Rate Limiting
```typescript
// Limit submissions per IP
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 submissions per 15 minutes
})
```

### 2. Email Validation
```typescript
// Verify email is real
import validator from 'validator'

if (!validator.isEmail(email)) {
  return error('Invalid email')
}
```

### 3. Captcha
```typescript
// Prevent bots
import { verifyCaptcha } from '@/lib/captcha'

const isHuman = await verifyCaptcha(captchaToken)
if (!isHuman) return error('Failed captcha')
```

### 4. Honeypot Field
```typescript
// Hidden field to catch bots
if (formData.honeypot) {
  return success() // Pretend to accept, but don't save
}
```

## Summary

**How your DB is updated:**
- ✅ Via API route (`/api/signup`)
- ✅ Supabase client is server-side only
- ✅ Credentials never exposed to browser
- ✅ RLS provides secondary protection

**This is the recommended, secure approach for production applications.**

## Questions?

**Q: Can users see my Supabase credentials?**  
A: No, they're server-side only (no `NEXT_PUBLIC_` prefix).

**Q: Can users bypass my API and insert directly?**  
A: No, they don't have the credentials. Even if they did, RLS would block unauthorized operations.

**Q: Is the anon key safe to expose?**  
A: It's designed to be used with RLS, but it's still better to keep it server-side in your case.

**Q: Should I ever use `NEXT_PUBLIC_SUPABASE_ANON_KEY`?**  
A: Only if you need real-time subscriptions or want to use Supabase Auth in the frontend. For simple inserts, server-side is better.
