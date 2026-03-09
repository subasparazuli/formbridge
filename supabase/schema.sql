-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table public.profiles (
    id uuid primary key, -- references auth.users(id) if using Supabase Auth
    subscription_status text not null default 'free',
    lemon_squeezy_customer_id text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Create forms table
create table public.forms (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid not null, -- references auth.users(id) if using Supabase Auth
    name text not null,
    notify_email text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create submissions table
create table public.submissions (
    id uuid default uuid_generate_v4() primary key,
    form_id uuid not null references public.forms(id) on delete cascade,
    data jsonb not null default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) setup

-- Forms RLS
alter table public.forms enable row level security;

create policy "Users can view their own forms" 
    on public.forms for select 
    using (auth.uid() = user_id);

create policy "Users can insert their own forms" 
    on public.forms for insert 
    with check (auth.uid() = user_id);

create policy "Users can update their own forms" 
    on public.forms for update 
    using (auth.uid() = user_id);

create policy "Users can delete their own forms" 
    on public.forms for delete 
    using (auth.uid() = user_id);

-- Profiles RLS
alter table public.profiles enable row level security;

create policy "Users can view their own profile" 
    on public.profiles for select 
    using (auth.uid() = id);

-- Submissions RLS
alter table public.submissions enable row level security;

-- Anyone can insert a submission (used by the external API)
-- In a real production setup with service roles, you might handle this via a securely authenticated API route bypassing RLS,
-- or you can allow anonymous inserts if the client directly connects (not recommended for headless forms).
-- Since our Next.js API route will use the Service Role Key to insert, it will bypass RLS anyway.
-- So we only need to restrict reading to the form owner.

create policy "Users can view submissions for their forms" 
    on public.submissions for select 
    using (
        exists (
            select 1 from public.forms
            where public.forms.id = public.submissions.form_id
            and public.forms.user_id = auth.uid()
        )
    );
