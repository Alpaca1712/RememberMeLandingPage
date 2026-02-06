-- Fix Security Definer Warning for signups_summary View
-- Run this in Supabase SQL Editor

-- Drop and recreate the view with SECURITY INVOKER
DROP VIEW IF EXISTS signups_summary;

CREATE VIEW signups_summary 
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

-- Verify the fix
SELECT 'View updated successfully' as status;
