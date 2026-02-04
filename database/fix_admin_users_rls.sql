-- ============================================
-- FIX ADMIN USERS RLS - Allow reading admin users
-- ============================================

-- Drop existing restrictive policies that might be blocking reads
DROP POLICY IF EXISTS "Users can read their own admin record" ON admin_users;
DROP POLICY IF EXISTS "Super admins can read all admin records" ON admin_users;

-- Create a simple policy that allows any authenticated user to read admin users
-- (They need to see the list to manage it)
CREATE POLICY "Authenticated users can read admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Also allow anonymous read access (for checking admin status during login)
CREATE POLICY "Public can read admin users"
  ON admin_users
  FOR SELECT
  TO anon
  USING (true);

-- Keep the existing insert/update/delete policies as they are

-- Verify the changes
SELECT tablename, policyname, permissive, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'admin_users'
ORDER BY policyname;

SELECT 'Admin users RLS policies updated - reading should now work' as status;
