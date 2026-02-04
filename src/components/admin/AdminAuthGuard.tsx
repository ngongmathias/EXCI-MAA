import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isLoaded) return;

      if (!user) {
        navigate('/sign-in');
        return;
      }

      try {
        const userEmail = user.primaryEmailAddress?.emailAddress;
        
        if (!userEmail) {
          console.error('No email found for user');
          setIsAdmin(false);
          setIsChecking(false);
          return;
        }

        // Check if user is an admin by email or Clerk user ID
        const { data: adminUser, error } = await supabase
          .from('admin_users')
          .select('*')
          .or(`email.eq.${userEmail},user_id.eq.${user.id}`)
          .eq('is_active', true)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          setIsChecking(false);
          return;
        }

        if (adminUser) {
          // If user_id is still a placeholder, update it with the actual Clerk ID
          if (adminUser.user_id.startsWith('pending_')) {
            await supabase.rpc('check_admin_status', {
              p_clerk_user_id: user.id,
              p_email: userEmail
            });
          }

          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Error in admin check:', err);
        setIsAdmin(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAdminStatus();
  }, [user, isLoaded, navigate]);

  if (!isLoaded || isChecking) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isAdmin === false) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
        p={3}
      >
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
          <Typography variant="h4" color="error" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You do not have permission to access the admin dashboard.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            If you believe this is an error, please contact the system administrator.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return <>{children}</>;
};

export default AdminAuthGuard;
