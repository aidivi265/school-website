-- ==============================================================================
-- DECENT PUBLIC SCHOOL (ROHINI, DELHI) - COMPLETE SUPABASE POSTGRESQL SCHEMA
-- Multi-School Ready Architecture with Row Level Security (RLS) and Storage Setup
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SCHOOLS TABLE
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100) NOT NULL,
    tagline TEXT,
    hero_headline TEXT,
    hero_subtext TEXT,
    established VARCHAR(10),
    affiliation VARCHAR(50) DEFAULT 'CBSE',
    affiliation_no VARCHAR(50),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100) DEFAULT 'Rohini, Delhi',
    state VARCHAR(100) DEFAULT 'Delhi',
    pin VARCHAR(20) DEFAULT '110085',
    country VARCHAR(100) DEFAULT 'India',
    full_address TEXT,
    phone_office VARCHAR(50),
    phone_admissions VARCHAR(50),
    email_general VARCHAR(150),
    email_admissions VARCHAR(150),
    timings_school VARCHAR(100),
    timings_office VARCHAR(100),
    map_embed TEXT,
    logo_url TEXT,
    social_facebook TEXT,
    social_instagram TEXT,
    social_twitter TEXT,
    social_youtube TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. NOTICES & NEWS
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350),
    description TEXT,
    content TEXT,
    category VARCHAR(50) DEFAULT 'General' CHECK (category IN ('Admissions', 'Examination', 'Holiday', 'Achievement', 'Event', 'Circular', 'General', 'Urgent')),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    image_url TEXT,
    document_url TEXT,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EVENTS
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350),
    description TEXT,
    event_date DATE NOT NULL,
    end_date DATE,
    time VARCHAR(100),
    venue VARCHAR(200) DEFAULT 'School Campus',
    category VARCHAR(50) DEFAULT 'Academic' CHECK (category IN ('Sports', 'Celebration', 'Academic', 'Cultural', 'Workshop', 'Competition')),
    status VARCHAR(30) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'past', 'cancelled')),
    cover_image_url TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FACULTY MEMBERS
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    designation VARCHAR(150) NOT NULL,
    department VARCHAR(100) DEFAULT 'General',
    subject VARCHAR(100),
    qualification VARCHAR(200),
    experience_years VARCHAR(50),
    photo_url TEXT,
    bio TEXT,
    message TEXT,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. FACILITIES & INFRASTRUCTURE
CREATE TABLE IF NOT EXISTS public.facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    icon VARCHAR(50) DEFAULT 'building',
    image_url TEXT,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. GALLERY ALBUMS
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    title VARCHAR(250) NOT NULL,
    slug VARCHAR(300),
    description TEXT,
    category VARCHAR(50) DEFAULT 'campus' CHECK (category IN ('all', 'campus', 'classrooms', 'events', 'sports', 'activities', 'celebrations')),
    cover_image_url TEXT,
    date DATE DEFAULT CURRENT_DATE,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. GALLERY IMAGES
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id UUID REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    title VARCHAR(250),
    image_url TEXT NOT NULL,
    thumb_url TEXT,
    caption TEXT,
    category VARCHAR(50) DEFAULT 'campus',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'academic' CHECK (category IN ('academic', 'sports', 'cultural', 'awards')),
    year VARCHAR(50) DEFAULT '2024–25',
    icon VARCHAR(50) DEFAULT 'award',
    is_highlight BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. DOWNLOADABLE DOCUMENTS & CIRCULARS
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'Circulars' CHECK (category IN ('Admission Forms', 'Circulars', 'Academic Documents', 'School Policies', 'Syllabus & Curriculum', 'Important Forms')),
    file_url TEXT NOT NULL,
    file_size VARCHAR(50),
    file_type VARCHAR(50) DEFAULT 'PDF',
    upload_date DATE DEFAULT CURRENT_DATE,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ADMISSION ENQUIRIES
CREATE TABLE IF NOT EXISTS public.admission_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    parent_name VARCHAR(150) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    class_applying VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    date_of_birth DATE,
    address TEXT,
    message TEXT,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Contacted', 'Under Review', 'Admitted', 'Rejected')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(250),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. PREDEFINED FAQS FOR ASSISTANT & FAQ PAGE
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General' CHECK (category IN ('Admissions', 'Academics', 'Transport & Facilities', 'Timings & Schedule', 'Fees & Payments', 'General')),
    keywords TEXT[] DEFAULT '{}',
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. PAGE CONTENTS (CMS For About, Mission, Vision, Messages, etc.)
CREATE TABLE IF NOT EXISTS public.page_contents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    page_slug VARCHAR(100) NOT NULL,
    section_key VARCHAR(100) NOT NULL,
    title VARCHAR(300),
    subtitle TEXT,
    content TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(school_id, page_slug, section_key)
);

-- 15. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    key VARCHAR(100) NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(school_id, key)
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_notices_school_date ON public.notices (school_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_events_school_date ON public.events (school_id, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_faculty_school_order ON public.faculty (school_id, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_gallery_images_album ON public.gallery_images (album_id);
CREATE INDEX IF NOT EXISTS idx_documents_school_cat ON public.documents (school_id, category);
CREATE INDEX IF NOT EXISTS idx_faqs_school_published ON public.faqs (school_id, is_published);
CREATE INDEX IF NOT EXISTS idx_enquiries_school_status ON public.admission_enquiries (school_id, status);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public READ policies for published public data
CREATE POLICY "Public can view schools" ON public.schools FOR SELECT USING (true);
CREATE POLICY "Public can view published notices" ON public.notices FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published events" ON public.events FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published faculty" ON public.faculty FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published facilities" ON public.facilities FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published gallery albums" ON public.gallery_albums FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view gallery images" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Public can view published achievements" ON public.achievements FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published documents" ON public.documents FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published faqs" ON public.faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view page contents" ON public.page_contents FOR SELECT USING (true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);

-- Public INSERT policies for enquiry and contact forms
CREATE POLICY "Public can insert admission enquiries" ON public.admission_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Authenticated Admin FULL ACCESS policies
CREATE POLICY "Admins full access on schools" ON public.schools FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on profiles" ON public.profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on notices" ON public.notices FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on events" ON public.events FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on faculty" ON public.faculty FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on facilities" ON public.facilities FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on gallery albums" ON public.gallery_albums FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on gallery images" ON public.gallery_images FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on achievements" ON public.achievements FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on documents" ON public.documents FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on admission enquiries" ON public.admission_enquiries FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on contact messages" ON public.contact_messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on faqs" ON public.faqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on page contents" ON public.page_contents FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on site settings" ON public.site_settings FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- STORAGE BUCKETS CONFIGURATION (Supabase Storage)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('school-media', 'school-media', true),
       ('school-documents', 'school-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Access to school-media" ON storage.objects FOR SELECT USING (bucket_id = 'school-media');
CREATE POLICY "Public Access to school-documents" ON storage.objects FOR SELECT USING (bucket_id = 'school-documents');

CREATE POLICY "Authenticated users can upload school-media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'school-media');
CREATE POLICY "Authenticated users can update school-media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'school-media');
CREATE POLICY "Authenticated users can delete school-media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'school-media');

CREATE POLICY "Authenticated users can upload school-documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'school-documents');
CREATE POLICY "Authenticated users can update school-documents" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'school-documents');
CREATE POLICY "Authenticated users can delete school-documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'school-documents');
