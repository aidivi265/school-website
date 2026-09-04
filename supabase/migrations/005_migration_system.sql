-- ==============================================================================
-- 005_migration_system.sql
-- Migration & Import System Tables for Decent Public School (Wix -> Supabase)
-- ==============================================================================

-- 1. Migration Batches Table
CREATE TABLE IF NOT EXISTS public.migration_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'faculty', 'notices', 'events', 'gallery_albums', 'gallery_images', 'achievements', 'documents', 'faqs', 'pages', 'settings'
  source_file TEXT NOT NULL,
  records_count INTEGER NOT NULL DEFAULT 0,
  imported_count INTEGER NOT NULL DEFAULT 0,
  updated_count INTEGER NOT NULL DEFAULT 0,
  skipped_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,
  errors JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'completed', -- 'pending', 'processing', 'completed', 'failed', 'rolled_back'
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Media Migrations Table (Wix URL -> Supabase Storage URL Mapping)
CREATE TABLE IF NOT EXISTS public.media_migrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  old_url TEXT NOT NULL,
  new_url TEXT,
  file_name TEXT NOT NULL,
  file_type TEXT,
  file_size TEXT,
  bucket TEXT NOT NULL DEFAULT 'school-assets',
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'uploaded', 'failed', 'skipped'
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Add migration_batch_id column to existing entity tables
ALTER TABLE public.faculty ADD COLUMN IF NOT EXISTS migration_batch_id UUID REFERENCES public.migration_batches(id) ON DELETE SET NULL;
ALTER TABLE public.notices ADD COLUMN IF NOT EXISTS migration_batch_id UUID REFERENCES public.migration_batches(id) ON DELETE SET NULL;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS migration_batch_id UUID REFERENCES public.migration_batches(id) ON DELETE SET NULL;
ALTER TABLE public.gallery_albums ADD COLUMN IF NOT EXISTS migration_batch_id UUID REFERENCES public.migration_batches(id) ON DELETE SET NULL;
ALTER TABLE public.gallery_images ADD COLUMN IF NOT EXISTS migration_batch_id UUID REFERENCES public.migration_batches(id) ON DELETE SET NULL;
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS migration_batch_id UUID REFERENCES public.migration_batches(id) ON DELETE SET NULL;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS migration_batch_id UUID REFERENCES public.migration_batches(id) ON DELETE SET NULL;
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS migration_batch_id UUID REFERENCES public.migration_batches(id) ON DELETE SET NULL;

-- 4. Enable RLS
ALTER TABLE public.migration_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_migrations ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies (Admins full access, public read-only if needed)
CREATE POLICY "Admins have full access to migration_batches"
  ON public.migration_batches FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to media_migrations"
  ON public.media_migrations FOR ALL
  USING (auth.role() = 'authenticated');
