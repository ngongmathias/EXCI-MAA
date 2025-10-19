import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
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
  Visibility as ViewIcon,
} from '@mui/icons-material';

interface DataTableProps {
  title: string;
  fields: Array<{
    key: string;
    label: string;
    type?: 'text' | 'email' | 'number' | 'date' | 'textarea';
    required?: boolean;
  }>;
  storageKey: string;
  initialData?: any[];
}

const DataTable: React.FC<DataTableProps> = ({ 
  title, 
  fields, 
  storageKey, 
  initialData = [] 
}) => {
  const [data, setData] = useState<any[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsedData = JSON.parse(stored);
        setData(parsedData);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data');
    }
  }, [storageKey]);

  // Save data to localStorage
  const saveData = (newData: any[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newData));
      setData(newData);
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Failed to save data');
    }
  };

  // Handle form submission
  const handleSubmit = () => {
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

      const newItem = {
        id: editingId || crypto.randomUUID(),
        ...formData,
        created_at: editingId ? data.find(item => item.id === editingId)?.created_at : new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      let newData;
      if (editingId) {
        // Update existing item
        newData = data.map(item => 
          item.id === editingId ? newItem : item
        );
      } else {
        // Add new item
        newData = [newItem, ...data];
      }

      saveData(newData);
      handleClose();
    } catch (err) {
      setError('Failed to save data');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (id: string) => {
    const item = data.find(item => item.id === id);
    if (item) {
      const formData: Record<string, string> = {};
      fields.forEach(field => {
        formData[field.key] = item[field.key] || '';
      });
      setFormData(formData);
      setEditingId(id);
      setOpen(true);
    }
  };

  // Handle delete
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const newData = data.filter(item => item.id !== id);
      saveData(newData);
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
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id as string)}
          sx={{ color: 'error.main' }}
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
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Data Table */}
      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
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
          }}
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingId ? `Edit ${title.slice(0, -1)}` : `Add New ${title.slice(0, -1)}`}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {fields.map(field => (
              <Grid item xs={12} sm={field.type === 'textarea' ? 12 : 6} key={field.key}>
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
              </Grid>
            ))}
          </Grid>
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
