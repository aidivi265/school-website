import { createServerSupabaseClient } from './server';
import {
  mockSchool,
  mockNotices,
  mockEvents,
  mockFaculty,
  mockFacilities,
  mockGalleryAlbums,
  mockGalleryImages,
  mockAchievements,
  mockDocuments,
  mockFAQs,
} from '../data/mockData';
import {
  School,
  Notice,
  EventItem,
  FacultyMember,
  Facility,
  GalleryAlbum,
  GalleryImage,
  Achievement,
  DocumentItem,
  AdmissionEnquiry,
  ContactMessage,
  FAQItem,
} from '@/types';

const DEFAULT_SCHOOL_SLUG = process.env.NEXT_PUBLIC_DEFAULT_SCHOOL_SLUG || 'decent-public-school';

// ==============================================================================
// PUBLIC GETTERS (WITH FALLBACK)
// ==============================================================================

export async function getSchoolData(slug = DEFAULT_SCHOOL_SLUG): Promise<School> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockSchool;

  try {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return mockSchool;
    return data as School;
  } catch {
    return mockSchool;
  }
}

export async function getNotices(limit?: number): Promise<Notice[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return limit ? mockNotices.slice(0, limit) : mockNotices;
  }

  try {
    let query = supabase
      .from('notices')
      .select('*')
      .eq('is_published', true)
      .order('is_pinned', { ascending: false })
      .order('date', { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return limit ? mockNotices.slice(0, limit) : mockNotices;
    }
    return data as Notice[];
  } catch {
    return limit ? mockNotices.slice(0, limit) : mockNotices;
  }
}

export async function getNoticeBySlug(slug: string): Promise<Notice | null> {
  const notices = await getNotices();
  return notices.find((n) => n.slug === slug || n.id === slug) || null;
}

export async function getEvents(status?: 'upcoming' | 'past' | 'all'): Promise<EventItem[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    if (!status || status === 'all') return mockEvents;
    return mockEvents.filter((e) => e.status === status);
  }

  try {
    let query = supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .order('event_date', { ascending: status === 'past' ? false : true });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (!status || status === 'all') return mockEvents;
      return mockEvents.filter((e) => e.status === status);
    }
    return data as EventItem[];
  } catch {
    if (!status || status === 'all') return mockEvents;
    return mockEvents.filter((e) => e.status === status);
  }
}

export async function getFaculty(): Promise<FacultyMember[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockFaculty;

  try {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return mockFaculty;
    return data as FacultyMember[];
  } catch {
    return mockFaculty;
  }
}

export async function getFacilities(): Promise<Facility[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockFacilities;

  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return mockFacilities;
    return data as Facility[];
  } catch {
    return mockFacilities;
  }
}

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockGalleryAlbums;

  try {
    const { data, error } = await supabase
      .from('gallery_albums')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return mockGalleryAlbums;
    return data as GalleryAlbum[];
  } catch {
    return mockGalleryAlbums;
  }
}

export async function getGalleryImages(category = 'all'): Promise<GalleryImage[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    if (category === 'all') return mockGalleryImages;
    return mockGalleryImages.filter((img) => img.category === category);
  }

  try {
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order', { ascending: true });

    if (category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (category === 'all') return mockGalleryImages;
      return mockGalleryImages.filter((img) => img.category === category);
    }
    return data as GalleryImage[];
  } catch {
    if (category === 'all') return mockGalleryImages;
    return mockGalleryImages.filter((img) => img.category === category);
  }
}

export async function getAchievements(category = 'all'): Promise<Achievement[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    if (category === 'all') return mockAchievements;
    return mockAchievements.filter((a) => a.category === category);
  }

  try {
    let query = supabase
      .from('achievements')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (category === 'all') return mockAchievements;
      return mockAchievements.filter((a) => a.category === category);
    }
    return data as Achievement[];
  } catch {
    if (category === 'all') return mockAchievements;
    return mockAchievements.filter((a) => a.category === category);
  }
}

export async function getDocuments(category = 'all'): Promise<DocumentItem[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    if (category === 'all') return mockDocuments;
    return mockDocuments.filter((d) => d.category === category);
  }

  try {
    let query = supabase
      .from('documents')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (category === 'all') return mockDocuments;
      return mockDocuments.filter((d) => d.category === category);
    }
    return data as DocumentItem[];
  } catch {
    if (category === 'all') return mockDocuments;
    return mockDocuments.filter((d) => d.category === category);
  }
}

export async function getFAQs(category = 'all'): Promise<FAQItem[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    if (category === 'all') return mockFAQs;
    return mockFAQs.filter((f) => f.category === category);
  }

  try {
    let query = supabase
      .from('faqs')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (category === 'all') return mockFAQs;
      return mockFAQs.filter((f) => f.category === category);
    }
    return data as FAQItem[];
  } catch {
    if (category === 'all') return mockFAQs;
    return mockFAQs.filter((f) => f.category === category);
  }
}

// ==============================================================================
// PUBLIC FORM SUBMISSIONS
// ==============================================================================

export async function submitAdmissionEnquiry(enquiry: Omit<AdmissionEnquiry, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<{ success: boolean; message: string; id?: string }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    // Graceful offline mock confirmation
    return {
      success: true,
      message: 'Admission enquiry received successfully! Our admissions counselor will contact you within 24–48 hours.',
      id: 'demo-' + Date.now(),
    };
  }

  try {
    const { data, error } = await supabase
      .from('admission_enquiries')
      .insert([
        {
          ...enquiry,
          school_id: enquiry.school_id || 'a1000000-0000-0000-0000-000000000001',
          status: 'Pending',
        },
      ])
      .select()
      .single();

    if (error) {
      return { success: false, message: error.message };
    }

    return {
      success: true,
      message: 'Admission enquiry submitted successfully! Reference ID: ' + (data?.id || 'OK'),
      id: data?.id,
    };
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : 'Failed to submit enquiry' };
  }
}

export async function submitContactMessage(msg: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>): Promise<{ success: boolean; message: string }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      success: true,
      message: 'Thank you for reaching out! Your message has been sent to the school administrative desk.',
    };
  }

  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          ...msg,
          school_id: msg.school_id || 'a1000000-0000-0000-0000-000000000001',
          is_read: false,
        },
      ]);

    if (error) return { success: false, message: error.message };
    return { success: true, message: 'Message sent successfully!' };
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : 'Failed to send message' };
  }
}
