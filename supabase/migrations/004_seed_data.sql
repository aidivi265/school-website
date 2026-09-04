-- ==============================================================================
-- 004_seed_data.sql
-- DEMO DATA SEED SCRIPT FOR DECENT PUBLIC SCHOOL, ROHINI
-- To remove demo data later: DELETE FROM schools WHERE id = 'a1000000-0000-0000-0000-000000000001';
-- ==============================================================================

-- 1. SCHOOL RECORD
INSERT INTO schools (
  id,
  slug,
  name,
  short_name,
  tagline,
  hero_headline,
  hero_subtext,
  established,
  affiliation,
  affiliation_no,
  address,
  city,
  state,
  pincode,
  phone,
  email,
  website,
  logo_url,
  description,
  vision,
  mission,
  principal_name,
  principal_message,
  principal_image_url
) VALUES (
  'a1000000-0000-0000-0000-000000000001',
  'decent-public-school',
  'Decent Public School',
  'DPS Rohini',
  'Empowering Young Minds for a Brighter Future',
  'DECENT PUBLIC SCHOOL, ROHINI, DELHI',
  'Nurturing academic excellence, moral integrity, scientific temper, and dynamic leadership through child-centric CBSE pedagogy since 1995.',
  '1995',
  'CBSE',
  '2730225',
  'Sector 3, Rohini, New Delhi, Delhi 110085',
  'New Delhi',
  'Delhi',
  '110085',
  '+91 11 2755 0000',
  'info@decentpublicschoolrohini.edu.in',
  'https://decentpublicschoolrohini.edu.in',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&q=80',
  'Established in 1995, Decent Public School is a leading co-educational Senior Secondary institution in Sector 3, Rohini, Delhi affiliated with CBSE.',
  'To be a premier center of educational excellence that nurtures enlightened, innovative, and ethically grounded global citizens.',
  'To provide a stimulating learning environment where academic rigour, technological innovation, and character building empower every student to achieve lifelong success.',
  'Dr. Ananya Sharma',
  'At Decent Public School, Rohini, we believe that education is not the filling of a pail, but the lighting of a fire. Every child carries infinite potential waiting to be discovered and shaped.',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  hero_subtext = EXCLUDED.hero_subtext;

-- 2. SITE SETTINGS
INSERT INTO site_settings (school_id, setting_key, setting_value) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'phone_office', '+91 11 2755 0000'),
  ('a1000000-0000-0000-0000-000000000001', 'phone_admissions', '+91 98711 00000'),
  ('a1000000-0000-0000-0000-000000000001', 'email_general', 'info@decentpublicschoolrohini.edu.in'),
  ('a1000000-0000-0000-0000-000000000001', 'email_admissions', 'admissions@decentpublicschoolrohini.edu.in'),
  ('a1000000-0000-0000-0000-000000000001', 'timings_school', '7:45 AM – 2:00 PM (Mon to Sat)'),
  ('a1000000-0000-0000-0000-000000000001', 'timings_office', '8:30 AM – 4:00 PM (Mon to Sat)'),
  ('a1000000-0000-0000-0000-000000000001', 'social_facebook', 'https://facebook.com/decentpublicschoolrohini'),
  ('a1000000-0000-0000-0000-000000000001', 'social_instagram', 'https://instagram.com/decentpublicschoolrohini'),
  ('a1000000-0000-0000-0000-000000000001', 'social_twitter', 'https://twitter.com/dps_rohini'),
  ('a1000000-0000-0000-0000-000000000001', 'social_youtube', 'https://youtube.com/@decentpublicschoolrohini'),
  ('a1000000-0000-0000-0000-000000000001', 'whatsapp_number', '+919871100000')
