'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, CheckCircle, ArrowRight, Sparkles, HelpCircle, ShieldCheck, Bus, Award } from 'lucide-react';

interface FeeSlab {
  gradeId: string;
  gradeName: string;
  category: 'Early Years' | 'Primary' | 'Middle' | 'Secondary' | 'Senior Secondary';
  oneTimeAdmission: number;
  quarterlyTuition: number;
  annualDevCharges: number;
  labActivityFeeQuarterly: number;
  examFeeAnnual: number;
}

const feeSlabs: FeeSlab[] = [
  { gradeId: 'nursery', gradeName: 'Pre-School / Nursery & KG', category: 'Early Years', oneTimeAdmission: 25000, quarterlyTuition: 16500, annualDevCharges: 6000, labActivityFeeQuarterly: 1200, examFeeAnnual: 1500 },
  { gradeId: 'primary', gradeName: 'Classes I to V (Primary Wing)', category: 'Primary', oneTimeAdmission: 25000, quarterlyTuition: 18500, annualDevCharges: 7000, labActivityFeeQuarterly: 1500, examFeeAnnual: 2000 },
  { gradeId: 'middle', gradeName: 'Classes VI to VIII (Middle Wing)', category: 'Middle', oneTimeAdmission: 25000, quarterlyTuition: 21000, annualDevCharges: 8000, labActivityFeeQuarterly: 2200, examFeeAnnual: 2500 },
  { gradeId: 'secondary', gradeName: 'Classes IX & X (Secondary Wing)', category: 'Secondary', oneTimeAdmission: 25000, quarterlyTuition: 24500, annualDevCharges: 9000, labActivityFeeQuarterly: 2800, examFeeAnnual: 3000 },
  { gradeId: 'senior-sci', gradeName: 'Classes XI & XII (Science Stream - PCM/PCB)', category: 'Senior Secondary', oneTimeAdmission: 25000, quarterlyTuition: 28500, annualDevCharges: 10000, labActivityFeeQuarterly: 4500, examFeeAnnual: 3500 },
  { gradeId: 'senior-com', gradeName: 'Classes XI & XII (Commerce Stream with/without Maths)', category: 'Senior Secondary', oneTimeAdmission: 25000, quarterlyTuition: 26000, annualDevCharges: 10000, labActivityFeeQuarterly: 2500, examFeeAnnual: 3500 },
  { gradeId: 'senior-hum', gradeName: 'Classes XI & XII (Humanities & Psychology)', category: 'Senior Secondary', oneTimeAdmission: 25000, quarterlyTuition: 25000, annualDevCharges: 10000, labActivityFeeQuarterly: 2000, examFeeAnnual: 3500 },
];

const transportSlabs = [
  { id: 'none', name: 'No Transport Required (Self Commute / Parent Drop)', quarterlyCost: 0 },
  { id: 'zone1', name: 'Zone 1: Rohini Sectors 1, 2, 3, 4, 5, 6, 7 & 8', quarterlyCost: 4800 },
  { id: 'zone2', name: 'Zone 2: Rohini Sectors 9, 11, 13, 14, 15, 16 & 17', quarterlyCost: 5600 },
  { id: 'zone3', name: 'Zone 3: Rohini Sectors 18, 20, 21, 22, 23, 24 & 25', quarterlyCost: 6400 },
  { id: 'zone4', name: 'Zone 4: Pitampura, Prashant Vihar, Saraswati Vihar', quarterlyCost: 6200 },
  { id: 'zone5', name: 'Zone 5: Shalimar Bagh, Mangolpuri, Sultanpuri & Outer Delhi', quarterlyCost: 7000 },
];

