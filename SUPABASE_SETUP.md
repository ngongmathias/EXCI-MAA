# Supabase Setup Guide

## Current Issues Fixed

The 400/500 errors you're seeing are due to missing Supabase environment variables. Here's how to fix them:

## 1. Create Environment File

Create a `.env` file in your project root with the following content:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://ehakktwsnovjcwyekwqd.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

## 2. Get Your Supabase Keys

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (ehakktwsnovjcwyekwqd)
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

## 3. Database Schema Verification

The database schema is already correct and matches the admin components:

### Careers Table
- ✅ All fields match between `CareersAdmin.tsx` and database schema
- ✅ Date fields are properly handled
- ✅ CRUD operations will work once environment variables are set

### Comments Table
- ✅ Foreign key constraint to posts table is properly configured
- ✅ When adding comments, ensure the `post_id` is a valid UUID from an existing post

## 4. Features Fixed

### ✅ Careers CRUD Operations
- Create new job postings
- Edit existing job postings
- Delete job postings
- View all careers data in admin table

### ✅ Date Field Handling
- Proper date formatting for database storage
- Correct date display in forms
- Date validation and conversion

### ✅ Error Handling
- Clear error messages for missing configuration
- Supabase connection error handling
- Form validation improvements

### ✅ Admin Interface
- Logout button added to admin layout
- Fixed DataTable pagination overlay issues
- Proper content filtering based on sidebar selection

## 5. Testing the Fix

1. Add your Supabase credentials to `.env`
2. Restart your development server
3. Go to `/admin` and click on "Careers" in the sidebar
4. Try creating, editing, and deleting career entries
5. All CRUD operations should work without errors

## 6. Troubleshooting

If you still see errors:

1. **Check environment variables**: Ensure `.env` file is in the project root
2. **Restart server**: Run `npm run dev` or `yarn dev` again
3. **Check Supabase project**: Ensure your project is active and accessible
4. **Verify database**: Check that tables exist in your Supabase dashboard

The careers page should now work perfectly with full CRUD functionality!
