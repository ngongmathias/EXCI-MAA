import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardActions,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import {
  uploadMultipleImages,
  addEventImages,
  addPostImages,
  getEventImages,
  getPostImages,
  deleteImageRecord,
  setPrimaryImage,
} from '../../services/imageUpload';
import { EventImage, PostImage } from '../../lib/types';

interface ImageUploadManagerProps {
  entityId: string;
  entityType: 'event' | 'post';
  onImagesChange?: () => void;
}

const ImageUploadManager: React.FC<ImageUploadManagerProps> = ({
  entityId,
  entityType,
  onImagesChange,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<(EventImage | PostImage)[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Load existing images
  React.useEffect(() => {
    if (entityId) {
      loadExistingImages();
    }
  }, [entityId, entityType]);

  const loadExistingImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const images = entityType === 'event'
        ? await getEventImages(entityId)
        : await getPostImages(entityId);
      setExistingImages(images);
    } catch (err) {
      console.error('Error loading images:', err);
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

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

    setSelectedFiles(validFiles);

    // Create preview URLs
    const urls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setError(null);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select files to upload');
      return;
    }

    if (!entityId) {
      setError('Cannot upload images without an entity ID');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Upload files to storage
      const bucketName = entityType === 'event' ? 'event-images' : 'post-images';
      const uploadResults = await uploadMultipleImages(selectedFiles, bucketName, entityId);

      // Add image records to database
      const images = uploadResults.map((result, index) => ({
        url: result.url,
        displayOrder: existingImages.length + index,
        isPrimary: existingImages.length === 0 && index === 0, // First image is primary if no existing images
      }));

      if (entityType === 'event') {
        await addEventImages(entityId, images);
      } else {
        await addPostImages(entityId, images);
      }

      // Cleanup
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setSelectedFiles([]);
      setPreviewUrls([]);
      
      // Reload images
      await loadExistingImages();
      onImagesChange?.();
      
      setError(null);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      setLoading(true);
      const tableName = entityType === 'event' ? 'event_images' : 'post_images';
      await deleteImageRecord(imageId, tableName, true);
      await loadExistingImages();
      onImagesChange?.();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete image');
    } finally {
      setLoading(false);
    }
  };

  const handleSetPrimary = async (imageId: string) => {
    try {
      setLoading(true);
      const tableName = entityType === 'event' ? 'event_images' : 'post_images';
      await setPrimaryImage(imageId, tableName);
      await loadExistingImages();
      onImagesChange?.();
    } catch (err) {
      console.error('Set primary error:', err);
      setError('Failed to set primary image');
    } finally {
      setLoading(false);
    }
  };

  const clearSelection = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    setError(null);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Image Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Upload Section */}
      <Box sx={{ mb: 4, p: 3, border: '2px dashed', borderColor: 'divider', borderRadius: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload-input"
          type="file"
          multiple
          onChange={handleFileSelect}
        />
        <label htmlFor="image-upload-input">
          <Button
            variant="outlined"
            component="span"
            startIcon={<UploadIcon />}
            disabled={uploading || loading}
            fullWidth
            sx={{ mb: 2 }}
          >
            Select Images (Max 5MB each)
          </Button>
        </label>

        {/* Preview Selected Files */}
        {previewUrls.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
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
                  {index === 0 && (
                    <Chip
                      label="Primary"
                      size="small"
                      color="primary"
                      sx={{ position: 'absolute', top: 4, right: 4 }}
                    />
                  )}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={uploading || !entityId}
                startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
                fullWidth
              >
                {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Image(s)`}
              </Button>
              <Button variant="outlined" onClick={clearSelection} disabled={uploading}>
                Clear
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Existing Images */}
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        Existing Images ({existingImages.length})
      </Typography>

      {loading && existingImages.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : existingImages.length === 0 ? (
        <Alert severity="info">No images uploaded yet. Upload some images to get started.</Alert>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
          {existingImages.map((image) => (
            <Card key={image.id} sx={{ position: 'relative' }}>
              {image.is_primary && (
                <Chip
                  label="Primary"
                  size="small"
                  color="primary"
                  icon={<StarIcon />}
                  sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                />
              )}
              <CardMedia
                component="img"
                height="180"
                image={image.image_url}
                alt={image.caption || 'Image'}
                sx={{ objectFit: 'cover' }}
              />
              <CardActions sx={{ justifyContent: 'space-between', px: 1 }}>
                <Tooltip title={image.is_primary ? 'Already primary' : 'Set as primary'}>
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => handleSetPrimary(image.id)}
                      disabled={image.is_primary || loading}
                      color="primary"
                    >
                      {image.is_primary ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Delete image">
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteImage(image.id)}
                    disabled={loading}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ImageUploadManager;
