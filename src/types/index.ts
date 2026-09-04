export type School = {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  tagline: string;
  hero_headline?: string;
  hero_subtext?: string;
  established: string;
  affiliation: string;
  affiliation_no: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  full_address: string;
  phone_office: string;
  phone_admissions: string;
  email_general: string;
  email_admissions: string;
  timings_school: string;
  timings_office: string;
  map_embed?: string;
  logo_url?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_youtube?: string;
  created_at?: string;
  updated_at?: string;
};

export type Notice = {
  id: string;
  school_id?: string;
  title: string;
  slug?: string;
  description: string;
  content?: string;
  category: 'Admissions' | 'Examination' | 'Holiday' | 'Achievement' | 'Event' | 'Circular' | 'General' | 'Urgent';
  date: string;
  image_url?: string;
  document_url?: string;
  is_pinned?: boolean;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type EventItem = {
  id: string;
  school_id?: string;
  title: string;
  slug?: string;
  description: string;
  event_date: string;
  end_date?: string | null;
  time?: string;
  venue?: string;
  category: 'Sports' | 'Celebration' | 'Academic' | 'Cultural' | 'Workshop' | 'Competition';
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  cover_image_url?: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type FacultyMember = {
  id: string;
  school_id?: string;
  name: string;
  designation: string;
  department: string;
  subject?: string;
  qualification: string;
  experience_years: string;
  photo_url: string;
  bio?: string;
  message?: string;
  sort_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Facility = {
  id: string;
  school_id?: string;
  title: string;
  icon: string;
  image_url: string;
  description: string;
  features: string[];
  sort_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type GalleryAlbum = {
  id: string;
  school_id?: string;
  title: string;
  slug?: string;
  description?: string;
  category?: 'all' | 'campus' | 'classrooms' | 'events' | 'sports' | 'activities' | 'celebrations' | string;
  cover_image_url: string;
  date?: string;
  event_date?: string;
  photo_count?: number;
  sort_order?: number;
  is_published?: boolean;
  images?: GalleryImage[];
  created_at?: string;
  updated_at?: string;
};

export type GalleryImage = {
  id: string;
  album_id?: string;
  school_id?: string;
  title?: string;
  image_url: string;
  thumb_url?: string;
  caption?: string;
  category?: string;
  sort_order?: number;
  created_at?: string;
};

export type Achievement = {
  id: string;
  school_id?: string;
  title: string;
  description: string;
  category: 'academic' | 'sports' | 'cultural' | 'awards';
  year: string;
  icon: string;
  is_highlight?: boolean;
  image_url?: string;
  sort_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type DocumentItem = {
  id: string;
  school_id?: string;
  title: string;
  description?: string;
  category: 'Admission Forms' | 'Circulars' | 'Academic Documents' | 'School Policies' | 'Syllabus & Curriculum' | 'Important Forms';
  file_url: string;
  file_size?: string;
  file_type?: string;
  upload_date?: string;
  sort_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type AdmissionEnquiry = {
  id: string;
  school_id?: string;
  parent_name: string;
  student_name: string;
  class_applying: string;
  phone: string;
  email?: string;
  date_of_birth?: string;
  address?: string;
  message?: string;
  status: 'Pending' | 'Contacted' | 'Under Review' | 'Admitted' | 'Rejected';
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
};

export type ContactMessage = {
  id: string;
  school_id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
};

export type FAQItem = {
  id: string;
  school_id?: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Academics' | 'Transport & Facilities' | 'Timings & Schedule' | 'Fees & Payments' | 'General';
  keywords?: string[];
  sort_order?: number;
  display_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type PageContent = {
  id: string;
  school_id?: string;
  page_slug: string;
  section_key: string;
  title?: string;
  subtitle?: string;
  content?: string;
  metadata?: Record<string, unknown>;
  updated_at?: string;
};

export type UserProfile = {
  id: string;
  school_id?: string;
  email: string;
  full_name?: string;
  role: 'super_admin' | 'admin' | 'editor';
  created_at?: string;
  updated_at?: string;
};
