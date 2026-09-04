-- ==============================================================================
-- 002_rls_policies.sql
-- Row Level Security (RLS) Policies for Multi-Tenant School System
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current auth user is a member of the given school_id
CREATE OR REPLACE FUNCTION is_school_admin(target_school_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND (
      profiles.role = 'super_admin'
      OR (profiles.school_id = target_school_id AND profiles.role IN ('school_admin', 'editor'))
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. SCHOOLS
CREATE POLICY "Public can view school details" ON schools
  FOR SELECT USING (true);

CREATE POLICY "Admins can update their school" ON schools
  FOR UPDATE USING (is_school_admin(id)) WITH CHECK (is_school_admin(id));

-- 2. PROFILES
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Super admins can manage all profiles" ON profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin')
  );

-- 3. PAGES
CREATE POLICY "Public can view published pages" ON pages
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage school pages" ON pages
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 4. FACULTY
CREATE POLICY "Public can view published faculty" ON faculty
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage faculty" ON faculty
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 5. NOTICES
CREATE POLICY "Public can view published notices" ON notices
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage notices" ON notices
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 6. EVENTS
CREATE POLICY "Public can view published events" ON events
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage events" ON events
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 7. GALLERY ALBUMS
CREATE POLICY "Public can view published albums" ON gallery_albums
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage gallery albums" ON gallery_albums
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 8. GALLERY IMAGES
CREATE POLICY "Public can view gallery images" ON gallery_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM gallery_albums
      WHERE gallery_albums.id = gallery_images.album_id
      AND gallery_albums.published = true
    ) OR album_id IS NULL
  );

CREATE POLICY "Admins can manage gallery images" ON gallery_images
  FOR ALL USING (
    is_school_admin(school_id)
    OR EXISTS (
      SELECT 1 FROM gallery_albums
      WHERE gallery_albums.id = gallery_images.album_id
      AND is_school_admin(gallery_albums.school_id)
    )
  );

-- 9. ACHIEVEMENTS
CREATE POLICY "Public can view published achievements" ON achievements
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage achievements" ON achievements
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 10. DOCUMENTS
CREATE POLICY "Public can view published documents" ON documents
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage documents" ON documents
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 11. ADMISSION ENQUIRIES
CREATE POLICY "Public can submit admission enquiries" ON admission_enquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view and manage enquiries" ON admission_enquiries
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 12. FAQS
CREATE POLICY "Public can view published faqs" ON faqs
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage faqs" ON faqs
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 13. SITE SETTINGS
CREATE POLICY "Public can view site settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage site settings" ON site_settings
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 14. FACILITIES
CREATE POLICY "Public can view published facilities" ON facilities
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage facilities" ON facilities
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));

-- 15. CONTACT MESSAGES
CREATE POLICY "Public can submit contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact messages" ON contact_messages
  FOR ALL USING (is_school_admin(school_id)) WITH CHECK (is_school_admin(school_id));
