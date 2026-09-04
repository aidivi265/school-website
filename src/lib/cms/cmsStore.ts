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
  FAQItem,
  AdmissionEnquiry,
} from '@/types';
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
  mockStats,
} from '../data/mockData';

export const CMS_KEYS = {
  NOTICES: 'dps_cms_notices',
  EVENTS: 'dps_cms_events',
  FACULTY: 'dps_cms_faculty',
  FACILITIES: 'dps_cms_facilities',
  GALLERY: 'dps_cms_gallery',
  ALBUMS: 'dps_cms_albums',
  ACHIEVEMENTS: 'dps_cms_achievements',
  DOCUMENTS: 'dps_cms_documents',
  FAQS: 'dps_cms_faqs',
  ENQUIRIES: 'dps_cms_enquiries',
  PAGES: 'dps_cms_pages',
  SETTINGS: 'dps_cms_settings',
  STATS: 'dps_cms_stats',
} as const;

export type CMSKey = (typeof CMS_KEYS)[keyof typeof CMS_KEYS];

// Default Initial Pages CMS Data
export const defaultPagesCMS = {
  heroHeadline: 'Empowering Young Minds for a Better Tomorrow',
  heroSubtext:
    'A premier CBSE-affiliated co-educational institution in Rohini, Delhi, dedicated to academic excellence, value-driven character building, and holistic student growth since 1995.',
  announcementTicker:
    'ADMISSIONS OPEN FOR SESSION 2025–26 | Pre-School to Class IX & Class XI (Science, Commerce & Humanities Streams) | Contact Admission Desk: 011-27948281 / +91 98188 99001',
  statStudents: '2500+',
  statTeachers: '120+',
  statPassRate: '100%',
  statExperience: '30+',
  visionText:
    'To be a premier center of educational excellence that nurtures enlightened, innovative, and ethically grounded global citizens capable of contributing meaningfully to society and thriving in an ever-evolving world.',
  missionText:
    'To provide a stimulating learning environment where academic rigour, technological innovation, character development, and inclusive values empower every student to discover their unique potential and achieve lifelong success.',
  legacyText:
    'Established in 1995, Decent Public School has evolved from a visionary institution into one of North-West Delhi\'s most trusted centers of quality school education.',
  principalName: 'Mrs. Ritu Pathak',
  principalDesignation: 'Principal, Decent Public School',
  principalMessage:
    'At Decent Public School, Rohini, we believe that every child carries within them an immense potential waiting to be discovered. Our role as educators is not merely to teach — it is to inspire, guide, and empower. We prepare students for life, not merely for examinations.',
  principalQuote:
    'Education is the most powerful weapon which you can use to change the world. At DPS Rohini, we nurture curious minds and compassionate hearts.',
  pedagogyText:
    'Our academic framework follows the National Education Policy (NEP) 2020 guidelines, emphasizing experiential learning, conceptual clarity, inquiry-based discussions, and STEM project work.',
  streamsOverview:
    'Class XI and XII students can select from Science (PCM/PCB with CS/IP/Physical Education), Commerce (with or without Mathematics), and Humanities (Economics, Political Science, Psychology).',
  admissionAgeCriteria:
    'Pre-School (Nursery): 3+ years as of 31st March | Pre-Primary (KG): 4+ years | Class 1: 5+ years. Admissions are open based on merit and neighborhood criteria per Directorate of Education guidelines.',
};

export const defaultSettings: School = {
  ...mockSchool,
};

export const defaultEnquiries: AdmissionEnquiry[] = [
  { id: 'enq-101', parent_name: 'Sunil Malhotra', student_name: 'Aarav Malhotra', class_applying: 'Pre-School (Nursery)', phone: '+91 98112 34567', email: 'sunil.m@gmail.com', status: 'Pending', created_at: '2025-06-16' },
  { id: 'enq-102', parent_name: 'Meera Chawla', student_name: 'Kavya Chawla', class_applying: 'Class XI (Science - PCM)', phone: '+91 98711 22334', email: 'meera.c@yahoo.com', status: 'Contacted', created_at: '2025-06-15' },
  { id: 'enq-103', parent_name: 'Vikram Batra', student_name: 'Rohan Batra', class_applying: 'Class I', phone: '+91 99100 88776', email: 'vbatra@outlook.com', status: 'Under Review', created_at: '2025-06-14' },
  { id: 'enq-104', parent_name: 'Pooja Aggarwal', student_name: 'Dev Aggarwal', class_applying: 'Class VI', phone: '+91 98101 44556', email: 'pooja.agg@gmail.com', status: 'Admitted', created_at: '2025-06-12' },
];

