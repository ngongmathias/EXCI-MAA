import React from 'react';
import { Box, Typography } from '@mui/material';
import DataTable from './DataTable';

const ContactSubmissions: React.FC = () => {
  const fields = [
    { key: 'name', label: 'Full Name', required: true },
    { key: 'email', label: 'Email', type: 'email' as const, required: true },
    { key: 'phone', label: 'Phone', required: true },
    { key: 'company', label: 'Company' },
    { key: 'subject', label: 'Subject', required: true },
    { key: 'message', label: 'Message', type: 'textarea' as const, required: true },
    { key: 'country', label: 'Country' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <Box>
      <DataTable
        title="Contact Submissions"
        fields={fields}
        storageKey="contact_submissions"
      />
    </Box>
  );
};

export default ContactSubmissions;
