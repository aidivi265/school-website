'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader, Badge } from '@/components/ui';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  Sparkles,
  Grid,
  FileText,
  Search,
  Share2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagazineEdition {
  id: string;
  title: string;
  subtitle: string;
  session: string;
  coverImage: string;
  totalPages: number;
  pdfUrl: string;
  tableOfContents: { page: number; title: string; author: string }[];
  pages: {
    pageNumber: number;
    title: string;
    section: string;
    content: string;
    image?: string;
    author?: string;
  }[];
}

const magazineEditions: MagazineEdition[] = [
  {
    id: 'horizon-2025',
    title: 'Decent Horizon 2024–25',
    subtitle: 'Annual School Magazine · 30th Anniversary Commemorative Edition',
    session: 'Academic Session 2024–25',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80',
    totalPages: 8,
    pdfUrl: '#',
    tableOfContents: [
      { page: 1, title: 'Front Cover & Editorial Board', author: 'DPS Editorial Team' },
      { page: 2, title: "Principal's Vision: The Power of Purpose", author: 'Dr. Ananya Sharma' },
      { page: 3, title: 'CBSE Board Merits & 95%+ Club', author: 'Academic Directorate' },
      { page: 4, title: 'Atal Tinkering Lab: Future Innovators', author: 'STEM Club' },
      { page: 5, title: 'Sports Chronicle: National Athletic Meets', author: 'Sports Department' },
      { page: 6, title: 'Student Voices: Poems & Short Stories', author: 'Student Council' },
      { page: 7, title: 'Art & Expression Gallery', author: 'Fine Arts Dept' },
      { page: 8, title: 'House Championship & Valedictory', author: 'House Wardens' },
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'Decent Horizon · Commemorative Issue',
        section: 'Editorial Foreword',
        content:
          'Welcome to the 30th Anniversary Commemorative Issue of Decent Horizon. Over the past three decades, Decent Public School has evolved into an educational sanctuary where academic precision harmonizes with ethical consciousness. This edition celebrates the triumphs, innovations, and creative expressions of our students.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
        author: 'Chief Student Editor · Class XII',
      },
      {
        pageNumber: 2,
        title: 'The Power of Purpose in the 21st Century',
        section: "Principal's Desk",
        content:
          'True education transcends memorization; it ignites the courage to question, innovate, and serve society. As our classrooms integrate artificial intelligence with humanistic values, our young Decentians stand equipped to navigate a dynamic global landscape with empathy and fortitude.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        author: 'Dr. Ananya Sharma, Principal',
      },
      {
        pageNumber: 3,
        title: 'Shining Constellations: CBSE Board Toppers',
        section: 'Academic Merits',
        content:
          'Our Class XII and X batches achieved historic milestones with over 85 students securing distinctions above 90%. In Class XII Science, Aarav Mehta clinched 98.4% aggregate with a perfect 100 in Mathematics and Physics. In Commerce, Riddhi Jain scored 98.2% with 100 in Accountancy.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
        author: 'Academic Council',
      },
      {
        pageNumber: 4,
        title: 'Robotics, AI & The Atal Tinkering Revolution',
        section: 'STEM & Innovation',
        content:
          'Our ATL robotics club created an AI-powered smart irrigation sensor and automated greenhouse system that won the First Prize at the Delhi State Science Congress. Students from Classes VI to XII actively construct drone prototypes, 3D designs, and Python algorithms during weekly lab modules.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
        author: 'Robotics Club President',
      },
      {
        pageNumber: 5,
        title: 'Champions on the Field: Sports Odyssey',
        section: 'Athletics & Physical Education',
        content:
          'The DPS Rohini athletic contingent lifted the Zonal Track and Field Trophy for the third consecutive year. Our skating squad brought home 4 Gold medals at the Inter-DPS National Skating Championship, while the senior basketball team remained undefeated throughout the inter-school circuit.',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
        author: 'Sports Captain',
      },
      {
        pageNumber: 6,
        title: 'Voices of Tomorrow: Original Poetry',
        section: 'Literary Corner',
        content:
          '“The Morning Horizon” by Kabir Sharma (Class IX):\nBeneath the morning sun so bright,\nWe seek the spark of wisdom’s light.\nWith open minds and hearts unswayed,\nIn courage shall our path be laid.\n\n“Echoes of Science” by Tanya Goel (Class XI):\nA question asked, a mystery solved,\nAs around the sun our dreams evolved.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
        author: 'Student Writers Guild',
      },
      {
        pageNumber: 7,
        title: 'Canvas of Imagination: Visual Arts',
        section: 'Creative Arts',
        content:
          'Featuring oil paintings, Madhubani folk compositions, and digital illustrations by student artists across Primary and Senior wings. The Annual Art Exhibition "Pratibha" showcased over 300 student masterpieces celebrating environmental sustainability and cultural diversity.',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
        author: 'Fine Arts Guild',
      },
      {
        pageNumber: 8,
        title: 'House Trophy & Closing Valediction',
        section: 'Annual Honors',
        content:
          'Trishul House clinched the Cock House Trophy 2024–25 with an aggregate score of 2,450 points, excelling in both scholastic debates and athletics. We extend our heartfelt gratitude to our teachers, parents, and students who make Decent Public School an emblem of distinction.',
        image: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800&q=80',
        author: 'House Masters & Editorial Board',
      },
    ],
  },
];

