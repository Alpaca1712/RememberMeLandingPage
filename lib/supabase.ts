import { createClient } from '@supabase/supabase-js';

// Server-side only - no NEXT_PUBLIC_ prefix
// These are NOT exposed to the browser
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a server-side Supabase client
// This client is ONLY used in API routes (server-side)
// Never exposed to the browser
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
