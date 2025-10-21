import { supabase } from '../lib/supabaseClient';

export type ImageUploadResult = {
  id: string;
  url: string;
  path: string;
};

export type ImageRecord = {
  id: string;
  image_url: string;
  caption?: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
  updated_at?: string;
};

export type EventImage = ImageRecord & {
  event_id: string;
};

export type PostImage = ImageRecord & {
  post_id: string;
};

/**
 * Upload a single image to Supabase storage
 * @param file - The file to upload
 * @param bucketName - The storage bucket name ('event-images' or 'post-images')
 * @param folder - Optional folder path within the bucket
 * @returns Promise with the uploaded image URL and path
 */
export async function uploadImage(
  file: File,
  bucketName: 'event-images' | 'post-images',
  folder?: string
): Promise<ImageUploadResult> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload file to storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return {
      id: data.id || '',
      url: publicUrl,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Upload multiple images at once
 * @param files - Array of files to upload
 * @param bucketName - The storage bucket name
 * @param folder - Optional folder path within the bucket
 * @returns Promise with array of uploaded image results
 */
export async function uploadMultipleImages(
  files: File[],
  bucketName: 'event-images' | 'post-images',
  folder?: string
): Promise<ImageUploadResult[]> {
  const uploadPromises = files.map(file => uploadImage(file, bucketName, folder));
  return Promise.all(uploadPromises);
}

/**
 * Delete an image from storage
 * @param path - The file path in storage
 * @param bucketName - The storage bucket name
 */
export async function deleteImage(
  path: string,
  bucketName: 'event-images' | 'post-images'
): Promise<void> {
  const { error } = await supabase.storage
    .from(bucketName)
    .remove([path]);

  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
}

/**
 * Add image records to event_images table
 * @param eventId - The event ID
 * @param images - Array of image URLs with optional metadata
 * @returns Promise with array of created image records
 */
export async function addEventImages(
  eventId: string,
  images: Array<{
    url: string;
    caption?: string;
    displayOrder?: number;
    isPrimary?: boolean;
  }>
): Promise<EventImage[]> {
  const imageRecords = images.map((img, index) => ({
    event_id: eventId,
    image_url: img.url,
    caption: img.caption || null,
    display_order: img.displayOrder ?? index,
    is_primary: img.isPrimary ?? (index === 0)
  }));

  const { data, error } = await supabase
    .from('event_images')
    .insert(imageRecords)
    .select();

  if (error) {
    throw new Error(`Failed to add event images: ${error.message}`);
  }

  return data as EventImage[];
}

/**
 * Add image records to post_images table
 * @param postId - The post ID
 * @param images - Array of image URLs with optional metadata
 * @returns Promise with array of created image records
 */
export async function addPostImages(
  postId: string,
  images: Array<{
    url: string;
    caption?: string;
    displayOrder?: number;
    isPrimary?: boolean;
  }>
): Promise<PostImage[]> {
  const imageRecords = images.map((img, index) => ({
    post_id: postId,
    image_url: img.url,
    caption: img.caption || null,
    display_order: img.displayOrder ?? index,
    is_primary: img.isPrimary ?? (index === 0)
  }));

  const { data, error } = await supabase
    .from('post_images')
    .insert(imageRecords)
    .select();

  if (error) {
    throw new Error(`Failed to add post images: ${error.message}`);
  }

  return data as PostImage[];
}

/**
 * Get all images for an event
 * @param eventId - The event ID
 * @returns Promise with array of event images
 */
export async function getEventImages(eventId: string): Promise<EventImage[]> {
  const { data, error } = await supabase
    .from('event_images')
    .select('*')
    .eq('event_id', eventId)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch event images: ${error.message}`);
  }

  return data as EventImage[];
}

/**
 * Get all images for a post
 * @param postId - The post ID
 * @returns Promise with array of post images
 */
export async function getPostImages(postId: string): Promise<PostImage[]> {
  const { data, error } = await supabase
    .from('post_images')
    .select('*')
    .eq('post_id', postId)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch post images: ${error.message}`);
  }

  return data as PostImage[];
}

/**
 * Update image metadata (caption, display order, primary status)
 * @param imageId - The image record ID
 * @param table - The table name ('event_images' or 'post_images')
 * @param updates - Object with fields to update
 */
export async function updateImageMetadata(
  imageId: string,
  table: 'event_images' | 'post_images',
  updates: {
    caption?: string;
    displayOrder?: number;
    isPrimary?: boolean;
  }
): Promise<void> {
  const updateData: any = {};
  
  if (updates.caption !== undefined) updateData.caption = updates.caption;
  if (updates.displayOrder !== undefined) updateData.display_order = updates.displayOrder;
  if (updates.isPrimary !== undefined) updateData.is_primary = updates.isPrimary;

  const { error } = await supabase
    .from(table)
    .update(updateData)
    .eq('id', imageId);

  if (error) {
    throw new Error(`Failed to update image metadata: ${error.message}`);
  }
}

/**
 * Delete an image record and optionally its file from storage
 * @param imageId - The image record ID
 * @param table - The table name ('event_images' or 'post_images')
 * @param deleteFromStorage - Whether to also delete the file from storage
 */
export async function deleteImageRecord(
  imageId: string,
  table: 'event_images' | 'post_images',
  deleteFromStorage: boolean = true
): Promise<void> {
  // Get image URL first if we need to delete from storage
  if (deleteFromStorage) {
    const { data: imageData } = await supabase
      .from(table)
      .select('image_url')
      .eq('id', imageId)
      .single();

    if (imageData?.image_url) {
      // Extract path from URL
      const url = new URL(imageData.image_url);
      const pathParts = url.pathname.split('/');
      const bucketName = table === 'event_images' ? 'event-images' : 'post-images';
      const filePath = pathParts.slice(pathParts.indexOf(bucketName) + 1).join('/');
      
      try {
        await deleteImage(filePath, bucketName);
      } catch (error) {
        console.warn('Failed to delete image from storage:', error);
      }
    }
  }

  // Delete database record
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', imageId);

  if (error) {
    throw new Error(`Failed to delete image record: ${error.message}`);
  }
}

/**
 * Set an image as primary for an event or post
 * @param imageId - The image record ID
 * @param table - The table name ('event_images' or 'post_images')
 */
export async function setPrimaryImage(
  imageId: string,
  table: 'event_images' | 'post_images'
): Promise<void> {
  await updateImageMetadata(imageId, table, { isPrimary: true });
}

/**
 * Reorder images by updating display_order
 * @param imageIds - Array of image IDs in desired order
 * @param table - The table name ('event_images' or 'post_images')
 */
export async function reorderImages(
  imageIds: string[],
  table: 'event_images' | 'post_images'
): Promise<void> {
  const updates = imageIds.map((id, index) => 
    supabase
      .from(table)
      .update({ display_order: index })
      .eq('id', id)
  );

  await Promise.all(updates);
}
