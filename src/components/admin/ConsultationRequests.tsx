import React from 'react';
import { Box } from '@mui/material';
import DataTable from './DataTable';

const ConsultationRequests: React.FC = () => {
  const fields = [
    { key: 'full_name', label: 'Full Name', required: true },
    { key: 'email', label: 'Email', type: 'email' as const, required: true },
    { key: 'phone', label: 'Phone', required: true },
    { key: 'company', label: 'Company' },
    { key: 'country_slug', label: 'Country Slug', required: true },
    { key: 'service_id', label: 'Service ID', required: true },
    { key: 'message', label: 'Requirements', type: 'textarea' as const },
  ];

  return (
    <Box>
      <DataTable
        title="Consultation Requests"
        fields={fields}
        storageKey="consultation_requests"
        useSupabase
      />
    </Box>
  );
};

export default ConsultationRequests;
