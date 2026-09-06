'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  Info,
  CheckCircle,
  ArrowRight,
  Shield,
  Layers,
  MapPin,
  Calendar,
  Eye,
  RotateCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CampusZone {
  id: string;
  name: string;
  category: string;
  panoramicImage: string;
  description: string;
  dimensions: string;
  studentCapacity: string;
  equipment: string[];
  safetyCertifications: string[];
  inCharge: string;
  audioGuideTranscript: string;
  hotspots: {
    id: string;
    title: string;
    description: string;
    xPercent: number;
    yPercent: number;
  }[];
}

const campusZones: CampusZone[] = [
  {
    id: 'stem-lab',
    name: 'Atal Tinkering & Robotics Lab',
    category: 'STEM & Maker Innovation',
    panoramicImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=85',
    description:
      'Our flagship innovation hub equipped with 3D printers, Arduino & Raspberry Pi toolkits, automated robotic arm kits, and drone simulators fostering practical design-thinking for 21st-century problem solvers.',
    dimensions: '1,800 Sq. Ft.',
    studentCapacity: '40 Students per batch',
    equipment: ['Creality 3D Prototyping Printers', 'Arduino & ESP32 Microcontrollers', 'LEGO Mindstorms EV3 Kits', 'Oscilloscopes & Soldering Stations'],
    safetyCertifications: ['Fire Suppression System Installed', 'ESD Safe Antistatic Workbenches', 'First Aid & Eye Wash Station'],
    inCharge: 'Er. Anjali Sharma (Head of Innovation)',
    audioGuideTranscript:
      'Welcome to the Atal Tinkering Lab at Decent Public School. Here, students from grade four onward transform creative ideas into working prototypes, mastering coding, IoT, and competitive robotics.',
    hotspots: [
      { id: 'h1', title: '3D Prototyping Center', description: 'Students design CAD models and 3D-print architectural & mechanical prototypes.', xPercent: 32, yPercent: 45 },
      { id: 'h2', title: 'Robotics Arena & Testing Mat', description: 'WRO and FIRST LEGO League arena for autonomous obstacle course navigation.', xPercent: 68, yPercent: 60 },
      { id: 'h3', title: 'IoT & Soldering Workstation', description: 'Antistatic stations for circuit building, drone assembly, and sensor calibration.', xPercent: 50, yPercent: 35 },
    ],
  },
  {
    id: 'science-complex',
    name: 'Advanced Science Laboratories (Physics, Chem, Bio)',
    category: 'Experiential Science',
    panoramicImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&q=85',
    description:
      'Three dedicated, spacious subject laboratories designed strictly as per CBSE senior secondary norms. Equipped with optical spectrometers, compound digital microscopes, and chemical fume hoods.',
    dimensions: '2,400 Sq. Ft. Total',
    studentCapacity: '45 Students per lab',
    equipment: ['High-resolution Olympus Microscopes', 'Digital Spectrophotometers', 'Fume Extraction Hoods', 'CBSE Board Practical Standard Kits'],
    safetyCertifications: ['Safety Shower & Chemical Spill Kit', 'LPG Pipeline Safety Valves', 'NFPA Hazardous Material Signage'],
    inCharge: 'Dr. Vivek Saxena (PGT Science)',
    audioGuideTranscript:
      'You are now touring the Senior Science Laboratories. Every student performs hands-on experiments independently under senior subject masters.',
    hotspots: [
      { id: 's1', title: 'Optical Laser Bench', description: 'Laser diffraction and prism spectrometers for senior wave optics practicals.', xPercent: 25, yPercent: 50 },
      { id: 's2', title: 'Fume Hood & Titration Row', description: 'Exhaust-ventilated benches for safe analytical organic and inorganic synthesis.', xPercent: 72, yPercent: 42 },
    ],
  },
  {
    id: 'sports-complex',
    name: 'Champions Sports Arena & Skating Rink',
    category: 'Athletics & Physical Fitness',
    panoramicImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=85',
    description:
      'Full-size floodlit synthetic basketball court, international standard roller-skating rink, indoor table tennis complex, and dedicated martial arts dojo with NIS certified coaches.',
    dimensions: '18,500 Sq. Ft. Outdoor & Indoor',
    studentCapacity: '150+ Athletes simultaneously',
    equipment: ['Shock-Absorbing Synthetic Basketball Court', 'Polished Terrazzo Skating Rink', 'Stag International TT Tables', 'Taekwondo & Yoga Mats'],
    safetyCertifications: ['Padded Perimeter Safety Walls', 'Full-time Sports Medic & Physiotherapist', 'CCTV 24/7 Coverage'],
    inCharge: 'Coach Vikram Malhotra (NIS Certified)',
    audioGuideTranscript:
      'Step into the Champions Sports Arena. From beginners finding their balance on roller skates to our basketball team representing Delhi at CBSE Nationals, fitness is in our DNA.',
    hotspots: [
      { id: 'sp1', title: 'Tournament Basketball Court', description: 'Spring-cushioned acrylic playing surface with LED floodlighting for evening practice.', xPercent: 40, yPercent: 65 },
      { id: 'sp2', title: 'Roller Skating Oval', description: 'Engineered banked track producing multiple state and national medalists.', xPercent: 78, yPercent: 55 },
    ],
  },
  {
    id: 'digital-library',
    name: 'Rabindranath Tagore Learning Commons & E-Library',
    category: 'Knowledge & Research',
    panoramicImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=85',
    description:
      'An inspiring quiet sanctuary stocking over 18,000 physical volumes, international research periodicals, CBSE question banks, and 20 multimedia research terminals with JSTOR & DELNET subscriptions.',
    dimensions: '3,200 Sq. Ft.',
    studentCapacity: '90 Readers',
    equipment: ['18,000+ Fiction & Reference Books', '20 E-Resource Research Desks', 'Automated RFID Self-Checkout Kiosk', 'Kindle Paperwhite Reading Lounge'],
    safetyCertifications: ['Acoustically Isolated Reading Bays', 'Ergonomic Seating', 'Climate Controlled Archival Storage'],
    inCharge: 'Mrs. Vandana Sehgal (Chief Librarian)',
    audioGuideTranscript:
      'Welcome to the Learning Commons. Here students explore world literature, prepare for competitive exams, and access global research repositories.',
    hotspots: [
      { id: 'l1', title: 'E-Learning Research Hub', description: 'Dedicated terminals with high-speed fiber internet for academic research.', xPercent: 30, yPercent: 40 },
      { id: 'l2', title: 'Periodical & Journal Gallery', description: 'National geographic, scientific American, and daily newspapers in Hindi & English.', xPercent: 70, yPercent: 48 },
    ],
  },
  {
    id: 'smart-classrooms',
    name: 'Smart Interactive Classrooms',
    category: 'Digital Pedagogy',
    panoramicImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=85',
    description:
      'Every classroom is an air-ventilated smart learning space equipped with high-definition interactive touch panels, dual-band Wi-Fi, audio-visual sound reinforcement, and modular ergonomic furniture.',
    dimensions: '650 Sq. Ft. per classroom',
    studentCapacity: '35–40 Students (Low Student-Teacher Ratio)',
    equipment: ['75-inch 4K Interactive Touch Panels', 'Acoustic Soundbars', 'Modular Collaborative Desks', 'Individual Student Locker Storage'],
    safetyCertifications: ['Dual Emergency Exits', 'High-Resolution CCTV with Audio', 'Child-Safe Electrical Fittings'],
    inCharge: 'Wing Coordinators',
    audioGuideTranscript:
      'Every classroom at Decent Public School is engineered for interactive, inquiry-driven learning with individual student attention.',
    hotspots: [
      { id: 'c1', title: 'Interactive 4K Smart Board', description: 'Allows teachers to illustrate 3D molecular structures, geometry proofs, and historical timelines.', xPercent: 52, yPercent: 40 },
    ],
  },
  {
    id: 'auditorium',
    name: 'Kalam Multipurpose Auditorium & Theatre Studio',
    category: 'Performing Arts & Assemblies',
    panoramicImage: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1600&q=85',
    description:
      'State-of-the-art air-conditioned auditorium with theatrical stage lighting, surround acoustics, motorized screen projection, and green rooms hosting annual concerts, MUNs, and guest symposiums.',
    dimensions: '5,000 Sq. Ft.',
    studentCapacity: '600 Seats',
    equipment: ['Dolby 5.1 Surround Sound Array', 'DMX Controlled Theatrical Lighting', 'Motorized 250-inch Projection Screen', 'Dual Dedicated Green Rooms'],
    safetyCertifications: ['Centralized Fire Sprinklers', 'Panic-Bar Emergency Exits', 'Uninterrupted UPS Power Backup'],
    inCharge: 'Cultural Affairs Committee',
    audioGuideTranscript:
      'You are now viewing the Kalam Multipurpose Auditorium, home to our legendary Annual Day productions, debate competitions, and guest lectures.',
    hotspots: [
      { id: 'a1', title: 'Theatrical Stage & Lighting Rig', description: 'Houses dynamic spotlights and acoustic baffles for grand musical and theatrical performances.', xPercent: 50, yPercent: 48 },
    ],
  },
];

