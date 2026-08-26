/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ACHIEVEMENTS — DEMO DATA
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠️  All entries below are DEMO / PLACEHOLDER content.
 *      Replace with real school achievements before going live.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const achievements = [
  // ── Academic ──────────────────────────────────────────────────────────────
  {
    id: 1, category: 'academic', year: '2024–25',
    title: 'Academic Excellence Award',
    description: 'The school was recognised for outstanding board examination results, with the majority of students achieving distinction and merit-level scores.',
    icon: 'award', highlight: true,
  },
  {
    id: 2, category: 'academic', year: '2024–25',
    title: 'Top Performer – National Scholarship Exam',
    description: 'A student from Class XII secured a top rank in the National Scholarship Examination, bringing pride to the school.',
    icon: 'star', highlight: false,
  },
  {
    id: 3, category: 'academic', year: '2023–24',
    title: 'Merit Certificates in Board Examinations',
    description: 'Several students received merit certificates for exceptional performance in the board examinations across multiple subjects.',
    icon: 'certificate', highlight: false,
  },
  {
    id: 4, category: 'academic', year: '2023–24',
    title: 'Science Olympiad – Regional Gold Medal',
    description: 'A student from Class X won the Gold Medal at the Regional Science Olympiad, qualifying for the national round.',
    icon: 'medal', highlight: true,
  },

  // ── Sports ────────────────────────────────────────────────────────────────
  {
    id: 5, category: 'sports', year: '2024–25',
    title: 'Inter-School Sports Championship',
    description: 'Our school team won the Inter-School Sports Championship in the district, claiming the overall trophy for the second consecutive year.',
    icon: 'trophy', highlight: true,
  },
  {
    id: 6, category: 'sports', year: '2024–25',
    title: 'State-Level Athletics – Multiple Medals',
    description: 'Our athletes won Gold, Silver, and Bronze medals at the State-Level School Athletics Meet across track and field categories.',
    icon: 'medal', highlight: false,
  },
  {
    id: 7, category: 'sports', year: '2023–24',
    title: 'District Football Champions',
    description: 'The school football team won the District-Level Football Tournament, defeating 12 schools in the knockout rounds.',
    icon: 'medal', highlight: false,
  },

  // ── Cultural ──────────────────────────────────────────────────────────────
  {
    id: 8, category: 'cultural', year: '2024–25',
    title: 'Best School Drama – Inter-School Festival',
    description: 'Our drama group won the Best Performance Award at the Inter-School Cultural Drama Festival for their thought-provoking original production.',
    icon: 'star', highlight: true,
  },
  {
    id: 9, category: 'cultural', year: '2024–25',
    title: 'Painting Competition – National Level Recognition',
    description: 'A student from Class VIII received national-level recognition in the Annual Painting Competition, open to schools across India.',
    icon: 'award', highlight: false,
  },
  {
    id: 10, category: 'cultural', year: '2023–24',
    title: 'Best Choreography – Zonal Cultural Fest',
    description: 'Our dance group was awarded the Best Choreography prize at the Zonal Cultural Festival, showcasing exceptional talent and teamwork.',
    icon: 'star', highlight: false,
  },

  // ── Awards & Recognition ──────────────────────────────────────────────────
  {
    id: 11, category: 'awards', year: '2024',
    title: 'Best School – District Education Excellence Award',
    description: 'Recognised as one of the Best Schools in the district by the Regional Education Excellence Forum for consistent quality standards.',
    icon: 'award', highlight: true,
  },
  {
    id: 12, category: 'awards', year: '2023',
    title: 'Green & Sustainable Campus Award',
    description: 'Awarded the Green Campus Certificate for implementing outstanding eco-friendly and sustainability initiatives across the school.',
    icon: 'award', highlight: false,
  },
];

/**
 * ⚠️  DEMO STATISTICS — Replace with actual school figures before going live.
 *     These values are sourced from themeConfig.js for easy central management.
 *     Keeping them here too for direct import convenience in page components.
 */
export const stats = [
  { label: 'Years of Excellence', value: '25+'   },
  { label: 'Students Enrolled',   value: '1500+' },
  { label: 'Faculty Members',     value: '100+'  },
  { label: 'Pass Rate',           value: '98%'   },
  { label: 'Activities & Clubs',  value: '20+'   },
  { label: 'Awards Won',          value: '80+'   },
];

export default achievements;
