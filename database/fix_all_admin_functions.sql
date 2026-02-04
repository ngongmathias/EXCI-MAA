-- ============================================
-- FIX ALL ADMIN FUNCTIONS - Complete fix for Clerk integration
-- ============================================

-- Function to check admin status and link Clerk ID
CREATE OR REPLACE FUNCTION check_admin_status(
    p_clerk_user_id TEXT,
    p_email TEXT
)
RETURNS TABLE (
    is_admin BOOLEAN,
    role TEXT,
    user_id TEXT,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    permissions TEXT[]
) AS $$
DECLARE
    admin_record RECORD;
BEGIN
    -- First try to find by Clerk user ID
    SELECT * INTO admin_record FROM admin_users 
    WHERE user_id = p_clerk_user_id AND is_active = true;
    
    -- If not found by Clerk ID, try by email
    IF NOT FOUND THEN
        SELECT * INTO admin_record FROM admin_users 
        WHERE email = p_email AND is_active = true;
        
        -- If found by email and user_id is a placeholder, update it
        IF FOUND AND admin_record.user_id LIKE 'pending_%' THEN
            UPDATE admin_users 
            SET user_id = p_clerk_user_id, 
                last_login = NOW(),
                updated_at = NOW()
            WHERE email = p_email;
            
            -- Refresh the record
            SELECT * INTO admin_record FROM admin_users 
            WHERE user_id = p_clerk_user_id;
        END IF;
    ELSE
        -- Update last login
        UPDATE admin_users 
        SET last_login = NOW()
        WHERE user_id = p_clerk_user_id;
    END IF;
    
    -- Return the result
    IF FOUND THEN
        RETURN QUERY SELECT 
            true,
            admin_record.role,
            admin_record.user_id,
            admin_record.email,
            admin_record.first_name,
            admin_record.last_name,
            admin_record.permissions;
    ELSE
        RETURN QUERY SELECT 
            false,
            NULL::TEXT,
            NULL::TEXT,
            NULL::TEXT,
            NULL::TEXT,
            NULL::TEXT,
            NULL::TEXT[];
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create admin user (simplified - no auth check)
CREATE OR REPLACE FUNCTION create_admin_user(
    p_email TEXT,
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_role TEXT DEFAULT 'admin',
    p_permissions TEXT[] DEFAULT ARRAY['read', 'write']
)
RETURNS BOOLEAN AS $$
DECLARE
    new_user_id TEXT;
BEGIN
    -- Generate a placeholder user_id
    new_user_id := 'pending_' || LOWER(REPLACE(p_email, '@', '_at_'));
    
    -- Insert new admin user
    INSERT INTO admin_users (user_id, email, first_name, last_name, role, permissions, is_active, added_by)
    VALUES (
        new_user_id,
        p_email,
        COALESCE(p_first_name, ''),
        COALESCE(p_last_name, ''),
        p_role,
        p_permissions,
        true,
        'admin_panel'
    );

    -- Log the action
    INSERT INTO admin_activity_log (admin_user_id, admin_email, action, target_user_id, target_email, details)
    VALUES (
        'admin_panel',
        'system',
        'created_admin',
        new_user_id,
        p_email,
        jsonb_build_object('role', p_role, 'permissions', p_permissions)
    );

    RETURN true;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'User with email % already exists', p_email;
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error creating admin user: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update admin user (simplified - no auth check)
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
            'admin_panel',
            'system',
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

-- Function to delete admin user (simplified - no auth check)
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

    -- Log the action
    IF FOUND THEN
        INSERT INTO admin_activity_log (admin_user_id, admin_email, action, target_user_id, target_email, details)
        VALUES (
            'admin_panel',
            'system',
            'deleted_admin',
            p_user_id,
            target_user.email,
            jsonb_build_object('role', target_user.role)
        );
    END IF;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

SELECT 'All admin functions updated and working with Clerk' as status;
