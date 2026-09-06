'use client';

import React, { useState } from 'react';
import { Clock, BookOpen, Cpu, Trophy, Coffee, Bus, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeSlot {
  id: string;
  time: string;
  title: string;
  tagline: string;
  category: string;
  icon: any;
  description: string;
  highlights: string[];
  image: string;
  quote: string;
  quoteAuthor: string;
}

const timeSlots: TimeSlot[] = [
  {
    id: 'assembly',
    time: '07:45 AM',
    title: 'Morning Assembly & Value Meditation',
    tagline: 'Centering the mind for a day of purposeful learning',
    category: 'Values & Discipline',
    icon: Clock,
    description:
      'The day begins in the central quadrangle with soulful Vedic chants, universal prayers, thought of the day, news digest, and national anthem. Students foster public speaking skills and unity.',
    highlights: ['Soulful Morning Shloka & Meditation', 'Student-Led Thought & Current Affairs', 'Physical Warm-up & House Lineup'],
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
    quote: 'The assembly sets the moral tone of our entire day, filling us with positive energy and focus.',
    quoteAuthor: 'Aarav Malhotra, Head Boy (Class XII)',
  },
  {
    id: 'smart-classes',
    time: '08:30 AM',
    title: 'Smart Classroom Conceptual Mastery',
    tagline: 'CBSE curriculum brought alive with 3D audio-visuals',
    category: 'Academics',
    icon: BookOpen,
    description:
      'Interactive smart boards transform complex scientific principles, mathematics theorems, and literary concepts into captivating visual journeys with active student participation.',
    highlights: ['Interactive Touchscreen Smart Boards', 'Inquiry-Based Small Group Discussions', 'Real-time Formative Concept Checks'],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    quote: 'Learning here is never rote memorization; teachers make sure every doubt is solved with practical examples.',
    quoteAuthor: 'Riya Bansal, Science Stream (Class XI)',
  },
  {
    id: 'stem-lab',
    time: '11:00 AM',
    title: 'Atal Tinkering & STEM Innovation',
    tagline: 'Hands-on robotics, AI coding & 3D prototyping',
    category: 'STEM & Innovation',
    icon: Cpu,
    description:
      'Students transition to our state-of-the-art STEM Makerspace. Under expert mentors, they assemble robotic kits, program Arduino micro-controllers, and construct science prototypes.',
    highlights: ['Arduino & Raspberry Pi Prototyping', 'LEGO Robotics & AI Coding Modules', 'Science Olympiad & Hackathon Prep'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
    quote: 'Building working robots in school ignited my dream to become an AI engineer at IIT.',
    quoteAuthor: 'Devansh Roy, Robotics Club Lead (Class X)',
  },
  {
    id: 'lunch',
    time: '12:30 PM',
    title: 'Mindful Dining & Social Camaraderie',
    tagline: 'Wholesome nourishment and lifelong friendships',
    category: 'Wellness & Nutrition',
    icon: Coffee,
    description:
      'A structured recess where students share nutritious home-packed meals, learn table etiquette, practice gratitude, and engage in cheerful peer conversations under teacher supervision.',
    highlights: ['Teacher-Supervised Hygienic Dining', 'Peer Bonding & Story Sharing', 'Zero Food Waste Awareness Initiative'],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    quote: 'Lunch break is where we exchange ideas, celebrate birthdays, and build bonds that last a lifetime.',
    quoteAuthor: 'Ananya Verma (Class VI)',
  },
  {
    id: 'sports',
    time: '01:15 PM',
    title: 'Sports Arena & Performing Arts',
    tagline: 'Championing athletic grit, music, drama & fitness',
    category: 'Sports & Arts',
    icon: Trophy,
    description:
      'Whether dribbling on the basketball court, gliding on the skating rink, practicing classical music, or rehearsing a theatre play, every child hones their unique creative talent.',
    highlights: ['Professional Basketball & Skating Rink', 'Western & Classical Music Studio', 'Zonal & CBSE Tournament Drills'],
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&q=80',
    quote: 'The coaches push us to give 100% on the court and teach us sportsmanship in victory and defeat.',
    quoteAuthor: 'Tanvi Goyal, Basketball Captain (Class XI)',
  },
  {
    id: 'dispersal',
    time: '02:15 PM',
    title: 'Structured Wrap-Up & GPS Dispersal',
    tagline: 'Reflective self-evaluation and safe journey home',
    category: 'Safety & Transport',
    icon: Bus,
    description:
      'Students fill their digital student planners, pack responsibly, and disperse into CCTV and GPS-monitored school transport with verified RFID bus attendance and escort protocols.',
    highlights: ['RFID Student Attendance Logging', 'Live GPS-Monitored Bus Fleet', 'Teacher Escort & Safe Parent Handover'],
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80',
    quote: 'As parents, knowing our child is in GPS-tracked, CCTV-enabled buses gives us complete peace of mind.',
    quoteAuthor: 'Mr. Amitav Mehra (Parent)',
  },
];

export function DayInTheLifeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlot = timeSlots[activeIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-navy-950 to-slate-950 text-white relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Experience
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            A Day in the Life of a <span className="text-gold-400">Decentian</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience the vibrant pulse of Decent Public School — from the morning prayer to experiential STEM labs and championship sports arenas.
          </p>
        </div>

        {/* Time Navigation Scrubber */}
        <div className="mb-12">
          <div className="flex items-center justify-between overflow-x-auto pb-4 pt-2 no-scrollbar gap-2 sm:gap-4">
            {timeSlots.map((slot, index) => {
              const Icon = slot.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={slot.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-1 min-w-[130px] sm:min-w-[150px] p-3 sm:p-4 rounded-xl text-left transition-all duration-300 relative group cursor-pointer border ${
                    isActive
                      ? 'bg-gold-500/15 border-gold-400 text-white shadow-lg shadow-gold-500/10 scale-[1.02]'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-gold-400 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {slot.time}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-500'}`} />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold truncate text-white">{slot.title.split(' ')[0]} {slot.title.split(' ')[1]}</div>
                  <div className="text-[11px] text-slate-400 truncate">{slot.category}</div>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTimelineGlow"
                      className="absolute -bottom-1 left-3 right-3 h-1 bg-gold-400 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Story Card Display with Smooth Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlot.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/70 p-6 sm:p-8 lg:p-10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Visual Image with Badge */}
              <div className="lg:col-span-5 relative group">
                <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={activeSlot.image}
                    alt={activeSlot.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-xs font-mono text-gold-400 font-bold">
                    {activeSlot.time}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-xs font-medium text-slate-200 bg-slate-900/80 backdrop-blur-sm p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-gold-400 font-semibold">Focus:</span> {activeSlot.category}
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative Details */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-gold-400 mb-1">
                    {activeSlot.category} · {activeSlot.time}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
                    {activeSlot.title}
                  </h3>
                  <p className="text-gold-200/90 text-sm font-medium italic">
                    "{activeSlot.tagline}"
                  </p>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeSlot.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    What happens during this hour:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeSlot.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 bg-slate-900/60 border border-slate-700/50 p-2.5 rounded-lg text-xs text-slate-200"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote Box */}
                <div className="border-l-2 border-gold-400 pl-4 py-1.5 bg-slate-900/40 rounded-r-lg">
                  <p className="text-xs text-slate-300 italic mb-1">"{activeSlot.quote}"</p>
                  <p className="text-[11px] font-bold text-gold-400">— {activeSlot.quoteAuthor}</p>
                </div>

                {/* Next Button */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Step {activeIndex + 1} of {timeSlots.length}
                  </span>
                  <button
                    onClick={() => setActiveIndex((prev) => (prev + 1) % timeSlots.length)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    Next School Period <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