ON CONFLICT (school_id, setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;

-- 3. FACULTY (5+ Members)
INSERT INTO faculty (school_id, name, designation, department, subject, qualification, experience_years, photo_url, bio, display_order, published) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Dr. Ananya Sharma', 'Principal', 'Administration', 'Educational Administration', 'Ph.D. (Education), M.Sc., M.Ed., UGC-NET', '24+ Years', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80', 'Distinguished educationist with over two decades of transformative leadership in progressive CBSE schools.', 1, true),
  ('a1000000-0000-0000-0000-000000000001', 'Mr. Rajesh K. Verma', 'Vice Principal & PGT Physics', 'Science Department', 'Physics', 'M.Sc. (Physics), B.Ed., CTET', '19+ Years', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80', 'Passionate physics educator known for experimental demonstrations and board examination mentoring.', 2, true),
  ('a1000000-0000-0000-0000-000000000001', 'Mrs. Sunita Kapoor', 'Head of Mathematics (PGT)', 'Mathematics Department', 'Mathematics', 'M.Sc. (Mathematics), M.Ed.', '16+ Years', 'https://images.unsplash.com/photo-1580894732488-888a7db30089?w=500&q=80', 'Master trainer for Olympiad and CBSE mathematics with a track record of 100% board distinction.', 3, true),
  ('a1000000-0000-0000-0000-000000000001', 'Dr. Meenakshi Sundaram', 'PGT Chemistry & Lab Coordinator', 'Science Department', 'Chemistry', 'Ph.D. (Chemistry), M.Sc., B.Ed.', '14+ Years', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80', 'Research scholar and teacher guiding students through CBSE practical investigations and science fairs.', 4, true),
  ('a1000000-0000-0000-0000-000000000001', 'Mr. Amitav Sengupta', 'Head of Computer Science & AI', 'IT & Robotics', 'Computer Science & AI', 'M.Tech (Computer Science), MCA', '12+ Years', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', 'Pioneering coding, Python, and robotics curriculum to prepare students for the 21st-century tech landscape.', 5, true),
  ('a1000000-0000-0000-0000-000000000001', 'Mrs. Rachna Gupta', 'PGT Commerce & Economics', 'Commerce Department', 'Accountancy & Economics', 'M.Com, M.Phil., B.Ed.', '15+ Years', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80', 'Expert mentor in commerce studies fostering financial acumen and corporate ethics.', 6, true)
ON CONFLICT (id) DO NOTHING;

-- 4. NOTICES (5+ Items)
INSERT INTO notices (school_id, title, description, content, category, date, image_url, document_url, is_pinned, published) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Admissions Open for Session 2025–26 (Pre-School to Class XI)', 'Registration open for General and EWS categories as per Directorate of Education guidelines.', 'Detailed guidelines, seat availability, age eligibility criteria, and fee structure are available on the school website and at the admission counter.', 'Admissions', '2025-01-15', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', '#', true, true),
  ('a1000000-0000-0000-0000-000000000001', 'Schedule for Pre-Board II & Annual Term Examinations 2024–25', 'Date sheet for Classes IX to XII has been finalized by the Academic Examination Cell.', 'Parents are requested to ensure regular attendance and revision schedules. Detailed date sheet PDF is downloadable.', 'Examination', '2025-01-10', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80', '#', true, true),
  ('a1000000-0000-0000-0000-000000000001', 'Annual Sports Day & Athletic Meet 2024–25', 'Celebration of athletic spirit and inter-house track & field championships on 24th January 2025.', 'All parents are cordially invited to cheer the student athletes at the school sports complex.', 'Event', '2025-01-08', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80', '#', false, true),
  ('a1000000-0000-0000-0000-000000000001', 'Decent Public School Wins Gold at Inter-School Science Conclave', 'Senior STEM team secured 1st prize for their Smart Water Conservation Model.', 'Congratulations to Master Aarav Jain and Team for bringing laurels to the institution.', 'Achievement', '2024-12-28', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80', '#', false, true),
  ('a1000000-0000-0000-0000-000000000001', 'Winter Break Circular & Online Enrichment Programme', 'School will observe winter break as per Delhi Govt circular; optional online doubt clearing available.', 'Circular for winter vacation guidelines and assignments has been uploaded to the downloads section.', 'Holiday', '2024-12-24', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80', '#', false, true)
ON CONFLICT (id) DO NOTHING;

-- 5. EVENTS (4+ Items)
INSERT INTO events (school_id, title, description, event_date, event_time, venue, category, status, cover_image_url, published) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Annual Sports Day 2025 (Udaan)', 'Inter-house athletic meet featuring track races, martial arts displays, yoga formations, and relay championships.', '2025-01-24', '8:30 AM – 1:30 PM', 'Main Athletic Ground, DPS Rohini', 'Sports', 'upcoming', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', true),
  ('a1000000-0000-0000-0000-000000000001', '76th Republic Day Celebration & March Past', 'Flag hoisting ceremony, patriotic choir songs, inter-class fancy dress and cultural dances.', '2025-01-25', '9:00 AM – 11:30 AM', 'School Auditorium & Quadrangle', 'Celebration', 'upcoming', 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&q=80', true),
  ('a1000000-0000-0000-0000-000000000001', 'Inter-School STEM & Robotics Exhibition', 'Showcase of student innovations in AI, renewable energy, automated robotics, and biotechnology.', '2025-02-08', '10:00 AM – 3:00 PM', 'Senior Science & IT Wings', 'Academic', 'upcoming', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', true),
  ('a1000000-0000-0000-0000-000000000001', 'Grand Annual Cultural Fiesta "Tarang 2024"', 'Spectacular evening of classical ballet, theatrical dramatics, orchestra ensembles, and student award distribution.', '2024-11-20', '5:00 PM – 8:30 PM', 'Siri Fort Auditorium, New Delhi', 'Cultural', 'past', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', true)
ON CONFLICT (id) DO NOTHING;

-- 6. GALLERY ALBUMS & IMAGES
INSERT INTO gallery_albums (id, school_id, title, description, cover_image_url, category, event_date, published) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Campus & Smart Infrastructure', 'State-of-the-art classrooms, libraries, laboratories, and sports grounds.', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', 'campus', '2024-10-15', true),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'Annual Sports Meet & Athletic Triumphs', 'Memorable moments from track and field events, basketball matches, and yoga.', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', 'sports', '2024-11-05', true),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'Cultural Celebrations & Annual Day', 'Vibrant performances, classical dances, drama enactments, and musical choirs.', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', 'celebrations', '2024-11-20', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO gallery_images (album_id, school_id, title, image_url, category, display_order) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Main Academic Building & Front Lawns', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', 'campus', 1),
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Interactive Smart Classroom Session', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', 'classrooms', 2),
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Senior Chemistry Laboratory Practical', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', 'classrooms', 3),
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Central Knowledge Resource Library', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80', 'campus', 4),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'Inter-House 100m Sprint Final', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', 'sports', 5),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'Basketball Tournament Championship', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80', 'sports', 6),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'Annual Day Classical Dance Performance', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', 'celebrations', 7),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'Student Choir & Musical Ensemble', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', 'celebrations', 8),
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Robotics & STEM Innovation Lab', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', 'activities', 9),
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Primary Wing Art & Craft Exhibition', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', 'activities', 10)
ON CONFLICT (id) DO NOTHING;

