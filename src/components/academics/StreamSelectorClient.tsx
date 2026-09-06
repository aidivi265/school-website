'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Cpu,
  TrendingUp,
  Brain,
  Award,
  Users,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StreamResult {
  id: string;
  name: string;
  badge: string;
  matchScore: number;
  colorHex: string;
  icon: any;
  tagline: string;
  description: string;
  cbseSubjects: string[];
  topCareers: string[];
  entranceExams: string[];
  mentor: string;
}

const quizQuestions = [
  {
    id: 'q1',
    step: 1,
    title: 'Which subjects spark your deepest curiosity?',
    options: [
      { id: 'opt1_pcm', text: 'Laws of Physics, Calculus, Mechanics, and Computer Coding', streamBias: 'pcm' },
      { id: 'opt1_pcb', text: 'Human Physiology, Genetics, Botany, and Chemical Reactions', streamBias: 'pcb' },
      { id: 'opt1_com', text: 'Stock Markets, Financial Analysis, Business Startups, and Commerce', streamBias: 'commerce' },
      { id: 'opt1_hum', text: 'World History, Political Systems, Psychology, and Creative Writing', streamBias: 'humanities' },
    ],
  },
  {
    id: 'q2',
    step: 2,
    title: 'What is your ultimate dream career pathway?',
    options: [
      { id: 'opt2_pcm', text: 'Software/AI Engineer, Aerospace Scientist, or Data Architect', streamBias: 'pcm' },
      { id: 'opt2_pcb', text: 'Doctor/Surgeon, Biotechnologist, Neurologist, or Pharmacist', streamBias: 'pcb' },
      { id: 'opt2_com', text: 'Chartered Accountant (CA), Investment Banker, Venture Capitalist, or CEO', streamBias: 'commerce' },
      { id: 'opt2_hum', text: 'Civil Servant (IAS/IPS), Corporate Lawyer, Diplomat, Journalist, or Psychologist', streamBias: 'humanities' },
    ],
  },
  {
    id: 'q3',
    step: 3,
    title: 'How do you prefer solving complex challenges?',
    options: [
      { id: 'opt3_pcm', text: 'Deriving mathematical equations, writing algorithms, and logical deduction', streamBias: 'pcm' },
      { id: 'opt3_pcb', text: 'Microscopic observation, biological case studies, and lab dissections', streamBias: 'pcb' },
      { id: 'opt3_com', text: 'Balancing balance sheets, calculating profit margins, and analyzing market trends', streamBias: 'commerce' },
      { id: 'opt3_hum', text: 'Debating social perspectives, structuring persuasive essays, and philosophical critique', streamBias: 'humanities' },
    ],
  },
  {
    id: 'q4',
    step: 4,
    title: 'Which competitive exam do you envision preparing for?',
    options: [
      { id: 'opt4_pcm', text: 'JEE Mains & Advanced, BITSAT, NDA (Airforce/Navy)', streamBias: 'pcm' },
      { id: 'opt4_pcb', text: 'NEET-UG, AIIMS, ICAR, Biotechnology Entrance', streamBias: 'pcb' },
      { id: 'opt4_com', text: 'CA Foundation, IPMAT (IIM Indore/Rohtak), CUET Commerce', streamBias: 'commerce' },
      { id: 'opt4_hum', text: 'CLAT (National Law Universities), UPSC Civil Services, CUET Humanities', streamBias: 'humanities' },
    ],
  },
];

const streamDetails: Record<string, StreamResult> = {
  pcm: {
    id: 'pcm',
    name: 'Science (PCM + Computer Science / AI)',
    badge: '98% Ideal Alignment',
    matchScore: 98,
    colorHex: '#2563eb',
    icon: Cpu,
    tagline: 'The Pathway of Engineering, Pure Sciences & Technology Innovation',
    description:
      'Ideal for analytical thinkers fascinated by mathematical logic, algorithms, physics mechanics, and technical architecture. Offers versatile career mobility across global tech, aerospace, and finance.',
    cbseSubjects: ['English Core', 'Physics', 'Chemistry', 'Mathematics', 'Computer Science (Python/SQL) or Physical Education / Economics'],
    topCareers: ['Software Engineer / AI Scientist', 'Aerospace / Mechanical Engineer', 'Data Scientist / Quantitative Analyst', 'Robotics & Hardware Architect'],
    entranceExams: ['JEE Mains & Advanced', 'BITSAT', 'NDA', 'CUET Pure Sciences'],
    mentor: 'Dr. Vivek Saxena (PGT Physics)',
  },
  pcb: {
    id: 'pcb',
    name: 'Science (PCB + Biotechnology / Psychology)',
    badge: '96% Ideal Alignment',
    matchScore: 96,
    colorHex: '#16a34a',
    icon: Brain,
    tagline: 'The Pathway of Medicine, Healthcare & Life Sciences',
    description:
      'Tailored for compassionate, observation-driven minds keen on exploring human physiology, genetics, biochemical research, surgery, and mental healthcare.',
    cbseSubjects: ['English Core', 'Physics', 'Chemistry', 'Biology', 'Biotechnology / Psychology or Physical Education'],
    topCareers: ['Medical Doctor (MBBS/MD)', 'Biomedical / Genetic Researcher', 'Clinical Psychologist / Neuroscientist', 'Pharmaceutical Scientist'],
    entranceExams: ['NEET-UG', 'AIIMS', 'CUET Life Sciences'],
    mentor: 'Mrs. Neha Batra (PGT Chemistry & Bio Mentor)',
  },
  commerce: {
    id: 'commerce',
    name: 'Commerce (with Mathematics / Applied Maths)',
    badge: '95% Ideal Alignment',
    matchScore: 95,
    colorHex: '#d97706',
    icon: TrendingUp,
    tagline: 'The Pathway of Finance, Global Trade & Entrepreneurship',
    description:
      'Perfect for dynamic strategists aiming to master balance sheets, capital markets, corporate law, fintech, startup entrepreneurship, and chartered accountancy.',
    cbseSubjects: ['English Core', 'Accountancy', 'Business Studies', 'Economics', 'Applied Mathematics / Informatics Practices / PE'],
    topCareers: ['Chartered Accountant (CA/CPA)', 'Investment Banker / Fund Manager', 'Startup Founder / CEO', 'Corporate Lawyer / Management Consultant'],
    entranceExams: ['CA Foundation', 'IPMAT (IIMs)', 'CUET Commerce & SRCC Entrance'],
    mentor: 'Mr. Arvind Gupta (Head of Commerce)',
  },
  humanities: {
    id: 'humanities',
    name: 'Humanities & Social Sciences',
    badge: '94% Ideal Alignment',
    matchScore: 94,
    colorHex: '#9333ea',
    icon: BookOpen,
    tagline: 'The Pathway of Governance, Law, Diplomacy & Creative Arts',
    description:
      'Designed for expressive, empathetic thinkers driven to analyze societies, write laws, govern nations, lead international diplomacy, and produce impactful literature or media.',
    cbseSubjects: ['English Core', 'Political Science', 'History / Sociology', 'Economics / Psychology', 'Legal Studies / Fine Arts / PE'],
    topCareers: ['Civil Services (IAS/IPS/IFS)', 'Corporate & Constitutional Lawyer', 'Diplomat / International Relations Officer', 'Journalist / Editor / UX Researcher'],
    entranceExams: ['CLAT (NLUs)', 'UPSC Civil Services', 'CUET Central Universities'],
    mentor: 'Mrs. Vandana Sehgal (Senior Humanities Coordinator)',
  },
};

