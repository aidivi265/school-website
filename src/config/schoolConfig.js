/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SCHOOL CONFIGURATION — DEMO TEMPLATE
 * ─────────────────────────────────────────────────────────────────────────────
 *  This is the SINGLE SOURCE OF TRUTH for all school-specific information.
 *
 *  To convert this demo into a real school's website, update ONLY this file
 *  plus the files in /src/data/ and /public/images/.
 *
 *  DO NOT hardcode school-specific content inside UI components.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const schoolConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name:          'The Heritage Academy',
  shortName:     'Heritage Academy',
  tagline:       'Inspiring Minds. Building Futures.',
  heroHeadline:  'Empowering Students to Learn, Grow & Lead',
  heroSubtext:   'A nurturing learning environment focused on academic excellence, character development, and holistic growth.',
  established:   '1995',
  affiliation:   'CBSE',
  affiliationNo: 'XXXXXXXX',           // Replace with actual affiliation number

  // ── Contact ───────────────────────────────────────────────────────────────
  address: {
    line1:    '123 Education Avenue',
    line2:    'Knowledge Park',
    city:     'Your City',
    state:    'Your State',
    pin:      '000000',
    country:  'India',
    full:     '123 Education Avenue, Knowledge Park, Your City – 000000',
    mapEmbed: '',                       // Paste Google Maps embed URL here
  },
  phone:    {
    office:     '+91 00000 00000',
    admissions: '+91 00000 00001',
  },
  email: {
    general:    'info@heritagecademy.edu.in',
    admissions: 'admissions@heritageacademy.edu.in',
  },
  timings: {
    school:  'Mon–Sat: 7:30 AM – 2:30 PM',
    office:  'Mon–Sat: 9:00 AM – 4:00 PM',
  },

  // ── Social Media ─────────────────────────────────────────────────────────
  // Replace '#' with real URLs, or set to '' to hide the icon
  social: {
    facebook:  '#',
    instagram: '#',
    twitter:   '#',
    youtube:   '#',
  },

  // ── Academics ────────────────────────────────────────────────────────────
  classes: {
    range:       'Nursery – XII',
    description: 'Pre-Primary to Senior Secondary',
    streams:     ['Science', 'Commerce'],
  },

  // ── Principal / Leadership ────────────────────────────────────────────────
  principal: {
    name:        'Dr. Ananya Sharma',          // DEMO — replace with real name
    designation: 'Principal',
    qualification: 'M.Ed., Ph.D. (Education)',
    experience:  '22 years',
    image:       'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    message: [
      'At The Heritage Academy, we believe that every child carries within them an immense potential waiting to be discovered. Our role as educators is not merely to teach — it is to inspire, guide, and empower.',
      'We have built an environment where academic rigour meets creative freedom, where discipline is nurtured alongside compassion, and where every student is seen as an individual with unique strengths.',
      'I warmly invite you to explore our school — and to become part of a community dedicated to building tomorrow\'s leaders, thinkers, and changemakers.',
    ],
  },

  director: {
    name:        'Mr. Arun Mehta',             // DEMO — replace with real name
    designation: 'Managing Director',
    image:       'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    message: [
      'The Heritage Academy was founded with a simple yet powerful conviction: that quality education is every child\'s right. Since our establishment in 1995, we have remained steadfast in that belief.',
      'Over the years we have grown — in numbers, in infrastructure, and in impact — but our core promise to every parent has never changed: we will treat your child as our own, nurture their growth, and prepare them for a future full of possibility.',
    ],
  },
};

export default schoolConfig;
