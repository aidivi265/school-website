# Decent Public School (Rohini, Delhi) - Modern Full-Stack Website & CMS

A complete, production-ready, full-stack website and Content Management System for **Decent Public School, Rohini, Delhi**. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Supabase.

---

## 🌟 Key Features

### 🏛️ Public School Website (15 Core Pages)
1. **Home (`/`)**: Hero banner, quick info strip, school intro, principal's message, 6-pillar advantage, facilities preview, achievements highlights, latest notices, upcoming events, gallery preview, parent testimonials, and admission CTA.
2. **About Us (`/about`)**: Founding story since 1995, educational vision, mission, and core values.
3. **Academics (`/academics`)**: Academic philosophy, CBSE stages (Pre-School to XII), Senior Secondary streams (Science PCM/PCB & Commerce), and methodology.
4. **Faculty (`/faculty`)**: Faculty directory with department badges, qualifications, subjects, and educator profiles.
5. **Facilities (`/facilities`)**: Smart classrooms, advanced science labs, computer & AI lab, central library, sports complex, GPS transport, and 24/7 campus security.
6. **Admissions (`/admissions`)**: Criteria, age matrix, document checklist, step-by-step process, and an interactive **Admission Enquiry Form** connected to Supabase.
7. **News & Notices (`/notices`)**: Searchable notices with category filtering (Admissions, Examination, Holiday, Circular, etc.), detail modal, and PDF attachments.
8. **Events (`/events`)**: Tabbed view of upcoming and past events with date badges, venue, and descriptions.
9. **Gallery (`/gallery`)**: Photo albums with category filter pills and interactive **Lightbox photo viewer**.
10. **Achievements (`/achievements`)**: CBSE board results, sports championships, Olympiad ranks, and institutional awards.
11. **Downloads (`/downloads`)**: Categorized downloadable files (Admission forms, prospectus, academic calendar, booklists, policies).
12. **Contact Us (`/contact`)**: Rohini Delhi location, interactive Google Maps embed, phone directory, office hours, and contact form.
13. **FAQ (`/faq`)**: Searchable accordion FAQs categorized across Admissions, Academics, Transport, Fees, and Timings.
14. **Privacy Policy (`/privacy`)**: Student data protection and privacy policy.
15. **Terms of Use (`/terms`)**: School website disclaimer and terms of use.

### 🤖 Predefined FAQ Website Assistant
- Floating bottom-right interactive assistant widget on all public pages.
- Fast keyword and text-normalized matching against Supabase FAQ questions, answers, and tags.
- Pre-filled suggestion chips and smart fallback with school office contact information.

### 🛠️ Dedicated Admin CMS Dashboard (`/admin`)
- Accessible at `/admin` (Protected route with Supabase Auth + Demo mode).
- **Modules**:
  - `Dashboard`: Overview metrics, recent enquiries, live notices.
  - `Notices`: Create, edit, delete, pin to top, publish/unpublish.
  - `Events`: Schedule events, set dates, time, venue, and status (upcoming/past).
  - `Faculty`: Add teachers, qualifications, photos, and designations.
  - `Gallery`: Upload photos, assign categories and captions.
  - `Achievements`: Manage academic, sports, and cultural milestones.
  - `Documents`: Upload circulars, forms, and syllabus booklets.
  - `Admissions`: Review incoming parent enquiries, update status (Pending, Contacted, Under Review, Admitted, Rejected), and view notes.
  - `FAQs`: Add questions, answers, and assistant matching keywords.
  - `Page Content`: Dynamic CMS for Vision, Mission, and Principal Message.
  - `School Settings`: Update phone numbers, emails, school timings, and affiliation details.

---

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Deep Navy `#0e1e42` + Amber Gold `#f59e0b`)
- **Icons**: Lucide React
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security, Supabase Auth, Storage)
- **Deployment**: Netlify (`@netlify/plugin-nextjs`) / GitHub

---

## 📦 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/aidivi265/school-website.git
cd school-website
npm install
```

### 2. Environment Configuration
Copy the sample environment file:
```bash
cp .env.example .env.local
```
Fill in your Supabase project credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here
NEXT_PUBLIC_DEFAULT_SCHOOL_SLUG=decent-public-school
NEXT_PUBLIC_SITE_URL=https://decentpublicschoolrohini.edu.in
```

> **Note**: Even without connecting Supabase credentials immediately, the application runs seamlessly out-of-the-box in preview mode with realistic built-in Decent Public School data.

### 3. Database Setup (Supabase)
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Create a new project and open the **SQL Editor**.
3. Run `supabase/schema.sql` to create all tables, indexes, RLS policies, and storage buckets.
4. Run `supabase/seed.sql` to populate the initial data for Decent Public School, Rohini.

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

---

## 🔐 Admin CMS Access

- Admin Login URL: `http://localhost:3000/admin/login`
- Default Admin Email: `admin@decentpublicschoolrohini.edu.in`
- Click **"Quick Demo Access"** on the login page for instant access during testing/evaluation.

---

## 🌐 Deploy to Netlify

1. Push your repository to GitHub.
2. In Netlify, click **"Add new site"** → **"Import an existing project"** → Select your GitHub repository.
3. Configure Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. Add Environment Variables in Netlify (`Site configuration` → `Environment variables`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_DEFAULT_SCHOOL_SLUG`
5. Click **"Deploy site"**. Netlify will build and deploy the Next.js application automatically via `@netlify/plugin-nextjs`.

---

## 🏛️ School Information

**Decent Public School**  
Sector 3, Rohini, Near Jaipur Golden Hospital, New Delhi, Delhi 110085  
- **CBSE Affiliation No.**: 2730248  
- **Established**: 1995  
- **Email**: info@decentpublicschoolrohini.edu.in  
- **Phone**: +91 11 2751 2345 / +91 11 2751 2346  
