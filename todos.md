# Activities Log

- [x] Add 'Insights' link to header navigation
- [x] Implement tabbed Insights page with Events and Blog
- [x] Enhance EventsSection: upcoming/past filters, RSVP, calendar links
- [x] Enhance BlogSection: images, likes, and comments
- [x] Build Admin dashboard layout with sidebar and sections
- [x] Implement Admin CRUD UIs for Services, Events, Posts, Comments (local storage stubs)
- [x] Redirect Clerk SignUp/SignIn to /admin and relax admin gate
- [ ] Integrate Supabase for Events, Posts, Comments, Services
- [ ] Replace local storage with Supabase CRUD and RLS

## Next
- Provide Supabase SQL tables and open policies (below)

## Supabase SQL (PostgreSQL)

```sql
-- SCHEMA
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(12,2),
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  image_url text,
  created_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  content text,
  created_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  user_identifier text,
  created_at timestamptz not null default now()
);

create table if not exists public.event_attendees (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company text not null,
  country_slug text not null,
  service_id text not null,
  message text,
  created_at timestamptz not null default now()
);

-- ENABLE RLS
alter table public.services enable row level security;
alter table public.events enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.event_attendees enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.consultation_requests enable row level security;

-- OPEN POLICIES (universal CRUD). Consider tightening for production.
create policy "services read" on public.services for select using (true);
create policy "services insert" on public.services for insert with check (true);
create policy "services update" on public.services for update using (true);
create policy "services delete" on public.services for delete using (true);

create policy "events read" on public.events for select using (true);
create policy "events insert" on public.events for insert with check (true);
create policy "events update" on public.events for update using (true);
create policy "events delete" on public.events for delete using (true);

create policy "posts read" on public.posts for select using (true);
create policy "posts insert" on public.posts for insert with check (true);
create policy "posts update" on public.posts for update using (true);
create policy "posts delete" on public.posts for delete using (true);

create policy "comments read" on public.comments for select using (true);
create policy "comments insert" on public.comments for insert with check (true);
create policy "comments update" on public.comments for update using (true);
create policy "comments delete" on public.comments for delete using (true);

create policy "likes read" on public.likes for select using (true);
create policy "likes insert" on public.likes for insert with check (true);
create policy "likes update" on public.likes for update using (true);
create policy "likes delete" on public.likes for delete using (true);
create policy "event_attendees read" on public.event_attendees for select using (true);
create policy "event_attendees insert" on public.event_attendees for insert with check (true);
create policy "event_attendees update" on public.event_attendees for update using (true);
create policy "event_attendees delete" on public.event_attendees for delete using (true);

create policy "contact_submissions read" on public.contact_submissions for select using (true);
create policy "contact_submissions insert" on public.contact_submissions for insert with check (true);
create policy "contact_submissions update" on public.contact_submissions for update using (true);
create policy "contact_submissions delete" on public.contact_submissions for delete using (true);

create policy "consultation_requests read" on public.consultation_requests for select using (true);
create policy "consultation_requests insert" on public.consultation_requests for insert with check (true);
create policy "consultation_requests update" on public.consultation_requests for update using (true);
create policy "consultation_requests delete" on public.consultation_requests for delete using (true);
```

### Notes
- Universal CRUD is for development. Restrict policies later to Clerk users if needed.
- With Clerk + Supabase, you can pass Clerk JWT to Supabase client; above policies allow anonymous too.


