import React from 'react';
import { Box, Typography } from '@mui/material';
import DataTable from './DataTable';

type ContentType = 'services' | 'events' | 'posts' | 'comments';

interface ContentManagerProps {
  active: ContentType;
}

const ContentManager: React.FC<ContentManagerProps> = ({ active }) => {
  const servicesFields = [
    { key: 'name', label: 'Service Name', required: true },
    { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { key: 'price', label: 'Price', type: 'number' as const },
  ];

  const eventsFields = [
    { key: 'title', label: 'Event Title', required: true },
    { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { key: 'location', label: 'Location', required: true },
    { key: 'start_at', label: 'Start Date', type: 'date' as const, required: true },
    { key: 'end_at', label: 'End Date', type: 'date' as const, required: true },
  ];

  const postsFields = [
    { key: 'title', label: 'Post Title', required: true },
    { key: 'content', label: 'Content', type: 'textarea' as const, required: true },
  ];

  const commentsFields = [
    { key: 'post_id', label: 'Post ID (UUID)', required: true },
    { key: 'name', label: 'Commenter Name', required: true },
    { key: 'message', label: 'Message', type: 'textarea' as const, required: true },
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
      case 'services': return 'services';
      case 'events': return 'events';
      case 'posts': return 'posts';
      case 'comments': return 'comments';
      default: return 'services';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: 'text.primary' }}>
        Content Management
      </Typography>
      {/* Data Table */}
      <Box>
        <DataTable
          title={getTitleForActive()}
          fields={getFieldsForActive()}
          storageKey={getStorageKeyForActive()}
          useSupabase
          supportsImageUpload={active === 'events' || active === 'posts'}
        />
      </Box>
    </Box>
  );
};

export default ContentManager;


