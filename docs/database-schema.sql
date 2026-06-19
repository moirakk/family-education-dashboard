-- Family Education Dashboard database schema
-- Designed for Supabase PostgreSQL with row-level security.

create extension if not exists "pgcrypto";

create type family_role as enum ('owner', 'parent', 'caregiver', 'viewer');
create type event_category as enum ('school', 'tutoring', 'activity', 'exam', 'family');
create type roadmap_status as enum ('planned', 'in_progress', 'achieved', 'at_risk');
create type resource_kind as enum ('file', 'note', 'link', 'worksheet', 'book', 'video');

create table public.families (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  timezone text not null default 'Asia/Tokyo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.family_members (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role family_role not null default 'parent',
  created_at timestamptz not null default now(),
  unique (family_id, user_id)
);

create table public.children (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  first_name text not null,
  last_name text,
  birthdate date,
  grade text,
  school_name text,
  school_program text,
  avatar_color text not null default '#2563eb',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  title text not null,
  category event_category not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  description text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.calendar_event_children (
  event_id uuid not null references public.calendar_events(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  primary key (event_id, child_id)
);

create table public.learning_records (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  subject text not null,
  title text not null,
  record_date date not null default current_date,
  duration_minutes integer,
  score numeric(5,2),
  confidence integer check (confidence between 1 and 5),
  notes text,
  created_at timestamptz not null default now()
);

create table public.monthly_reports (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  month date not null,
  summary text not null,
  strengths text[],
  focus_areas text[],
  attendance_rate numeric(5,2),
  average_score numeric(5,2),
  created_at timestamptz not null default now(),
  unique (child_id, month)
);

create table public.education_goals (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  title text not null,
  description text,
  subject text,
  target_date date,
  status roadmap_status not null default 'planned',
  progress integer not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references public.education_goals(id) on delete cascade,
  title text not null,
  due_date date,
  completed_at timestamptz,
  sort_order integer not null default 0
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid references public.children(id) on delete set null,
  kind resource_kind not null,
  title text not null,
  description text,
  url text,
  storage_path text,
  subject text,
  tags text[] not null default '{}',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index children_family_id_idx on public.children(family_id);
create index calendar_events_family_starts_idx on public.calendar_events(family_id, starts_at);
create index learning_records_child_date_idx on public.learning_records(child_id, record_date desc);
create index education_goals_child_status_idx on public.education_goals(child_id, status);
create index resources_family_child_idx on public.resources(family_id, child_id);

alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.children enable row level security;
alter table public.calendar_events enable row level security;
alter table public.calendar_event_children enable row level security;
alter table public.learning_records enable row level security;
alter table public.monthly_reports enable row level security;
alter table public.education_goals enable row level security;
alter table public.milestones enable row level security;
alter table public.resources enable row level security;

create or replace function public.is_family_member(target_family_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.family_members
    where family_id = target_family_id
      and user_id = auth.uid()
  );
$$;

create policy "families are visible to members"
on public.families for select
using (public.is_family_member(id));

create policy "family members are visible to members"
on public.family_members for select
using (public.is_family_member(family_id));

create policy "children are visible to family members"
on public.children for all
using (public.is_family_member(family_id))
with check (public.is_family_member(family_id));

create policy "events are visible to family members"
on public.calendar_events for all
using (public.is_family_member(family_id))
with check (public.is_family_member(family_id));

create policy "event child links follow event access"
on public.calendar_event_children for all
using (
  exists (
    select 1
    from public.calendar_events e
    where e.id = event_id
      and public.is_family_member(e.family_id)
  )
)
with check (
  exists (
    select 1
    from public.calendar_events e
    where e.id = event_id
      and public.is_family_member(e.family_id)
  )
);

create policy "learning records are visible to family members"
on public.learning_records for all
using (public.is_family_member(family_id))
with check (public.is_family_member(family_id));

create policy "monthly reports are visible to family members"
on public.monthly_reports for all
using (public.is_family_member(family_id))
with check (public.is_family_member(family_id));

create policy "goals are visible to family members"
on public.education_goals for all
using (public.is_family_member(family_id))
with check (public.is_family_member(family_id));

create policy "milestones follow goal access"
on public.milestones for all
using (
  exists (
    select 1
    from public.education_goals g
    where g.id = goal_id
      and public.is_family_member(g.family_id)
  )
)
with check (
  exists (
    select 1
    from public.education_goals g
    where g.id = goal_id
      and public.is_family_member(g.family_id)
  )
);

create policy "resources are visible to family members"
on public.resources for all
using (public.is_family_member(family_id))
with check (public.is_family_member(family_id));