-- 7. ACHIEVEMENTS (5+ Items)
INSERT INTO achievements (school_id, title, description, category, year, icon, is_highlight, published) VALUES
  ('a1000000-0000-0000-0000-000000000001', '100% Pass Rate in CBSE Board Class X & XII', 'Outstanding board examination performance with over 45 students scoring above 90% aggregate in 2024.', 'academic', '2024', 'trophy', true, true),
  ('a1000000-0000-0000-0000-000000000001', 'National Science Olympiad (NSO) All India Rank 14', 'Master Aarav Sharma of Class X secured AIR 14 and a gold medal at the National Science Olympiad.', 'academic', '2024', 'star', true, true),
  ('a1000000-0000-0000-0000-000000000001', 'Delhi State Inter-School Basketball Championship', 'Senior Girls Basketball Team clinched the prestigious State Gold Trophy at Chhatrasal Stadium.', 'sports', '2024', 'medal', true, true),
  ('a1000000-0000-0000-0000-000000000001', 'Best Eco-School Award by Govt of NCT of Delhi', 'Recognized for environmental stewardship, solar energy adoption, and zero-waste campus initiatives.', 'awards', '2023', 'award', false, true),
  ('a1000000-0000-0000-0000-000000000001', 'First Prize at National Level Model United Nations (MUN)', 'School delegation won the Best Delegation Trophy at the Delhi International MUN 2023.', 'cultural', '2023', 'trophy', false, true)
ON CONFLICT (id) DO NOTHING;

