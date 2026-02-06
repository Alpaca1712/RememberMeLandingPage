-- ============================================
-- Remember Me Landing Page - Supabase Setup
-- ============================================
-- Run this ENTIRE script in your Supabase SQL Editor
-- This will create everything you need from scratch

-- 1. Drop existing table if it exists (for fresh start)
DROP TABLE IF EXISTS signups CASCADE;

-- 2. Create signups table
CREATE TABLE signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  recreate_interest TEXT[] DEFAULT '{}',
  other_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create indexes for performance
CREATE INDEX idx_signups_email ON signups(email);
CREATE INDEX idx_signups_created_at ON signups(created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policy for INSERT (allows anon key to insert)
-- IMPORTANT: Use 'anon' role, not 'public' - this is what the anon key uses
CREATE POLICY "Allow anon inserts" ON signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 6. Create RLS policy for SELECT (only authenticated users can read)
CREATE POLICY "Allow authenticated reads" ON signups
  FOR SELECT
  TO authenticated
  USING (true);

-- 7. Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Create trigger to automatically update updated_at
CREATE TRIGGER update_signups_updated_at
  BEFORE UPDATE ON signups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 9. Create a view for easy data analysis
-- Using SECURITY INVOKER so it respects RLS policies
CREATE OR REPLACE VIEW signups_summary 
WITH (security_invoker = true) AS
SELECT 
  id,
  name,
  email,
  phone,
  recreate_interest,
  CASE 
    WHEN 'voice' = ANY(recreate_interest) THEN true 
    ELSE false 
  END as interested_in_voice,
  CASE 
    WHEN 'pictures' = ANY(recreate_interest) THEN true 
    ELSE false 
  END as interested_in_pictures,
  CASE 
    WHEN 'video' = ANY(recreate_interest) THEN true 
    ELSE false 
  END as interested_in_video,
  other_details,
  created_at
FROM signups
ORDER BY created_at DESC;

-- ============================================
-- VERIFICATION
-- ============================================
-- Check that everything was created correctly

-- Verify table exists
SELECT 'Table created: signups' as status
WHERE EXISTS (SELECT FROM pg_tables WHERE tablename = 'signups');

-- Verify RLS is enabled
SELECT 'RLS enabled: ' || rowsecurity::text as status
FROM pg_tables 
WHERE tablename = 'signups';

-- Verify policies exist
SELECT 'Policies created: ' || count(*)::text as status
FROM pg_policies 
WHERE tablename = 'signups';

-- Show all policies
SELECT policyname, cmd, roles
FROM pg_policies 
WHERE tablename = 'signups'
ORDER BY cmd;
