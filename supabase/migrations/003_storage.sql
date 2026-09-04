-- ==============================================================================
-- 003_storage.sql
-- Storage Buckets & Policies for School Media & Documents
-- ==============================================================================

-- Create Storage Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('school-assets', 'school-assets', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('faculty', 'faculty', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('gallery', 'gallery', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('events', 'events', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('notices', 'notices', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
  ('documents', 'documents', true, 20971520, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;

-- Public Read Policies
CREATE POLICY "Public Read School Assets" ON storage.objects
  FOR SELECT USING (bucket_id IN ('school-assets', 'faculty', 'gallery', 'events', 'notices', 'documents'));

-- Authenticated Admin Upload Policies
CREATE POLICY "Admin Upload School Assets" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated'
    AND bucket_id IN ('school-assets', 'faculty', 'gallery', 'events', 'notices', 'documents')
  );

CREATE POLICY "Admin Update School Assets" ON storage.objects
  FOR UPDATE USING (
    auth.role() = 'authenticated'
    AND bucket_id IN ('school-assets', 'faculty', 'gallery', 'events', 'notices', 'documents')
  );

CREATE POLICY "Admin Delete School Assets" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated'
    AND bucket_id IN ('school-assets', 'faculty', 'gallery', 'events', 'notices', 'documents')
  );
