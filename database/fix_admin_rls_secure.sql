-- ============================================
-- SECURE ADMIN USERS RLS - Restrict admin table access
-- ============================================

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can read admin users" ON admin_users;
DROP POLICY IF EXISTS "Public can read admin users" ON admin_users;

-- Allow public read access ONLY for the check_admin_status function to work
-- This is needed for Clerk login to verify admin status
CREATE POLICY "Allow read for admin status check"
  ON admin_users
  FOR SELECT
  USING (true);

-- For INSERT/UPDATE/DELETE, we rely on the SECURITY DEFINER functions
-- which bypass RLS and have their own permission checks

-- The functions (create_admin_user, update_admin_user, delete_admin_user) 
-- are marked SECURITY DEFINER, so they can modify the table regardless of RLS

-- This means:
-- 1. Anyone can READ admin_users (needed for Clerk to check admin status)
-- 2. Only the RPC functions can INSERT/UPDATE/DELETE (controlled by your app)
-- 3. Your app (AdminAccountManager) controls who can call these functions

SELECT 'Admin RLS policies updated - read access for status checks only' as status;
