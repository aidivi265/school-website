/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FACULTY — DEMO DATA
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠️  All entries below are DEMO / PLACEHOLDER content.
 *      Replace with real faculty information before going live.
 *
 *  The principal object is also exported individually and is consumed by
 *  AboutPage and HomePage. It is driven by schoolConfig.principal so that
 *  a single change updates all references across the site.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { schoolConfig } from '../config/schoolConfig';

export const principal = {
  id: 1,
  name:          schoolConfig.principal.name,
  designation:   schoolConfig.principal.designation,
  qualification: schoolConfig.principal.qualification,
  experience:    schoolConfig.principal.experience,
  subject:       'School Administration',
  image:         schoolConfig.principal.image,
  message:       schoolConfig.principal.message.join(' '),
};

export const faculty = [
  principal,
  {
    id: 2,
    name:          'Mr. Vikram Nair',          // DEMO — replace
    designation:   'Vice Principal',
    qualification: 'M.Sc. (Physics), B.Ed.',
    experience:    '20 years',
    subject:       'Physics',
    image:         'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    message:       'Our goal is to create a learning environment where every student feels valued, challenged, and motivated to achieve their personal best.',
  },
  {
    id: 3,
    name:          'Mrs. Pooja Iyer',           // DEMO — replace
    designation:   'Head of Department – Science',
    qualification: 'M.Sc. (Chemistry), B.Ed.',
    experience:    '16 years',
    subject:       'Chemistry',
    image:         'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    message:       '',
  },
  {
    id: 4,
    name:          'Mr. Arjun Reddy',           // DEMO — replace
    designation:   'Head of Department – Mathematics',
    qualification: 'M.Sc. (Mathematics), B.Ed.',
    experience:    '18 years',
    subject:       'Mathematics',
    image:         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    message:       '',
  },
  {
    id: 5,
    name:          'Ms. Riya Chandra',           // DEMO — replace
    designation:   'Senior Teacher – English',
    qualification: 'M.A. (English Literature), B.Ed.',
    experience:    '14 years',
    subject:       'English',
    image:         'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    message:       '',
  },
  {
    id: 6,
    name:          'Mr. Deepak Singh',           // DEMO — replace
    designation:   'Physical Education Teacher',
    qualification: 'M.P.Ed.',
    experience:    '10 years',
    subject:       'Physical Education',
    image:         'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    message:       '',
  },
];

export default faculty;
