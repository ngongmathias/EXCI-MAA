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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Chip,
  Avatar,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Add as AddIcon,
  FileDownload as DownloadIcon,
} from '@mui/icons-material';
import {
  getBackgroundImages,
  uploadBackgroundImages,
  addBackgroundImage,
  updateBackgroundImage,
  deleteBackgroundImage,
  toggleBackgroundImageStatus,
} from '../../services/backgroundImageService';
import { exportToExcel, excelFormatters } from '../../utils/excelExport';

interface BackgroundImage {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const BackgroundImageManager = () => {
  const [images, setImages] = useState<BackgroundImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Dialog states
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    description: '',
  });

  // Inline edit states
  const [editValues, setEditValues] = useState<{[key: string]: {title: string, description: string}}>({});

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBackgroundImages(false);
      setImages(data);
      
      // Initialize edit values
      const initialEditValues: {[key: string]: {title: string, description: string}} = {};
      data.forEach((img: BackgroundImage) => {
        initialEditValues[img.id] = {
          title: img.title || '',
          description: img.description || ''
        };
      });
      setEditValues(initialEditValues);
    } catch (err) {
      setError('Failed to load background images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    
    const validFiles = fileArray.filter((file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('Please select only image files');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      const urls = validFiles.map((file: File) => URL.createObjectURL(file));
      setPreviewUrls(urls);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const uploadResults = await uploadBackgroundImages(selectedFiles);
      
      await Promise.all(
        uploadResults.map((result, index) =>
          addBackgroundImage({
            url: result.url,
            title: uploadFormData.title || `Background ${images.length + index + 1}`,
            description: uploadFormData.description,
            displayOrder: images.length + index,
            isActive: true,
            createdBy: 'admin',
          })
        )
      );

      setSuccess(`Successfully uploaded ${uploadResults.length} image(s)`);
      handleCloseUploadDialog();
      loadImages();
    } catch (err: any) {
      setError('Failed to upload images: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (imageId: string) => {
    setEditingId(imageId);
  };

  const handleSaveEdit = async (image: BackgroundImage) => {
    setLoading(true);
    setError(null);

    try {
      await updateBackgroundImage(image.id, {
        title: editValues[image.id]?.title || '',
        description: editValues[image.id]?.description || '',
      });

      setSuccess('Background image updated successfully');
      setEditingId(null);
      loadImages();
    } catch (err: any) {
      setError('Failed to update image: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (image) {
      setEditValues({
        ...editValues,
        [imageId]: {
          title: image.title || '',
          description: image.description || ''
        }
      });
    }
    setEditingId(null);
  };

  const handleDelete = async (image: BackgroundImage) => {
    if (!window.confirm('Are you sure you want to delete this background image?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteBackgroundImage(image.id, image.image_url);
      setSuccess('Background image deleted successfully');
      loadImages();
    } catch (err: any) {
      setError('Failed to delete image: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (image: BackgroundImage) => {
    setLoading(true);
    setError(null);

    try {
      await toggleBackgroundImageStatus(image.id, !image.is_active);
      setSuccess(`Image ${!image.is_active ? 'activated' : 'deactivated'} successfully`);
      loadImages();
    } catch (err: any) {
      setError('Failed to toggle status: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveUp = async (image: BackgroundImage, index: number) => {
    if (index === 0) return;
    
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    
    setImages(newImages);
    
    try {
      await updateBackgroundImage(image.id, { display_order: index - 1 });
      await updateBackgroundImage(newImages[index].id, { display_order: index });
      setSuccess('Order updated successfully');
    } catch (err: any) {
      setError('Failed to reorder: ' + err.message);
      loadImages();
    }
  };

  const handleMoveDown = async (image: BackgroundImage, index: number) => {
    if (index === images.length - 1) return;
    
    const newImages = [...images];
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    
    setImages(newImages);
    
    try {
      await updateBackgroundImage(image.id, { display_order: index + 1 });
      await updateBackgroundImage(newImages[index].id, { display_order: index });
      setSuccess('Order updated successfully');
    } catch (err: any) {
      setError('Failed to reorder: ' + err.message);
      loadImages();
    }
  };

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
    setSelectedFiles([]);
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setUploadFormData({ title: '', description: '' });
  };

  const clearSelectedFiles = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  // Handle Excel export
  const handleExcelExport = () => {
    if (!images || images.length === 0) {
      setError('No background images available to export');
      return;
    }

    const columns = [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description' },
      { key: 'image_url', label: 'Image URL' },
      { key: 'display_order', label: 'Display Order' },
      { key: 'is_active', label: 'Active', transform: excelFormatters.boolean },
      { key: 'created_at', label: 'Created At', transform: excelFormatters.dateTime },
      { key: 'updated_at', label: 'Updated At', transform: excelFormatters.dateTime }
    ];

    try {
      exportToExcel({
        data: images,
        filename: 'background_images_export',
        sheetName: 'Background Images',
        columns
      });
    } catch (error) {
      console.error('Export failed:', error);
      setError('Failed to export Excel file');
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Slideshow Images ({images.length})
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExcelExport}
              sx={{ borderRadius: 2 }}
              color="success"
              disabled={!images || images.length === 0}
            >
              Export Excel
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setUploadDialogOpen(true)}
              sx={{ borderRadius: 2 }}
            >
              Upload New Image
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sort Order</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No background images yet. Upload your first image to get started.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              images.map((image, index) => (
                <TableRow key={image.id} hover>
                  <TableCell>
                    <Avatar
                      src={image.image_url}
                      variant="rounded"
                      sx={{ width: 60, height: 60, cursor: 'pointer' }}
                      onClick={() => window.open(image.image_url, '_blank')}
                    />
                  </TableCell>
                  <TableCell>
                    {editingId === image.id ? (
                      <Box>
                        <TextField
                          size="small"
                          fullWidth
                          value={editValues[image.id]?.title || ''}
                          onChange={(e) => setEditValues({
                            ...editValues,
                            [image.id]: { ...editValues[image.id], title: e.target.value }
                          })}
                          sx={{ mb: 1 }}
                          placeholder="Title"
                        />
                        <TextField
                          size="small"
                          fullWidth
                          value={editValues[image.id]?.description || ''}
                          onChange={(e) => setEditValues({
                            ...editValues,
                            [image.id]: { ...editValues[image.id], description: e.target.value }
                          })}
                          placeholder="Description"
                        />
                      </Box>
                    ) : (
                      <Box>
                        <Typography variant="body2" fontWeight="500">
                          {image.title || 'N/A'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {image.description || 'N/A'}
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Switch
                        checked={image.is_active}
                        onChange={() => handleToggleStatus(image)}
                        size="small"
                      />
                      <Chip
                        label={image.is_active ? 'Active' : 'Inactive'}
                        color={image.is_active ? 'success' : 'default'}
                        size="small"
                        icon={<Box component="span" sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: image.is_active ? 'success.main' : 'grey.400',
                          ml: 1
                        }} />}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleMoveUp(image, index)}
                        disabled={index === 0}
                      >
                        <ArrowUpIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'center' }}>
                        {image.display_order}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleMoveDown(image, index)}
                        disabled={index === images.length - 1}
                      >
                        <ArrowDownIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(image.created_at).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {editingId === image.id ? (
                        <>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleSaveEdit(image)}
                            sx={{ bgcolor: 'primary.50' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleCancelEdit(image.id)}
                          >
                            <Box component="span" sx={{ fontSize: 18 }}>✕</Box>
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => handleStartEdit(image.id)}
                            sx={{ bgcolor: 'grey.50' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(image)}
                            sx={{ bgcolor: 'error.50' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={handleCloseUploadDialog} maxWidth="md" fullWidth>
        <DialogTitle>Upload Background Images</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title (Optional)"
              value={uploadFormData.title}
              onChange={(e) => setUploadFormData({ ...uploadFormData, title: e.target.value })}
              sx={{ mb: 2 }}
              helperText="Will be auto-generated if empty"
            />
            <TextField
              fullWidth
              label="Description (Optional)"
              value={uploadFormData.description}
              onChange={(e) => setUploadFormData({ ...uploadFormData, description: e.target.value })}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />

            <Box sx={{ p: 2, border: '2px dashed', borderColor: 'divider', borderRadius: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="background-upload-input"
                type="file"
                multiple
                onChange={handleFileSelect}
              />
              <label htmlFor="background-upload-input">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadIcon />}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Select Images (Max 10MB each)
                </Button>
              </label>

              {previewUrls.length > 0 && (
                <Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {previewUrls.map((url, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: 'relative',
                          width: 120,
                          height: 120,
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
                      </Box>
                    ))}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {selectedFiles.length} image(s) selected
                  </Typography>
                  <Button size="small" onClick={clearSelectedFiles} sx={{ ml: 2 }}>
                    Clear All
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadDialog}>Cancel</Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={loading || selectedFiles.length === 0}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BackgroundImageManager;
