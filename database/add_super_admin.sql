-- ============================================
-- ADD SUPER ADMIN USER
-- ============================================

-- Insert or update mathiasngongngai@gmail.com as super admin
INSERT INTO admin_users (user_id, email, first_name, last_name, role, permissions, is_active, added_by)
VALUES (
    'pending_super_admin_mathias', -- Placeholder - will be updated when they first log in
    'mathiasngongngai@gmail.com',
    'Mathias',
    'Ngong Ngai',
    'super_admin',
    ARRAY['read', 'write', 'delete', 'admin'],
    true,
    'system'
)
ON CONFLICT (email) 
DO UPDATE SET
    role = 'super_admin',
    permissions = ARRAY['read', 'write', 'delete', 'admin'],
    is_active = true,
    updated_at = NOW();

-- Verify the user was added/updated
SELECT id, email, first_name, last_name, role, permissions, is_active, created_at
FROM admin_users
WHERE email = 'mathiasngongngai@gmail.com';

SELECT 'Super admin user added/updated successfully' as status;
