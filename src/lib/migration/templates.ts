import { MigrationEntityType } from './types';

export interface CSVTemplate {
  filename: string;
  type: MigrationEntityType;
  description: string;
  headers: string[];
  sampleRow: string[];
}

export const CSV_TEMPLATES: Record<MigrationEntityType, CSVTemplate> = {
  faculty: {
    filename: 'faculty_template.csv',
    type: 'faculty',
    description: 'Faculty and teaching staff profiles with qualifications and photos',
    headers: ['name', 'designation', 'department', 'subject', 'qualification', 'experience_years', 'photo_url', 'bio', 'published'],
    sampleRow: [
      'Dr. Sunita Sharma',
      'PGT Physics & HOD Science',
      'Senior Secondary Wing',
      'Physics',
      'M.Sc. Physics (DU), Ph.D., B.Ed.',
      '14+ Years',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
      'Passionate educator guiding board exam toppers and national science olympiad winners.',
      'true',
    ],
  },
  notices: {
    filename: 'notices_template.csv',
    type: 'notices',
    description: 'School circulars, date sheets, holiday alerts, and announcements',
    headers: ['title', 'description', 'category', 'date', 'image_url', 'document_url', 'pinned', 'published'],
    sampleRow: [
      'CBSE Class X & XII Board Examination Date Sheet 2025',
      'Official examination timetable released by CBSE. Practical exams commence 15th January.',
      'Examination',
      '2025-01-10',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
      'https://example.com/datesheet_2025.pdf',
      'true',
      'true',
    ],
  },
  events: {
    filename: 'events_template.csv',
    type: 'events',
    description: 'Annual day, sports meet, exhibitions, celebrations, and workshops',
    headers: ['title', 'description', 'event_date', 'time', 'venue', 'category', 'cover_image_url', 'published'],
    sampleRow: [
      'Annual Sports Meet & Athletic Championship 2025',
      'Inter-house track races, relay championships, aerobics drill, and medal ceremonies.',
      '2025-11-20',
      '8:30 AM - 2:00 PM',
      'School Sports Ground, Sector 3 Rohini',
      'Sports',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      'true',
    ],
  },
  gallery_albums: {
    filename: 'gallery_albums_template.csv',
    type: 'gallery_albums',
    description: 'Photo gallery albums grouping campus event photos',
    headers: ['title', 'description', 'category', 'event_date', 'cover_image_url', 'published'],
    sampleRow: [
      'Annual Cultural Fest Tarang 2024',
      'Classical music, contemporary dance, theatre drama, and artistic exhibitions.',
      'events',
      '2024-12-18',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      'true',
    ],
  },
  gallery_images: {
    filename: 'gallery_images_template.csv',
    type: 'gallery_images',
    description: 'Individual photos linked to gallery albums or standalone categories',
    headers: ['album_title', 'image_url', 'caption', 'category'],
    sampleRow: [
      'Annual Cultural Fest Tarang 2024',
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
      'Inaugural Lamp Lighting Ceremony by Chief Guest',
      'events',
    ],
  },
  achievements: {
    filename: 'achievements_template.csv',
    type: 'achievements',
    description: 'Board exam toppers, sports champions, Olympiad ranks, and awards',
    headers: ['title', 'description', 'category', 'year', 'icon', 'is_highlight', 'published'],
    sampleRow: [
      '100% CBSE Class XII Board Result (Science & Commerce)',
      'Over 45 students secured 90%+ aggregate marks with school average at 84.6%.',
      'academic',
      '2024–25',
      'trophy',
      'true',
      'true',
    ],
  },
  documents: {
    filename: 'documents_template.csv',
    type: 'documents',
    description: 'Downloadable PDF forms, fee circulars, and syllabus documents',
    headers: ['title', 'category', 'description', 'file_url', 'file_size', 'published'],
    sampleRow: [
      'Admission Registration Form 2025–26',
      'Admission Forms',
      'Printable registration application with document verification checklist.',
      'https://example.com/admission_form_2025.pdf',
      '480 KB',
      'true',
    ],
  },
  faqs: {
    filename: 'faqs_template.csv',
    type: 'faqs',
    description: 'Frequently asked questions and AI assistant trigger keywords',
    headers: ['question', 'answer', 'category', 'keywords', 'published'],
    sampleRow: [
      'What is the admission procedure for Pre-School (Nursery)?',
      'Admissions open in December per Delhi Directorate of Education guidelines. Parents can register online or visit the school admission desk.',
      'Admissions',
      'nursery, admission, age, form, registration, fee, documents',
      'true',
    ],
  },
  pages: {
    filename: 'pages_template.csv',
    type: 'pages',
    description: 'Static and editable CMS content blocks',
    headers: ['page_slug', 'section_key', 'title', 'subtitle', 'content'],
    sampleRow: [
      'home',
      'hero',
      'Empowering Young Minds for a Better Tomorrow',
      'Premier CBSE Co-Educational Institution in Rohini, Delhi Since 1995',
      'Holistic education focusing on character, academic rigour, and future leadership.',
    ],
  },
  settings: {
    filename: 'settings_template.csv',
    type: 'settings',
    description: 'Institutional metadata and contact credentials',
    headers: ['key', 'value', 'description'],
    sampleRow: [
      'affiliation_no',
      '2730198',
      'CBSE Board Affiliation Number',
    ],
  },
};

export function generateCSVContent(template: CSVTemplate): string {
  const headerLine = template.headers.join(',');
  const sampleLine = template.sampleRow.map((val) => `"${val.replace(/"/g, '""')}"`).join(',');
  return `${headerLine}\n${sampleLine}\n`;
}

export function downloadCSVTemplate(type: MigrationEntityType) {
  const template = CSV_TEMPLATES[type];
  if (!template) return;

  const content = generateCSVContent(template);
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', template.filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