export function FeeCalculator() {
  const [selectedGradeId, setSelectedGradeId] = useState<string>(feeSlabs[0].gradeId);
  const [selectedTransportId, setSelectedTransportId] = useState<string>(transportSlabs[1].id);
  const [includeDayBoarding, setIncludeDayBoarding] = useState<boolean>(false);
  const [isExistingSibling, setIsExistingSibling] = useState<boolean>(false);

  const activeGrade = feeSlabs.find((g) => g.gradeId === selectedGradeId) || feeSlabs[0];
  const activeTransport = transportSlabs.find((t) => t.id === selectedTransportId) || transportSlabs[0];

  const dayBoardingFeeQuarterly = includeDayBoarding ? 4500 : 0;
  const siblingDiscountQuarterly = isExistingSibling ? Math.round(activeGrade.quarterlyTuition * 0.1) : 0;

  const totalQuarterlyTuitionAndLabs = activeGrade.quarterlyTuition + activeGrade.labActivityFeeQuarterly - siblingDiscountQuarterly;
  const totalQuarterlyPayable = totalQuarterlyTuitionAndLabs + activeTransport.quarterlyCost + dayBoardingFeeQuarterly;

  const estimatedAnnualGrandTotal =
    activeGrade.oneTimeAdmission +
    totalQuarterlyPayable * 4 +
    activeGrade.annualDevCharges +
    activeGrade.examFeeAnnual;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-12">
      {/* Calculator Header */}
      <div className="bg-navy-950 text-white p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Transparent Fee Estimation Portal
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Smart Fee & Transport Calculator
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Select your child's class and bus route for a real-time, transparent breakdown of tuition, activity charges, and transport slabs.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-navy-900 border border-navy-800 px-4 py-2.5 rounded-2xl self-start md:self-auto text-xs text-gold-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Approved by DOE Delhi / CBSE Norms</span>
          </div>
        </div>
      </div>

      {/* Main Form & Calculation Output */}
      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Grade Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-2">
              1. Select Class / Grade Level:
            </label>
            <select
              value={selectedGradeId}
              onChange={(e) => setSelectedGradeId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-semibold text-navy-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {feeSlabs.map((slab) => (
                <option key={slab.gradeId} value={slab.gradeId}>
                  {slab.gradeName}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Transport Zone Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-2 flex items-center justify-between">
              <span>2. School Bus & Transport Route:</span>
              <Bus className="w-3.5 h-3.5 text-amber-600" />
            </label>
            <select
              value={selectedTransportId}
              onChange={(e) => setSelectedTransportId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-semibold text-navy-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {transportSlabs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} {t.quarterlyCost > 0 ? `(₹${t.quarterlyCost.toLocaleString('en-IN')}/quarter)` : '(₹0)'}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Addon Checkboxes */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-1">
              3. Special Concessions & Add-on Facilities:
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={isExistingSibling}
                onChange={(e) => setIsExistingSibling(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
              />
              <div className="text-xs">
                <span className="font-bold text-navy-950 block">Sibling Concession (10% on Tuition Fee)</span>
                <span className="text-slate-500">Applicable if an elder sibling is actively enrolled at Decent Public School.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDayBoarding}
                onChange={(e) => setIncludeDayBoarding(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
              />
              <div className="text-xs">
                <span className="font-bold text-navy-950 block">Day Boarding & Co-Curricular Coaching (₹4,500/quarter)</span>
                <span className="text-slate-500">Extended after-school sports drills, robotics mentorship, and guided homework clinic till 4:30 PM.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Right Output Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-amber-50/40 rounded-2xl border border-amber-200/80 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Quarterly Breakdown</span>
            <span className="text-[10px] font-bold text-slate-500">(Payable in 4 Quarters)</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>Quarterly Tuition Fee:</span>
              <span className="font-mono font-bold text-navy-950">₹{activeGrade.quarterlyTuition.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-slate-700">
              <span>Lab, STEM & Activity Charges:</span>
              <span className="font-mono font-bold text-navy-950">₹{activeGrade.labActivityFeeQuarterly.toLocaleString('en-IN')}</span>
            </div>

            {isExistingSibling && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Sibling Concession (10%):</span>
                <span className="font-mono">-₹{siblingDiscountQuarterly.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-700">
              <span>Transport Fee (Quarterly):</span>
              <span className="font-mono font-bold text-navy-950">₹{activeTransport.quarterlyCost.toLocaleString('en-IN')}</span>
            </div>

            {includeDayBoarding && (
              <div className="flex justify-between text-slate-700">
                <span>Day Boarding & Coaching:</span>
                <span className="font-mono font-bold text-navy-950">₹{dayBoardingFeeQuarterly.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="pt-3 border-t border-amber-200/80 flex justify-between items-center text-sm font-bold text-navy-950">
              <span>Estimated Quarterly Total:</span>
              <span className="font-mono text-base text-amber-700">₹{totalQuarterlyPayable.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Annual Aggregate Callout */}
          <div className="p-4 bg-navy-950 text-white rounded-xl space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-gold-400 font-bold">
              Estimated Annual Total (Academic Year)
            </div>
            <div className="font-serif text-2xl font-bold text-white">
              ₹{estimatedAnnualGrandTotal.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-slate-400">
              Includes 4 quarters + one-time admission (₹{activeGrade.oneTimeAdmission.toLocaleString('en-IN')}) + dev charges (₹{activeGrade.annualDevCharges.toLocaleString('en-IN')}).
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <Link
              href={`/admissions?class=${encodeURIComponent(activeGrade.gradeName)}#enquiry`}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-navy-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow"
            >
              Apply Online for {activeGrade.gradeName.split('(')[0]} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