export function VirtualTourClient() {
  const [selectedZoneId, setSelectedZoneId] = useState(campusZones[0].id);
  const [activeHotspot, setActiveHotspot] = useState<CampusZone['hotspots'][0] | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeZone = campusZones.find((z) => z.id === selectedZoneId) || campusZones[0];

  const handleAudioToggle = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(activeZone.audioGuideTranscript);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      alert('Audio speech is not supported on this browser.');
    }
  };

  const handleZoneChange = (zoneId: string) => {
    if (isPlayingAudio && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
    setSelectedZoneId(zoneId);
    setActiveHotspot(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-3">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              Interactive Campus Experience
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              360° Virtual Campus <span className="text-gold-400">Explorer</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Explore Decent Public School’s world-class laboratories, sports complex, smart classrooms, and learning spaces from the comfort of your home.
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleAudioToggle}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                isPlayingAudio
                  ? 'bg-gold-400 text-slate-950 border-gold-400 shadow-lg shadow-gold-400/20'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
              {isPlayingAudio ? 'Stop Audio Guide' : 'Listen to Audio Guide'}
            </button>

            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 text-xs font-bold transition-colors shadow-lg"
            >
              Book Physical Campus Tour <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Zone Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {campusZones.map((zone) => {
            const isSelected = zone.id === selectedZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => handleZoneChange(zone.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer ${
                  isSelected
                    ? 'bg-gold-500/20 border-gold-400 text-gold-300 shadow-md shadow-gold-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${isSelected ? 'text-gold-400' : 'text-slate-500'}`} />
                {zone.name.split('(')[0]}
              </button>
            );
          })}
        </div>

        {/* Main 360 Panoramic Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 mb-10 group">
          <div className="relative h-[420px] sm:h-[540px] lg:h-[620px] w-full overflow-hidden">
            <img
              src={activeZone.panoramicImage}
              alt={activeZone.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

            {/* Top Bar inside Viewport */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/80 text-xs font-semibold text-gold-400 flex items-center gap-2">
                <RotateCw className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
                Interactive 360° Hotspots Active
              </div>
              <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80 text-[11px] text-slate-300 font-mono">
                {activeZone.dimensions} · {activeZone.studentCapacity}
              </div>
            </div>

            {/* Interactive Hotspot Pins */}
            {activeZone.hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                style={{ left: `${hotspot.xPercent}%`, top: `${hotspot.yPercent}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                onClick={() => setActiveHotspot(hotspot)}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gold-400 opacity-75" />
                  <button
                    className={`relative inline-flex items-center justify-center w-7 h-7 rounded-full text-slate-950 font-bold text-xs shadow-lg transition-transform hover:scale-125 border-2 ${
                      activeHotspot?.id === hotspot.id ? 'bg-white border-gold-400 scale-125' : 'bg-gold-400 border-white'
                    }`}
                    title={hotspot.title}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="mt-1 bg-slate-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap hidden sm:block pointer-events-none border border-slate-700">
                  {hotspot.title}
                </div>
              </div>
            ))}

            {/* Active Hotspot Modal Overlay */}
            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 bg-slate-900/95 backdrop-blur-xl border border-gold-400/40 p-5 rounded-2xl shadow-2xl z-30"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      Hotspot Feature
                    </div>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-slate-400 hover:text-white text-xs font-bold px-2 py-0.5 rounded bg-slate-800"
                    >
                      Close
                    </button>
                  </div>
                  <h4 className="font-serif font-bold text-white text-lg mb-1">{activeHotspot.title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">{activeHotspot.description}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Title Bar inside Viewport */}
            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
              <div className="text-xs uppercase tracking-widest text-gold-400 font-bold mb-1">
                {activeZone.category}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
                {activeZone.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Detailed Zone Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Overview & Faculty Incharge */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-gold-400" />
              Zone Overview
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{activeZone.description}</p>
            <div className="pt-3 border-t border-slate-800">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Faculty / Mentor In-Charge
              </div>
              <div className="text-sm font-bold text-gold-300">{activeZone.inCharge}</div>
            </div>
          </div>

          {/* Column 2: Equipment & Lab Tools */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              Key Apparatus & Resources
            </h3>
            <div className="space-y-2.5">
              {activeZone.equipment.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Safety & CBSE Standards */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold-400" />
              Safety Protocols & Norms
            </h3>
            <div className="space-y-2.5">
              {activeZone.safetyCertifications.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-800">
              <Link
                href="/admissions"
                className="w-full py-2.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                Schedule Guided Campus Walkthrough <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
