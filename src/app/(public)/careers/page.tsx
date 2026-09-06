import { Metadata } from 'next';
import { CareersClient } from '@/components/careers/CareersClient';

export const metadata: Metadata = {
  title: 'Faculty Careers & Recruitment | Decent Public School, Rohini',
  description:
    'Explore teaching and leadership job openings at Decent Public School, Rohini (CBSE). Apply online for PGT, TGT, PRT, STEM Robotics trainer, and sports coach positions.',
};

export default function CareersPage() {
  return <CareersClient />;
}
