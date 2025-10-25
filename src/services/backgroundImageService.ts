import { supabase } from '../lib/supabaseClient';

const BUCKET_NAME = 'background-images';

/**
 * Upload multiple background images to Supabase Storage
 * @param {File[]} files - Array of image files to upload
 * @returns {Promise<Array>} Array of upload results with URLs
 */
export async function uploadBackgroundImages(files) {
  const uploadPromises = files.map(async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return {
      path: data.path,
      url: urlData.publicUrl,
      fileName: file.name
    };
  });

  return Promise.all(uploadPromises);
}

/**
 * Add background image record to database
 * @param {Object} imageData - Image data to insert
 * @returns {Promise<Object>} Inserted record
 */
export async function addBackgroundImage(imageData) {
  const { data, error } = await supabase
    .from('background_images')
    .insert([{
      image_url: imageData.url,
      title: imageData.title || 'Background Image',
      description: imageData.description || '',
      link_url: imageData.linkUrl || null,
      display_order: imageData.displayOrder || 0,
      is_active: imageData.isActive !== undefined ? imageData.isActive : true,
      created_by: imageData.createdBy || 'admin'
    }])
    .select()
    .single();

  if (error) {
    console.error('Database insert error:', error);
    throw error;
  }

  return data;
}

/**
 * Get all background images
 * @param {Boolean} activeOnly - If true, only return active images
 * @returns {Promise<Array>} Array of background images
 */
export async function getBackgroundImages(activeOnly = false) {
  let query = supabase
    .from('background_images')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (activeOnly) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Fetch error:', error);
    throw error;
  }

  return data || [];
}

/**
 * Update background image
 * @param {String} id - Image ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated record
 */
export async function updateBackgroundImage(id, updates) {
  const { data, error } = await supabase
    .from('background_images')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Update error:', error);
    throw error;
  }

  return data;
}

/**
 * Delete background image (from database and storage)
 * @param {String} id - Image ID
 * @param {String} imageUrl - Image URL to extract path
 * @returns {Promise<Boolean>} Success status
 */
export async function deleteBackgroundImage(id, imageUrl) {
  // Delete from database first
  const { error: dbError } = await supabase
    .from('background_images')
    .delete()
    .eq('id', id);

  if (dbError) {
    console.error('Database delete error:', dbError);
    throw dbError;
  }

  // Extract file path from URL and delete from storage
  try {
    const urlParts = imageUrl.split(`${BUCKET_NAME}/`);
    if (urlParts.length > 1) {
      const filePath = urlParts[1].split('?')[0]; // Remove query params
      
      const { error: storageError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (storageError) {
        console.warn('Storage delete warning:', storageError);
        // Don't throw - database record is already deleted
      }
    }
  } catch (err) {
    console.warn('Could not delete from storage:', err);
  }

  return true;
}

/**
 * Toggle background image active status
 * @param {String} id - Image ID
 * @param {Boolean} isActive - New active status
 * @returns {Promise<Object>} Updated record
 */
export async function toggleBackgroundImageStatus(id, isActive) {
  return updateBackgroundImage(id, { is_active: isActive });
}

/**
 * Reorder background images
 * @param {Array} orderedIds - Array of image IDs in new order
 * @returns {Promise<Array>} Updated records
 */
export async function reorderBackgroundImages(orderedIds) {
  const updatePromises = orderedIds.map((id, index) => 
    updateBackgroundImage(id, { display_order: index })
  );

  return Promise.all(updatePromises);
}

/**
 * Get background image by ID
 * @param {String} id - Image ID
 * @returns {Promise<Object>} Background image
 */
export async function getBackgroundImageById(id) {
  const { data, error } = await supabase
    .from('background_images')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Fetch error:', error);
    throw error;
  }

  return data;
}
