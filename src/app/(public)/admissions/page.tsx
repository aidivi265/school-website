import { Metadata } from 'next';
import { getSchoolData } from '@/lib/supabase/service';
import AdmissionsClient from '@/components/admissions/AdmissionsClient';

export const metadata: Metadata = {
  title: 'Admissions 2025–26 | Process, Eligibility & Enquiry Form',
  description:
    'Apply for admission at Decent Public School, Rohini, Delhi. Check eligibility criteria, required documents, fee payment procedure, and submit your online enquiry.',
};

export default async function AdmissionsPage() {
  const school = await getSchoolData();

  return <AdmissionsClient initialSchool={school} />;
}