-- 8. DOCUMENTS (8+ Items)
INSERT INTO documents (school_id, title, description, category, file_url, file_name, file_size, file_type, published) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Admission Registration Form 2025–26', 'Printable admission form for Pre-School to Class XI with instructions.', 'Admission Forms', '#', 'admission_form_2025_26.pdf', '1.2 MB', 'PDF', true),
  ('a1000000-0000-0000-0000-000000000001', 'School Prospectus & Information Brochure', 'Comprehensive overview of school curriculum, faculty, sports facilities, and rules.', 'Admission Forms', '#', 'school_prospectus.pdf', '4.8 MB', 'PDF', true),
  ('a1000000-0000-0000-0000-000000000001', 'Academic Calendar & Schedule (2024–25)', 'Annual schedule of examinations, holidays, PTM dates, and sports meets.', 'Academic Documents', '#', 'academic_calendar_2024_25.pdf', '950 KB', 'PDF', true),
  ('a1000000-0000-0000-0000-000000000001', 'CBSE Class X & XII Syllabus Booklet', 'Prescribed subject-wise syllabus and practical assessment guidelines.', 'Syllabus & Curriculum', '#', 'cbse_syllabus_classes_x_xii.pdf', '2.4 MB', 'PDF', true),
  ('a1000000-0000-0000-0000-000000000001', 'Fee Structure & Payment Schedule 2025–26', 'Detailed quarter-wise tuition fee, lab fee, and transport fee breakup.', 'Admission Forms', '#', 'fee_structure_2025_26.pdf', '820 KB', 'PDF', true),
  ('a1000000-0000-0000-0000-000000000001', 'Student Code of Conduct & Anti-Bullying Policy', 'Institutional guidelines ensuring a safe, supportive, and respectful campus.', 'School Policies', '#', 'code_of_conduct_policy.pdf', '1.1 MB', 'PDF', true),
  ('a1000000-0000-0000-0000-000000000001', 'Bus Routes & Transport Guidelines', 'Detailed route list covering Rohini, Pitampura, Shalimar Bagh, and Paschim Vihar.', 'Important Forms', '#', 'bus_routes_directory.pdf', '1.5 MB', 'PDF', true),
  ('a1000000-0000-0000-0000-000000000001', 'Transfer Certificate (TC) Application Form', 'Official requisition form for student transfer certificates and clearance.', 'Important Forms', '#', 'tc_application_form.pdf', '480 KB', 'PDF', true)
ON CONFLICT (id) DO NOTHING;

-- 9. FAQS (10+ Items)
INSERT INTO faqs (school_id, question, answer, keywords, category, display_order, published) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'What is the admission procedure for Pre-School (Nursery) for session 2025–26?', 'Admissions for Nursery follow Directorate of Education (DoE) Delhi guidelines based on a 100-point criteria (neighborhood distance, sibling, alumni). Parents can fill the online enquiry form or submit the physical registration form at the school desk.', ARRAY['nursery', 'admission', 'process', 'criteria', 'points', 'doe', 'forms'], 'Admissions', 1, true),
  ('a1000000-0000-0000-0000-000000000001', 'What are the school and administrative office timings?', 'School timings for students: 7:45 AM to 2:00 PM (Monday to Saturday; 2nd & 4th Saturdays are off for primary students). Administrative Office: 8:30 AM to 4:00 PM.', ARRAY['timings', 'hours', 'office', 'schedule', 'saturday', 'open', 'close'], 'Timings & Schedule', 2, true),
  ('a1000000-0000-0000-0000-000000000001', 'Which board is Decent Public School affiliated with?', 'Decent Public School is permanently affiliated with the Central Board of Secondary Education (CBSE), New Delhi (Affiliation No. 2730225) for Pre-School up to Senior Secondary Class XII.', ARRAY['cbse', 'affiliation', 'board', 'accreditation', 'number', 'recognized'], 'Academics', 3, true),
  ('a1000000-0000-0000-0000-000000000001', 'What academic streams are available in Classes XI and XII?', 'We offer Science Stream (PCM with Computer Science/Physical Education, and PCB with Biotechnology/Maths) and Commerce Stream (Accountancy, Business Studies, Economics, with or without Applied Mathematics).', ARRAY['streams', 'class 11', 'class 12', 'science', 'commerce', 'pcm', 'pcb', 'medical'], 'Academics', 4, true),
  ('a1000000-0000-0000-0000-000000000001', 'Does the school provide air-conditioned bus transportation?', 'Yes, the school operates a modern fleet of GPS-tracked, air-conditioned buses with CCTV surveillance and female attendants covering all major sectors of Rohini, Pitampura, Shalimar Bagh, and nearby North Delhi localities.', ARRAY['bus', 'transport', 'routes', 'van', 'gps', 'safety', 'commute'], 'Transport & Facilities', 5, true),
  ('a1000000-0000-0000-0000-000000000001', 'What is the student-to-teacher ratio at Decent Public School?', 'We maintain an optimal student-to-teacher ratio of 25:1 across all wings, ensuring individual attention, personalized mentorship, and comprehensive continuous assessment for every child.', ARRAY['ratio', 'teacher', 'students', 'class size', 'attention'], 'General', 6, true),
  ('a1000000-0000-0000-0000-000000000001', 'How is the school fee paid?', 'School fees can be paid quarterly through our secure online payment portal via Net Banking, Debit/Credit Card, UPI, or through Demand Draft/Cheque at the school accounts desk.', ARRAY['fees', 'payment', 'quarterly', 'online', 'cheque', 'installments', 'structure'], 'Fees & Payments', 7, true),
  ('a1000000-0000-0000-0000-000000000001', 'What safety and security measures are implemented on campus?', 'The campus is secured with 24/7 CCTV surveillance across all classrooms and corridors, RFID/biometric student access, certified fire-safety systems, verified security guards, and a dedicated full-time medical nurse in the infirmary.', ARRAY['safety', 'security', 'cctv', 'guards', 'medical', 'infirmary', 'safe'], 'Transport & Facilities', 8, true),
  ('a1000000-0000-0000-0000-000000000001', 'What sports and physical fitness facilities are offered?', 'We provide state-of-the-art facilities for football, basketball on a synthetic court, indoor badminton courts, cricket practice nets, table tennis, taekwondo, athletics, and yoga supervised by certified coaches.', ARRAY['sports', 'games', 'football', 'basketball', 'badminton', 'cricket', 'fitness', 'yoga'], 'Transport & Facilities', 9, true),
  ('a1000000-0000-0000-0000-000000000001', 'Are parent-teacher meetings (PTM) conducted regularly?', 'Yes, regular Parent-Teacher Meetings are held after every assessment cycle to share detailed student progress reports, address concerns, and foster collaborative parent-educator partnerships.', ARRAY['ptm', 'parents', 'meeting', 'feedback', 'progress', 'report card'], 'General', 10, true)
