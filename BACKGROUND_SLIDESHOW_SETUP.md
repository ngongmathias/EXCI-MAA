# Background Slideshow System - Setup Guide

## 🎯 Overview
Complete background slideshow system with admin management capabilities. Includes:
- 10-second auto-rotating slideshow on homepage
- Admin panel for full CRUD operations
- Supabase storage and database integration
- Public access for viewing, admin control for management

## 📋 Files Created/Modified

### New Files Created:
1. **`database/background_images_setup.sql`** - Complete SQL schema
2. **`src/services/backgroundImageService.ts`** - Service layer with all CRUD operations
3. **`src/components/admin/BackgroundImageManager.tsx`** - Admin UI component
4. **`src/components/common/BackgroundSlideshow.tsx`** - Homepage slideshow component

### Modified Files:
1. **`src/components/pages/home/Hero.tsx`** - Integrated slideshow component
2. **`src/components/admin/Sidebar.tsx`** - Added "Background Images" menu item
3. **`src/pages/AdminPage.tsx`** - Added BackgroundImageManager routing

## 🚀 Setup Instructions

### Step 1: Database Setup
1. Open your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire content from `database/background_images_setup.sql`
4. Click **Run** to execute the SQL script

**What this creates:**
- ✅ Storage bucket: `background-images` (10MB limit per file)
- ✅ Table: `background_images` with columns for metadata
- ✅ RLS policies for public CRUD access
- ✅ Storage policies for public read/write/update/delete
- ✅ Auto-update triggers for timestamps
- ✅ View for active backgrounds (`active_background_images`)

### Step 2: Verify Database Setup
Run these verification queries in Supabase SQL Editor:

```sql
-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'background-images';

-- Check if table exists
SELECT * FROM information_schema.tables WHERE table_name = 'background_images';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'background_images';

-- View all background images
SELECT * FROM public.background_images ORDER BY display_order;
```

### Step 3: Test the System
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the admin panel: `http://localhost:5173/admin`

3. Click on **"Background Images"** in the sidebar

4. Upload some test images:
   - Click **"Upload New Image"**
   - Select one or multiple images (max 10MB each)
   - Add title and description (optional)
   - Set display order
   - Click **Upload**

5. View the slideshow on the homepage: `http://localhost:5173/`

## 🎨 Features

### Admin Panel Features:
- ✅ **Upload** - Multiple image upload with preview
- ✅ **View** - Full-size image preview with metadata
- ✅ **Edit** - Update title, description, order, active status
- ✅ **Delete** - Remove images from both database and storage
- ✅ **Toggle Active/Inactive** - Control which images appear in slideshow
- ✅ **Reorder** - Change display order of images

### Homepage Slideshow Features:
- ✅ **Auto-rotation** - 10-second intervals between slides
- ✅ **Smooth transitions** - Fade effect with framer-motion
- ✅ **Manual navigation** - Left/right arrow buttons
- ✅ **Progress indicators** - Dots showing current slide
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Fallback gradient** - Shows default gradient if no images
- ✅ **Overlay** - Dark overlay for better text readability

## 🔧 Configuration

### Change Slideshow Duration:
In `src/components/common/BackgroundSlideshow.tsx`, modify the `duration` prop:
```tsx
<BackgroundSlideshow duration={15000}> {/* 15 seconds */}
```

### Change Image Size Limit:
In `database/background_images_setup.sql`, modify the bucket configuration:
```sql
file_size_limit, 10485760, -- 10MB (change this value)
```

### Customize Transitions:
In `src/components/common/BackgroundSlideshow.tsx`, modify the motion config:
```tsx
<motion.div
  transition={{ duration: 2.0, ease: 'easeInOut' }} // Slower transition
>
```

## 📊 Database Schema

### Table: `background_images`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `image_url` | TEXT | Full URL to image in storage |
| `title` | VARCHAR(255) | Image title |
| `description` | TEXT | Image description |
| `display_order` | INTEGER | Order in slideshow (lower = first) |
| `is_active` | BOOLEAN | Whether image is shown in slideshow |
| `created_by` | VARCHAR(255) | User who uploaded the image |
| `created_at` | TIMESTAMP | Upload timestamp |
| `updated_at` | TIMESTAMP | Last modification timestamp |

### Storage Bucket: `background-images`
- **Public**: Yes (anyone can view)
- **Max File Size**: 10MB
- **Allowed Types**: JPEG, JPG, PNG, WebP, GIF

## 🔐 Security & Access

### Row Level Security (RLS):
- ✅ **Public READ** - Anyone can view active images
- ✅ **Public INSERT** - Anyone can upload (for admin workflow)
- ✅ **Public UPDATE** - Anyone can edit (for admin workflow)
- ✅ **Public DELETE** - Anyone can delete (for admin workflow)

> **Note**: The "public" policies are designed for your admin panel which runs client-side. In production, you may want to restrict INSERT/UPDATE/DELETE to authenticated admin users only.

### To Restrict to Authenticated Users Only:
Replace the public policies in the SQL file with:

```sql
-- Only authenticated users can insert
CREATE POLICY "Authenticated insert access to background images"
  ON public.background_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated update access to background images"
  ON public.background_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated delete access to background images"
  ON public.background_images
  FOR DELETE
  TO authenticated
  USING (true);
```

## 🐛 Troubleshooting

### Images not showing in slideshow:
1. Check if images are marked as `is_active = true`
2. Verify images uploaded successfully to storage
3. Check browser console for errors
4. Verify RLS policies are correctly set

### Upload failing:
1. Check file size (must be < 10MB)
2. Check file type (must be image/jpeg, png, webp, gif)
3. Verify storage bucket exists
4. Check storage policies

### Slideshow not rotating:
1. Check if you have at least 2 active images
2. Verify `duration` prop is set correctly
3. Check browser console for errors
4. Ensure `getBackgroundImages(true)` is returning data

## 📝 API Reference

### `backgroundImageService.ts` Functions:

```typescript
// Upload multiple images to storage
await uploadBackgroundImages(files: File[]): Promise<string[]>

// Add image record to database
await addBackgroundImage(imageData: BackgroundImageData): Promise<any>

// Get all or only active images
await getBackgroundImages(activeOnly?: boolean): Promise<BackgroundImage[]>

// Update image metadata
await updateBackgroundImage(id: string, updates: Partial<BackgroundImage>): Promise<void>

// Delete image from database and storage
await deleteBackgroundImage(id: string, imageUrl: string): Promise<void>

// Toggle active/inactive status
await toggleBackgroundImageStatus(id: string, isActive: boolean): Promise<void>

// Reorder images
await reorderBackgroundImages(orderedIds: string[]): Promise<void>

// Get single image by ID
await getBackgroundImageById(id: string): Promise<BackgroundImage | null>
```

## 🎯 Next Steps

### Optional Enhancements:
1. **Add image captions** - Display title/description overlay on slideshow
2. **Ken Burns effect** - Add zoom/pan animations to images
3. **Lazy loading** - Preload next image for smoother transitions
4. **Drag & drop reorder** - Visual reordering in admin panel
5. **Image cropping** - Built-in crop tool before upload
6. **Scheduled display** - Show different images at different times
7. **Analytics** - Track which images are most viewed
8. **Categories** - Different slideshows for different pages

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify SQL script executed successfully
3. Check Supabase logs in dashboard
4. Ensure all files are properly imported

---

**✅ Setup Complete!** Your background slideshow system is ready to use. Upload images through the admin panel and watch them rotate on your homepage every 10 seconds.