export function StreamSelectorClient() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = quizQuestions[currentStepIndex];

  const handleSelectOption = (questionId: string, bias: string) => {
    const updated = { ...selectedAnswers, [questionId]: bias };
    setSelectedAnswers(updated);

    if (currentStepIndex < quizQuestions.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateBestStream = (): StreamResult => {
    const counts: Record<string, number> = { pcm: 0, pcb: 0, commerce: 0, humanities: 0 };
    Object.values(selectedAnswers).forEach((bias) => {
      counts[bias] = (counts[bias] || 0) + 1;
    });

    let topStream = 'pcm';
    let maxCount = -1;
    Object.entries(counts).forEach(([stream, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topStream = stream;
      }
    });

    return streamDetails[topStream] || streamDetails.pcm;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentStepIndex(0);
    setQuizCompleted(false);
  };

  const recommendedStream = quizCompleted ? calculateBestStream() : null;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            Class 10 to 11 Career Transition Guide
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-3">
            Class 11 Stream & Career <span className="text-amber-600">Selector</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Answer 4 quick questions to discover your best CBSE stream fit (Science PCM/PCB, Commerce, or Humanities) and available subject combinations at Decent Public School.
          </p>
        </div>

        {!quizCompleted ? (
          /* ─── QUIZ IN PROGRESS ─── */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 relative">
            {/* Step Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <span>Question {currentStepIndex + 1} of {quizQuestions.length}</span>
                <span className="text-amber-600">{Math.round(((currentStepIndex + 1) / quizQuestions.length) * 100)}% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStepIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 mb-6">
                  {currentQ.title}
                </h3>

                <div className="space-y-3">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQ.id, opt.streamBias)}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/50 transition-all duration-200 flex items-center justify-between group cursor-pointer"
                    >
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-navy-950">
                        {opt.text}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Back button if > 0 */}
            {currentStepIndex > 0 && (
              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  ← Back to previous question
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ─── QUIZ COMPLETED: RECOMMENDATION CARD ─── */
          recommendedStream && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
            >
              {/* Header Banner */}
              <div
                className="p-8 sm:p-10 text-white relative"
                style={{
                  background: `linear-gradient(135deg, ${recommendedStream.colorHex} 0%, #0f172a 100%)`,
                }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Recommended Match
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
                  {recommendedStream.name}
                </h2>
                <p className="text-slate-200 text-sm font-medium italic">
                  "{recommendedStream.tagline}"
                </p>
              </div>

              {/* Recommendation Details */}
              <div className="p-8 sm:p-10 space-y-8">
                <div>
                  <h4 className="font-serif font-bold text-navy-950 text-base mb-2">
                    Why This Stream Suits You
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {recommendedStream.description}
                  </p>
                </div>

                {/* CBSE Subjects Offered at DPS */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-serif font-bold text-navy-950 text-sm mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    Available CBSE Subject Combination at DPS Rohini:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {recommendedStream.cbseSubjects.map((sub, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Careers & Exams */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200/60">
                    <h5 className="font-serif font-bold text-amber-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600" /> Key Career Pathways
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {recommendedStream.topCareers.map((c, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <h5 className="font-serif font-bold text-navy-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" /> Target Entrance Exams
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {recommendedStream.entranceExams.map((e, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mentor Contact */}
                <div className="p-4 bg-navy-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0">
                      DPS
                    </div>
                    <div>
                      <div className="text-[11px] text-gold-400 font-bold uppercase">Stream Counseling Mentor</div>
                      <div className="text-sm font-bold">{recommendedStream.mentor}</div>
                    </div>
                  </div>
                  <Link
                    href={`/admissions?stream=${encodeURIComponent(recommendedStream.name)}#enquiry`}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs rounded-xl transition-colors shrink-0 shadow"
                  >
                    Apply for Class XI Admission →
                  </Link>
                </div>

                {/* Retake Quiz */}
                <div className="text-center pt-2">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz with Different Choices
                  </button>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
