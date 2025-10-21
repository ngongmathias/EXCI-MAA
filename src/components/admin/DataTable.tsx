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
  Tabs,
  Tab,
  IconButton,
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
  Image as ImageIcon,
  CloudUpload as UploadIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import ImageUploadManager from './ImageUploadManager';
import { uploadMultipleImages, addEventImages, addPostImages } from '../../services/imageUpload';

interface DataTableProps {
  title: string;
  fields: Array<{
    key: string;
    label: string;
    type?: 'text' | 'email' | 'number' | 'date' | 'textarea' | 'url' | 'tel';
    required?: boolean;
  }>;
  storageKey: string; // localStorage key OR Supabase table name
  initialData?: any[];
  useSupabase?: boolean;
  supportsImageUpload?: boolean; // New prop to enable image upload
}

import { insertItem, updateItemById, deleteById } from '../../services/supabaseCrud';
import { useSupabaseTable } from '../../hooks/useSupabaseTable';

const DataTable: React.FC<DataTableProps> = ({ 
  title, 
  fields, 
  storageKey, 
  initialData = [],
  useSupabase = false,
  supportsImageUpload = false,
}) => {
  const [data, setData] = useState<any[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0); // 0 = Details, 1 = Images
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

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

  // Validate form data
  const validateForm = (): string | null => {
    // Check required fields
    const missingFields = fields
      .filter(field => field.required && !formData[field.key])
      .map(field => field.label);

    if (missingFields.length > 0) {
      return `Please fill in: ${missingFields.join(', ')}`;
    }

    // Validate email fields
    const emailFields = fields.filter(field => field.type === 'email');
    for (const field of emailFields) {
      const value = formData[field.key];
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return `Please enter a valid email address for ${field.label}`;
      }
    }

    // Validate URL fields
    const urlFields = fields.filter(field => field.type === 'url');
    for (const field of urlFields) {
      const value = formData[field.key];
      if (value && !/^https?:\/\/.+/.test(value)) {
        return `Please enter a valid URL for ${field.label} (must start with http:// or https://)`;
      }
    }

    // Validate number fields
    const numberFields = fields.filter(field => field.type === 'number');
    for (const field of numberFields) {
      const value = formData[field.key];
      if (value && isNaN(Number(value))) {
        return `Please enter a valid number for ${field.label}`;
      }
    }

    return null;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Validate form
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        setLoading(false);
        return;
      }

      // Process form data for date fields
      const processedData: Record<string, any> = { ...formData };
      fields.forEach(field => {
        if (field.type === 'date' && processedData[field.key]) {
          // Convert date string to ISO format for database
          const date = new Date(processedData[field.key]);
          if (!isNaN(date.getTime())) {
            processedData[field.key] = date.toISOString().split('T')[0]; // YYYY-MM-DD format
          }
        }
        // Convert number fields to proper numbers
        if (field.type === 'number' && processedData[field.key]) {
          processedData[field.key] = Number(processedData[field.key]);
        }
      });

      let savedItemId = editingId;

      if (useSupabase) {
        if (editingId) {
          await updateItemById<any>(storageKey as any, editingId, processedData);
        } else {
          const newItem = await insertItem<any>(storageKey as any, processedData);
          savedItemId = newItem.id;
        }

        // Upload images if any were selected and this is an event or post
        if (supportsImageUpload && selectedFiles.length > 0 && savedItemId) {
          try {
            const bucketName = storageKey === 'events' ? 'event-images' : 'post-images';
            const uploadResults = await uploadMultipleImages(selectedFiles, bucketName, savedItemId);
            
            const images = uploadResults.map((result, index) => ({
              url: result.url,
              displayOrder: index,
              isPrimary: index === 0
            }));

            if (storageKey === 'events') {
              await addEventImages(savedItemId, images);
            } else if (storageKey === 'posts') {
              await addPostImages(savedItemId, images);
            }
          } catch (imgErr) {
            console.error('Image upload error:', imgErr);
            setError('Item saved but image upload failed. You can add images later by editing the item.');
          }
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
    // Cleanup preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    
    setOpen(false);
    setEditingId(null);
    setFormData({});
    setError(null);
    setActiveTab(0); // Reset to first tab
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  // Handle add new
  const handleAdd = () => {
    setFormData({});
    setEditingId(null);
    setActiveTab(0); // Start with details tab
    setSelectedFiles([]);
    setPreviewUrls([]);
    setOpen(true);
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    
    // Validate files
    const validFiles = fileArray.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError('Please select only image files');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      // Create preview URLs
      const urls = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
      setError(null);
    }
  };

  // Clear selected files
  const clearSelectedFiles = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  // Remove individual file
  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedFiles(files => files.filter((_, i) => i !== index));
    setPreviewUrls(urls => urls.filter((_, i) => i !== index));
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
          {/* Tabs for Details and Images (only show for editing) */}
          {supportsImageUpload && editingId && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                <Tab label="Details" />
                <Tab label="Manage Images" icon={<ImageIcon />} iconPosition="start" />
              </Tabs>
            </Box>
          )}

          {/* Details Tab */}
          {(!supportsImageUpload || !editingId || activeTab === 0) && (
            <Box>
              {/* Form Fields */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, mt: 1 }}>
                {fields.map(field => (
                  <Box key={field.key}>
                    <TextField
                      fullWidth
                      label={field.label}
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                      type={field.type === 'number' ? 'number' : 
                            field.type === 'email' ? 'email' : 
                            field.type === 'url' ? 'url' : 
                            field.type === 'tel' ? 'tel' : 
                            field.type === 'date' ? 'date' : 'text'}
                      multiline={field.type === 'textarea'}
                      rows={field.type === 'textarea' ? 3 : 1}
                      required={field.required}
                      variant="outlined"
                      inputProps={{
                        min: field.type === 'number' ? 0 : undefined,
                        step: field.type === 'number' ? '0.01' : undefined,
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Image Upload Section (only for create mode with events/posts) */}
              {supportsImageUpload && !editingId && (
                <Box sx={{ mt: 3, p: 2, border: '2px dashed', borderColor: 'divider', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ImageIcon /> Upload Images (Optional)
                  </Typography>
                  
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="file-upload-input"
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="file-upload-input">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<UploadIcon />}
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      Select Images (Max 5MB each)
                    </Button>
                  </label>

                  {/* Preview Selected Files */}
                  {previewUrls.length > 0 && (
                    <Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {previewUrls.map((url, index) => (
                          <Box
                            key={index}
                            sx={{
                              position: 'relative',
                              width: 100,
                              height: 100,
                              borderRadius: 1,
                              overflow: 'hidden',
                              border: '1px solid',
                              borderColor: 'divider',
                            }}
                          >
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => removeFile(index)}
                              sx={{
                                position: 'absolute',
                                top: 2,
                                right: 2,
                                bgcolor: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                                padding: '4px',
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                            {index === 0 && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  bgcolor: 'primary.main',
                                  color: 'white',
                                  fontSize: '10px',
                                  textAlign: 'center',
                                  py: 0.5,
                                }}
                              >
                                Primary
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {selectedFiles.length} image(s) selected. First image will be set as primary.
                      </Typography>
                      <Button
                        size="small"
                        onClick={clearSelectedFiles}
                        sx={{ ml: 2 }}
                      >
                        Clear All
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}

          {/* Images Tab (only for editing) */}
          {supportsImageUpload && editingId && activeTab === 1 && (
            <ImageUploadManager
              entityId={editingId}
              entityType={storageKey === 'events' ? 'event' : 'post'}
              onImagesChange={() => supa?.refresh()}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          {activeTab === 0 && (
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              disabled={loading}
              sx={{ borderRadius: 2 }}
            >
              {loading ? 'Saving...' : (editingId ? 'Update' : 'Create')}
            </Button>
          )}
          {activeTab === 1 && (
            <Button 
              onClick={handleClose} 
              variant="contained" 
              sx={{ borderRadius: 2 }}
            >
              Done
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataTable;
