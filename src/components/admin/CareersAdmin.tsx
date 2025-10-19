import React, { useMemo } from 'react';
import DataTable from './DataTable';

const CareersAdmin: React.FC = () => {
  const fields = useMemo(() => ([
    { key: 'title', label: 'Job Title', required: true },
    { key: 'department', label: 'Department', required: true },
    { key: 'location', label: 'Location', required: true },
    { key: 'employment_type', label: 'Employment Type' },
    { key: 'salary_range', label: 'Salary Range' },
    { key: 'application_url', label: 'Apply URL' },
    { key: 'apply_email', label: 'Apply Email' },
    { key: 'posting_date', label: 'Posting Date', type: 'date' as const },
    { key: 'closing_date', label: 'Closing Date', type: 'date' as const },
    { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { key: 'requirements', label: 'Requirements', type: 'textarea' as const },
    { key: 'responsibilities', label: 'Responsibilities', type: 'textarea' as const },
    { key: 'status', label: 'Status' },
  ]), []);

  return (
    <DataTable title="Careers" fields={fields} storageKey="careers" useSupabase />
  );
};

export default CareersAdmin;


