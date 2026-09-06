'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  CMSStore,
  CMS_KEYS,
  CMSKey,
  defaultPagesCMS,
  defaultSettings,
  defaultEnquiries,
} from './cmsStore';
import {
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
  School,
} from '@/types';
import { mockStats } from '../data/mockData';

// Generic reactive hook for any CMS key
export function useCMS<T>(key: CMSKey | string, fallback: T): [T, (data: T | ((prev: T) => T)) => void, boolean] {
  const [data, setData] = useState<T>(fallback);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initial read on client
  useEffect(() => {
    const current = CMSStore.get<T>(key, fallback);
    setData(current);
    setIsHydrated(true);

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; value: T }>;
      if (customEvent.detail && customEvent.detail.key === key) {
        setData(customEvent.detail.value);
      }
    };

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch {
          // ignore parsing error
        }
      }
    };

    window.addEventListener('dps-cms-updated', handleCustomEvent);
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('dps-cms-updated', handleCustomEvent);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [key]);

  const updateData = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setData((prev) => {
        const nextValue = typeof updater === 'function' ? (updater as (prev: T) => T)(prev) : updater;
        CMSStore.set(key, nextValue);
        return nextValue;
      });
    },
    [key]
  );

  return [data, updateData, isHydrated];
}

// Domain-specific hooks
export function useNotices(initialNotices?: Notice[]) {
  const [notices, setNotices, isHydrated] = useCMS<Notice[]>(
    CMS_KEYS.NOTICES,
    initialNotices && initialNotices.length > 0 ? initialNotices : CMSStore.getNotices()
  );

  const upsertNotice = useCallback((notice: Notice) => {
    CMSStore.upsertNotice(notice);
  }, []);

  const deleteNotice = useCallback((id: string) => {
    CMSStore.deleteNotice(id);
  }, []);

  return { notices, setNotices, upsertNotice, deleteNotice, isHydrated };
}

export function useEvents(initialEvents?: EventItem[]) {
  const [events, setEvents, isHydrated] = useCMS<EventItem[]>(
    CMS_KEYS.EVENTS,
    initialEvents && initialEvents.length > 0 ? initialEvents : CMSStore.getEvents()
  );

  const upsertEvent = useCallback((event: EventItem) => {
    CMSStore.upsertEvent(event);
  }, []);

  const deleteEvent = useCallback((id: string) => {
    CMSStore.deleteEvent(id);
  }, []);

  return { events, setEvents, upsertEvent, deleteEvent, isHydrated };
}

export function useFaculty(initialFaculty?: FacultyMember[]) {
  const [faculty, setFaculty, isHydrated] = useCMS<FacultyMember[]>(
    CMS_KEYS.FACULTY,
    initialFaculty && initialFaculty.length > 0 ? initialFaculty : CMSStore.getFaculty()
  );

  const upsertFaculty = useCallback((member: FacultyMember) => {
    CMSStore.upsertFaculty(member);
  }, []);

  const deleteFaculty = useCallback((id: string) => {
    CMSStore.deleteFaculty(id);
  }, []);

  return { faculty, setFaculty, upsertFaculty, deleteFaculty, isHydrated };
}

export function useFacilities(initialFacilities?: Facility[]) {
  const [facilities, setFacilities, isHydrated] = useCMS<Facility[]>(
    CMS_KEYS.FACILITIES,
    initialFacilities && initialFacilities.length > 0 ? initialFacilities : CMSStore.getFacilities()
  );

  const upsertFacility = useCallback((facility: Facility) => {
    CMSStore.upsertFacility(facility);
  }, []);

  const deleteFacility = useCallback((id: string) => {
    CMSStore.deleteFacility(id);
  }, []);

  return { facilities, setFacilities, upsertFacility, deleteFacility, isHydrated };
}

export function useGallery(initialImages?: GalleryImage[], initialAlbums?: GalleryAlbum[]) {
  const [images, setImages, isHydratedImages] = useCMS<GalleryImage[]>(
    CMS_KEYS.GALLERY,
    initialImages && initialImages.length > 0 ? initialImages : CMSStore.getGallery()
  );

  const [albums, setAlbums, isHydratedAlbums] = useCMS<GalleryAlbum[]>(
    CMS_KEYS.ALBUMS,
    initialAlbums && initialAlbums.length > 0 ? initialAlbums : CMSStore.getAlbums()
  );

  const upsertGalleryImage = useCallback((img: GalleryImage) => {
    CMSStore.upsertGalleryImage(img);
  }, []);

  const deleteGalleryImage = useCallback((id: string) => {
    CMSStore.deleteGalleryImage(id);
  }, []);

  const upsertAlbum = useCallback((album: GalleryAlbum) => {
    CMSStore.upsertAlbum(album);
  }, []);

  const deleteAlbum = useCallback((id: string) => {
    CMSStore.deleteAlbum(id);
  }, []);

  return {
    images,
    albums,
    setImages,
    setAlbums,
    upsertGalleryImage,
    deleteGalleryImage,
    upsertAlbum,
    deleteAlbum,
    isHydrated: isHydratedImages && isHydratedAlbums,
  };
}

