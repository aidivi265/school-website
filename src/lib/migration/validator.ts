import { MigrationEntityType, ParsedRowResult, ValidationError, ValidationWarning } from './types';
import {
  normalizeBoolean,
  normalizeDate,
  normalizeNoticeCategory,
  normalizeEventCategory,
  normalizeDocumentCategory,
  normalizeAchievementCategory,
  normalizeFAQCategory,
  normalizeGalleryCategory,
} from './normalizer';
import {
  mockFaculty,
  mockNotices,
  mockEvents,
  mockAchievements,
  mockDocuments,
  mockFAQs,
  mockGalleryAlbums,
  mockGalleryImages,
} from '@/lib/data/mockData';

export function validateRow(
  type: MigrationEntityType,
  rawRow: Record<string, string>,
  rowNumber: number,
  existingRecords?: any[]
): ParsedRowResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const normalizedData: Record<string, any> = {};
  let isDuplicate = false;
  let duplicateMatch: { id: string; description: string } | undefined;

  switch (type) {
    case 'faculty': {
      const name = rawRow.name || rawRow.faculty_name || rawRow.teacher_name || '';
      const designation = rawRow.designation || rawRow.role || rawRow.position || '';
      const department = rawRow.department || rawRow.dept || 'Primary & Middle Wing';
      const subject = rawRow.subject || '';
      const qualification = rawRow.qualification || rawRow.degrees || 'Trained Graduate';
      const experience = rawRow.experience || rawRow.experience_years || '5+ Years';
      const photoUrl = rawRow.photo_url || rawRow.image_url || rawRow.photo || '';
      const bio = rawRow.bio || rawRow.description || '';
      const isPublished = normalizeBoolean(rawRow.published ?? rawRow.is_published, true);

      if (!name.trim()) {
        errors.push({ row: rowNumber, field: 'name', message: 'Faculty name is required' });
      }
      if (!designation.trim()) {
        errors.push({ row: rowNumber, field: 'designation', message: 'Designation / role is required' });
      }
      if (!photoUrl) {
        warnings.push({ row: rowNumber, field: 'photo_url', message: 'Missing photo URL (default placeholder will be used)' });
      }

      normalizedData.name = name.trim();
      normalizedData.designation = designation.trim();
      normalizedData.department = department.trim();
      normalizedData.subject = subject.trim();
      normalizedData.qualification = qualification.trim();
      normalizedData.experience_years = experience.trim();
      normalizedData.photo_url = photoUrl.trim() || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800';
      normalizedData.bio = bio.trim();
      normalizedData.is_published = isPublished;

      // Duplicate Check: Same Name + Designation
      const existing = (existingRecords || mockFaculty).find(
        (f) =>
          f.name.toLowerCase() === normalizedData.name.toLowerCase() &&
          f.designation.toLowerCase() === normalizedData.designation.toLowerCase()
      );
      if (existing) {
        isDuplicate = true;
        duplicateMatch = { id: existing.id, description: `Matches existing staff: "${existing.name}" (${existing.designation})` };
      }
      break;
    }

    case 'notices': {
      const title = rawRow.title || rawRow.notice_title || rawRow.heading || '';
      const description = rawRow.description || rawRow.content || rawRow.details || '';
      const category = normalizeNoticeCategory(rawRow.category || rawRow.type);
      const rawDate = rawRow.date || rawRow.publish_date || rawRow.notice_date;
      const normalizedDate = normalizeDate(rawDate, false);
      const isPinned = normalizeBoolean(rawRow.pinned ?? rawRow.is_pinned, false);
      const isPublished = normalizeBoolean(rawRow.published ?? rawRow.is_published, true);
      const imageUrl = rawRow.image_url || rawRow.image || '';
      const docUrl = rawRow.document_url || rawRow.doc_url || rawRow.pdf_url || '';

      if (!title.trim()) {
        errors.push({ row: rowNumber, field: 'title', message: 'Notice title is required' });
      }
      if (!description.trim()) {
        warnings.push({ row: rowNumber, field: 'description', message: 'Notice description is empty' });
      }
      if (!normalizedDate) {
        errors.push({ row: rowNumber, field: 'date', message: `Invalid or missing date format: "${rawDate}"` });
      }

      normalizedData.title = title.trim();
      normalizedData.description = description.trim() || title.trim();
      normalizedData.category = category;
      normalizedData.date = normalizedDate || new Date().toISOString().split('T')[0];
      normalizedData.is_pinned = isPinned;
      normalizedData.is_published = isPublished;
      if (imageUrl) normalizedData.image_url = imageUrl.trim();
      if (docUrl) normalizedData.document_url = docUrl.trim();

      // Duplicate Check: Same title + Same Date
      const existing = (existingRecords || mockNotices).find(
        (n) => n.title.toLowerCase() === normalizedData.title.toLowerCase() && n.date === normalizedData.date
      );
      if (existing) {
        isDuplicate = true;
        duplicateMatch = { id: existing.id, description: `Matches existing notice: "${existing.title}" on ${existing.date}` };
      }
      break;
    }

    case 'events': {
      const title = rawRow.title || rawRow.event_title || rawRow.name || '';
      const description = rawRow.description || rawRow.details || '';
      const rawEventDate = rawRow.event_date || rawRow.date;
      const normalizedEventDate = normalizeDate(rawEventDate, false);
      const time = rawRow.time || rawRow.event_time || '9:00 AM - 1:00 PM';
      const venue = rawRow.venue || rawRow.location || 'School Auditorium';
      const category = normalizeEventCategory(rawRow.category);
      const coverImageUrl = rawRow.cover_image_url || rawRow.image_url || '';
      const isPublished = normalizeBoolean(rawRow.published ?? rawRow.is_published, true);

      if (!title.trim()) {
        errors.push({ row: rowNumber, field: 'title', message: 'Event title is required' });
      }
      if (!normalizedEventDate) {
        errors.push({ row: rowNumber, field: 'event_date', message: `Invalid event date format: "${rawEventDate}"` });
      }

      normalizedData.title = title.trim();
      normalizedData.description = description.trim() || title.trim();
      normalizedData.event_date = normalizedEventDate || new Date().toISOString().split('T')[0];
      normalizedData.time = time.trim();
      normalizedData.venue = venue.trim();
      normalizedData.category = category;
      normalizedData.status = 'upcoming';
      normalizedData.cover_image_url = coverImageUrl.trim() || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800';
      normalizedData.is_published = isPublished;

      // Duplicate Check: Same title + Same Event Date
      const existing = (existingRecords || mockEvents).find(
        (e) => e.title.toLowerCase() === normalizedData.title.toLowerCase() && e.event_date === normalizedData.event_date
      );
      if (existing) {
        isDuplicate = true;
        duplicateMatch = { id: existing.id, description: `Matches existing event: "${existing.title}" on ${existing.event_date}` };
      }
      break;
    }

    case 'gallery_albums': {
      const title = rawRow.title || rawRow.album_name || rawRow.name || '';
      const description = rawRow.description || '';
      const category = normalizeGalleryCategory(rawRow.category);
      const rawDate = rawRow.event_date || rawRow.date;
      const normalizedDate = normalizeDate(rawDate, false) || new Date().toISOString().split('T')[0];
      const coverUrl = rawRow.cover_image_url || rawRow.image_url || '';

      if (!title.trim()) {
        errors.push({ row: rowNumber, field: 'title', message: 'Album title is required' });
      }

      normalizedData.title = title.trim();
      normalizedData.description = description.trim();
      normalizedData.category = category;
      normalizedData.event_date = normalizedDate;
      normalizedData.cover_image_url = coverUrl.trim() || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800';
      normalizedData.is_published = normalizeBoolean(rawRow.published ?? rawRow.is_published, true);

      // Duplicate Check
      const existing = (existingRecords || mockGalleryAlbums).find(
        (a) => a.title.toLowerCase() === normalizedData.title.toLowerCase()
      );
      if (existing) {
        isDuplicate = true;
        duplicateMatch = { id: existing.id, description: `Matches existing album: "${existing.title}"` };
      }
      break;
    }

    case 'gallery_images': {
      const albumTitle = rawRow.album_title || rawRow.album || '';
      const imageUrl = rawRow.image_url || rawRow.url || rawRow.photo_url || '';
      const caption = rawRow.caption || rawRow.title || 'School Photo';
      const category = normalizeGalleryCategory(rawRow.category);

      if (!imageUrl.trim()) {
        errors.push({ row: rowNumber, field: 'image_url', message: 'Image URL is required' });
      }

      normalizedData.album_title = albumTitle.trim();
      normalizedData.image_url = imageUrl.trim();
      normalizedData.thumb_url = imageUrl.trim();
      normalizedData.title = caption.trim();
      normalizedData.caption = caption.trim();
      normalizedData.category = category;

      // Duplicate Check
      const existing = (existingRecords || mockGalleryImages).find(
        (img) => img.image_url.toLowerCase() === normalizedData.image_url.toLowerCase()
      );
      if (existing) {
        isDuplicate = true;
        duplicateMatch = { id: existing.id, description: `Image URL already exists in gallery` };
      }
      break;
    }

    case 'achievements': {
      const title = rawRow.title || rawRow.achievement_title || rawRow.award_name || '';
      const description = rawRow.description || rawRow.details || '';
      const category = normalizeAchievementCategory(rawRow.category);
      const year = rawRow.year || rawRow.session || '2024–25';
      const icon = rawRow.icon || 'award';
      const isHighlight = normalizeBoolean(rawRow.is_highlight ?? rawRow.highlight, false);
      const isPublished = normalizeBoolean(rawRow.published ?? rawRow.is_published, true);

      if (!title.trim()) {
        errors.push({ row: rowNumber, field: 'title', message: 'Achievement title is required' });
      }
      if (!description.trim()) {
        warnings.push({ row: rowNumber, field: 'description', message: 'Achievement description is blank' });
      }

      normalizedData.title = title.trim();
      normalizedData.description = description.trim() || title.trim();
      normalizedData.category = category;
      normalizedData.year = year.trim();
      normalizedData.icon = icon.trim();
      normalizedData.is_highlight = isHighlight;
      normalizedData.is_published = isPublished;

      // Duplicate Check
      const existing = (existingRecords || mockAchievements).find(
        (a) => a.title.toLowerCase() === normalizedData.title.toLowerCase() && a.year === normalizedData.year
      );
      if (existing) {
        isDuplicate = true;
        duplicateMatch = { id: existing.id, description: `Matches existing achievement: "${existing.title}" (${existing.year})` };
      }
      break;
    }

    case 'documents': {
      const title = rawRow.title || rawRow.document_title || rawRow.file_name || '';
      const category = normalizeDocumentCategory(rawRow.category);
      const description = rawRow.description || '';
      const fileUrl = rawRow.file_url || rawRow.document_url || rawRow.pdf_url || '';
      const fileSize = rawRow.file_size || '500 KB';
      const isPublished = normalizeBoolean(rawRow.published ?? rawRow.is_published, true);

      if (!title.trim()) {
        errors.push({ row: rowNumber, field: 'title', message: 'Document title is required' });
      }
      if (!fileUrl.trim()) {
        warnings.push({ row: rowNumber, field: 'file_url', message: 'Document file URL is empty (placeholder PDF will be used until uploaded)' });
      }

      normalizedData.title = title.trim();
      normalizedData.category = category;
      normalizedData.description = description.trim();
      normalizedData.file_url = fileUrl.trim() || '/documents/sample-form.pdf';
      normalizedData.file_size = fileSize.trim();
      normalizedData.file_type = 'PDF';
      normalizedData.upload_date = new Date().toISOString().split('T')[0];
      normalizedData.is_published = isPublished;

      // Duplicate Check
      const existing = (existingRecords || mockDocuments).find(
        (d) => d.title.toLowerCase() === normalizedData.title.toLowerCase()
      );
      if (existing) {
        isDuplicate = true;
        duplicateMatch = { id: existing.id, description: `Matches existing document title: "${existing.title}"` };
      }
      break;
    }

    case 'faqs': {
      const question = rawRow.question || rawRow.faq_question || rawRow.q || '';
      const answer = rawRow.answer || rawRow.faq_answer || rawRow.a || '';
      const category = normalizeFAQCategory(rawRow.category);
      const keywordsStr = rawRow.keywords || rawRow.tags || '';
      const keywords = keywordsStr
        .split(/[,;]/)
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean);
      const isPublished = normalizeBoolean(rawRow.published ?? rawRow.is_published, true);

      if (!question.trim()) {
        errors.push({ row: rowNumber, field: 'question', message: 'FAQ Question is required' });
      }
      if (!answer.trim()) {
        errors.push({ row: rowNumber, field: 'answer', message: 'FAQ Answer is required' });
      }

      normalizedData.question = question.trim();
      normalizedData.answer = answer.trim();
      normalizedData.category = category;
      normalizedData.keywords = keywords;
      normalizedData.is_published = isPublished;

      // Duplicate Check
      const existing = (existingRecords || mockFAQs).find(
        (f) => f.question.toLowerCase() === normalizedData.question.toLowerCase()
      );
      if (existing) {
        isDuplicate = true;
        duplicateMatch = { id: existing.id, description: `Matches existing question: "${existing.question}"` };
      }
      break;
    }

    default: {
      normalizedData.title = rawRow.title || rawRow.name || 'Untitled';
    }
  }

  return {
    rowNumber,
    data: normalizedData,
    isValid: errors.length === 0,
    isDuplicate,
    errors,
    warnings,
    duplicateMatch,
  };
}
