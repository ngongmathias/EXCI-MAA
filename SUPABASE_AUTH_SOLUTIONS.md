# Supabase Authentication Solutions

## 🔍 Problem Identified

Your app uses **Clerk** for authentication, but **Supabase** doesn't recognize Clerk sessions, causing 400 errors.

## 🛠️ Solution Options

### Option 1: Disable RLS (Quick Fix)
If you want to allow public access to careers data:

```sql
-- Run this in your Supabase SQL Editor
ALTER TABLE public.careers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests DISABLE ROW LEVEL SECURITY;
```

### Option 2: Configure RLS for Public Access
Allow public read access but restrict writes:

```sql
-- Run this in your Supabase SQL Editor
CREATE POLICY "Allow public read access" ON public.careers
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.services
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.events
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.posts
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.comments
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.contact_submissions
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.consultation_requests
    FOR SELECT USING (true);
```

### Option 3: Integrate Clerk with Supabase (Recommended)
Configure Supabase to work with Clerk authentication.

## 🚀 Implementation Steps

### Step 1: Create .env file
```env
VITE_SUPABASE_URL=https://ehakktwsnovjcwyekwqd.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
```

### Step 2: Choose your preferred solution above

### Step 3: Test the fix
1. Restart your development server
2. Go to `/admin` → Careers
3. Check browser console for errors
4. Try CRUD operations

## 🔧 Additional Debugging

### Check Supabase Logs
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Logs** → **API Logs**
4. Look for 400 errors and their details

### Test API Directly
```bash
# Test with curl (replace with your actual anon key)
curl -H "apikey: YOUR_ANON_KEY" \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     "https://ehakktwsnovjcwyekwqd.supabase.co/rest/v1/careers?select=*"
```

### Check RLS Status
```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

## 🎯 Recommended Approach

**Start with Option 1** (Disable RLS) for immediate fix, then implement Option 3 for production security.
