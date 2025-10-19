import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowParams,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface DataTableProps {
  title: string;
  fields: Array<{
    key: string;
    label: string;
    type?: 'text' | 'email' | 'number' | 'date' | 'textarea';
    required?: boolean;
  }>;
  storageKey: string; // localStorage key OR Supabase table name
  initialData?: any[];
  useSupabase?: boolean;
}

import { insertItem, updateItemById, deleteById } from '../../services/supabaseCrud';
import { useSupabaseTable } from '../../hooks/useSupabaseTable';

const DataTable: React.FC<DataTableProps> = ({ 
  title, 
  fields, 
  storageKey, 
  initialData = [],
  useSupabase = false,
}) => {
  const [data, setData] = useState<any[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const formatError = (err: unknown): string => {
    if (err instanceof Error) return err.message;
    try {
      return JSON.stringify(err);
    } catch (_) {
      return String(err);
    }
  };

  // Supabase realtime hook (called unconditionally to satisfy React Rules of Hooks)
  const supa = useSupabaseTable<any>(storageKey as any, useSupabase);

  // Check for missing Supabase configuration
  const hasSupabaseConfig = useMemo(() => {
    return Boolean((import.meta as any).env?.VITE_SUPABASE_URL) && Boolean((import.meta as any).env?.VITE_SUPABASE_ANON_KEY);
  }, []);

  // Load data on component mount (local mode only)
  useEffect(() => {
    if (useSupabase) return; // handled by hook
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsedData = JSON.parse(stored);
          setData(parsedData);
        } else if (initialData.length) {
          setData(initialData);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(`Failed to load data: ${formatError(err)}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [storageKey, useSupabase, initialData]);

  // Save data to localStorage
  const saveData = (newData: any[]) => {
    try {
      if (!useSupabase) {
        localStorage.setItem(storageKey, JSON.stringify(newData));
      }
      setData(newData);
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Failed to save data');
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      const missingFields = fields
        .filter(field => field.required && !formData[field.key])
        .map(field => field.label);

      if (missingFields.length > 0) {
        setError(`Please fill in: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }

      // Process form data for date fields
      const processedData = { ...formData };
      fields.forEach(field => {
        if (field.type === 'date' && processedData[field.key]) {
          // Convert date string to ISO format for database
          const date = new Date(processedData[field.key]);
          if (!isNaN(date.getTime())) {
            processedData[field.key] = date.toISOString().split('T')[0]; // YYYY-MM-DD format
          }
        }
      });

      if (useSupabase) {
        if (editingId) {
          await updateItemById<any>(storageKey as any, editingId, processedData);
        } else {
          await insertItem<any>(storageKey as any, processedData);
        }
        await supa?.refresh();
      } else {
        const newItem = {
          id: editingId || crypto.randomUUID(),
          ...processedData,
          created_at: editingId ? data.find(item => item.id === editingId)?.created_at : new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        let newData;
        if (editingId) {
          newData = data.map(item => (item.id === editingId ? newItem : item));
        } else {
          newData = [newItem, ...data];
        }
        saveData(newData);
      }
      handleClose();
    } catch (err) {
      setError(`Failed to save data: ${formatError(err)}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (id: string) => {
    const sourceRows = useSupabase ? (supa?.rows || []) : data;
    const item = sourceRows.find((item: any) => item.id === id);
    if (item) {
      const formData: Record<string, string> = {};
      fields.forEach(field => {
        let value = item[field.key] || '';
        // Handle date fields for form display
        if (field.type === 'date' && value) {
          // Convert date to YYYY-MM-DD format for date input
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            value = date.toISOString().split('T')[0];
          }
        }
        formData[field.key] = value;
      });
      setFormData(formData);
      setEditingId(id);
      setOpen(true);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (useSupabase) {
        await deleteById(storageKey as any, id);
        await supa?.refresh();
      } else {
        const newData = data.filter(item => item.id !== id);
        saveData(newData);
      }
    } catch (err) {
      setError(`Failed to delete: ${formatError(err)}`);
    }
  };

  // Handle close dialog
  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({});
    setError(null);
  };

  // Handle add new
  const handleAdd = () => {
    setFormData({});
    setEditingId(null);
    setOpen(true);
  };

  // Define columns for DataGrid
  const columns: GridColDef[] = [
    ...fields.map(field => ({
      field: field.key,
      headerName: field.label,
      width: 150,
      flex: 1,
      renderCell: (params: any) => {
        const value = params.value;
        if (field.type === 'date' && value) {
          return new Date(value).toLocaleDateString();
        }
        if (field.type === 'textarea' && value && value.length > 50) {
          return (
            <Tooltip title={value}>
              <Typography variant="body2" sx={{ cursor: 'help' }}>
                {value.substring(0, 50)}...
              </Typography>
            </Tooltip>
          );
        }
        return value || '-';
      },
    })),
    {
      field: 'created_at',
      headerName: 'Created',
      width: 120,
      renderCell: (params: any) => {
        return params.value ? new Date(params.value).toLocaleDateString() : '-';
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.id as string)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => handleDelete(params.id as string)}
        />,
      ],
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ borderRadius: 2 }}
        >
          Add New
        </Button>
      </Box>

      {/* Error Alert */}
      {(error || supa?.error) && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error || supa?.error}
        </Alert>
      )}

      {/* Supabase Configuration Error */}
      {useSupabase && !hasSupabaseConfig && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Supabase Configuration Missing
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            To use Supabase features, please configure your environment variables:
          </Typography>
          <Box component="pre" sx={{ 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1, 
            fontSize: '0.875rem',
            overflow: 'auto'
          }}>
            {`# Create a .env file in your project root with:
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Get these values from: https://supabase.com/dashboard`}
          </Box>
        </Alert>
      )}

      {/* Data Table */}
      <Paper sx={{ 
        height: 600, 
        width: '100%', 
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
      }}>
        <DataGrid
          rows={useSupabase ? (supa?.rows || []) : data}
          columns={columns}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          loading={loading || Boolean(supa?.loading)}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'grey.50',
              borderBottom: '2px solid',
              borderColor: 'divider',
            },
            '& .MuiDataGrid-footerContainer': {
              position: 'relative',
              zIndex: 2,
              backgroundColor: 'white',
              borderTop: '1px solid',
              borderColor: 'divider',
            },
            height: 600,
            maxHeight: 600,
          }}
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingId ? `Edit ${title.slice(0, -1)}` : `Add New ${title.slice(0, -1)}`}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, mt: 1 }}>
            {fields.map(field => (
              <Box key={field.key}>
                <TextField
                  fullWidth
                  label={field.label}
                  value={formData[field.key] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                  type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text'}
                  multiline={field.type === 'textarea'}
                  rows={field.type === 'textarea' ? 3 : 1}
                  required={field.required}
                  variant="outlined"
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            {loading ? 'Saving...' : (editingId ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataTable;