class CMSStoreManager {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // Core Generic Getter
  public get<T>(key: string, fallback: T): T {
    if (!this.isBrowser()) return fallback;
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        window.localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
      }
      return JSON.parse(item) as T;
    } catch {
      return fallback;
    }
  }

  // Core Generic Setter with event broadcast
  public set<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom event for real-time in-tab reactivity
      window.dispatchEvent(
        new CustomEvent('dps-cms-updated', {
          detail: { key, value },
        })
      );
    } catch (err) {
      console.error(`[CMSStore] Failed to write key ${key}:`, err);
    }
  }

  // ==================== NOTICES ====================
  public getNotices(): Notice[] {
    return this.get<Notice[]>(CMS_KEYS.NOTICES, mockNotices);
  }

  public setNotices(notices: Notice[]): void {
    this.set(CMS_KEYS.NOTICES, notices);
  }

  public upsertNotice(notice: Notice): void {
    const list = this.getNotices();
    const index = list.findIndex((n) => n.id === notice.id);
    let updated: Notice[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...updated[index], ...notice, updated_at: new Date().toISOString() };
    } else {
      updated = [
        {
          ...notice,
          id: notice.id || 'notice-' + Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        ...list,
      ];
    }
    this.setNotices(updated);
  }

  public deleteNotice(id: string): void {
    const list = this.getNotices().filter((n) => n.id !== id);
    this.setNotices(list);
  }

  // ==================== EVENTS ====================
  public getEvents(): EventItem[] {
    return this.get<EventItem[]>(CMS_KEYS.EVENTS, mockEvents);
  }

  public setEvents(events: EventItem[]): void {
    this.set(CMS_KEYS.EVENTS, events);
  }

  public upsertEvent(event: EventItem): void {
    const list = this.getEvents();
    const index = list.findIndex((e) => e.id === event.id);
    let updated: EventItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...updated[index], ...event, updated_at: new Date().toISOString() };
    } else {
      updated = [
        {
          ...event,
          id: event.id || 'event-' + Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        ...list,
      ];
    }
    this.setEvents(updated);
  }

  public deleteEvent(id: string): void {
    const list = this.getEvents().filter((e) => e.id !== id);
    this.setEvents(list);
  }

  // ==================== FACULTY ====================
  public getFaculty(): FacultyMember[] {
    return this.get<FacultyMember[]>(CMS_KEYS.FACULTY, mockFaculty);
  }

  public setFaculty(faculty: FacultyMember[]): void {
    this.set(CMS_KEYS.FACULTY, faculty);
  }

  public upsertFaculty(member: FacultyMember): void {
    const list = this.getFaculty();
    const index = list.findIndex((f) => f.id === member.id);
    let updated: FacultyMember[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...updated[index], ...member, updated_at: new Date().toISOString() };
    } else {
      updated = [
        ...list,
        {
          ...member,
          id: member.id || 'faculty-' + Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
    }
    this.setFaculty(updated);
  }

  public deleteFaculty(id: string): void {
    const list = this.getFaculty().filter((f) => f.id !== id);
    this.setFaculty(list);
  }

  // ==================== GALLERY & ALBUMS ====================
  public getGallery(): GalleryImage[] {
    return this.get<GalleryImage[]>(CMS_KEYS.GALLERY, mockGalleryImages);
  }

  public setGallery(images: GalleryImage[]): void {
    this.set(CMS_KEYS.GALLERY, images);
  }

  public upsertGalleryImage(image: GalleryImage): void {
    const list = this.getGallery();
    const index = list.findIndex((img) => img.id === image.id);
    let updated: GalleryImage[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...updated[index], ...image };
    } else {
      updated = [
        {
          ...image,
          id: image.id || 'img-' + Date.now(),
          created_at: new Date().toISOString(),
        },
        ...list,
      ];
    }
    this.setGallery(updated);
  }

  public deleteGalleryImage(id: string): void {
    const list = this.getGallery().filter((img) => img.id !== id);
    this.setGallery(list);
  }

  public getAlbums(): GalleryAlbum[] {
    return this.get<GalleryAlbum[]>(CMS_KEYS.ALBUMS, mockGalleryAlbums);
  }

  public setAlbums(albums: GalleryAlbum[]): void {
    this.set(CMS_KEYS.ALBUMS, albums);
  }

  public upsertAlbum(album: GalleryAlbum): void {
    const list = this.getAlbums();
    const index = list.findIndex((a) => a.id === album.id);
    let updated: GalleryAlbum[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...updated[index], ...album, updated_at: new Date().toISOString() };
    } else {
      updated = [
        ...list,
        {
          ...album,
          id: album.id || 'album-' + Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
    }
    this.setAlbums(updated);
  }

  public deleteAlbum(id: string): void {
    const list = this.getAlbums().filter((a) => a.id !== id);
    this.setAlbums(list);
  }

  // ==================== ACHIEVEMENTS ====================
  public getAchievements(): Achievement[] {
    return this.get<Achievement[]>(CMS_KEYS.ACHIEVEMENTS, mockAchievements);
  }

  public setAchievements(items: Achievement[]): void {
    this.set(CMS_KEYS.ACHIEVEMENTS, items);
  }

  public upsertAchievement(achievement: Achievement): void {
    const list = this.getAchievements();
    const index = list.findIndex((a) => a.id === achievement.id);
    let updated: Achievement[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...updated[index], ...achievement, updated_at: new Date().toISOString() };
    } else {
      updated = [
        {
          ...achievement,
          id: achievement.id || 'achieve-' + Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        ...list,
      ];
    }
    this.setAchievements(updated);
  }

  public deleteAchievement(id: string): void {
    const list = this.getAchievements().filter((a) => a.id !== id);
    this.setAchievements(list);
  }

  // ==================== DOCUMENTS / DOWNLOADS ====================
  public getDocuments(): DocumentItem[] {
    return this.get<DocumentItem[]>(CMS_KEYS.DOCUMENTS, mockDocuments);
  }

  public setDocuments(docs: DocumentItem[]): void {
    this.set(CMS_KEYS.DOCUMENTS, docs);
  }

  public upsertDocument(doc: DocumentItem): void {
    const list = this.getDocuments();
    const index = list.findIndex((d) => d.id === doc.id);
    let updated: DocumentItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...updated[index], ...doc, updated_at: new Date().toISOString() };
    } else {
      updated = [
        {
          ...doc,
          id: doc.id || 'doc-' + Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        ...list,
      ];
    }
    this.setDocuments(updated);
  }

  public deleteDocument(id: string): void {
    const list = this.getDocuments().filter((d) => d.id !== id);
    this.setDocuments(list);
  }

  // ==================== FAQS ====================
  public getFAQs(): FAQItem[] {
    return this.get<FAQItem[]>(CMS_KEYS.FAQS, mockFAQs);
  }

  public setFAQs(faqs: FAQItem[]): void {
    this.set(CMS_KEYS.FAQS, faqs);
  }

  public upsertFAQ(faq: FAQItem): void {
    const list = this.getFAQs();
    const index = list.findIndex((f) => f.id === faq.id);
    let updated: FAQItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...updated[index], ...faq, updated_at: new Date().toISOString() };
    } else {
      updated = [
        ...list,
        {
          ...faq,
          id: faq.id || 'faq-' + Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
    }
    this.setFAQs(updated);
  }

  public deleteFAQ(id: string): void {
    const list = this.getFAQs().filter((f) => f.id !== id);
    this.setFAQs(list);
  }

  // ==================== ADMISSION ENQUIRIES ====================
  public getEnquiries(): AdmissionEnquiry[] {
    return this.get<AdmissionEnquiry[]>(CMS_KEYS.ENQUIRIES, defaultEnquiries);
  }

  public setEnquiries(enquiries: AdmissionEnquiry[]): void {
    this.set(CMS_KEYS.ENQUIRIES, enquiries);
  }

  public addEnquiry(enquiry: Omit<AdmissionEnquiry, 'id' | 'created_at'>): AdmissionEnquiry {
    const list = this.getEnquiries();
    const newEnq: AdmissionEnquiry = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      created_at: new Date().toISOString().split('T')[0],
      status: enquiry.status || 'Pending',
    };
    this.setEnquiries([newEnq, ...list]);
    return newEnq;
  }

  public updateEnquiryStatus(id: string, status: AdmissionEnquiry['status']): void {
    const list = this.getEnquiries().map((e) => (e.id === id ? { ...e, status } : e));
    this.setEnquiries(list);
  }

  public deleteEnquiry(id: string): void {
    const list = this.getEnquiries().filter((e) => e.id !== id);
    this.setEnquiries(list);
  }

  // ==================== PAGES CMS ====================
  public getPagesCMS(): typeof defaultPagesCMS {
    return this.get<typeof defaultPagesCMS>(CMS_KEYS.PAGES, defaultPagesCMS);
  }

  public setPagesCMS(content: Partial<typeof defaultPagesCMS>): void {
    const current = this.getPagesCMS();
    const updated = { ...current, ...content };
    this.set(CMS_KEYS.PAGES, updated);
  }

  // ==================== SITE SETTINGS ====================
  public getSettings(): School {
    return this.get<School>(CMS_KEYS.SETTINGS, defaultSettings);
  }

  public setSettings(settings: Partial<School>): void {
    const current = this.getSettings();
    const updated = { ...current, ...settings, updated_at: new Date().toISOString() };
    this.set(CMS_KEYS.SETTINGS, updated);
  }

  // ==================== STATS ====================
  public getStats(): typeof mockStats {
    return this.get<typeof mockStats>(CMS_KEYS.STATS, mockStats);
  }

  public setStats(stats: typeof mockStats): void {
    this.set(CMS_KEYS.STATS, stats);
  }

  // ==================== RESET ALL TO FACTORY DEFAULTS ====================
  public resetAllToDefaults(): void {
    if (!this.isBrowser()) return;
    this.setNotices(mockNotices);
    this.setEvents(mockEvents);
    this.setFaculty(mockFaculty);
    this.setGallery(mockGalleryImages);
    this.setAlbums(mockGalleryAlbums);
    this.setAchievements(mockAchievements);
    this.setDocuments(mockDocuments);
    this.setFAQs(mockFAQs);
    this.setEnquiries(defaultEnquiries);
    this.set(CMS_KEYS.PAGES, defaultPagesCMS);
    this.set(CMS_KEYS.SETTINGS, defaultSettings);
    this.set(CMS_KEYS.STATS, mockStats);
  }
}

export const CMSStore = new CMSStoreManager();
