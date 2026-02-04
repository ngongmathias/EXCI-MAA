-- ============================================
-- FIX ADMIN FUNCTIONS - Remove auth.uid() checks
-- Since we're using Clerk (not Supabase Auth), we need to bypass auth.uid() checks
-- Access control is handled by Clerk at the application level
-- ============================================

-- Function to delete admin user (simplified - no auth.uid() check)
CREATE OR REPLACE FUNCTION delete_admin_user(p_user_id TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    target_user RECORD;
    super_admin_count INTEGER;
BEGIN
    -- Prevent deleting the last super admin
    SELECT COUNT(*) INTO super_admin_count FROM admin_users 
    WHERE role = 'super_admin' AND is_active = true;
    
    -- Get target user info
    SELECT * INTO target_user FROM admin_users WHERE user_id = p_user_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'User not found';
    END IF;
    
    -- Check if trying to delete the last super admin
    IF super_admin_count <= 1 AND target_user.role = 'super_admin' THEN
        RAISE EXCEPTION 'Cannot delete the last super admin';
    END IF;

    -- Delete the user
    DELETE FROM admin_users WHERE user_id = p_user_id;

    -- Log the action (simplified - no current user tracking since we don't have auth.uid())
    IF FOUND THEN
        INSERT INTO admin_activity_log (admin_user_id, admin_email, action, target_user_id, target_email, details)
        VALUES (
            'clerk_user',
            'admin@exci-maa.com',
            'deleted_admin',
            p_user_id,
            target_user.email,
            jsonb_build_object('role', target_user.role)
        );
    END IF;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update admin user (simplified - no auth.uid() check)
CREATE OR REPLACE FUNCTION update_admin_user(
    p_user_id TEXT,
    p_email TEXT DEFAULT NULL,
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_role TEXT DEFAULT NULL,
    p_is_active BOOLEAN DEFAULT NULL,
    p_permissions TEXT[] DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    target_user RECORD;
    super_admin_count INTEGER;
BEGIN
    -- Get current user data
    SELECT * INTO target_user FROM admin_users WHERE user_id = p_user_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'User not found';
    END IF;

    -- If trying to deactivate or change role of a super admin, check count
    IF target_user.role = 'super_admin' THEN
        SELECT COUNT(*) INTO super_admin_count FROM admin_users 
        WHERE role = 'super_admin' AND is_active = true;
        
        IF super_admin_count <= 1 THEN
            IF (p_is_active IS NOT NULL AND p_is_active = false) OR 
               (p_role IS NOT NULL AND p_role != 'super_admin') THEN
                RAISE EXCEPTION 'Cannot deactivate or demote the last super admin';
            END IF;
        END IF;
    END IF;

    -- Update user
    UPDATE admin_users SET
        email = COALESCE(p_email, email),
        first_name = COALESCE(p_first_name, first_name),
        last_name = COALESCE(p_last_name, last_name),
        role = COALESCE(p_role, role),
        is_active = COALESCE(p_is_active, is_active),
        permissions = COALESCE(p_permissions, permissions),
        updated_at = NOW()
    WHERE user_id = p_user_id;

    -- Log the action
    IF FOUND THEN
        INSERT INTO admin_activity_log (admin_user_id, admin_email, action, target_user_id, target_email, details)
        VALUES (
            'clerk_user',
            'admin@exci-maa.com',
            'updated_admin',
            p_user_id,
            target_user.email,
            jsonb_build_object(
                'email', p_email IS NOT NULL,
                'first_name', p_first_name IS NOT NULL,
                'last_name', p_last_name IS NOT NULL,
                'role', p_role IS NOT NULL,
                'permissions', p_permissions IS NOT NULL,
                'is_active', p_is_active IS NOT NULL
            )
        );
    END IF;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

SELECT 'Admin functions updated - should work with Clerk now' as status;
