-- ============================================
-- ADMIN USERS TABLE SETUP
-- ============================================

-- Step 1: Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    clerk_user_id VARCHAR(255) UNIQUE, -- Link to Clerk user ID
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS policies
-- Only super admins can do everything
CREATE POLICY "Super admins full access" ON admin_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE clerk_user_id = auth.uid() 
            AND role = 'super_admin' 
            AND is_active = true
        )
    );

-- Admins can read other admins but only update themselves
CREATE POLICY "Admins read access" ON admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE clerk_user_id = auth.uid() 
            AND role IN ('admin', 'super_admin') 
            AND is_active = true
        )
    );

-- Users can only update themselves (unless super admin)
CREATE POLICY "Users update themselves" ON admin_users
    FOR UPDATE USING (
        clerk_user_id = auth.uid()
    );

-- Step 4: Create updated_at trigger
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_users_updated_at();

-- Step 5: Create helper functions
-- Function to get current admin user info
CREATE OR REPLACE FUNCTION get_current_admin_user()
RETURNS TABLE (
    id UUID,
    email VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    role VARCHAR,
    is_active BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        au.id,
        au.email,
        au.first_name,
        au.last_name,
        au.role,
        au.is_active
    FROM admin_users au
    WHERE au.clerk_user_id = auth.uid()
    AND au.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create admin user (for super admins only)
CREATE OR REPLACE FUNCTION create_admin_user(
    p_email VARCHAR,
    p_first_name VARCHAR,
    p_last_name VARCHAR,
    p_role VARCHAR DEFAULT 'admin',
    p_clerk_user_id VARCHAR DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    new_user_id UUID;
BEGIN
    -- Check if current user is super admin
    IF NOT EXISTS (
        SELECT 1 FROM admin_users 
        WHERE clerk_user_id = auth.uid() 
        AND role = 'super_admin' 
        AND is_active = true
    ) THEN
        RAISE EXCEPTION 'Only super admins can create admin users';
    END IF;

    -- Insert new admin user
    INSERT INTO admin_users (email, first_name, last_name, role, clerk_user_id)
    VALUES (p_email, p_first_name, p_last_name, p_role, p_clerk_user_id)
    RETURNING id INTO new_user_id;

    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update admin user
CREATE OR REPLACE FUNCTION update_admin_user(
    p_user_id UUID,
    p_email VARCHAR DEFAULT NULL,
    p_first_name VARCHAR DEFAULT NULL,
    p_last_name VARCHAR DEFAULT NULL,
    p_role VARCHAR DEFAULT NULL,
    p_is_active BOOLEAN DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check permissions
    IF NOT EXISTS (
        SELECT 1 FROM admin_users 
        WHERE clerk_user_id = auth.uid() 
        AND (
            (role = 'super_admin') OR 
            (id = p_user_id)
        )
        AND is_active = true
    ) THEN
        RAISE EXCEPTION 'Insufficient permissions';
    END IF;

    -- Super admins can change role, regular users can only change themselves
    IF p_role IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM admin_users 
        WHERE clerk_user_id = auth.uid() 
        AND role = 'super_admin' 
        AND is_active = true
    ) THEN
        RAISE EXCEPTION 'Only super admins can change roles';
    END IF;

    -- Update the user
    UPDATE admin_users SET
        email = COALESCE(p_email, email),
        first_name = COALESCE(p_first_name, first_name),
        last_name = COALESCE(p_last_name, last_name),
        role = COALESCE(p_role, role),
        is_active = COALESCE(p_is_active, is_active),
        updated_at = NOW()
    WHERE id = p_user_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete admin user (super admin only)
CREATE OR REPLACE FUNCTION delete_admin_user(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if current user is super admin
    IF NOT EXISTS (
        SELECT 1 FROM admin_users 
        WHERE clerk_user_id = auth.uid() 
        AND role = 'super_admin' 
        AND is_active = true
    ) THEN
        RAISE EXCEPTION 'Only super admins can delete admin users';
    END IF;

    -- Prevent deleting the last super admin
    IF (
        SELECT COUNT(*) FROM admin_users 
        WHERE role = 'super_admin' 
        AND is_active = true
    ) <= 1 AND (
        SELECT role FROM admin_users 
        WHERE id = p_user_id
    ) = 'super_admin' THEN
        RAISE EXCEPTION 'Cannot delete the last super admin';
    END IF;

    -- Delete the user
    DELETE FROM admin_users WHERE id = p_user_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Insert initial super admin (you'll need to update this with actual Clerk user ID)
-- This is a placeholder - you'll need to update the clerk_user_id with an actual Clerk user ID
INSERT INTO admin_users (email, first_name, last_name, role, clerk_user_id)
VALUES (
    'admin@exci-maa.com',
    'Super',
    'Admin',
    'super_admin',
    'user_placeholder_id' -- Replace with actual Clerk user ID
) ON CONFLICT (email) DO NOTHING;

-- Step 7: Verify setup
SELECT 'Admin users table created' as status, COUNT(*) as count FROM admin_users;
SELECT 'Functions created' as status, 'All admin functions ready' as message;

-- ============================================
-- SETUP COMPLETE! 🎉
-- 
-- Next Steps:
-- 1. Update the initial super admin with actual Clerk user ID
-- 2. Update AdminAccountManager to use these database functions
-- 3. Test admin user management functionality
-- ============================================
