import React from 'react';
import { Box, Typography } from '@mui/material';
import DataTable from './DataTable';

const ConsultationRequests: React.FC = () => {
  const fields = [
    { key: 'name', label: 'Full Name', required: true },
    { key: 'email', label: 'Email', type: 'email' as const, required: true },
    { key: 'phone', label: 'Phone', required: true },
    { key: 'company', label: 'Company' },
    { key: 'service_type', label: 'Service Type', required: true },
    { key: 'budget', label: 'Budget Range' },
    { key: 'timeline', label: 'Project Timeline' },
    { key: 'message', label: 'Requirements', type: 'textarea' as const, required: true },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
  ];

  return (
    <Box>
      <DataTable
        title="Consultation Requests"
        fields={fields}
        storageKey="consultation_requests"
      />
    </Box>
  );
};

export default ConsultationRequests;