ON CONFLICT (id) DO NOTHING;

-- 10. FACILITIES (8 Items)
INSERT INTO facilities (school_id, title, image_url, description, features, display_order, published) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Smart Digital Classrooms', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', 'Air-conditioned smart learning spaces equipped with 4K touch displays, digital lesson libraries, and acoustic sound systems.', ARRAY['4K Interactive Panels', 'Audio-Visual Modules', 'Ergonomic Seating', 'Wi-Fi Enabled'], 1, true),
  ('a1000000-0000-0000-0000-000000000001', 'Composite Science Laboratories', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', 'State-of-the-art specialized laboratories for Physics, Chemistry, and Biology complying with CBSE experimental norms.', ARRAY['Individual Workstations', 'Digital Microscopes', 'Safety Fume Hoods', 'First-Aid & Eyewash'], 2, true),
  ('a1000000-0000-0000-0000-000000000001', 'AI, Coding & Computer Labs', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80', 'High-speed computer laboratories featuring modern computing workstations, Python coding suites, and robotics toolkits.', ARRAY['High-Speed Fiber Net', 'Python & Scratch IDEs', 'Robotics Hardware', 'Cyber-Safe Filters'], 3, true),
  ('a1000000-0000-0000-0000-000000000001', 'Central Knowledge Resource Library', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80', 'Over 15,000 curated books, national periodicals, encyclopedia collections, and an integrated e-learning research hub.', ARRAY['15,000+ Books', 'Kindle & E-Journals', 'Quiet Reading Pods', 'Research Terminals'], 4, true),
  ('a1000000-0000-0000-0000-000000000001', 'Multi-Sport Complex & Athletic Ground', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', 'Lush green sports ground, synthetic basketball court, indoor badminton courts, cricket nets, and skating rink.', ARRAY['Synthetic Basketball Court', 'Cricket Practice Turf', 'Indoor Badminton Courts', 'Professional Coaching'], 5, true),
  ('a1000000-0000-0000-0000-000000000001', 'Performing Arts & Activity Studios', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', 'Dedicated studios for Indian classical music, Western instruments, fine arts, pottery, dramatics, and yoga.', ARRAY['Indian & Western Music', 'Classical Dance Floor', 'Fine Arts & Pottery', 'Yoga & Meditation'], 6, true),
  ('a1000000-0000-0000-0000-000000000001', 'GPS-Enabled AC Transport Fleet', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80', 'Fleet of air-conditioned school buses equipped with live GPS tracking, speed governors, CCTV cameras, and female attendants.', ARRAY['Live GPS Parent App', 'Female Bus Attendants', 'CCTV Cameras Onboard', 'First-Aid & Fire Safety'], 7, true),
  ('a1000000-0000-0000-0000-000000000001', 'Medical Care & Campus Infirmary', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80', 'Fully equipped health room staffed by a qualified full-time nurse with tie-ups with nearby multi-specialty hospitals.', ARRAY['Full-Time Nurse', 'Annual Health Checkups', 'Emergency Oxygen Setup', 'Hospital Tie-Ups'], 8, true)
ON CONFLICT (id) DO NOTHING;
