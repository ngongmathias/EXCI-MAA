import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { useLanguage } from '../../contexts/LanguageContext';
import DataTable from './DataTable';

const ContentManager: React.FC = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<'services' | 'events' | 'posts' | 'comments'>('services');

  const servicesFields = [
    { key: 'name', label: 'Service Name', required: true },
    { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { key: 'price', label: 'Price', type: 'number' as const },
    { key: 'category', label: 'Category' },
    { key: 'duration', label: 'Duration (hours)' },
  ];

  const eventsFields = [
    { key: 'title', label: 'Event Title', required: true },
    { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { key: 'location', label: 'Location', required: true },
    { key: 'start', label: 'Start Date', type: 'date' as const, required: true },
    { key: 'end', label: 'End Date', type: 'date' as const, required: true },
    { key: 'capacity', label: 'Capacity', type: 'number' as const },
  ];

  const postsFields = [
    { key: 'title', label: 'Post Title', required: true },
    { key: 'content', label: 'Content', type: 'textarea' as const, required: true },
    { key: 'author', label: 'Author', required: true },
    { key: 'category', label: 'Category' },
    { key: 'tags', label: 'Tags' },
    { key: 'featured', label: 'Featured' },
  ];

  const commentsFields = [
    { key: 'postId', label: 'Post ID', required: true },
    { key: 'name', label: 'Commenter Name', required: true },
    { key: 'email', label: 'Email', type: 'email' as const, required: true },
    { key: 'message', label: 'Message', type: 'textarea' as const, required: true },
    { key: 'status', label: 'Status' },
  ];

  const getFieldsForActive = () => {
    switch (active) {
      case 'services': return servicesFields;
      case 'events': return eventsFields;
      case 'posts': return postsFields;
      case 'comments': return commentsFields;
      default: return servicesFields;
    }
  };

  const getTitleForActive = () => {
    switch (active) {
      case 'services': return 'Services';
      case 'events': return 'Events';
      case 'posts': return 'Blog Posts';
      case 'comments': return 'Comments';
      default: return 'Services';
    }
  };

  const getStorageKeyForActive = () => {
    switch (active) {
      case 'services': return 'admin_services';
      case 'events': return 'admin_events';
      case 'posts': return 'admin_posts';
      case 'comments': return 'admin_comments';
      default: return 'admin_services';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: 'text.primary' }}>
        Content Management
      </Typography>
      
      <Grid container spacing={3}>
        {/* Content Type Selector */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: 'fit-content' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Content Types
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                { key: 'services', label: 'Services', count: 0 },
                { key: 'events', label: 'Events', count: 0 },
                { key: 'posts', label: 'Blog Posts', count: 0 },
                { key: 'comments', label: 'Comments', count: 0 },
              ].map((item) => (
                <Card
                  key={item.key}
                  sx={{
                    cursor: 'pointer',
                    border: active === item.key ? '2px solid' : '1px solid',
                    borderColor: active === item.key ? 'primary.main' : 'divider',
                    bgcolor: active === item.key ? 'primary.50' : 'background.paper',
                    '&:hover': {
                      bgcolor: active === item.key ? 'primary.100' : 'action.hover',
                    },
                  }}
                  onClick={() => setActive(item.key as any)}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {item.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {item.count} items
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Data Table */}
        <Grid item xs={12} md={9}>
          <DataTable
            title={getTitleForActive()}
            fields={getFieldsForActive()}
            storageKey={getStorageKeyForActive()}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentManager;


