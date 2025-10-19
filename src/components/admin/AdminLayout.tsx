import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';

const AdminLayout: React.FC<{ children: (active: string) => React.ReactNode }> = ({ children }) => {
  const [active, setActive] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Sidebar */}
      <Sidebar 
        active={active} 
        onSelect={setActive} 
        open={mobileOpen}
        onClose={handleDrawerToggle}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'grey.50',
        }}
      >
        {/* Top App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - 280px)` },
            ml: { md: '280px' },
            bgcolor: 'white',
            color: 'text.primary',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Manage your content and analytics
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            mt: '64px', // Account for AppBar height
            p: 3,
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {children(active)}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;


