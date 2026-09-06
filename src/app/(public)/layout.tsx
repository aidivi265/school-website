import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingAssistant from '@/components/layout/FloatingAssistant';
import SchoolNoticeModal from '@/components/home/SchoolNoticeModal';
import { getSchoolData, getFAQs } from '@/lib/supabase/service';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const school = await getSchoolData();
  const faqs = await getFAQs();

  return (
    <>
      <Navbar school={school} />
      <main className="flex-1">{children}</main>
      <Footer school={school} />
      <FloatingAssistant initialFaqs={faqs} />
      <SchoolNoticeModal />
    </>
  );
}