export function useAchievements(initialAchievements?: Achievement[]) {
  const [achievements, setAchievements, isHydrated] = useCMS<Achievement[]>(
    CMS_KEYS.ACHIEVEMENTS,
    initialAchievements && initialAchievements.length > 0 ? initialAchievements : CMSStore.getAchievements()
  );

  const upsertAchievement = useCallback((achievement: Achievement) => {
    CMSStore.upsertAchievement(achievement);
  }, []);

  const deleteAchievement = useCallback((id: string) => {
    CMSStore.deleteAchievement(id);
  }, []);

  return { achievements, setAchievements, upsertAchievement, deleteAchievement, isHydrated };
}

export function useDocuments(initialDocs?: DocumentItem[]) {
  const [documents, setDocuments, isHydrated] = useCMS<DocumentItem[]>(
    CMS_KEYS.DOCUMENTS,
    initialDocs && initialDocs.length > 0 ? initialDocs : CMSStore.getDocuments()
  );

  const upsertDocument = useCallback((doc: DocumentItem) => {
    CMSStore.upsertDocument(doc);
  }, []);

  const deleteDocument = useCallback((id: string) => {
    CMSStore.deleteDocument(id);
  }, []);

  return { documents, setDocuments, upsertDocument, deleteDocument, isHydrated };
}

export function useFAQs(initialFAQs?: FAQItem[]) {
  const [faqs, setFaqs, isHydrated] = useCMS<FAQItem[]>(
    CMS_KEYS.FAQS,
    initialFAQs && initialFAQs.length > 0 ? initialFAQs : CMSStore.getFAQs()
  );

  const upsertFAQ = useCallback((faq: FAQItem) => {
    CMSStore.upsertFAQ(faq);
  }, []);

  const deleteFAQ = useCallback((id: string) => {
    CMSStore.deleteFAQ(id);
  }, []);

  return { faqs, setFaqs, upsertFAQ, deleteFAQ, isHydrated };
}

export function useEnquiries(initialEnquiries?: AdmissionEnquiry[]) {
  const [enquiries, setEnquiries, isHydrated] = useCMS<AdmissionEnquiry[]>(
    CMS_KEYS.ENQUIRIES,
    initialEnquiries && initialEnquiries.length > 0 ? initialEnquiries : CMSStore.getEnquiries()
  );

  const addEnquiry = useCallback((enq: Omit<AdmissionEnquiry, 'id' | 'created_at'>) => {
    return CMSStore.addEnquiry(enq);
  }, []);

  const updateEnquiryStatus = useCallback((id: string, status: AdmissionEnquiry['status']) => {
    CMSStore.updateEnquiryStatus(id, status);
  }, []);

  const deleteEnquiry = useCallback((id: string) => {
    CMSStore.deleteEnquiry(id);
  }, []);

  return { enquiries, setEnquiries, addEnquiry, updateEnquiryStatus, deleteEnquiry, isHydrated };
}

export function usePagesCMS() {
  const [pagesData, setPagesData, isHydrated] = useCMS<typeof defaultPagesCMS>(
    CMS_KEYS.PAGES,
    defaultPagesCMS
  );

  const updatePagesCMS = useCallback((partial: Partial<typeof defaultPagesCMS>) => {
    setPagesData((prev) => ({ ...prev, ...partial }));
  }, [setPagesData]);

  return { pagesData, updatePagesCMS, setPagesData, isHydrated };
}

export function useSiteSettings(initialSettings?: School) {
  const [settings, setSettings, isHydrated] = useCMS<School>(
    CMS_KEYS.SETTINGS,
    initialSettings || defaultSettings
  );

  const updateSettings = useCallback((partial: Partial<School>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, [setSettings]);

  return { settings, updateSettings, setSettings, isHydrated };
}

export function useStats() {
  const [stats, setStats, isHydrated] = useCMS<typeof mockStats>(
    CMS_KEYS.STATS,
    mockStats
  );

  return { stats, setStats, isHydrated };
}
