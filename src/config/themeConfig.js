/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THEME CONFIGURATION — DEMO TEMPLATE
 * ─────────────────────────────────────────────────────────────────────────────
 *  Centralised colour, typography and spacing settings.
 *
 *  These values are consumed by components and can be overridden here to
 *  instantly rebrand the entire website for a new client.
 *
 *  Current theme: Deep Navy + Gold (professional academic palette)
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const themeConfig = {
  branding: {
    // Primary — used for navbar, footers, hero overlays, section backgrounds
    primary:       '#0e1e42',   // Deep Navy
    primaryLight:  '#1e3a72',
    primaryDark:   '#07102a',

    // Secondary — card backgrounds, surface tones
    secondary:     '#f8f9fc',   // Off-white surface
    secondaryDark: '#f0f3f8',

    // Accent — CTA buttons, highlights, hover states, gold decorative elements
    accent:        '#f59e0b',   // Amber / Gold
    accentLight:   '#fcd34d',
    accentDark:    '#d97706',

    // Text
    textDark:   '#0e1e42',
    textBody:   '#475569',
    textMuted:  '#94a3b8',
  },

  typography: {
    fontSans:  "'Inter', system-ui, -apple-system, sans-serif",
    fontSerif: "'Playfair Display', Georgia, 'Times New Roman', serif",
  },

  /**
   * DEMO STATISTICS
   * ──────────────────────────────────────────────────────────────────────────
   * ⚠️  These are placeholder values for the demo.
   *     Replace with actual school statistics before going live.
   * ──────────────────────────────────────────────────────────────────────────
   */
  stats: [
    { label: 'Years of Excellence', value: '25+'   },  // DEMO VALUE
    { label: 'Students Enrolled',   value: '1500+' },  // DEMO VALUE
    { label: 'Faculty Members',     value: '100+'  },  // DEMO VALUE
    { label: 'Pass Rate',           value: '98%'   },  // DEMO VALUE
    { label: 'Activities & Clubs',  value: '20+'   },  // DEMO VALUE
    { label: 'Awards Won',          value: '80+'   },  // DEMO VALUE
  ],
};

export default themeConfig;
