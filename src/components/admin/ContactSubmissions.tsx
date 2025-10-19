import React from 'react';
import { Box } from '@mui/material';
import DataTable from './DataTable';

const ContactSubmissions: React.FC = () => {
  const fields = [
    { key: 'name', label: 'Full Name', required: true },
    { key: 'email', label: 'Email', type: 'email' as const, required: true },
    { key: 'phone', label: 'Phone' },
    { key: 'subject', label: 'Subject', required: true },
    { key: 'message', label: 'Message', type: 'textarea' as const, required: true },
  ];

  return (
    <Box>
      <DataTable
        title="Contact Submissions"
        fields={fields}
        storageKey="contact_submissions"
        useSupabase
      />
    </Box>
  );
};

export default ContactSubmissions;
