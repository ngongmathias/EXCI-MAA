import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as ServicesIcon,
  Event as EventsIcon,
  Article as PostsIcon,
  Comment as CommentsIcon,
  ContactMail as ContactIcon,
  SupportAgent as ConsultationIcon,
  Star as StarIcon,
  Security as SecurityIcon,
  Assessment as ReportsIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';

type SidebarProps = {
  active: string;
  onSelect: (key: string) => void;
  open: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect, open, onClose }) => {
  const mainItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { key: 'careers', label: 'Careers', icon: <ServicesIcon /> },
    // { key: 'services', label: 'Services', icon: <ServicesIcon /> },
    { key: 'events', label: 'Events', icon: <EventsIcon /> },
    { key: 'posts', label: 'Blog Posts', icon: <PostsIcon /> },
    { key: 'comments', label: 'Comments', icon: <CommentsIcon /> },
    { key: 'contact', label: 'Contact Submissions', icon: <ContactIcon /> },
    { key: 'consultation', label: 'Consultation Requests', icon: <ConsultationIcon /> },
    // { key: 'insights', label: 'Insights', icon: <InsightsIcon /> },
  ];

  const whatsNewItems = [
    { label: '2FA Security', icon: <SecurityIcon /> },
    { label: 'Advanced Analytics', icon: <TrendingIcon /> },
    { label: 'Reporting Dashboard', icon: <ReportsIcon /> },
  ];

  const drawerWidth = 280;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            E
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              EXCI-MAA
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Professional Services
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Getting Started Section */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Typography 
          variant="overline" 
          sx={{ 
            color: 'text.secondary', 
            fontWeight: 'bold',
            fontSize: '0.75rem',
            letterSpacing: '0.1em'
          }}
        >
          Getting Started
        </Typography>
      </Box>

      {/* Main Navigation */}
      <List sx={{ flex: 1, px: 1 }}>
        {mainItems.map((item) => (
          <ListItem key={item.key} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => onSelect(item.key)}
              selected={active === item.key}
              sx={{
                borderRadius: 2,
                mx: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: active === item.key ? 'bold' : 'normal',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            position: 'relative',
            height: '100vh',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;


