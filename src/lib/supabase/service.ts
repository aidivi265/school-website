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
const DEFAULT_SCHOOL_ID = 'a1000000-0000-0000-0000-000000000001';

// ==============================================================================
// PUBLIC GETTERS (WITH SUPABASE + RESILIENT OFFLINE FALLBACK)
// ==============================================================================

export async function getSchool(slug = DEFAULT_SCHOOL_SLUG): Promise<School> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockSchool;

  try {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return mockSchool;

    // Load site_settings overrides if present
    const { data: settings } = await supabase
      .from('site_settings')
      .select('setting_key, setting_value')
      .eq('school_id', data.id);

    const merged = { ...data };
    if (settings && settings.length > 0) {
      settings.forEach((s) => {
        if (s.setting_key in merged) {
          (merged as Record<string, unknown>)[s.setting_key] = s.setting_value;
        }
      });
    }

    return merged as School;
  } catch {
    return mockSchool;
  }
}

export const getSchoolData = getSchool;

export async function getSiteSettings(schoolId = DEFAULT_SCHOOL_ID): Promise<Record<string, string>> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return {};

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('setting_key, setting_value')
      .eq('school_id', schoolId);

    if (error || !data) return {};

    const map: Record<string, string> = {};
    data.forEach((item) => {
      map[item.setting_key] = item.setting_value;
    });
    return map;
  } catch {
    return {};
  }
}

export async function getPublishedFaculty(schoolId?: string): Promise<FacultyMember[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockFaculty;

  try {
    let query = supabase
      .from('faculty')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (schoolId) query = query.eq('school_id', schoolId);

    const { data, error } = await query;
    if (error || !data || data.length === 0) return mockFaculty;
    return data as FacultyMember[];
  } catch {
    return mockFaculty;
  }
}

export const getFaculty = getPublishedFaculty;

export async function getPublishedNotices(limit?: number, category?: string): Promise<Notice[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    let result = mockNotices;
    if (category && category !== 'All') {
      result = result.filter((n) => n.category === category);
    }
    return limit ? result.slice(0, limit) : result;
  }

  try {
    let query = supabase
      .from('notices')
      .select('*')
      .eq('published', true)
      .order('is_pinned', { ascending: false })
      .order('date', { ascending: false });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      let result = mockNotices;
      if (category && category !== 'All') {
        result = result.filter((n) => n.category === category);
      }
      return limit ? result.slice(0, limit) : result;
    }
    return data as Notice[];
  } catch {
    let result = mockNotices;
    if (category && category !== 'All') {
      result = result.filter((n) => n.category === category);
    }
    return limit ? result.slice(0, limit) : result;
  }
}

export const getNotices = getPublishedNotices;

export async function getNoticeBySlug(slug: string): Promise<Notice | null> {
  const notices = await getPublishedNotices();
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
      .eq('published', true)
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

export async function getUpcomingEvents(limit = 4): Promise<EventItem[]> {
  const events = await getEvents('upcoming');
  return events.slice(0, limit);
}

export async function getPastEvents(): Promise<EventItem[]> {
  return getEvents('past');
}

export async function getFacilities(): Promise<Facility[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockFacilities;

  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

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
      .eq('published', true)
      .order('event_date', { ascending: false });

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
      .order('display_order', { ascending: true });

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
      .eq('published', true)
      .order('display_order', { ascending: true });

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
      .eq('published', true)
      .order('created_at', { ascending: false });

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
      .eq('published', true)
      .order('display_order', { ascending: true });

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
// PUBLIC FORM MUTATIONS
// ==============================================================================

export async function createAdmissionEnquiry(
  enquiry: {
    parent_name: string;
    student_name: string;
    class_applying: string;
    phone: string;
    email?: string;
    date_of_birth?: string;
    address?: string;
    message?: string;
    school_id?: string;
  }
): Promise<{ success: boolean; message: string; id?: string }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
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
          school_id: enquiry.school_id || DEFAULT_SCHOOL_ID,
          parent_name: enquiry.parent_name,
          student_name: enquiry.student_name,
          class: enquiry.class_applying,
          phone: enquiry.phone,
          email: enquiry.email || null,
          date_of_birth: enquiry.date_of_birth || null,
          address: enquiry.address || null,
          message: enquiry.message || null,
          status: 'new',
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
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Failed to submit admission enquiry',
    };
  }
}

export const submitAdmissionEnquiry = createAdmissionEnquiry;

export async function createContactMessage(
  msg: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    school_id?: string;
  }
): Promise<{ success: boolean; message: string }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      success: true,
      message: 'Thank you for contacting Decent Public School! Your message has been received.',
    };
  }

  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          school_id: msg.school_id || DEFAULT_SCHOOL_ID,
          name: msg.name,
          email: msg.email,
          phone: msg.phone || null,
          subject: msg.subject || null,
          message: msg.message,
          is_read: false,
        },
      ]);

    if (error) return { success: false, message: error.message };
    return { success: true, message: 'Message sent successfully!' };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Failed to send message',
    };
  }
}

export const submitContactMessage = createContactMessage;
