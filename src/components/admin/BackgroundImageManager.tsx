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
  FormControlLabel,
  Alert,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  VisibilityOff as VisibilityOffIcon,
  Image as ImageIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import {
  getBackgroundImages,
  uploadBackgroundImages,
  addBackgroundImage,
  updateBackgroundImage,
  deleteBackgroundImage,
  toggleBackgroundImageStatus,
} from '../../services/backgroundImageService';

const BackgroundImageManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Dialog states
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Form states
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    displayOrder: 0,
    isActive: true,
  });

  // Load images on mount
  useEffect(() => {
    loadImages();
  }, []);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBackgroundImages(false); // Get all images
      setImages(data);
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
    
    // Validate files
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
      // Create preview URLs
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
      // Upload files to storage
      const uploadResults = await uploadBackgroundImages(selectedFiles);
      
      // Add each image to database
      await Promise.all(
        uploadResults.map((result, index) =>
          addBackgroundImage({
            url: result.url,
            title: formData.title || `Background ${images.length + index + 1}`,
            description: formData.description,
            displayOrder: images.length + index,
            isActive: formData.isActive,
            createdBy: 'admin',
          })
        )
      );

      setSuccess(`Successfully uploaded ${uploadResults.length} image(s)`);
      handleCloseUploadDialog();
      loadImages();
    } catch (err) {
      setError('Failed to upload images: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image) => {
    setSelectedImage(image);
    setFormData({
      title: image.title || '',
      description: image.description || '',
      displayOrder: image.display_order || 0,
      isActive: image.is_active,
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      await updateBackgroundImage(selectedImage.id, {
        title: formData.title,
        description: formData.description,
        display_order: formData.displayOrder,
        is_active: formData.isActive,
      });

      setSuccess('Background image updated successfully');
      handleCloseEditDialog();
      loadImages();
    } catch (err) {
      setError('Failed to update image: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (image) => {
    if (!window.confirm('Are you sure you want to delete this background image?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteBackgroundImage(image.id, image.image_url);
      setSuccess('Background image deleted successfully');
      loadImages();
    } catch (err) {
      setError('Failed to delete image: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (image) => {
    setLoading(true);
    setError(null);

    try {
      await toggleBackgroundImageStatus(image.id, !image.is_active);
      setSuccess(`Image ${!image.is_active ? 'activated' : 'deactivated'} successfully`);
      loadImages();
    } catch (err) {
      setError('Failed to toggle status: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (image) => {
    setSelectedImage(image);
    setViewDialogOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
    setSelectedFiles([]);
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setFormData({ title: '', description: '', displayOrder: 0, isActive: true });
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedImage(null);
    setFormData({ title: '', description: '', displayOrder: 0, isActive: true });
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedImage(null);
  };

  const clearSelectedFiles = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Background Images
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setUploadDialogOpen(true)}
          sx={{ borderRadius: 2 }}
        >
          Upload Images
        </Button>
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

      {/* Image Grid */}
      {loading && images.length === 0 ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {images.map((image: any) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={image.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={image.image_url}
                  alt={image.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" component="div" noWrap>
                      {image.title || 'Untitled'}
                    </Typography>
                    <Chip
                      label={image.is_active ? 'Active' : 'Inactive'}
                      color={image.is_active ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {image.description || 'No description'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    Order: {image.display_order}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title="View">
                    <IconButton size="small" onClick={() => handleView(image)}>
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => handleEdit(image)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={image.is_active ? 'Deactivate' : 'Activate'}>
                    <IconButton size="small" onClick={() => handleToggleStatus(image)}>
                      {image.is_active ? <VisibilityOffIcon /> : <ViewIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => handleDelete(image)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {images.length === 0 && !loading && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ImageIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No background images yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Upload your first background image to get started
          </Typography>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => setUploadDialogOpen(true)}
          >
            Upload Images
          </Button>
        </Paper>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={handleCloseUploadDialog} maxWidth="md" fullWidth>
        <DialogTitle>Upload Background Images</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ mb: 2 }}
              helperText="Optional - Will be auto-generated if empty"
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Active"
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Background Image</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {selectedImage && (
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                />
              </Box>
            )}
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Display Order"
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>View Background Image</span>
            <IconButton onClick={handleCloseViewDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <Box>
              <Box sx={{ mb: 2, textAlign: 'center', bgcolor: 'grey.100', p: 2, borderRadius: 2 }}>
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 8 }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                {selectedImage.title || 'Untitled'}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedImage.description || 'No description'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip label={`Order: ${selectedImage.display_order}`} />
                <Chip
                  label={selectedImage.is_active ? 'Active' : 'Inactive'}
                  color={selectedImage.is_active ? 'success' : 'default'}
                />
                <Chip label={`Created: ${new Date(selectedImage.created_at).toLocaleDateString()}`} />
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BackgroundImageManager;
