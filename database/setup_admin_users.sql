-- ============================================
-- ADMIN USERS TABLE SETUP (Based on Bara-Prototype)
-- ============================================

-- Step 1: Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT UNIQUE NOT NULL, -- Clerk user ID (can be placeholder initially)
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin', -- super_admin, admin
    permissions TEXT[] DEFAULT ARRAY['read', 'write'], -- read, write, delete, admin
    is_active BOOLEAN DEFAULT true,
    added_by TEXT, -- Clerk user ID of who added this admin
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);

-- Step 3: Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS policies
-- Policy: Allow service role (backend) full access
CREATE POLICY "Service role has full access to admin_users"
  ON admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can read their own admin record
CREATE POLICY "Users can read their own admin record"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid()::text);

-- Policy: Super admins can read all admin records
CREATE POLICY "Super admins can read all admin records"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()::text
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- Policy: Super admins can insert new admin records
CREATE POLICY "Super admins can insert admin records"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()::text
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- Policy: Super admins can update admin records
CREATE POLICY "Super admins can update admin records"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()::text
      AND role = 'super_admin'
      AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()::text
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- Policy: Super admins can delete admin records (except themselves)
CREATE POLICY "Super admins can delete admin records"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (
    user_id != auth.uid()::text -- Can't delete yourself
    AND EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()::text
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- Step 5: Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create trigger for updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at_trigger ON admin_users;
CREATE TRIGGER update_admin_users_updated_at_trigger
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_admin_users_updated_at();

-- Step 7: Create admin activity log table
CREATE TABLE IF NOT EXISTS admin_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id TEXT NOT NULL,
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL, -- added_admin, removed_admin, changed_role, etc.
    target_user_id TEXT, -- User affected by the action
    target_email TEXT,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 8: Create indexes for admin activity log
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_admin_user_id ON admin_activity_log(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_created_at ON admin_activity_log(created_at DESC);

-- Step 9: Enable RLS for activity log
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Policy: Super admins can read all activity logs
CREATE POLICY "Super admins can read activity logs"
  ON admin_activity_log
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()::text
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- Policy: Service role can insert activity logs
CREATE POLICY "Service role can insert activity logs"
  ON admin_activity_log
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Step 10: Helper functions for admin management
-- Function to check admin status (supports email lookup)
CREATE OR REPLACE FUNCTION check_admin_status(p_clerk_user_id TEXT, p_user_email TEXT)
RETURNS TABLE (
    is_admin BOOLEAN,
    role TEXT,
    permissions TEXT[],
    admin_user RECORD
) AS $$
DECLARE
    found_user RECORD;
BEGIN
    -- First, try to get admin user by Clerk user_id
    SELECT * INTO found_user FROM admin_users 
    WHERE user_id = p_clerk_user_id AND is_active = true;
    
    -- If not found by user_id, check by email (for newly added admins)
    IF NOT FOUND THEN
        SELECT * INTO found_user FROM admin_users 
        WHERE email = LOWER(p_user_email) AND is_active = true;
        
        -- If found by email, update the user_id from placeholder to actual Clerk user_id
        IF FOUND AND found_user.user_id LIKE 'pending_%' THEN
            UPDATE admin_users 
            SET user_id = p_clerk_user_id, updated_at = NOW()
            WHERE id = found_user.id;
            found_user.user_id = p_clerk_user_id;
        END IF;
    END IF;
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT false, NULL, NULL, NULL::RECORD;
        RETURN;
    END IF;
    
    -- Update last login
    UPDATE admin_users 
    SET last_login = NOW(), updated_at = NOW()
    WHERE id = found_user.id;
    
    RETURN QUERY SELECT true, found_user.role, found_user.permissions, found_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create admin user (for super admins only)
CREATE OR REPLACE FUNCTION create_admin_user(
    p_email TEXT,
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_role TEXT DEFAULT 'admin',
    p_permissions TEXT[] DEFAULT ARRAY['read', 'write']
)
RETURNS UUID AS $$
DECLARE
    new_user_id UUID;
    current_admin_user RECORD;
BEGIN
    -- Check if current user is super admin
    SELECT * INTO current_admin_user FROM admin_users 
    WHERE user_id = auth.uid()::text 
    AND role = 'super_admin' 
    AND is_active = true;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Only super admins can create admin users';
    END IF;

    -- Insert new admin user with placeholder user_id
    INSERT INTO admin_users (user_id, email, first_name, last_name, role, permissions, added_by)
    VALUES (
        'pending_' || gen_random_uuid()::TEXT, -- Placeholder user_id
        LOWER(p_email),
        p_first_name,
        p_last_name,
        p_role,
        p_permissions,
        current_admin_user.user_id
    )
    RETURNING id INTO new_user_id;

    -- Log the action
    INSERT INTO admin_activity_log (admin_user_id, admin_email, action, target_email, details)
    VALUES (
        current_admin_user.user_id,
        current_admin_user.email,
        'added_admin',
        p_email,
        jsonb_build_object('role', p_role, 'permissions', p_permissions)
    );

    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update admin user
CREATE OR REPLACE FUNCTION update_admin_user(
    p_user_id TEXT,
    p_email TEXT DEFAULT NULL,
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_role TEXT DEFAULT NULL,
    p_permissions TEXT[] DEFAULT NULL,
    p_is_active BOOLEAN DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    current_admin_user RECORD;
    target_user RECORD;
BEGIN
    -- Check permissions
    SELECT * INTO current_admin_user FROM admin_users 
    WHERE user_id = auth.uid()::text 
    AND is_active = true;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'User not found or inactive';
    END IF;

    -- Super admins can change anyone, regular users can only change themselves
    IF current_admin_user.role != 'super_admin' AND current_admin_user.user_id != p_user_id THEN
        RAISE EXCEPTION 'Insufficient permissions';
    END IF;

    -- Only super admins can change roles
    IF p_role IS NOT NULL AND current_admin_user.role != 'super_admin' THEN
        RAISE EXCEPTION 'Only super admins can change roles';
    END IF;

    -- Get target user for logging
    SELECT * INTO target_user FROM admin_users WHERE user_id = p_user_id;

    -- Update the user
    UPDATE admin_users SET
        email = COALESCE(LOWER(p_email), email),
        first_name = COALESCE(p_first_name, first_name),
        last_name = COALESCE(p_last_name, last_name),
        role = COALESCE(p_role, role),
        permissions = COALESCE(p_permissions, permissions),
        is_active = COALESCE(p_is_active, is_active),
        updated_at = NOW()
    WHERE user_id = p_user_id;

    -- Log the action
    IF FOUND THEN
        INSERT INTO admin_activity_log (admin_user_id, admin_email, action, target_user_id, target_email, details)
        VALUES (
            current_admin_user.user_id,
            current_admin_user.email,
            'updated_admin',
            p_user_id,
            target_user.email,
            jsonb_build_object(
                'changes', jsonb_build_object(
                    'email', p_email IS NOT NULL,
                    'first_name', p_first_name IS NOT NULL,
                    'last_name', p_last_name IS NOT NULL,
                    'role', p_role IS NOT NULL,
                    'permissions', p_permissions IS NOT NULL,
                    'is_active', p_is_active IS NOT NULL
                )
            )
        );
    END IF;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete admin user (super admin only)
CREATE OR REPLACE FUNCTION delete_admin_user(p_user_id TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    current_admin_user RECORD;
    target_user RECORD;
    super_admin_count INTEGER;
BEGIN
    -- Check if current user is super admin
    SELECT * INTO current_admin_user FROM admin_users 
    WHERE user_id = auth.uid()::text 
    AND role = 'super_admin' 
    AND is_active = true;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Only super admins can delete admin users';
    END IF;

    -- Prevent deleting the last super admin
    SELECT COUNT(*) INTO super_admin_count FROM admin_users 
    WHERE role = 'super_admin' AND is_active = true;
    
    IF super_admin_count <= 1 THEN
        SELECT * INTO target_user FROM admin_users WHERE user_id = p_user_id;
        IF target_user.role = 'super_admin' THEN
            RAISE EXCEPTION 'Cannot delete the last super admin';
        END IF;
    END IF;

    -- Get target user for logging
    SELECT * INTO target_user FROM admin_users WHERE user_id = p_user_id;

    -- Delete the user
    DELETE FROM admin_users WHERE user_id = p_user_id;

    -- Log the action
    IF FOUND THEN
        INSERT INTO admin_activity_log (admin_user_id, admin_email, action, target_user_id, target_email, details)
        VALUES (
            current_admin_user.user_id,
            current_admin_user.email,
            'deleted_admin',
            p_user_id,
            target_user.email,
            jsonb_build_object('role', target_user.role)
        );
    END IF;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 11: Insert initial super admin (placeholder - will be updated on first login)
INSERT INTO admin_users (user_id, email, first_name, last_name, role, permissions, is_active, added_by)
VALUES (
    'pending_super_admin', -- Placeholder - will be updated when they first log in
    'admin@exci-maa.com', -- Replace with your actual email
    'Super',
    'Admin',
    'super_admin',
    ARRAY['read', 'write', 'delete', 'admin'],
    true,
    'system'
)
ON CONFLICT (email) DO NOTHING;

-- Step 12: Verify setup
SELECT 'Admin users table created' as status, COUNT(*) as count FROM admin_users;
SELECT 'Functions created' as status, 'All admin functions ready' as message;

-- ============================================
-- SETUP COMPLETE! 🎉
-- 
-- How this works:
-- 1. Add admins by email (no Clerk ID needed initially)
-- 2. When admin first logs in, their Clerk ID gets linked automatically
-- 3. Email lookup allows adding admins before they have Clerk accounts
-- 4. Full audit logging of all admin actions
-- 5. Role-based permissions with RLS security
-- 
-- Next Steps:
-- 1. Update AdminAccountManager to use these new functions
-- 2. Test adding admins by email
-- 3. Verify automatic Clerk ID linking on first login
-- ============================================