export function MagazineClient() {
  const [selectedEdition, setSelectedEdition] = useState(magazineEditions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activePageData =
    selectedEdition.pages.find((p) => p.pageNumber === currentPage) || selectedEdition.pages[0];

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < selectedEdition.totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <PageHeader
        eyebrow="Publications & Literary Corner"
        title="Digital School Magazine & Newsletters"
        subtitle="Explore 'Decent Horizon' with our interactive flipbook reader celebrating student literature, board honors, and STEM innovations"
        breadcrumbs={[{ label: 'Campus Life', href: '/facilities' }, { label: 'School Magazine' }]}
      />

      <section className="py-14 px-4 bg-slate-900 text-white min-h-screen">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top Magazine Controls Bar */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">
                  {selectedEdition.title}
                </h3>
                <p className="text-xs text-amber-400 font-medium">{selectedEdition.session}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsGridOpen(!isGridOpen)}
                className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Page Overview Grid"
              >
                <Grid size={14} />
                <span>{isGridOpen ? 'Reader Mode' : 'All Pages'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Download size={14} />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Main Flipbook Interactive Reader */}
          {!isGridOpen ? (
            <div className="relative">
              {/* Flipbook Container */}
              <div className="bg-white text-slate-900 rounded-3xl shadow-2xl border-4 border-amber-500/20 overflow-hidden min-h-[560px] flex flex-col justify-between">
                {/* Top Reader Header */}
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold uppercase tracking-wider text-amber-800">
                    {activePageData.section}
                  </span>
                  <span className="font-mono font-bold bg-white px-3 py-1 rounded-full border border-slate-200 shadow-inner">
                    Page {currentPage} of {selectedEdition.totalPages}
                  </span>
                </div>

                {/* Reader Page Body */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1"
                  >
                    {/* Image Column */}
                    {activePageData.image && (
                      <div className="lg:col-span-5 h-64 lg:h-96 rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative">
                        <img
                          src={activePageData.image}
                          alt={activePageData.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-white">
                          <p className="text-xs font-serif font-bold">{activePageData.title}</p>
                        </div>
                      </div>
                    )}

                    {/* Content Column */}
                    <div className={activePageData.image ? 'lg:col-span-7 space-y-4' : 'lg:col-span-12 space-y-4'}>
                      <div className="inline-block">
                        <Badge variant="amber">{activePageData.section}</Badge>
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 leading-tight">
                        {activePageData.title}
                      </h2>
                      <div className="w-12 h-0.5 bg-amber-500 mb-4" />
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif">
                        {activePageData.content}
                      </p>
                      {activePageData.author && (
                        <p className="text-xs text-amber-700 font-bold italic pt-2">
                          — {activePageData.author}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Reader Footer Navigation Controls */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 disabled:opacity-30 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Previous Page
                  </button>

                  <div className="hidden sm:flex items-center gap-1">
                    {selectedEdition.pages.map((p) => (
                      <button
                        key={p.pageNumber}
                        onClick={() => setCurrentPage(p.pageNumber)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          p.pageNumber === currentPage
                            ? 'bg-amber-500 text-navy-950 shadow'
                            : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {p.pageNumber}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === selectedEdition.totalPages}
                    className="px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 disabled:opacity-30 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Next Page <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Thumbnail Spread Overview Grid */
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {selectedEdition.pages.map((p) => (
                <div
                  key={p.pageNumber}
                  onClick={() => {
                    setCurrentPage(p.pageNumber);
                    setIsGridOpen(false);
                  }}
                  className={`bg-white rounded-2xl p-4 text-slate-900 border-2 cursor-pointer transition-all hover:scale-105 shadow-md ${
                    currentPage === p.pageNumber
                      ? 'border-amber-500 ring-2 ring-amber-400'
                      : 'border-transparent'
                  }`}
                >
                  <div className="h-28 bg-slate-100 rounded-xl overflow-hidden mb-3 border border-slate-200">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <FileText size={24} />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase block">
                    Page {p.pageNumber}
                  </span>
                  <h4 className="font-serif font-bold text-xs line-clamp-1">{p.title}</h4>
                </div>
              ))}
            </div>
          )}

          {/* Table of Contents Summary */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h4 className="font-serif font-bold text-base text-amber-400 mb-3 flex items-center gap-2">
              <FileText size={16} /> In This Issue (Table of Contents)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {selectedEdition.tableOfContents.map((item) => (
                <div
                  key={item.page}
                  onClick={() => {
                    setCurrentPage(item.page);
                    setIsGridOpen(false);
                  }}
                  className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 text-xs transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-200 line-clamp-1">{item.title}</p>
                    <p className="text-[10px] text-slate-400">{item.author}</p>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-amber-400 bg-slate-800 px-2 py-0.5 rounded ml-2">
                    p.{item.page}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
